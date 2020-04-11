import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPolicyProtectionGeneralUserPage } from './edit-policy-protection-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: EditPolicyProtectionGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPolicyProtectionGeneralUserPageRoutingModule {}
