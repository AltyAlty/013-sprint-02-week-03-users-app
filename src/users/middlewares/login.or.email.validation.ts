import { body } from 'express-validator';

export const loginOrEmailValidation = body('loginOrEmail')
  .isString()
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage('loginOrEmail is too short or too long');
