import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInformationGeneralUserPageRoutingModule } from './personal-information-general-user-routing.module';

import { PersonalInformationGeneralUserPage } from './personal-information-general-user.page';
import { PipesModule } from '../pipes/pips.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInformationGeneralUserPageRoutingModule,
    PipesModule
  ],
  declarations: [PersonalInformationGeneralUserPage]
})
export class PersonalInformationGeneralUserPageModule {}
