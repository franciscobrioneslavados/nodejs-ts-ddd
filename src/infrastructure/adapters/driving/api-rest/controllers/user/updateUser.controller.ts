import { NextFunction, Request, Response } from 'express';
import { DynamoDBUserRepository } from '../../../../../../infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository';
import { UserUpdaterUseCase } from '../../../../../../application/usecases/UserUpdater';
import { User } from '../../../../../../domain/entities/User';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { name, username, age } = req.body;

  const userId = req.params.userId;

  const dynamoDBUserRepo = new DynamoDBUserRepository();
  const userUpdatedUseCase = new UserUpdaterUseCase(dynamoDBUserRepo);

  try {
    const userToUpdate: User = {
      age,
      id: userId,
      name,
      username,
    };
    const user = await userUpdatedUseCase.run(userToUpdate);
    res.json(user);
    return;
  } catch (e) {
    return next(e);
  }
};
