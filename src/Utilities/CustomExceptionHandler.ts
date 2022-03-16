import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  ValidationError,
} from '@nestjs/common';
import { ClassValidatorException } from './validation/ClassValidatorException';
import { Response } from 'express';

@Catch(ClassValidatorException)
export class CustomExceptionHandler implements ExceptionFilter {
  catch(exception: ClassValidatorException, host: ArgumentsHost) {
    const { formattedErrors } = exception;
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: formattedErrors,
    });
  }
}
