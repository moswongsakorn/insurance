import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPolicyRepayGeneralUserPage } from './edit-policy-repay-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditPolicyRepayGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPolicyRepayGeneralUserPageRoutingModule {}
