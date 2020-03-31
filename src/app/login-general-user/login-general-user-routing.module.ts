import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGeneralUserPage } from './login-general-user.page';

const routes: Routes = [
  {
    path: '',
    component: LoginGeneralUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginGeneralUserPageRoutingModule {}
