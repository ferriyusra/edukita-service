import { Response, NextFunction } from 'express';
import { IReqUser } from '../util/interface';
import response from '../util/response';

export default (roles: string[]) => {
	return (req: IReqUser, res: Response, next: NextFunction) => {
		const role = req.user?.role;
		if (!role || !roles.includes(role)) {
			return response.unauthorized(res, 'forbidden');
		}
		next();
	};
};
