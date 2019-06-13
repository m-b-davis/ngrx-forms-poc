import { createFormGroupState, createFormStateReducerWithUpdate, updateGroup } from 'ngrx-forms';
import { InitialState, Updaters } from '../forms';

export const initialFormsState = createFormGroupState('forms', {
  person: InitialState.Person,
  address: InitialState.Address,
  user: InitialState.User,
});

export const resetAllForms = () => ({
  type: RESET_ALL_FORMS,
});

export const RESET_ALL_FORMS = 'RESET_ALL_FORMS' as 'RESET_ALL_FORMS';

export const createRootFormsReducer = createFormStateReducerWithUpdate(
  updateGroup({
    person: Updaters.Person,
    address: Updaters.Address,
    user: Updaters.User,
  })
);

// export const createRootFormsReducer = (state = initialFormsState, action) => {
//     console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

//     let result;
//     if (action.type === RESET_ALL_FORMS) {
//       result = { ...initialFormsState };
//     }

//     return result;

//     console.log('baseReducer');

//     result = baseReducer(state, action);
//     console.log({ result });
//     return result;
//   };
