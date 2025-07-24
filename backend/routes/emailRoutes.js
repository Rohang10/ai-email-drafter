import express from 'express';
import { draftAndSendEmail } from '../controllers/emailController.js';

const router = express.Router();
router.post('/draft', draftAndSendEmail);

export default router;
