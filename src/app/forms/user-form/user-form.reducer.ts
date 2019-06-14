import { minLength, required, requiredTrue } from 'ngrx-forms/validation';
import { updateGroup, validate, createFormStateReducerWithUpdate, ValidationErrors, disable, enable, StateUpdateFns } from 'ngrx-forms';

// @ts-ignore
declare module 'ngrx-forms/src/state' {
  export interface ValidationErrors {
    emailShouldMatch?: EmailValue;
  }
}

export interface EmailValue {
  email: string;
  confirmEmail: string;
}

export interface UserForm {
  email: EmailValue;
}


export const initialState: UserForm = {
  email: {
    email: '',
    confirmEmail: '',
  }
};

function validateEmailsMatch(value: EmailValue): ValidationErrors {
  if (value.email === value.confirmEmail) {
    return {};
  }

  return {
    emailShouldMatch: value,
  };
}

const includesString = (subString: string, errorKey: string) => (input: string) => input.includes(subString) ? {} : { [errorKey]: true };
const validEmail = includesString('@', 'emailInvalid');

export const validateAndUpdateFormState = updateGroup<UserForm>({
  email: state => {
    state = enable(state);
    state = validate(state, validateEmailsMatch);
    return updateGroup<EmailValue>(state, {
      email: validate(required, validEmail),
    });
  },
});

export default createFormStateReducerWithUpdate<UserForm>(validateAndUpdateFormState);
