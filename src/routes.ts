import { Router } from 'express';
import { ComplimentsController } from './controllers/ComplimentsController';
import { TagsController } from './controllers/TagsController';
import { UsersController } from './controllers/UsersController';
import { isAdmin } from './middlewares/isAdmin';
import { isAuth } from './middlewares/isAuth';

const router = Router();
const usersController = new UsersController();
const tagsController = new TagsController();
const complimentController = new ComplimentsController();

router.post('/users', usersController.create);
router.post('/tags', isAuth, isAdmin, tagsController.create);
router.post('/login', usersController.authenticate);
router.post('/compliment', complimentController.create);

export { router };
