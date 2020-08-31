import { Router } from 'express';

import SessionsControler from '../controllers/SessionsController';

const router = Router();

const sessionsController = new SessionsControler();

router.post('/', sessionsController.create);

export default router;
