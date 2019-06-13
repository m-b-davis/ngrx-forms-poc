import { select } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { RootAppState } from '../store/root-reducer';

export function selectIsValid() {
  return select((form: FormGroupState<any>) => form.isValid && form.isTouched);
}

type Forms = RootAppState['forms']['controls'];
type FormID = keyof Forms;

export function selectForm<K extends FormID>(formId: K) {
  return select((state: RootAppState) => state.forms.controls[formId]);
}
