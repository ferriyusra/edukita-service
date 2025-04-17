import { Response } from 'express';
import GradeService from '../grade/service';
import response from '../../util/response';
import { IReqUser } from '../../util/interface';
import { getPaging } from '../../util/paging';
import { getGradeSearchable } from '../grade/searchable';
import AssignmentService from '../assignment/service';
import { gradeRequest } from '../grade/validation';

class GradeController {
	constructor(
		private readonly gradeService: GradeService,
		private readonly assignmentService: AssignmentService
	) {}

	async create(req: IReqUser, res: Response) {
		try {
			const teacherId = req.user?.user_id;
			const { grade, feedback, assignmentId } = req.body;
			await gradeRequest.validate({
				grade,
				feedback,
				assignmentId,
			});

			const assignment = await this.assignmentService.findOne(assignmentId);
			if (!assignment) {
				return response.notfound(res, 'Assignment Not Found');
			}
			const studentId = assignment.student?.studentId;

			const haveGrade = await this.gradeService.getGradeByAssignmentId(
				assignmentId
			);
			if (haveGrade) {
				return response.badRequest(
					res,
					'This assignment already has been graded'
				);
			}

			const result = await this.gradeService.create({
				assignmentId,
				teacherId,
				studentId,
				grade,
				feedback,
			});

			return response.success(res, result, 'Grade submit successfully');
		} catch (error) {
			console.log(error);
			return response.error(res, error, 'Grade submit failed');
		}
	}

	async findAll(req: IReqUser, res: Response) {
		try {
			const { studentId } = req.params;
			const { query } = req;

			// get paging
			const paging = getPaging(query, getGradeSearchable());

			const data = await this.gradeService.findAll(paging, studentId);

			return response.pagination(
				res,
				data.rows,
				Number(data.count),
				paging,
				'Success find all grades'
			);
		} catch (error) {
			return response.error(res, error, 'Failed find all grades');
		}
	}
}

export default GradeController;
