import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const router = Router();
const appointmentsController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

router.use(ensureAuthenticated);

router.post('/', appointmentsController.create);
router.get('/me', providerAppointmentsController.index);

export default router;
