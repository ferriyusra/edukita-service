import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateGradeDTO } from './types';
import { GradeDTO, GradeEntity } from './entity';

class GradeRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async create(data: CreateGradeDTO) {
		const created = await this.db.grades.create({
			data: {
				assignment_id: data.assignmentId,
				teacher_id: data.teacherId,
				student_id: data.studentId,
				grade: data.grade,
				feedback: data.feedback,
				updated_at: new Date(),
			},
			select: {
				assignment_id: true,
				teacher_id: true,
				student_id: true,
				feedback: true,
				grade: true,
				created_at: true,
				updated_at: true,
			},
		});
		return toDto(created);
	}

	async findAll(paging: any, studentId: string) {
		const skip = (paging.page - 1) * paging.limit;
		const filters: any[] = [];

		if (studentId) {
			filters.push({
				student_id: {
					equals: studentId,
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

		const grades = await this.db.grades.findMany({
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

		const totalItems = await this.db.grades.count({
			where: whereClause,
		});

		return {
			rows: grades.map((grade) => toDto(grade)),
			count: totalItems,
		};
	}

	async getGradeByAssignmentId(assignmentId: string) {
		return this.db.grades.findFirst({
			where: {
				assignment_id: assignmentId,
			},
		});
	}
}

function toDto(data: GradeEntity): GradeDTO {
	const obj: GradeDTO = {
		assignmentId: data.assignment_id,
		teacherId: data.teacher_id,
		grade: data.grade,
		feedback: data.feedback,
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

export default GradeRepository;
