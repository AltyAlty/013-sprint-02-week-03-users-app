import { NextFunction, Request, Response } from 'express';
import { FieldValidationError, ValidationError, validationResult } from 'express-validator';

export const inputValidation = (req: Request, res: Response, next: NextFunction) => {
  const errorFormatter = (error: ValidationError) => {
    const expressError = error as unknown as FieldValidationError;
    return { message: expressError.msg, field: expressError.path };
  };

  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) return res.status(400).send({ errorsMessages: result.array({ onlyFirstError: true }) });
  return next();
};
