import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPersonalInformationGeneralUserPageRoutingModule } from './edit-personal-information-general-user-routing.module';

import { EditPersonalInformationGeneralUserPage } from './edit-personal-information-general-user.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    EditPersonalInformationGeneralUserPageRoutingModule
  ],
  declarations: [EditPersonalInformationGeneralUserPage]
})
export class EditPersonalInformationGeneralUserPageModule {}
