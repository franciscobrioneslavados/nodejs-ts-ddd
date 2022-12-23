import { UserAlreadyExistsException } from '../../../../../domain/exceptions/UserAlreadyExistsException';
import { UserNotFoundException } from '../../../../../domain/exceptions/UserNotFoundException';
import { Request, Response, NextFunction, Router } from 'express';
import userRoutes from './user.routes';

const route = Router();

route.use('/users', userRoutes);

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserAlreadyExistsException) {
    res.status(400).json({
      message: 'user exists',
    });
  } else if (err instanceof UserNotFoundException) {
    res.status(400).json({
      message: 'users doesnt exists',
    });
  } else {
    next(err);
  }
});
route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.json({
    error: err,
  });
});

export default route;
