import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyDetailCalculatePage } from './policy-detail-calculate.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyDetailCalculatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyDetailCalculatePageRoutingModule {}
