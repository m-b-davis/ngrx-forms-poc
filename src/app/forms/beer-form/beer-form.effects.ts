import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import {
  ClearAsyncErrorAction,
  SetAsyncErrorAction,
  StartAsyncValidationAction,
} from 'ngrx-forms';
import { Observable, timer } from 'rxjs';
import { catchError, concat, distinct, filter, flatMap, map, switchMap } from 'rxjs/operators';

import { SetSearchResultAction, State } from './beer-form.reducer';

const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_TIME = 300;

@Injectable()
export class BeerFormEffects {

  @Effect()
  searchBeers$: Observable<Action> = this.store.pipe(
    select(s => s.beer.formState),
    filter(fs => !!fs.value.searchTerm
      && fs.value.searchTerm.length >= MIN_SEARCH_LENGTH
      && fs.controls.numberOfResultsToShow.isValid
    ),
    distinct(fs => fs.value),
    switchMap(fs =>
      timer(DEBOUNCE_TIME).pipe(
        map(() => new StartAsyncValidationAction(
          fs.controls.searchTerm.id,
          'exists',
        )),
        concat(
          this.httpClient.get(
            `https://api.punkapi.com/v2/beers`,
            {
              params: {
                beer_name: fs.value.searchTerm,
                per_page: `${fs.value.numberOfResultsToShow}`,
              },
            }
          ).pipe(
            flatMap((beers: any) => {
              if (beers.length > 0) {
                return [
                  new SetSearchResultAction(
                    beers.map((i: PunkAPIResult) => i.name),
                  ),
                  new ClearAsyncErrorAction(
                    fs.controls.searchTerm.id,
                    'exists',
                  ),
                ] as Action[];
              }

              return [
                new SetSearchResultAction([]),
                new SetAsyncErrorAction(
                  fs.controls.searchTerm.id,
                  'exists',
                  fs.value.searchTerm,
                ),
              ];
            }),
            catchError(_ => [
              new SetSearchResultAction([]),
              new SetAsyncErrorAction(
                fs.controls.searchTerm.id,
                'exists',
                fs.value.searchTerm,
              ),
            ]),
          )
        ),
      )
    )
  );

  constructor(private store: Store<State>, private httpClient: HttpClient) { }
}
