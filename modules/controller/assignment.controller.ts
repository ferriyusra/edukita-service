import { Response } from 'express';
import AssignmentService from '../assignment/service';
import response from '../../util/response';
import { IReqUser } from '../../util/interface';
import { assignment } from '../assignment/validation';
import { getPaging } from '../../util/paging';
import { getAssignmentSearchable } from '../assignment/searchable';

class AssignmentController {
	constructor(private readonly assignmentService: AssignmentService) {}

	async create(req: IReqUser, res: Response) {
		try {
			const userId = req.user?.user_id;
			const { type, subject, title, content } = req.body;
			await assignment.validate({
				type,
				subject,
				title,
				content,
			});

			const result = await this.assignmentService.create({
				type,
				subject,
				title,
				content,
				userId,
			});

			return response.success(res, result, 'Assignment submit successfully');
		} catch (error) {
			return response.error(res, error, 'Assignment submit failed');
		}
	}

	async findAll(req: IReqUser, res: Response) {
		try {
			const { query } = req;
			const options: {
				subject?: string;
			} = {};

			// get paging
			const paging = getPaging(query, getAssignmentSearchable());

			// filter subject
			if (query.subject) {
				options.subject = String(query.subject).toUpperCase();
			}

			const data = await this.assignmentService.findAll(paging, options);

			return response.pagination(
				res,
				data.rows,
				Number(data.count),
				paging,
				'Success find all assignments'
			);
		} catch (error) {
			return response.error(res, error, 'Failed find all assignments');
		}
	}

	async findAssignmentForStudent(req: IReqUser, res: Response) {
		try {
			const { query } = req;
			console.log('res', query);
			const studentId = req.user?.user_id;

			// get paging
			const paging = getPaging(query, getAssignmentSearchable());

			const data = await this.assignmentService.findAssignmentForStudent(
				paging,
				`${studentId}`
			);

			return response.pagination(
				res,
				data.rows,
				Number(data.count),
				paging,
				'Success find all assignments students'
			);
		} catch (error) {
			return response.error(res, error, 'Failed find all assignments students');
		}
	}

	async findOne(req: IReqUser, res: Response) {
		try {
			const { id } = req.params;

			const result = await this.assignmentService.findOne(id);

			if (!result) {
				return response.notfound(res, 'Assignment not found');
			}

			return response.success(res, result, 'Success find one assignment');
		} catch (error) {
			return response.error(res, error, 'Failed find one assignment');
		}
	}
}

export default AssignmentController;
