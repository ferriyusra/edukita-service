import AssignmentRepository from './repository';

class AssignmentService {
	constructor(private readonly assignmentRepository: AssignmentRepository) {}

	async create(data: any) {
		return this.assignmentRepository.create(data);
	}

	async findAll(paging: any, options: any) {
		const data = await this.assignmentRepository.findAll(paging, options);
		return data;
	}

	async findAssignmentForStudent(paging: any, studentId: string) {
		const data = await this.assignmentRepository.findAssignmentForStudent(
			paging,
			studentId
		);
		return data;
	}

	async findOne(id: string) {
		return this.assignmentRepository.findOne(id);
	}
}

export default AssignmentService;
