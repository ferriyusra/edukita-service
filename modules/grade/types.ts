export interface CreateGradeDTO {
	assignmentId: string;
	teacherId: string;
	studentId: string;
	grade: number;
	feedback: string;
}
