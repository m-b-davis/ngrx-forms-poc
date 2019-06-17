import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Forms } from './forms';
import { SuccessPageComponent } from './pages/success-page/success-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { BeerFormComponent } from './forms/beer-form/beer-form.component';

const routes: Routes = [
  { path: 'person', component: Forms.Person },
  { path: 'address', component: Forms.Address },
  { path: 'user', component: Forms.User },
  { path: 'success', component: SuccessPageComponent },
  { path: 'beer', component: BeerFormComponent },
  { path: '', component: StartPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
