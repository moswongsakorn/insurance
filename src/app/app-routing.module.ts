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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
