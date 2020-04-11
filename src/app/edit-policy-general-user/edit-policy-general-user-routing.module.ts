import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPolicyGeneralUserPage } from './edit-policy-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditPolicyGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPolicyGeneralUserPageRoutingModule {}
