import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const router = Router();
const appointmentsController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

router.use(ensureAuthenticated);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      datetime: Joi.date(),
    },
  }),
  appointmentsController.create,
);
router.get('/me', providerAppointmentsController.index);

export default router;
