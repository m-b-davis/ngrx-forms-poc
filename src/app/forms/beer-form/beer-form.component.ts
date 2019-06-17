import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from './beer-form.reducer';
import { nextStep, prevStep } from 'src/app/store/navigation/navigation-reducer';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerFormComponent {
  formState$ = this.store.pipe(select(s => s.beer.formState));
  searchResults$ = this.store.pipe(select(s => s.beer.searchResults));

  isValid$ = this.store.pipe(
    select(s => s.beer.formState),
    select(f => f.isValid && f.isTouched)
  );

  constructor(private store: Store<State>) { }

  submit() {
    this.store.dispatch(nextStep());
  }

  back() {
    this.store.dispatch(prevStep());
  }
}
