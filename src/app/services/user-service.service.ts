import { Injectable } from '@angular/core';
import { ResponseModel, UserModel, UserCrudModel, UidRoleModel } from '../interfaces/index';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { MagicNumber } from '../interfaces/MagicNumber';
import { Message } from '../interfaces/Message';
import { DataCenterService } from './data-center.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    public AngularFireDatabase: AngularFireDatabase,
    public AngularFireAuth: AngularFireAuth,
    public DataCenterService: DataCenterService
  ) { }

  public async IsLogin(): Promise<ResponseModel> {
    return new Promise((resolve) => {
      this.AngularFireAuth.authState.subscribe(async (user) => {
        var response = new ResponseModel();
        if (user) {
          var userProfile = await this.GetUserProfile(user.uid);
          if (userProfile != null) {
            var uidRoleModel = new UidRoleModel()
            uidRoleModel.Uid = user.uid;
            uidRoleModel.Role = userProfile.Role;
            uidRoleModel.Verify = userProfile.Verify;
            response.Success(uidRoleModel)
            this.DataCenterService.SetThisUserProfile(userProfile);
            resolve(response)
          }
          else {
            response.Failed(null, Message.UserNotFound);
            resolve(response)
          }
        } else {
          response.Failed(null, Message.UserNotFound);
          resolve(response)
        }
      }, error => {
        resolve(new ResponseModel().Failed(error, error.message));
      })
    })
  }

  public async Login(input: UserModel): Promise<ResponseModel> {
    try {
      var user = await this.AngularFireAuth.auth.signInWithEmailAndPassword(input.Email, input.Password);
      var userProfile = await this.GetUserProfile(user.user.uid);
      if (userProfile == null) return new ResponseModel().Failed(null, "Get user data error!");
      var uidRoleModel = new UidRoleModel()
      uidRoleModel.Uid = user.user.uid;
      uidRoleModel.Role = userProfile.Role;
      uidRoleModel.Verify = userProfile.Verify;
      this.DataCenterService.SetThisUserProfile(userProfile);
      return new ResponseModel().Success(uidRoleModel);
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }

  public async GetUserProfile(uid: string): Promise<UserCrudModel> {
    try {
      var result = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).orderByChild('Uid').equalTo(uid).once('value');
      var data = this.ValueChange(result.val())[0] as UserCrudModel;
      var userCrudModel = new UserCrudModel();
      userCrudModel.MapData(data);
      return userCrudModel;
    } catch (error) {
      return null;
    }
  }

  public GetUserProfilePromise(uid: string): Promise<UserCrudModel> {
    return new Promise(resolve => {
      this.AngularFireDatabase.list(MagicNumber.UserTable, ref => ref.orderByChild('Uid').equalTo(uid))
        .valueChanges()
        .subscribe(user => {
          if (user[0]) {
            var data = user[0] as UserCrudModel;
            var userCrudModel = new UserCrudModel();
            userCrudModel.MapData(data);
            resolve(userCrudModel);
          }
          else {
            var userCrudModel = new UserCrudModel();
            resolve(userCrudModel);
          }
        })
    })
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

  public async UpdateUser(input: UserCrudModel): Promise<ResponseModel> {
    try {
      input.ConfirmPassword = null;
      var result = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable + "/" + input.Key).update(input);
      return new ResponseModel().Success(result);
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
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
      localStorage.removeItem("User")
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
