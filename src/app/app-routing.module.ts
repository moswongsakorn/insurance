import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login-general-user',
    loadChildren: () => import('./login-general-user/login-general-user.module').then( m => m.LoginGeneralUserPageModule)
  },
  {
    path: 'register-general-user',
    loadChildren: () => import('./register-general-user/register-general-user.module').then( m => m.RegisterGeneralUserPageModule)
  },
  {
    path: 'confirm-register-general-user',
    loadChildren: () => import('./confirm-register-general-user/confirm-register-general-user.module').then( m => m.ConfirmRegisterGeneralUserPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'login-member-user',
    loadChildren: () => import('./login-member-user/login-member-user.module').then( m => m.LoginMemberUserPageModule)
  },
  {
    path: 'register-choice-member-user',
    loadChildren: () => import('./register-choice-member-user/register-choice-member-user.module').then( m => m.RegisterChoiceMemberUserPageModule)
  },
  {
    path: 'register-leader-member-user',
    loadChildren: () => import('./register-leader-member-user/register-leader-member-user.module').then( m => m.RegisterLeaderMemberUserPageModule)
  },
  {
    path: 'register-agent-member-user',
    loadChildren: () => import('./register-agent-member-user/register-agent-member-user.module').then( m => m.RegisterAgentMemberUserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
