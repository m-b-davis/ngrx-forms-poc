import { InitialState, Updaters, PersonForm, AddressForm } from '../forms';
import navigationReducer, { initialState as navigationInitialState } from './navigation/navigation-reducer';
import { createFormGroupState, createFormStateReducerWithUpdate, updateGroup } from 'ngrx-forms';

export const initialState = {
  forms: createFormGroupState('forms', {
    person: InitialState.Person,
    address: InitialState.Address,
    user: InitialState.User,
  }),
  navigation: navigationInitialState,
};

const formReducer = createFormStateReducerWithUpdate(
  updateGroup({
    person: Updaters.Person,
    address: Updaters.Address,
    user: Updaters.User,
  }));

export const rootReducer = {
  forms: formReducer,
  navigation: navigationReducer,
};

export type RootAppState = typeof initialState;

export interface RootFormState {
  person: PersonForm;
  address: AddressForm;
}
