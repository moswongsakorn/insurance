import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyInputCalculatePage } from './policy-input-calculate.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyInputCalculatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyInputCalculatePageRoutingModule {}
