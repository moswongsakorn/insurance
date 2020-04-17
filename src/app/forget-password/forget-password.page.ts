import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(
    private NavController: NavController,
    private UserService: UserServiceService
  ) { }

  public email: string;

  ngOnInit() {
  }

  back() {
    this.NavController.back();
  }

  async sendEmail() {
    var result = await this.UserService.SendMailResetPassword(this.email);
    if (result.status) {
      console.log('สำเร็จ', 'กรุณาตรวจสอบ และ รีเซตรหัสผ่านใหม่ทางอีเมล ' + this.email);
      this.NavController.back();
    }
    else {
      console.log(result.message)
      console.log('ผิดพลาด', 'เกิดข้อผิดพลาดบางอย่างโปรดลองใหม่ภายหลัง');
    }
  }

}
