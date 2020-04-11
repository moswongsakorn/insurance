import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPolicyProtectionGeneralUserPage } from './add-policy-protection-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: AddPolicyProtectionGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPolicyProtectionGeneralUserPageRoutingModule {}
