import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginMemberUserPage } from './login-member-user.page';

const routes: Routes = [
  {
    path: '',
    component: LoginMemberUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginMemberUserPageRoutingModule {}
