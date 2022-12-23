import { UserNotFoundException } from '../../../domain/exceptions/UserNotFoundException';
import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRespository';

export class UserGetterById {
  private readonly _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async run(id: string): Promise<User> {
    const user = await this._userRepository.getById(id);

    if (user === null) throw new UserNotFoundException()

    return user;
  }
}
