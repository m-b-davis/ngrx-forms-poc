import { RootAppState } from '../../store/root-reducer';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { nextStep } from 'src/app/store/navigation/navigation-reducer';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: []
})
export class StartPageComponent {

  constructor(private store: Store<RootAppState>) { }

  startJourney() {
    this.store.dispatch(nextStep());
  }
}
