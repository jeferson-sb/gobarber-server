import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserSerivce';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = container.resolve(CreateUserService);
  const user = await createUser.execute({ name, email, password });
  delete user.password;

  return res.status(201).json(user);
});

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });
    delete user.password;

    return res.json(user);
  },
);

export default router;
