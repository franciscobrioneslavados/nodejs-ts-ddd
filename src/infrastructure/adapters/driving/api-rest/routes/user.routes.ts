import { Router } from 'express';

import {
  getAllUsersController,
  deleteUserController,
  updateUserController,
  createUserController,
} from '../controllers/index';

const route = Router();

route.delete('/:id', deleteUserController);
route.put('/:id', updateUserController);
route.get('', getAllUsersController);
route.post('', createUserController);

export default route;
