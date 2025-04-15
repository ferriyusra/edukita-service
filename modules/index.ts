import AssignmentRepository from './assignment/repository';
import AuthRepository from './auth/repository';
import UserRepository from './user/repository';

import AssignmentService from './assignment/service';
import AuthService from './auth/service';
import UserService from './user/service';

import AssignmentController from './controller/assignment.controller';
import AuthController from './controller/auth.controller';
import UserController from './controller/user.controller';
import GradeController from './controller/grade.controller';
import GradeRepository from './grade/repository';
import GradeService from './grade/service';

function createAuthRepository(db: any): AuthRepository {
	return new AuthRepository(db);
}

function createAuthService(repository: AuthRepository): AuthService {
	return new AuthService(repository);
}

function createAuthController(authService: AuthService): AuthController {
	return new AuthController(authService);
}

function createUserRepository(db: any): UserRepository {
	return new UserRepository(db);
}

function createUserService(repository: UserRepository): UserService {
	return new UserService(repository);
}

function createUserController(service: UserService): UserController {
	return new UserController(service);
}

function createAssignmentRepository(db: any): AssignmentRepository {
	return new AssignmentRepository(db);
}

function createAssignmentService(
	repository: AssignmentRepository
): AssignmentService {
	return new AssignmentService(repository);
}

function createAssignmentController(
	service: AssignmentService
): AssignmentController {
	return new AssignmentController(service);
}

function createGradeRepository(db: any): GradeRepository {
	return new GradeRepository(db);
}

function createGradeService(repository: GradeRepository): GradeService {
	return new GradeService(repository);
}

function createGradeController(
	service: GradeService,
	assignmentService: AssignmentService
): GradeController {
	return new GradeController(service, assignmentService);
}

export {
	// Repo
	createAuthRepository,
	createUserRepository,
	createAssignmentRepository,
	createGradeRepository,

	// Service
	createUserService,
	createAuthService,
	createAssignmentService,
	createGradeService,

	// Controller
	createAuthController,
	createUserController,
	createAssignmentController,
	createGradeController,
};
