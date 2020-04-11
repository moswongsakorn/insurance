import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPolicyConfirmGeneralUserPage } from './edit-policy-confirm-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditPolicyConfirmGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPolicyConfirmGeneralUserPageRoutingModule {}
