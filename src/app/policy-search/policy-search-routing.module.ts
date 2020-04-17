import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicySearchPage } from './policy-search.page';

const routes: Routes = [
  {
    path: '',
    component: PolicySearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicySearchPageRoutingModule {}
