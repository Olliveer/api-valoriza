import { Router } from 'express';
import { TagsController } from './controllers/TagsController';
import { UsersController } from './controllers/UsersController';
import { isAdmin } from './middlewares/isAdmin';

const router = Router();
const usersController = new UsersController();
const tagsController = new TagsController();

router.post('/users', usersController.create);
router.post('/tags', isAdmin, tagsController.create);

export { router };
