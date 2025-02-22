import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getUsersofsidebar,getMessagesBetweenTwoUsers } from '../controllers/MessageController.js';

const messageRoute = express.Router();

messageRoute.get('/users', protect, getUsersofsidebar);
messageRoute.get('/messagesBetweenTwoUsers/:id', protect, getMessagesBetweenTwoUsers);






export default messageRoute;