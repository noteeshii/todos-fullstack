const Router = require('express').Router;
const UserController = require('../controllers/UserController.js');
const TaskController = require('../controllers/TaskController.js');
const AuthMiddleware = require('../middlewares/AuthMiddleware.js');
const {body} = require('express-validator');


const router = new Router();

router.post('/registration',
    body('login').isLength({min:4}),
    body('password').isLength({min:4}),
    UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

router.post('/tasks', AuthMiddleware, TaskController.createTask); //Создать задачу
router.get('/tasks', AuthMiddleware, TaskController.getTasks); //Список задач
router.post('/tasks/update-status', AuthMiddleware, TaskController.updateTaskStatus); //Список задач


router.get('/users', AuthMiddleware,UserController.getUsers);

module.exports = router;