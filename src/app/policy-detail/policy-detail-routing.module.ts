import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyDetailPage } from './policy-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyDetailPageRoutingModule {}
