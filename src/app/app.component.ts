import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from './services/language.service';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    protected translateService: TranslateService,
    private LanguageService:LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeTranslateServiceConfig();
    });
  }

  private initializeTranslateServiceConfig() {
    let userLang: string = this.LanguageService.getLanguage()
    this.translateService.addLangs(['th', 'en']);
    this.translateService.setDefaultLang("en");
    this.translateService.setDefaultLang("th");
    this.translateService.use(userLang);
  }
}
