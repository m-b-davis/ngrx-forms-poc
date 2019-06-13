import { minLength } from 'ngrx-forms/validation';
import { updateGroup, validate, createFormStateReducerWithUpdate } from 'ngrx-forms';

export interface FieldsShouldMatchValidationError {
  fieldId?: string;
}

// @ts-ignore
declare module 'ngrx-forms/src/state' {
  export interface ValidationErrors {
    fieldsShouldMatch?: FieldsShouldMatchValidationError;
  }
}

export interface AddressForm {
  houseName: string;
  line1: string;
  line2: string;
  postcode: string;
}

export const initialState = {
  houseName: '',
  line1: '',
  line2: '',
  postcode: '',
};

const validateAddressLine = validate<string>(minLength(5));

export const validateAndUpdateFormState = updateGroup<AddressForm>({
  houseName: validate(minLength(1)),
  line1: validateAddressLine,
  line2: validateAddressLine,
  postcode: validateAddressLine,
});

export default createFormStateReducerWithUpdate<AddressForm>(validateAndUpdateFormState);
