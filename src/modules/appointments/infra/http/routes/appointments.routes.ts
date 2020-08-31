import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const router = Router();
const appointmentsController = new AppointmentController();

router.use(ensureAuthenticated);

router.get('/', async (req, res) => {});

router.post('/', appointmentsController.create);

export default router;
