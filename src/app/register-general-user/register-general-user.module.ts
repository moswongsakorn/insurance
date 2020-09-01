import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterGeneralUserPageRoutingModule } from './register-general-user-routing.module';

import { RegisterGeneralUserPage } from './register-general-user.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RegisterGeneralUserPageRoutingModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [RegisterGeneralUserPage]
})
export class RegisterGeneralUserPageModule {}
