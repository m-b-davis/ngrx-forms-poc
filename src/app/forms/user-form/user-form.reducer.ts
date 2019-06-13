import { minLength, required } from 'ngrx-forms/validation';
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

export interface UserForm {
  email: string;
  confirmEmail: string;
}

export const initialState = {
  email: '',
  confirmEmail: '',
};

export const validateAndUpdateFormState = updateGroup<UserForm>({
  email: validate(required),
  confirmEmail: validate(required),
});

export default createFormStateReducerWithUpdate<UserForm>(validateAndUpdateFormState);
