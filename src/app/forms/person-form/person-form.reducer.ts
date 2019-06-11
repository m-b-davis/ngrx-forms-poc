import { required, greaterThanOrEqualTo } from 'ngrx-forms/validation';
import { updateGroup, validate, createFormStateReducerWithUpdate } from 'ngrx-forms';

export interface PersonForm {
  firstName: string;
  lastName: string;
  age: number;
}

export const initialState = {
  firstName: '',
  lastName: '',
  age: null,
};

export const validateAndUpdateFormState = updateGroup<PersonForm>({
  firstName: validate(required),
  lastName: validate(required),
  age: validate([
    required,
    greaterThanOrEqualTo(18),
  ]),
});

export default createFormStateReducerWithUpdate<PersonForm>(validateAndUpdateFormState);
