import { User } from '../../../../domain/entities/User';
import { UserCreatorUseCase } from '../../../../application/usecases/UserCreator';
import { UserGetterUseCase } from '../../../../application/usecases/UserGetter';
import { InMemoryUserRepository } from '../../../implementations/inMemory/inMemoryUserRepository';
import { UserUpdaterUseCase } from '../../../../application/usecases/UserUpdater';
import { UserDeleterUseCase } from '../../../../application/usecases/UserDeleter';

(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository();

  // Creating users
  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepo);
  const userToCreate: User = {
    name: 'Luciana',
    age: 12,
    username: 'luciana24',
    id: '1'
  };
  await userCreatorUseCase.run(userToCreate);

  // Getting All Users
  const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepo);
  const users = await userGetterUseCase.run();
  console.log(users);

  // Update User
  const userUpdateUseCase = new UserUpdaterUseCase(inMemoryUserRepo);
  await userUpdateUseCase.run({
    id: '1',
    username: 'luci'
  });
  const userUpdated = await userGetterUseCase.run();
  console.log(userUpdated);

  // Delete User
  const userDeleterUseCase = new UserDeleterUseCase(inMemoryUserRepo)
  await userDeleterUseCase.run('1')
  const userDeleted = await userGetterUseCase.run();
  console.log(userDeleted);
})();
