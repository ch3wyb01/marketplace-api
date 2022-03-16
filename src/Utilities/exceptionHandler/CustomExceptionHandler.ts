import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClassValidatorException } from './validation/ClassValidatorException';
import { Response } from 'express';
import { Error } from 'mongoose';
import MongoError = Error.CastError;
import { Exception } from './Exception';

@Catch(ClassValidatorException, MongoError, HttpException)
export class CustomExceptionHandler implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let formattedException: Exception;
    if (exception instanceof ClassValidatorException) {
      formattedException = this.handleClassValidatorException(exception);
    } else if (exception instanceof MongoError) {
      formattedException = this.handleMongoException(exception);
    } else if (exception instanceof HttpException) {
      formattedException = this.handleHttpException(exception)
    }

    const { statusCode, type, errors } = formattedException;
    response.status(statusCode).json({
      statusCode,
      type,
      errors,
    });
  }

  public handleClassValidatorException(
    exception: ClassValidatorException,
  ): Exception {
    const statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
    const { formattedErrors: errors } = exception;

    return new Exception(statusCode, 'Validation', errors);
  }

  public handleMongoException(exception: MongoError) {
    const statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
    const errors: { product?: string } = {};

    if (exception.message.includes('Product')) {
      errors.product = 'Invalid Product ID';
    }
    return new Exception(statusCode, 'Validation', errors);
  }

  public handleHttpException(exception: HttpException) {
    const statusCode: HttpStatus = exception.getStatus();

    return new Exception(statusCode, 'HTTP', exception.message);
  }
}
