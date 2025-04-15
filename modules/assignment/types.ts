export interface CreateAssignmentDTO {
	userId: string;
	subject: 'ENGLISH' | 'MATH';
	title: string;
	content: string;
}
