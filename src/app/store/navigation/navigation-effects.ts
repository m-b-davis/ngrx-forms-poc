import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { NavigationAction, NEXT_STEP, PREV_STEP, RESTART_NAVIGATION, SET_PAGE, setPage, pageSet } from './navigation-reducer';
import { Store } from '@ngrx/store';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { RootAppState } from '../root-reducer';
import { navigationGraph, ROOT_PAGE } from './navigation-graph';
import { RESET_ALL_FORMS } from '../root-forms-reducer';

@Injectable()
export class NavigationEffects {
  constructor(
    private actions$: Actions<NavigationAction>,
    private router: Router,
    private store: Store<RootAppState>
  ) { }

  /**
   * Observe NEXT_STEP actions and navigate to next page based
   * on the node.next property in navigationGraph
   */
  @Effect()
  navigateForwards$ = this.actions$.pipe(
    ofType(NEXT_STEP), // Select action type
    withLatestFrom(this.store), // Get store
    map(([, state]) => state), // Get store state
    map(state => [navigationGraph[state.navigation.pageId], state]), // Map to next node
    filter(([node]) => node && node.next), // Bail if no next page TODO - throw exception
    map(([{ next }, state]) => typeof next === 'function' ? next(state) : next), // Pass state to next if necessary
    map(route => setPage(route))
  );

  /**
   * Observe NEXT_STEP actions and dispatch navigation to page
   * based on the node.prev property in navigationGraph
   */
  @Effect()
  navigateBackwards$ = this.actions$.pipe(
    ofType(PREV_STEP), // Select action type
    withLatestFrom(this.store), // Get store
    map(([, state]) => state), // Get store state
    map(state => [navigationGraph[state.navigation.pageId], state]), // Map to next node
    filter(([node]) => node && node.prev), // Bail if no prev page TODO - throw exception
    map(([{ prev }, state]) => typeof prev === 'function' ? prev(state) : prev), // Pass state to next if necessary
    map(route => setPage(route)) // Navigate
  );

  /**
   * This effect is the only one which actually navigates
   * It picks up setPage actions and navigates via router
   */
  @Effect()
  setNavigation$ = this.actions$.pipe(
    ofType(SET_PAGE), // Select action type
    map(action => {
      const route = action.payload;
      this.router.navigate([route]);
      return pageSet(route);
    })
  );

  // @Effect()
  // resumeJourney$ = this.actions$.pipe(
  //   ofType('SET_ROOT_STATE'), // Select action type
  //   map((action: { payload: RootAppState }) => setPage(action.payload.navigation.pageId)) // Navigate to rehydrated pageId
  // );

  /**
   * Observe RESTART_NAVIGATE actions and navigate to prev page based
   * on the node.prev property in navigationGraph
   */
  @Effect()
  restartNavigation$ = this.actions$.pipe(
    ofType(RESTART_NAVIGATION, RESET_ALL_FORMS), // Select action type
    map(() => setPage(ROOT_PAGE)) // Navigate to route page
  );
}
