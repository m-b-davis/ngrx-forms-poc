import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { BeerFormComponent } from './beer-form.component';
import { BeerFormEffects } from './beer-form.effects';
import reducer from './beer-form.reducer';

@NgModule({
  imports: [
    CommonModule,
    NgrxFormsModule,
    RouterModule.forChild([
      { path: '', component: BeerFormComponent },
    ]),
    StoreModule.forFeature('asyncValidation', reducer),
    EffectsModule.forFeature([BeerFormEffects]),
  ],
  declarations: [
    BeerFormComponent,
  ],
})
export class AsyncValidationModule { }
