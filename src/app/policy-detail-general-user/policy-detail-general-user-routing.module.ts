import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyDetailGeneralUserPage } from './policy-detail-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyDetailGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyDetailGeneralUserPageRoutingModule {}
