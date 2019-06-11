import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgrxFormsModule } from 'ngrx-forms';
import { rootReducer, initialState } from './store/rootReducer';
import { StoreModule } from '@ngrx/store';
import { Forms } from './forms';

const formComponents = Object.keys(Forms).map(name => Forms[name]);

@NgModule({
  declarations: [
    AppComponent,
    ...formComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgrxFormsModule,
    StoreModule.forRoot(rootReducer, { initialState }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
