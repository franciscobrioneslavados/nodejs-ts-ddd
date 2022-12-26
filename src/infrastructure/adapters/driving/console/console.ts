import { User } from '../../../../domain/entities/User';
import { UserCreatorUseCase } from '../../../../application/usecases/UserCreator';
import { UserGetterUseCase } from '../../../../application/usecases/UserGetter';
// import { InMemoryUserRepository } from '../../../implementations/inMemory/inMemoryUserRepository';
import { DynamoDBUserRepository } from '../../../implementations/Aws/dynamo-db/DynamoDBUserRepository';
import { UserUpdaterUseCase } from '../../../../application/usecases/UserUpdater';
import { UserDeleterUseCase } from '../../../../application/usecases/UserDeleter';

(async () => {
  // const repository = new InMemoryUserRepository();
  const repository = new DynamoDBUserRepository();

  // Creating users
  const userCreatorUseCase = new UserCreatorUseCase(repository);
  const userToCreate: User = {
    name: 'Luciana2',
    age: 125,
    username: 'luciana243',
    id: '14',
  };
  await userCreatorUseCase.run(userToCreate);

  // Getting All Users
  const userGetterUseCase = new UserGetterUseCase(repository);
  const users = await userGetterUseCase.run();
  console.log(users);

  // Update User
  const userUpdateUseCase = new UserUpdaterUseCase(repository);
  await userUpdateUseCase.run({
    id: '1',
    username: 'luci',
  });
  const userUpdated = await userGetterUseCase.run();
  console.log(userUpdated);

  // Delete User
  const userDeleterUseCase = new UserDeleterUseCase(repository);
  await userDeleterUseCase.run('1');
  const userDeleted = await userGetterUseCase.run();
  console.log(userDeleted);
})();
