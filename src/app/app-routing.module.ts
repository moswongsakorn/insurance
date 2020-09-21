import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
// import { AuthGuard } from './services/auth.guard';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["home"]);
const routes: Routes = [
  { path: "", redirectTo: "/policy-list-general-user", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "login-general-user",
    loadChildren: () =>
      import("./login-general-user/login-general-user.module").then(
        (m) => m.LoginGeneralUserPageModule
      ),
  },
  {
    path: "register-general-user",
    loadChildren: () =>
      import("./register-general-user/register-general-user.module").then(
        (m) => m.RegisterGeneralUserPageModule
      ),
  },
  {
    path: "confirm-register-general-user",
    loadChildren: () =>
      import(
        "./confirm-register-general-user/confirm-register-general-user.module"
      ).then((m) => m.ConfirmRegisterGeneralUserPageModule),
  },
  {
    path: "forget-password",
    loadChildren: () =>
      import("./forget-password/forget-password.module").then(
        (m) => m.ForgetPasswordPageModule
      ),
  },
  {
    path: "login-member-user",
    loadChildren: () =>
      import("./login-member-user/login-member-user.module").then(
        (m) => m.LoginMemberUserPageModule
      ),
  },
  {
    path: "register-choice-member-user",
    loadChildren: () =>
      import(
        "./register-choice-member-user/register-choice-member-user.module"
      ).then((m) => m.RegisterChoiceMemberUserPageModule),
  },
  {
    path: "register-leader-member-user",
    loadChildren: () =>
      import(
        "./register-leader-member-user/register-leader-member-user.module"
      ).then((m) => m.RegisterLeaderMemberUserPageModule),
  },
  {
    path: "register-agent-member-user",
    loadChildren: () =>
      import(
        "./register-agent-member-user/register-agent-member-user.module"
      ).then((m) => m.RegisterAgentMemberUserPageModule),
  },
  {
    path: "confirm-register-leader-member-user",
    loadChildren: () =>
      import(
        "./confirm-register-leader-member-user/confirm-register-leader-member-user.module"
      ).then((m) => m.ConfirmRegisterLeaderMemberUserPageModule),
  },
  {
    path: "confirm-register-agent-member-user",
    loadChildren: () =>
      import(
        "./confirm-register-agent-member-user/confirm-register-agent-member-user.module"
      ).then((m) => m.ConfirmRegisterAgentMemberUserPageModule),
  },
  {
    path: "policy-list-general-user",
    loadChildren: () =>
      import("./policy-list-general-user/policy-list-general-user.module").then(
        (m) => m.PolicyListGeneralUserPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
    
  },
  {
    path: "add-policy-general-user",
    loadChildren: () =>
      import("./add-policy-general-user/add-policy-general-user.module").then(
        (m) => m.AddPolicyGeneralUserPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "add-policy-repay-general-user",
    loadChildren: () =>
      import(
        "./add-policy-repay-general-user/add-policy-repay-general-user.module"
      ).then((m) => m.AddPolicyRepayGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "add-policy-protection-general-user",
    loadChildren: () =>
      import(
        "./add-policy-protection-general-user/add-policy-protection-general-user.module"
      ).then((m) => m.AddPolicyProtectionGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "add-policy-confirm-general-user",
    loadChildren: () =>
      import(
        "./add-policy-confirm-general-user/add-policy-confirm-general-user.module"
      ).then((m) => m.AddPolicyConfirmGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "policy-detail-general-user",
    loadChildren: () =>
      import(
        "./policy-detail-general-user/policy-detail-general-user.module"
      ).then((m) => m.PolicyDetailGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "edit-policy-general-user",
    loadChildren: () =>
      import("./edit-policy-general-user/edit-policy-general-user.module").then(
        (m) => m.EditPolicyGeneralUserPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "edit-policy-repay-general-user",
    loadChildren: () =>
      import(
        "./edit-policy-repay-general-user/edit-policy-repay-general-user.module"
      ).then((m) => m.EditPolicyRepayGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "edit-policy-protection-general-user",
    loadChildren: () =>
      import(
        "./edit-policy-protection-general-user/edit-policy-protection-general-user.module"
      ).then((m) => m.EditPolicyProtectionGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "edit-policy-confirm-general-user",
    loadChildren: () =>
      import(
        "./edit-policy-confirm-general-user/edit-policy-confirm-general-user.module"
      ).then((m) => m.EditPolicyConfirmGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "personal-information-general-user",
    loadChildren: () =>
      import(
        "./personal-information-general-user/personal-information-general-user.module"
      ).then((m) => m.PersonalInformationGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "edit-personal-information-general-user",
    loadChildren: () =>
      import(
        "./edit-personal-information-general-user/edit-personal-information-general-user.module"
      ).then((m) => m.EditPersonalInformationGeneralUserPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "policy-search",
    loadChildren: () =>
      import("./policy-search/policy-search.module").then(
        (m) => m.PolicySearchPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "policy-search-result",
    loadChildren: () =>
      import("./policy-search-result/policy-search-result.module").then(
        (m) => m.PolicySearchResultPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "user-agent-list",
    loadChildren: () =>
      import("./user-agent-list/user-agent-list.module").then(
        (m) => m.UserAgentListPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "agent-information",
    loadChildren: () =>
      import("./agent-information/agent-information.module").then(
        (m) => m.AgentInformationPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "edit-agent-information",
    loadChildren: () =>
      import("./edit-agent-information/edit-agent-information.module").then(
        (m) => m.EditAgentInformationPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "policy-detail",
    loadChildren: () =>
      import("./policy-detail/policy-detail.module").then(
        (m) => m.PolicyDetailPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "edit-change-password",
    loadChildren: () =>
      import("./edit-change-password/edit-change-password.module").then(
        (m) => m.EditChangePasswordPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "policy-detail-calculate",
    loadChildren: () =>
      import("./policy-detail-calculate/policy-detail-calculate.module").then(
        (m) => m.PolicyDetailCalculatePageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "policy-input-calculate",
    loadChildren: () =>
      import("./policy-input-calculate/policy-input-calculate.module").then(
        (m) => m.PolicyInputCalculatePageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'verify',
    loadChildren: () => import('./verify/verify.module').then( m => m.VerifyPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
