import { v4 as uuid } from 'uuid';
import { UserCreatorUseCase } from '../../../../../../application/usecases/UserCreator';
import { Request, Response, NextFunction } from 'express';
import { DynamoDBUserRepository } from '../../../../../../infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository';
import { User } from '../../../../../../domain/entities/User';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { username, age, name } = req.body;

  const dynamoDBUserRepo = new DynamoDBUserRepository();
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo);

  const userToCreate: User = {
    id: uuid(),
    name,
    username,
    age,
  };

  try {
    const userCreated = await userCreatorUseCase.run(userToCreate);
    res.json(userCreated);
    return;
  } catch (error) {
    return next(error);
  }
};
