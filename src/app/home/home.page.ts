import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { UserModel, UserCrudModel } from '../interfaces/index';
import { MagicNumber } from '../interfaces/MagicNumber';
import { LanguageService } from '../services/language.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private languageService:LanguageService,
    private translateService:TranslateService
  ) { }

  changeLanguage(language){
    this.languageService.setLanguage(language)
    this.translateService.use(language);

  }

}
