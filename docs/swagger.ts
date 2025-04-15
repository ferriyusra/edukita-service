import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		version: 'v0.0.1',
		title: 'Docs API Edukita Service',
		description: 'Docs API Edukita Service',
	},
	servers: [
		{
			url: 'http://localhost:9852/api',
			description: 'Local server',
		},
		{
			url: 'https://edukita-service.app/api',
			description: 'Development server',
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
			},
		},
		schemas: {
			LoginRequest: {
				identifier: 'yourname',
				password: 'yourpassword',
			},
			RegisterRequest: {
				fullName: 'yourname',
				email: 'youremail@mail.com',
				password: 'yourpassword',
				confirmPassword: 'yourConfirmpassword',
			},
			createUserRequest: {
				fullName: 'yourname',
				email: 'youremail@mail.com',
				role: 'roleuser',
			},
			createAssignmentRequest: {
				subject: 'ENGLISH',
				title: 'title',
				content: 'content',
			},
		},
	},
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/api.ts'];

swaggerAutogen({
	openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
