import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootAppState } from 'src/app/store/root-reducer';
import { nextStep, prevStep } from 'src/app/store/navigation/navigation-reducer';
import { selectForm, selectIsValid } from '../form-selectors';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./../../app.component.scss'],
})
export class AddressFormComponent {
  form$ = this.store.pipe(
    selectForm('address'),
  );

  isValid$ = this.store.pipe(
    selectForm('address'),
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
