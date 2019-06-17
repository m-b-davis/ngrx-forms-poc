import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';

import { BeerForm, State } from './beer-form.reducer';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerFormComponent {
  formState$: Observable<FormGroupState<BeerForm>>;
  searchResults$: Observable<string[]>;

  constructor(store: Store<State>) {
    this.formState$ = store.pipe(select(s => s.beer.formState));
    this.searchResults$ = store.pipe(select(s => s.beer.searchResults));
  }
}
