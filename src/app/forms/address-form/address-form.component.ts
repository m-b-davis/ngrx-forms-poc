import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootAppState } from 'src/app/store/rootReducer';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./../../app.component.scss'],
})
export class AddressFormComponent {
  addressForm$ = this.store.pipe(
    select(state => state.forms.controls.address),
  );

  constructor(private store: Store<RootAppState>) { }
}
