import { UserRepository } from '../../../domain/repositories/UserRespository';
import { UserGetterById } from '../../../domain/services/UserGetterById';
import { User } from '../../../domain/entities/User';

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository;
  private readonly _userGetterById: UserGetterById;

  constructor(userRespository: UserRepository) {
    this._userRepository = userRespository;
    this._userGetterById = new UserGetterById(userRespository);
  }

  async run(data: User): Promise<User> {
    const user = await this._userGetterById.run(data.id);

    const dataToUpdate: User = {
      age: data.age ?? user.age,
      name: data.name ?? user.name,
      id: data.id,
      username: data.username ?? user.username
    };

    const userUpdated: User = await this._userRepository.update(dataToUpdate);
    return userUpdated;
  }
}
