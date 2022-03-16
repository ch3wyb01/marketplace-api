import { HttpStatus } from '@nestjs/common';

export class Exception {
  public statusCode: HttpStatus;
  public type: string;
  public errors: string | object;

  constructor(statusCode: HttpStatus, type: string, errors: string | object) {
    this.statusCode = statusCode;
    this.type = type;
    this.errors = errors;
  }
}
