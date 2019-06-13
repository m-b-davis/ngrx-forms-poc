import { RootAppState } from '../../store/rootReducer';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { selectForm } from 'src/app/forms/form-selectors';
import { prevStep, restartNavigation } from 'src/app/store/navigation/navigation-reducer';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: []
})
export class SuccessPageComponent {
  user$ = this.store.pipe(selectForm('user'));
  address$ = this.store.pipe(selectForm('address'));
  person$ = this.store.pipe(selectForm('person'));

  constructor(private store: Store<RootAppState>) { }


  back() {
    this.store.dispatch(prevStep());
  }

  restartJourney() {
    this.store.dispatch(restartNavigation());
  }
}
