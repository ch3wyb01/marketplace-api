import { ValidationError } from '@nestjs/common';

export class ClassValidatorException {
  formattedErrors: object;
  constructor(errors: ValidationError[]) {
    this.formattedErrors = errors.reduce((obj, error) => {
      const { property } = error;
      obj[property] = Object.values(error.constraints)[0];
      return obj;
    }, {});
  }
}
