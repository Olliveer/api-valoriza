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
router.get('/tags', tagsController.index);
router.post('/login', usersController.authenticate);
router.post('/compliment', isAuth, complimentController.create);
router.get('/compliments/send', isAuth, complimentController.listComplimentsByUser);
router.get('/compliments/receive', isAuth, complimentController.listReceiveComplimentsByUser);

export { router };
