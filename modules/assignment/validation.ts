import * as Yup from 'yup';

export const assignment = Yup.object({
	subject: Yup.string()
		.oneOf(['ENGLISH', 'MATH'])
		.required('Subject Assignment type is required'),
	title: Yup.string().required('Title is required'),
	content: Yup.string().required('Content is required'),
});
