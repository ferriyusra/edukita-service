import GradeRepository from './repository';

class GradeService {
	constructor(private readonly gradeRepository: GradeRepository) {}

	async create(data: any) {
		return this.gradeRepository.create(data);
	}

	async findAll(paging: any, studentId: string) {
		const data = await this.gradeRepository.findAll(paging, studentId);
		return data;
	}

	async getGradeByAssignmentId(assignmentId: string) {
		return this.gradeRepository.getGradeByAssignmentId(assignmentId);
	}
}

export default GradeService;
