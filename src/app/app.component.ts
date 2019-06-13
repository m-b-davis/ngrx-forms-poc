import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootAppState } from './store/root-reducer';
import { forceHMRUiReload } from './store/navigation/navigation-reducer';
import { DEV_MODE } from './app.module';
import { resetAllForms } from './store/root-forms-reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-forms-poc';

  constructor(private store: Store<RootAppState>) {}


  ngOnInit() {
    // This is a bit of a hack but seems to make HMR work with forms
    if (DEV_MODE) {
      setTimeout(() => { this.store.dispatch(forceHMRUiReload()); });
    }
  }

  resetAllForms() {
    this.store.dispatch(resetAllForms());
  }
}
