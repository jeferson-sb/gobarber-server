import { Router } from 'express';

import ProviderController from '../controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const router = Router();
const providersController = new ProviderController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

router.use(ensureAuthenticated);

router.get('/', providersController.index);
router.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
router.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default router;
