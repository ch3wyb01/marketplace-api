import { Error as MongoError } from 'mongoose';
import { MongoErrors } from './mongoErrors';

const castHandler = (exception: MongoError.CastError): MongoErrors => {
  const errors: MongoErrors = {};

  if (exception.message.includes('Product')) {
    errors.product = 'Invalid Product ID';
  }
  if (exception.message.includes('Category')) {
    errors.category = 'Invalid Category ID';
  }

  return errors;
};

const validationHandler = (
  exception: MongoError.ValidationError,
): MongoErrors => {
  const errors: MongoErrors = {};

  const property = Object.keys(exception.errors)[0];
  const index = Object.keys(exception.errors)[0].slice(-1);

  if (property.includes('categories')) {
    errors.categories = `Invalid Category ID at index ${index}`;
  }

  return errors;
};

export const MongoErrorMapper = (
  exception: MongoError.CastError | MongoError.ValidationError,
): MongoErrors => {
  let errors: MongoErrors = {};
  
  if (exception instanceof MongoError.CastError) {
    errors = castHandler(exception);
  } else if (exception instanceof MongoError.ValidationError) {
    errors = validationHandler(exception);
  }

  return errors;
};
