import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphViewComponent } from './graph-view.component';

import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GraphViewComponent],
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule.forChild([{ path: 'graph', component: GraphViewComponent }])
  ]
})
export class GraphViewModule { }
