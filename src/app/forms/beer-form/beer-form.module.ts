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
import { SearchResultComponent } from './search-result/search-result.component';
import { HighlightPipe } from './search-result/hilight.pipe';

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
  SearchResultComponent,
    BeerFormComponent,
    HighlightPipe,
  ],
  exports: [
    BeerFormComponent,
    HighlightPipe,
  ]
})
export class BeerFormModule { }
