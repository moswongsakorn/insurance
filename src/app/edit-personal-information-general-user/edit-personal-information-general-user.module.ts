import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPersonalInformationGeneralUserPageRoutingModule } from './edit-personal-information-general-user-routing.module';

import { EditPersonalInformationGeneralUserPage } from './edit-personal-information-general-user.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    NgxMaskModule.forChild(),
    EditPersonalInformationGeneralUserPageRoutingModule,
  ],
  declarations: [EditPersonalInformationGeneralUserPage]
})
export class EditPersonalInformationGeneralUserPageModule {}
