import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPolicyRepayGeneralUserPage } from './add-policy-repay-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: AddPolicyRepayGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPolicyRepayGeneralUserPageRoutingModule {}
