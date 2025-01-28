
import express from 'express';
import authController from '../controllers/auth-controller.js';
import signupSchema from '../validators/auth-validator.js';
import validate from'../middleware/validate-middleware.js';





const router = express.Router();

router.get('/login',authController.home);
router.post('/register',validate(signupSchema), authController.register); 

router.post('/login',authController.login);

export default router;

