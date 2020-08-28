import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const autheticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await autheticateUser.execute({ email, password });

  delete user.password;

  return res.json({ user, token });
});

export default router;
