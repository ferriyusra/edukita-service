export interface GradeEntity {
	assignment_id: string;
	teacher_id: string;
	student_id: string;
	grade: number;
	feedback: string;
	created_at: Date;
	updated_at: Date;
	student?: {
		full_name: string;
	};
}

export interface GradeDTO {
	assignmentId: string;
	teacherId: string;
	grade: number;
	feedback: string;
	createdAt: Date;
	updatedAt: Date;
	student?: {
		studentId: string;
		studentName: string;
	};
	studentId?: string; // hanya muncul jika student tidak tersedia
}
