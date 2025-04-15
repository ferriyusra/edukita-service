import * as Yup from 'yup';

export const gradeRequest = Yup.object({
	grade: Yup.number()
		.required('Grade is required')
		.min(10, 'Grade must be at least 10')
		.max(100, 'Grade must be at most 100'),
	feedback: Yup.string().required('Feedback is required'),
	assignmentId: Yup.string().required('Assignment ID is required'),
});
