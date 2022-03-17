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
import { MongoErrorMapper } from './validation/mongoError.mapper';
import { MongoErrors } from './validation/mongoErrors';

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

    const errors: MongoErrors = MongoErrorMapper(exception);

    return new Exception(statusCode, 'Validation', errors);
  }

  public handleHttpException(exception: HttpException) {
    const statusCode: HttpStatus = exception.getStatus();

    return new Exception(statusCode, 'HTTP', exception.message);
  }
}
