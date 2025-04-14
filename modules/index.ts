import AuthRepository from './auth/repository';
import AuthService from './auth/service';
import AuthController from './controller/auth.controller';

function createAuthRepository(db: any): AuthRepository {
	return new AuthRepository(db);
}

function createAuthService(repository: AuthRepository): AuthService {
	return new AuthService(repository);
}

function createAuthController(authService: AuthService): AuthController {
	return new AuthController(authService);
}

export { createAuthRepository, createAuthService, createAuthController };
