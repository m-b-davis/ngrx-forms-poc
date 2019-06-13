import { PersonFormComponent } from './person-form/person-form.component';
import {
  validateAndUpdateFormState as PersonStateUpdater,
  PersonForm,
  initialState as PersonFormInitialState
} from './person-form/person-form.reducer';

import { AddressFormComponent } from './address-form/address-form.component';
import {
  validateAndUpdateFormState as AddressStateUpdater,
  AddressForm,
  initialState as AddressFormInitialState
} from './address-form/address-form.reducer';


import { UserFormComponent } from './user-form/user-form.component';
import {
  validateAndUpdateFormState as UserStateUpdater,
  UserForm,
  initialState as UserFormInitialState
} from './user-form/user-form.reducer';

// Types
export { AddressForm, PersonForm, UserForm };

export const Forms = {
    Person: PersonFormComponent,
    Address: AddressFormComponent,
    User: UserFormComponent,
};

export const Updaters = {
    Person: PersonStateUpdater,
    Address: AddressStateUpdater,
    User: UserStateUpdater,
};

export const InitialState = {
    Person: PersonFormInitialState,
    Address: AddressFormInitialState,
    User: UserFormInitialState,
};
