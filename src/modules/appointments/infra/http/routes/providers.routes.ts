import { Router } from 'express';

import ProviderController from '../controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const router = Router();
const providersController = new ProviderController();

router.use(ensureAuthenticated);

router.get('/', providersController.index);

export default router;
