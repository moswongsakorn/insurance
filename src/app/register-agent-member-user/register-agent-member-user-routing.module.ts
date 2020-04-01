import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterAgentMemberUserPage } from './register-agent-member-user.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterAgentMemberUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterAgentMemberUserPageRoutingModule {}
