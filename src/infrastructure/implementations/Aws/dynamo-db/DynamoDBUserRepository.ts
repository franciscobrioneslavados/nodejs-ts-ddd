import { DynamoDB } from '../../../adapters/driven/AWS/dynamo-db';
import { User } from '../../../../domain/entities/User';
import { UserRepository } from '../../../../domain/repositories/UserRespository';

export class DynamoDBUserRepository implements UserRepository {
  private readonly _db = DynamoDB.getInstance();
  async getAll(): Promise<User[]> {
    const response = await this._db
      .scan({
        TableName: DynamoDB.TABLE_NAME,
        FilterExpression: 'ENTITY_TYPE = :entity',
        ExpressionAttributeValues: {
          ':entity': {
            S: 'USER',
          },
        },
      })
      .promise();

    const items = response.Items != null ? response.Items : [];

    const users = items.map((item: any) => {
      const age: string = item.age.N ?? ''
      const id: string = item['TUTO-DATA-FAKER_PK'].S ?? ''
      const name: string = item.name.S ?? ''
      const username: string = item.username.S ?? ''
      
      return {
        age: Number(age),
        id: id.split('_')[1],
        name,
        username,
      };
    });
    return users;
  }

  async save(user: User): Promise<User> {
    await this._db
      .putItem({
        TableName: DynamoDB.TABLE_NAME,
        Item: {
          'TUTO-DATA-FAKER_PK': {
            S: `USER_${user.id}`,
          },
          'TUTO-DATA-FAKER_SK': {
            S: `USER_${user.id}`,
          },
          ENTITY_TYPE: {
            S: 'USER',
          },
          username: {
            S: user.username,
          },
          name: {
            S: user.name,
          },
          age: {
            N: `${user.age!}`,
          },
        },
      })
      .promise();
    return user;
  }

  async getByUserName(username: string): Promise<User | null> {
    const response = await this._db
      .scan({
        TableName: DynamoDB.TABLE_NAME,
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {
          ':username': {
            S: username,
          },
        },
      })
      .promise();

    const item = response.Items !== undefined ? response.Items[0] : undefined;

    if (item === undefined) return null;

    const age: string = item.age.N ?? '';
    const id: string = item['TUTO-DATA-FAKER_PK'].S ?? '';
    const name: string = item.name.S ?? '';
    const usernameItem: string = item.username.S ?? '';

    const user: User = {
      age: Number(age),
      id: id.split('_')[1],
      name,
      username: usernameItem,
    };

    return user;
  }

  async update(user: User): Promise<User> {
    await this._db
      .updateItem({
        TableName: DynamoDB.TABLE_NAME,
        Key: {
          'TUTO-DATA-FAKER_PK': {
            S: `USER_${user.id}`,
          },
          'TUTO-DATA-FAKER_SK': {
            S: `USER_${user.id}`,
          },
        },
        UpdateExpression: 'set #username = :username, #name = :name, #age = :age',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#username': 'username',
          '#age': 'age'
        },
        ExpressionAttributeValues: {
          ':username': {
            S: user.username,
          },
          ':name': {
            S: user.name,
          },
          ':age': {
            N: `${user.age!}`,
          },
        },
      })
      .promise();
    return user;
  }

  async delete(user: User): Promise<void> {
    await this._db
      .deleteItem({
        TableName: DynamoDB.TABLE_NAME,
        Key: {
          'TUTO-DATA-FAKER_PK': {
            S: `USER_${user.id}`,
          },
          'TUTO-DATA-FAKER_SK': {
            S: `USER_${user.id}`,
          },
        },
      })
      .promise();
  }

  async getById(id: string): Promise<User | null> {
    const response = await this._db
      .scan({
        TableName: DynamoDB.TABLE_NAME,
        FilterExpression: '#pk = :pk',
        ExpressionAttributeNames: {
          '#pk': 'TUTO-DATA-FAKER_PK',
        },
        ExpressionAttributeValues: {
          ':pk': {
            S: `USER_${id}`,
          },
        },
      })
      .promise();

    const item = response.Items !== undefined ? response.Items[0] : undefined;

    if (item === undefined) return null;

    const age: string = item.age.N ?? '';
    const idItem: string = item['TUTO-DATA-FAKER_PK'].S ?? '';
    const name: string = item.name.S ?? '';
    const usernameItem: string = item.username.S ?? '';

    const user: User = {
      age: Number(age),
      id: idItem.split('_')[1],
      name,
      username: usernameItem,
    };
    return user;
  }
}
