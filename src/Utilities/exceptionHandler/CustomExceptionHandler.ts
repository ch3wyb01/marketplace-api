import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClassValidatorException } from './validation/ClassValidatorException';
import { Response } from 'express';
import { Error as MongoError } from 'mongoose';
import { Exception } from './Exception';

@Catch(
  ClassValidatorException,
  MongoError.CastError,
  MongoError.ValidationError,
  HttpException,
)
export class CustomExceptionHandler implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let formattedException: Exception;
    if (exception instanceof ClassValidatorException) {
      formattedException = this.handleClassValidatorException(exception);
    } else if (
      exception instanceof MongoError.CastError ||
      exception instanceof MongoError.ValidationError
    ) {
      formattedException = this.handleMongoException(exception);
    } else if (exception instanceof HttpException) {
      formattedException = this.handleHttpException(exception);
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

  public handleMongoException(
    exception: MongoError.CastError | MongoError.ValidationError,
  ): Exception {
    const statusCode: HttpStatus = HttpStatus.BAD_REQUEST;

    let errors: { product?: string; category?: string } = {};

    if (exception instanceof MongoError.CastError) {
      errors = this.handleMongoCastException(exception);
    } else if (exception instanceof MongoError.ValidationError) {
      errors = this.handleMongoValidationException(exception);
    }

    return new Exception(statusCode, 'Validation', errors);
  }

  public handleMongoCastException(exception: MongoError.CastError) {
    const errors: { product?: string; category?: string } = {};

    if (exception.message.includes('Product')) {
      errors.product = 'Invalid Product ID';
    }
    if (exception.message.includes('Category')) {
      errors.category = 'Invalid Category ID';
    }

    return errors;
  }

  public handleMongoValidationException(exception: MongoError.ValidationError) {
    const errors: { product?: string; category?: string } = {};

    if (Object.keys(exception.errors)[0].includes('categories')) {
      errors.category = 'Invalid Category ID';
    }

    return errors;
  }

  public handleHttpException(exception: HttpException) {
    const statusCode: HttpStatus = exception.getStatus();

    return new Exception(statusCode, 'HTTP', exception.message);
  }
}
