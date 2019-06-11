import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Forms } from './forms';

const routes: Routes = [
  { path: 'person', component: Forms.Person },
  { path: 'address', component: Forms.Address },
  { path: '', redirectTo: '/person', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
