import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';
import { HttpClientModule } from '@angular/common/http';

import { BeerFormComponent } from './beer-form.component';
import { BeerFormEffects } from './beer-form.effects';
import reducer from './beer-form.reducer';

@NgModule({
  imports: [
    CommonModule,
    NgrxFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: BeerFormComponent },
    ]),
    StoreModule.forFeature('beer', reducer),
    EffectsModule.forFeature([BeerFormEffects]),
  ],
  declarations: [
    BeerFormComponent,
  ],
  exports: [
    BeerFormComponent,
  ]
})
export class BeerFormModule { }
