import express, { Request, Response, NextFunction, Router } from 'express';

import aclMiddleware from '../middleware/acl.middleware';
import authMiddleware from '../middleware/auth.middleware';

// import { ROLES } from '../util/constant';
// import { IReqUser } from '../util/interface';

import AuthController from '../modules/controller/auth.controller';

export class ApiRouter {
	private router: Router;
	private authController: AuthController;

	constructor(authController: AuthController) {
		this.router = express.Router();
		this.authController = authController;
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
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default (authController: AuthController): Router => {
	return new ApiRouter(authController).getRouter();
};
