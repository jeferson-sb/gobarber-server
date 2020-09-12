import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsControler from '../controllers/SessionsController';

const router = Router();

const sessionsController = new SessionsControler();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default router;
