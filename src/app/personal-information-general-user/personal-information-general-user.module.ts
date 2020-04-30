import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInformationGeneralUserPageRoutingModule } from './personal-information-general-user-routing.module';

import { PersonalInformationGeneralUserPage } from './personal-information-general-user.page';
import { PipesModule } from '../pipes/pips.module';
import { TranslateModule } from '@ngx-translate/core';
import { EditChangePasswordPageModule } from '../edit-change-password/edit-change-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PersonalInformationGeneralUserPageRoutingModule,
    PipesModule,EditChangePasswordPageModule
  ],
  declarations: [PersonalInformationGeneralUserPage]
})
export class PersonalInformationGeneralUserPageModule {}
