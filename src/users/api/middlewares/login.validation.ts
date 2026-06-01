import { body } from 'express-validator';
import { usersRepository } from '../../infrastructure/user.repository';

export const loginValidation = body('login')
  .isString()
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage('login is too short or too long')
  .custom(async (login: string) => {
    const user = await usersRepository.findByLoginOrEmail(login);
    if (user) throw new Error('login already exists');
    return true;
  });
