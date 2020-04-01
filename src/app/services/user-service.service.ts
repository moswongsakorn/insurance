import { Injectable } from '@angular/core';
import { ResponseModel, UserModel, UserCrudModel } from '../interfaces/index';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { MagicNumber } from '../interfaces/MagicNumber';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    public AngularFireDatabase: AngularFireDatabase,
    public AngularFireAuth: AngularFireAuth
  ) { }


  public async Login(input: UserModel): Promise<ResponseModel> {
    try {
      var user = await this.AngularFireAuth.auth.signInWithEmailAndPassword(input.Email, input.Password);
      var userProfile = await this.GetUserProfile(user.user.uid);
      if (userProfile == null) return new ResponseModel().Failed(null, "Get user data error!");
      return new ResponseModel().Success({ uid: user.user.uid, role: userProfile.Role });
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }

  public async GetUserProfile(uid: string): Promise<UserCrudModel> {
    try {
      var result = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).orderByChild('Uid').equalTo(uid).once('value');
      var data = this.ValueChange(result.val())[0];
      return data as UserCrudModel;
    } catch (error) {
      return null;
    }
  }

  public async RegisterUser(input: UserCrudModel): Promise<ResponseModel> {
    var createdStatus = await this.CreateUserWithEmailAndPassword(input.Email, input.Password);
    if (createdStatus.status == true) {
      input.Uid = createdStatus.detail;
      var insertStatus = await this.InsertUser(input);
      return insertStatus;
    }
    else {
      return createdStatus;
    }
  }

  public async CreateUserWithEmailAndPassword(email: string, password: string): Promise<ResponseModel> {
    try {
      var result = await this.AngularFireAuth.auth.createUserWithEmailAndPassword(email, password);
      await this.AngularFireAuth.auth.signOut();
      return new ResponseModel().Success(result.user.uid);
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }

  public async InsertUser(input: UserCrudModel): Promise<ResponseModel> {
    try {
      input.ConfirmPassword = null;
      input.Key = (await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).push()).key;
      var result = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).push(input);
      return new ResponseModel().Success(result);
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }

  public async Logout(): Promise<ResponseModel> {
    try {
      var result = await this.AngularFireAuth.auth.signOut();
      return new ResponseModel().Success(result);
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }

  public async PinGenerate(): Promise<string> {
    var pin = this.GenerateCharacter();
    if (await this.PinIsExist(pin)) return await this.PinGenerate();
    else return pin;
  }

  public async PinIsExist(pin: string): Promise<boolean> {
    try {
      var value = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).orderByChild('Pin').equalTo(pin).once('value');
      return value.exists();
    } catch (error) {
      return false;
    }
  }

  public GenerateCharacter(): string {
    var character = "";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < MagicNumber.pinLength; i++) {
      var index = Math.floor((Math.random() * (characters.length)));
      character += characters[index];
    }
    return character.toUpperCase();
  }

  private ValueChange(obj: any) {
    var data = [];
    for (var i in obj) {
      data.push(obj[i]);
    }
    return data;
  }

}
