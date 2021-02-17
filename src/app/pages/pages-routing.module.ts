import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestimentosComponent } from './investimentos/investimentos.component';
import { ResgateComponent } from './resgate/resgate.component';

const routes: Routes = [
  {
    path: 'investimentos',
    component: InvestimentosComponent,
    data: {
      title: 'Investimentos'
    }
  },
  {
    path: 'resgate',
    component: ResgateComponent,
    data: {
      title: 'Resgate'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
