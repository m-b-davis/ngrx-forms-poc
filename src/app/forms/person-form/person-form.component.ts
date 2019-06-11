import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootAppState } from 'src/app/store/rootReducer';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./../../app.component.scss'],
})
export class PersonFormComponent {
  personForm$ = this.store.pipe(
    select(state => state.forms.controls.person),
  );

  constructor(private store: Store<RootAppState>) { }
}
