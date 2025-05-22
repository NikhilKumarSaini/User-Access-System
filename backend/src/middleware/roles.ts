import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const requireRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;
        
        if (!userRole) {
            return res.status(401).json({ message: 'Unauthorized - No role found' });
        }
        
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ 
                message: `Forbidden - Requires ${allowedRoles.join(' or ')} role`
            });
        }
        
        next();
    };
};