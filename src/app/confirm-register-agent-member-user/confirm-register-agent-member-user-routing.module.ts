import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmRegisterAgentMemberUserPage } from './confirm-register-agent-member-user.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmRegisterAgentMemberUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmRegisterAgentMemberUserPageRoutingModule {}
