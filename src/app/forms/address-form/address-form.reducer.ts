import { required } from 'ngrx-forms/validation';
import { updateGroup, validate, createFormStateReducerWithUpdate } from 'ngrx-forms';

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

export const validateAndUpdateFormState = updateGroup<AddressForm>({
  houseName: validate(required),
  line1: validate(required),
  line2: validate(required),
  postcode: validate(required),
});

export default createFormStateReducerWithUpdate<AddressForm>(validateAndUpdateFormState);
