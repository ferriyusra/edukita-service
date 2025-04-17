import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateAssignmentDTO } from './types';
import { AssignmentDTO, AssignmentEntity } from './entity';

class AssignmentRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async create(data: CreateAssignmentDTO) {
		const created = await this.db.assignments.create({
			data: {
				assignment_id: uuidv4(),
				student_id: data.userId,
				subject: data.subject,
				title: data.title,
				content: data.content,
				updated_at: new Date(),
			},
			select: {
				assignment_id: true,
				student_id: true,
				subject: true,
				title: true,
				content: true,
				created_at: true,
				updated_at: true,
			},
		});
		return toDto(created);
	}

	async findAll(paging: any, options: any) {
		const skip = (paging.page - 1) * paging.limit;
		const filters: any[] = [];

		if (options?.subject) {
			filters.push({
				subject: {
					equals: options.subject,
				},
			});
		}

		if (paging.search) {
			Object.keys(paging.search).forEach((key) => {
				const value = paging.search[key];
				if (typeof value !== 'object') {
					filters.push({ [key]: { equals: value, mode: 'insensitive' } });
				} else if (value.like) {
					filters.push({
						[key]: { contains: value.like, mode: 'insensitive' },
					});
				}
			});
		}

		let orderBy = {};
		if (paging.sort) {
			const [sortField, sortOrder] = paging.sort.split(' ');
			orderBy = { [sortField]: sortOrder === 'desc' ? 'desc' : 'asc' };
		}

		const whereClause = filters.length > 0 ? { AND: filters } : undefined;

		const assignments = await this.db.assignments.findMany({
			take: paging.limit,
			skip: skip,
			where: whereClause,
			orderBy,
			include: {
				student: {
					select: {
						full_name: true,
					},
				},
			},
		});

		const totalItems = await this.db.assignments.count({
			where: whereClause,
		});

		return {
			rows: assignments.map((assignment) => toDto(assignment)),
			count: totalItems,
		};
	}

	async findOne(id: string) {
		const data = await this.db.assignments.findFirst({
			where: {
				assignment_id: id,
			},
			select: {
				assignment_id: true,
				student_id: true,
				subject: true,
				title: true,
				content: true,
				created_at: true,
				updated_at: true,
				student: {
					select: {
						full_name: true,
					},
				},
			},
		});

		return data ? toDto(data) : null;
	}

	async findAssignmentForStudent(paging: any, studentId: string) {
		const skip = (paging.page - 1) * paging.limit;
		const filters: any[] = [];

		filters.push({
			student_id: {
				equals: studentId,
			},
		});

		if (paging.search) {
			Object.keys(paging.search).forEach((key) => {
				const value = paging.search[key];
				if (typeof value !== 'object') {
					filters.push({ [key]: { equals: value, mode: 'insensitive' } });
				} else if (value.like) {
					filters.push({
						[key]: { contains: value.like, mode: 'insensitive' },
					});
				}
			});
		}

		let orderBy = {};
		if (paging.sort) {
			const [sortField, sortOrder] = paging.sort.split(' ');
			orderBy = { [sortField]: sortOrder === 'desc' ? 'desc' : 'asc' };
		}

		const whereClause = filters.length > 0 ? { AND: filters } : undefined;

		const assignments = await this.db.assignments.findMany({
			take: paging.limit,
			skip: skip,
			where: whereClause,
			orderBy,
			include: {
				student: {
					select: {
						full_name: true,
					},
				},
				grade: {
					select: {
						grade: true,
						feedback: true,
						teacher: {
							select: {
								full_name: true,
							},
						},
					},
				},
			},
		});

		const totalItems = await this.db.assignments.count({
			where: whereClause,
		});

		return {
			rows: assignments.map((assignment) => toDtoStudentData(assignment)),
			count: totalItems,
		};
	}
}
function toDtoStudentData(data: any) {
	return {
		id: data.assignment_id,
		title: data.title,
		subject: data.subject,
		content: data.content,
		studentName: data.student?.full_name,
		grade: data.grade?.grade ?? null,
		feedback: data.grade?.feedback ?? null,
		teacherName: data.grade?.teacher?.full_name ?? null,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
}

function toDto(data: AssignmentEntity): AssignmentDTO {
	const obj: AssignmentDTO = {
		id: data.assignment_id,
		subject: data.subject,
		title: data.title,
		content: data.content,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};

	if (data.student?.full_name) {
		return {
			...obj,
			student: {
				studentId: data.student_id,
				studentName: data.student.full_name,
			},
		};
	}

	return {
		...obj,
		studentId: data.student_id,
	};
}

export default AssignmentRepository;
