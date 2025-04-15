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
}

export default AssignmentService;
