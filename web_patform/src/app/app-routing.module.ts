import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './map-view/map-view.module#MapViewModule' },
  { path: 'graph', loadChildren: './graph-view/graph-view.moddule#GraphViewModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
