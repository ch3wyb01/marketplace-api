import { ValidationError } from '@nestjs/common';

export class ClassValidatorException {
  formattedErrors: string[];
  constructor(errors: ValidationError[]) {
    this.formattedErrors = errors
      .map((error) => Object.values(error.constraints))
      .flat();
  }
}
