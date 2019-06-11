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

// Types
export { AddressForm, PersonForm };

export const Forms = {
    Person: PersonFormComponent,
    Address: AddressFormComponent,
};

export const Updaters = {
    Person: PersonStateUpdater,
    Address: AddressStateUpdater,
};

export const InitialState = {
    Person: PersonFormInitialState,
    Address: AddressFormInitialState,
};
