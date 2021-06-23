import { Router } from 'express';
import { TagsController } from './controllers/TagsController';
import { UsersController } from './controllers/UsersController';

const router = Router();
const usersController = new UsersController();
const tagsController = new TagsController();

router.post('/users', usersController.create);
router.post('/tags', tagsController.create);

export { router };
