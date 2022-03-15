import { ValidationError, ValidationPipeOptions } from '@nestjs/common';
import { ClassValidatorException } from './ClassValidatorException';

export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  exceptionFactory: (errors: ValidationError[]) =>
    new ClassValidatorException(errors),
};
