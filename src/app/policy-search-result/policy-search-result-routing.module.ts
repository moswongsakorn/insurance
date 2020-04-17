import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicySearchResultPage } from './policy-search-result.page';

const routes: Routes = [
  {
    path: '',
    component: PolicySearchResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicySearchResultPageRoutingModule {}
