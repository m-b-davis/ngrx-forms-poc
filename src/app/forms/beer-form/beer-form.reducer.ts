import { Action, combineReducers } from '@ngrx/store';
import { createFormGroupState, createFormStateReducerWithUpdate, FormGroupState, updateGroup, validate } from 'ngrx-forms';
import { greaterThan, required } from 'ngrx-forms/validation';

export interface BeerForm {
  searchTerm: string;
  numberOfResultsToShow: number;
}

export interface State {
  beer: {
    formState: FormGroupState<BeerForm>;
    searchResults: string[];
  };
}

export class SetSearchResultAction implements Action {
  static readonly TYPE = 'beer/SET_SEARCH_RESULT';
  readonly type = SetSearchResultAction.TYPE;
  constructor(public results: string[]) { }
}

export const FORM_ID = 'beer';

export const INITIAL_STATE = createFormGroupState<BeerForm>(FORM_ID, {
  searchTerm: '',
  numberOfResultsToShow: 5,
});

const validateAndUpdateFormState = updateGroup<BeerForm>({
  searchTerm: validate(required),
  numberOfResultsToShow: validate(required, greaterThan(0)),
});

const formGroupReducerWithUpdate = createFormStateReducerWithUpdate<BeerForm>(
  validateAndUpdateFormState
);

export default combineReducers<State['beer']>({
  formState(s = INITIAL_STATE, a: Action) {
    return formGroupReducerWithUpdate(s, a);
  },
  searchResults(s: string[] = [], a: Action) {
    if (a.type === SetSearchResultAction.TYPE) {
      return (a as SetSearchResultAction).results;
    }

    return s;
  },
});

// export function reducer(s: State['beer'], a: Action) {
//   return reducers(s, a);
// }
