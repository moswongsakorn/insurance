import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInformationGeneralUserPageRoutingModule } from './personal-information-general-user-routing.module';

import { PersonalInformationGeneralUserPage } from './personal-information-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInformationGeneralUserPageRoutingModule
  ],
  declarations: [PersonalInformationGeneralUserPage]
})
export class PersonalInformationGeneralUserPageModule {}
