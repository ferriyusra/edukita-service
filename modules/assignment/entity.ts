export interface AssignmentEntity {
	assignment_id: string;
	student_id: string;
	subject: string;
	title: string;
	content: string;
	created_at: Date;
	updated_at: Date;
	student?: {
		full_name: string;
	};
}
