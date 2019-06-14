import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootAppState } from 'src/app/store/root-reducer';
import { nextStep, prevStep } from 'src/app/store/navigation/navigation-reducer';
import { selectForm, selectIsValid } from '../form-selectors';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./../../app.component.scss'],
})
export class UserFormComponent {
  form$ = this.store.pipe(
    selectForm('user'),
  );

  isValid$ = this.store.pipe(
    selectForm('user'),
    selectIsValid(),
  );

  constructor(private store: Store<RootAppState>) {
    this.form$.subscribe(state => {
      console.log({ state });
    });
  }

  submit() {
    this.store.dispatch(nextStep());
  }

  back() {
    this.store.dispatch(prevStep());
  }
}
