import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { TranslateLoader, TranslateModule,  } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AddPolicyRepayGeneralUserPageModule} from '../app/add-policy-repay-general-user/add-policy-repay-general-user.module'

// AoT requires an exported function for factories
export function exportTranslateStaticLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      scrollAssist: false,
      swipeBackEnabled: false,
      menuType: "overlay",
      backButtonText: "",
    }),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    AddPolicyRepayGeneralUserPageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: exportTranslateStaticLoader,
        deps: [HttpClient],
      },
    }),
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
