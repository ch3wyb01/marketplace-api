import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ClassValidatorException } from './validation/ClassValidatorException';
import { Response } from 'express';
import { Error } from 'mongoose';
import MongoError = Error.CastError;

@Catch(ClassValidatorException, MongoError)
export class CustomExceptionHandler implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    let formattedException;
    if (exception instanceof ClassValidatorException) {
      formattedException = this.handleClassValidatorException(exception);
    } else if (exception instanceof MongoError) {
      formattedException = this.handleMongoException(exception);
    }

    response.status(status).json({
      statusCode: status,
      message: formattedException.errors,
    });
  }

  public handleClassValidatorException(exception: ClassValidatorException) {
    const { formattedErrors: errors } = exception;
    return { errors };
  }

  public handleMongoException(exception: MongoError) {
    if (exception.message.includes('Product')) {
      return { errors: 'Invalid Product ID' };
    }
  }
}
