import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { UserModel, UserCrudModel } from '../interfaces/index';
import { MagicNumber } from '../interfaces/MagicNumber';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  input = new UserModel();
  user = new UserCrudModel();

  constructor(
    private UserService: UserServiceService
  ) { }

  async Login() {
    this.input.email = "somchai2@mail.com";
    this.input.password = "123456";

    var result = await this.UserService.Login(this.input)
    console.log(result);
  }

  async Register() {
    this.user.IdCard = "12365478963";
    this.user.PrefixName = "นาย";
    this.user.FirstName = "สมชาย";
    this.user.LastName = "ใจดีมากๆ";
    this.user.BirthDay = new Date().toISOString();
    this.user.Email = "somchai2@mail.com";
    this.user.Telephone = "096584123";
    this.user.Password = "123456";
    this.user.ConfirmPassword = "123456";
    this.user.Role = MagicNumber.user;    
    this.user.PinGenerate();

    if (!this.user.PasswordIsMatch) {
      console.log("Password is not match!");
    }
    else {
      var result = await this.UserService.Register(this.user.Email, this.user.Password)
      if (result.status) {
        var user = await this.UserService.InsertUser(this.user);
        if (user.status) {
          console.log(user)
        }
        else {
          console.log("Insert user failed! ", user)
        }
      }
      else {
        console.log('Register failed! ', result)
      }
    }


  }

}
