import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth-middleware';

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.user.role !== 'Администратор') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};

export const recruiterMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (!['Администратор', 'Рекрутер'].includes(req.user.role)) {
    return res.status(403).json({ 
      error: 'Recruiter or admin access required' 
    });
  }

  next();
};