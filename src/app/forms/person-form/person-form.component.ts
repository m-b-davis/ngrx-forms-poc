import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootAppState } from 'src/app/store/rootReducer';
import { selectForm, selectIsValid } from '../form-selectors';
import { nextStep, prevStep } from 'src/app/store/navigation/navigation-reducer';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./../../app.component.scss'],
})
export class PersonFormComponent {
  form$ = this.store.pipe(
    selectForm('person')
  );

  isValid$ = this.store.pipe(
    selectForm('person'),
    selectIsValid(),
  );

  constructor(private store: Store<RootAppState>) { }

  back() {
    this.store.dispatch(prevStep());
  }

  submit() {
    this.store.dispatch(nextStep());
  }
}
