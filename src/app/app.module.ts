import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, OnInit } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgrxFormsModule, Actions } from 'ngrx-forms';
import { rootReducer, initialState, RootAppState } from './store/rootReducer';
import { StoreModule, ActionReducer, Action, MetaReducer, Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Forms } from './forms';
import { MaterialModule } from './material';
import { storeLogger } from 'ngrx-store-logger';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { EffectsModule } from '@ngrx/effects';
import { NavigationEffects } from './store/navigation/navigation-effects';
import { SuccessPageComponent } from './pages/success-page/success-page.component';

import { removeNgStyles, createInputTransfer } from '@angularclass/hmr';
import { take } from 'rxjs/operators';
import { forceHMRUiReload } from './store/navigation/navigation-reducer';

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any) => {
    if (action.type === 'SET_ROOT_STATE') {
      console.log(action.payload);
      return action.payload;
    }
    return reducer(state, action);
  };
}

export const DEV_MODE = true;

export const metaReducers = [
  ...(DEV_MODE ? [logger] : []),
  stateSetter
];

export function logger(reducer: ActionReducer<RootAppState>): any {
  return storeLogger()(reducer);
}

@NgModule({
  declarations: [
    AppComponent,
    Forms.Person,
    Forms.User,
    Forms.Address,
    SuccessPageComponent,
    StartPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgrxFormsModule,
    StoreModule.forRoot(rootReducer, {
      metaReducers,
      initialState,
    }),
    EffectsModule.forRoot([NavigationEffects]),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, private store: Store<any>) { }

  createNewHosts(cmps) {
    const components = Array.prototype.map.call(cmps, componentNode => {
      const newNode = document.createElement(componentNode.tagName);
      const currentDisplay = newNode.style.display;
      newNode.style.display = 'none';

      if (!!componentNode.parentNode) {
        const parentNode = componentNode.parentNode;
        parentNode.insertBefore(newNode, componentNode);
        return function removeOldHost() {
          newNode.style.display = currentDisplay;
          try {
            parentNode.removeChild(componentNode);
          } catch { }
        };
      } else {
        return () => { };
      }
    });
    return function removeOldHosts() {
      components.forEach(removeOldHost => removeOldHost());
    };
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this.store.pipe(take(1)).subscribe(s => store.rootState = s);
    store.disposeOldHosts = this.createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

  hmrOnInit(store) {
    if (!store || !store.rootState) {
      return;
    }
    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this.store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }

    setTimeout(() => { this.store.dispatch(forceHMRUiReload()); }, 100);


    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    Object.keys(store).forEach(prop => delete store[prop]);
  }
}
