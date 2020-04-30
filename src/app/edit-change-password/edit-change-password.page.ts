import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-edit-change-password",
  templateUrl: "./edit-change-password.page.html",
  styleUrls: ["./edit-change-password.page.scss"],
})
export class EditChangePasswordPage implements OnInit {
  constructor(
    public translateService: TranslateService,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}
  
  back() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: false,
    });
  }
}
