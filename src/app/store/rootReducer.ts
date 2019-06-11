import { InitialState, Updaters, PersonForm, AddressForm } from '../forms';
import { createFormGroupState, createFormStateReducerWithUpdate, updateGroup } from 'ngrx-forms';

export const initialState = {
  forms: createFormGroupState('forms', {
    person: InitialState.Person,
    address: InitialState.Address,
  }),
};

export const rootReducer = {
  forms: createFormStateReducerWithUpdate(
    updateGroup({
      person: Updaters.Person,
      address: Updaters.Address,
    })),
  };

export type RootAppState = typeof initialState;

export interface RootFormState {
  person: PersonForm;
  address: AddressForm;
}
