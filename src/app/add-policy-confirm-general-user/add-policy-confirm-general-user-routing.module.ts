import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPolicyConfirmGeneralUserPage } from './add-policy-confirm-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: AddPolicyConfirmGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPolicyConfirmGeneralUserPageRoutingModule {}
