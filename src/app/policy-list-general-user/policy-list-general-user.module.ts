import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyListGeneralUserPageRoutingModule } from './policy-list-general-user-routing.module';

import { PolicyListGeneralUserPage } from './policy-list-general-user.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PolicyListGeneralUserPageRoutingModule
  ],
  declarations: [PolicyListGeneralUserPage]
})
export class PolicyListGeneralUserPageModule {}
