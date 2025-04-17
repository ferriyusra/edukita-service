import express, { Request, Response, NextFunction, Router } from 'express';

import { IReqUser } from '../util/interface';
import { ROLES } from '../util/constant';

import aclMiddleware from '../middleware/acl.middleware';
import authMiddleware from '../middleware/auth.middleware';

import AssignmentController from '../modules/controller/assignment.controller';
import AuthController from '../modules/controller/auth.controller';
import UserController from '../modules/controller/user.controller';
import GradeController from '../modules/controller/grade.controller';

export class ApiRouter {
	private router: Router;
	private authController: AuthController;
	private assignmentController: AssignmentController;
	private userController: UserController;
	private gradeController: GradeController;

	constructor(
		authController: AuthController,
		assignmentController: AssignmentController,
		userController: UserController,
		gradeController: GradeController
	) {
		this.router = express.Router();
		this.authController = authController;
		this.assignmentController = assignmentController;
		this.userController = userController;
		this.gradeController = gradeController;
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		// Auth Route
		this.router.post(
			'/v1/auth/register',
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.register(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/RegisterRequest'}
			}
			*/
		);
		this.router.post(
			'/v1/auth/login',
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.login(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/LoginRequest'}
			}
			*/
		);
		this.router.get(
			'/v1/auth/me',
			authMiddleware,
			(req: Request, res: Response, _next: NextFunction) =>
				this.authController.me(req, res)
			/*
			#swagger.tags = ['Auth']
			#swagger.security = [{
				"bearerAuth": [],
			}]
			*/
		);

		// User Route
		// this.router.post(
		// 	'/v1/users',
		// 	[authMiddleware, aclMiddleware([ROLES.ADMIN])],
		// 	(req: IReqUser, res: Response, _next: NextFunction) =>
		// 		this.userController.create(req, res)
		// 	/*
		// 	#swagger.tags = ['User']
		// 	#swagger.security = [{
		//   	"bearerAuth": {}
		//   }]
		// 	#swagger.requestBody = {
		// 		required: true,
		// 		schema: {$ref: '#/components/schemas/createUserRequest'}
		// 	}
		// 	*/
		// );

		// Assignment Route
		this.router.post(
			'/v1/assignments',
			[authMiddleware, aclMiddleware([ROLES.STUDENT])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.assignmentController.create(req, res)
			/*
			#swagger.tags = ['Assignment']
			#swagger.security = [{
      	"bearerAuth": {}
      }]
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/createAssignmentRequest'}
			}
			*/
		);
		this.router.get(
			'/v1/assignments',
			[authMiddleware, aclMiddleware([ROLES.TEACHER])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.assignmentController.findAll(req, res)
			/*
			#swagger.tags = ['Assignment']
			#swagger.parameters['page'] = {
				in: 'query',
				type: 'number',
				default: 1
			}
			#swagger.parameters['perPage'] = {
				in: 'query',
				type: 'number',
				default: 10
			}
			#swagger.parameters['subject'] = {
				in: 'query',
				type: 'string'
			}
			#swagger.security = [{
      	"bearerAuth": {}
      }]
			*/
		);
		this.router.get(
			'/v1/assignments/students',
			[authMiddleware, aclMiddleware([ROLES.STUDENT])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.assignmentController.findAssignmentForStudent(req, res)
			/*
			#swagger.tags = ['Assignment']
			#swagger.parameters['page'] = {
				in: 'query',
				type: 'number',
				default: 1
			}
			#swagger.parameters['perPage'] = {
				in: 'query',
				type: 'number',
				default: 10
			}
			#swagger.security = [{
      	"bearerAuth": {}
      }]
			*/
		);
		this.router.get(
			'/v1/assignments/:id',
			[authMiddleware, aclMiddleware([ROLES.TEACHER])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.assignmentController.findOne(req, res)
			/*
			#swagger.tags = ['Assignment']
			#swagger.security = [{
      	"bearerAuth": {}
      }]
			*/
		);

		// Grade Route
		this.router.post(
			'/v1/grades',
			[authMiddleware, aclMiddleware([ROLES.TEACHER])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.gradeController.create(req, res)
			/*
			#swagger.tags = ['Grade']
			#swagger.security = [{
      	"bearerAuth": {}
      }]
			#swagger.requestBody = {
				required: true,
				schema: {$ref: '#/components/schemas/createGradeRequest'}
			}
			*/
		);

		this.router.get(
			'/v1/grades/:studentId',
			[authMiddleware, aclMiddleware([ROLES.STUDENT, ROLES.TEACHER])],
			(req: IReqUser, res: Response, _next: NextFunction) =>
				this.gradeController.findAll(req, res)
			/*
			#swagger.tags = ['Grade']
			#swagger.security = [{
      	"bearerAuth": {}
      }]
				#swagger.parameters['page'] = {
				in: 'query',
				type: 'number',
				default: 1
			}
			#swagger.parameters['perPage'] = {
				in: 'query',
				type: 'number',
				default: 10
			}
			*/
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (
	authController: AuthController,
	assignmentController: AssignmentController,
	userController: UserController,
	gradeController: GradeController
): Router => {
	return new ApiRouter(
		authController,
		assignmentController,
		userController,
		gradeController
	).getRouter();
};
