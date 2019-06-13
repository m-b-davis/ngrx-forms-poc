import { PersonForm, AddressForm } from '../forms';
import navigationReducer, { initialState as navigationInitialState } from './navigation/navigation-reducer';
import { createRootFormsReducer, initialFormsState } from './root-forms-reducer';

export const initialState = {
  forms: initialFormsState,
  navigation: navigationInitialState,
};

export const rootReducer = {
  forms: createRootFormsReducer,
  navigation: navigationReducer,
};

export type RootAppState = typeof initialState;

export interface RootFormState {
  person: PersonForm;
  address: AddressForm;
}
