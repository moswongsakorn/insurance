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


  public GetUserAgentListByPin(pin: string): Promise<UserCrudModel[]> {
    return new Promise(resolve => {
      this.AngularFireDatabase.list(MagicNumber.UserTable, ref => ref.orderByChild('Pin').equalTo(pin))
        .valueChanges()
        .subscribe(user => {
          resolve(user.map(data => data as UserCrudModel));
        }, error => {
          resolve(new Array<UserCrudModel>());
        })
    })
  }

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

  public async ChangePassword(currnetPassword: string, newPassword: string): Promise<ResponseModel> {
    try {
      var user = this.DataCenterService.GetThisUserProfile();
      var result = await this.AngularFireAuth.auth.signInWithEmailAndPassword(user.Email, currnetPassword);
      if (result.user) {
        var updatePassword = await this.AngularFireAuth.auth.currentUser.updatePassword(newPassword);
        return new ResponseModel().Success(updatePassword);
      }
      else {
        return new ResponseModel().Failed(result, "User not found");
      }
    }
    catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }

  public async RegisterUser(input: UserCrudModel): Promise<ResponseModel> {
    var createdStatus = await this.CreateUserWithEmailAndPassword(input.Email, input.Password);
    if (createdStatus.status == true) {
      if (input.PrefixName != 'specific') input.SpecificPrefixName = "";
      if (input.SpecificPrefixName == null) input.SpecificPrefixName = "";
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
      input.Password = null;
      if (input.PrefixName != 'specific') input.SpecificPrefixName = "";
      if (input.SpecificPrefixName == null) input.SpecificPrefixName = "";
      // var oldUserProfile = await this.GetUserProfile(input.Uid);
      // if (oldUserProfile.Password != input.Password) {
      //   await this.AngularFireAuth.auth.signInWithEmailAndPassword(oldUserProfile.Email, oldUserProfile.Password);
      //   var updatePassword = await this.AngularFireAuth.auth.currentUser.updatePassword(input.Password);
      //   var result = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable + "/" + input.Key).set(input);
      //   var signOut = await this.AngularFireAuth.auth.signOut();
      //   return new ResponseModel().Success(result, MagicNumber.ReEntry);
      // }
      // else {
      var result = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable + "/" + input.Key).set(input);
      return new ResponseModel().Success(result);
      // }
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }

  public async UpdateAgentUser(input: UserCrudModel): Promise<ResponseModel> {
    try {
      input.ConfirmPassword = null;
      input.Password = null;
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
      input.Password = null;
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
      return true;
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

  public SendMailResetPassword(email: string): Promise<ResponseModel> {
    return new Promise(resolve => {
      this.AngularFireAuth.auth.sendPasswordResetEmail(email)
        .then(result => {
          var response = new ResponseModel().Success(result);
          resolve(response)
        })
        .catch(error => {
          var response = new ResponseModel().Failed(error, error.message);
          resolve(response)
        })
    })
  }

  private ValueChange(obj: any) {
    var data = [];
    for (var i in obj) {
      data.push(obj[i]);
    }
    return data;
  }

  public async IdCardIsExist(idCard: string, role: string): Promise<boolean> {
    try {
      var value = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).orderByChild('IdCard').equalTo(idCard).once('value');
      if (!value.exists()) return false;
      var data = this.ValueChange(value.val());
      var userModel = data.map(data => data as UserCrudModel);
      for (let i = 0; i < userModel.length; i++) {
        if (userModel[i].Role == role) return true;

        if ((userModel[i].Role == MagicNumber.master || userModel[i].Role == MagicNumber.user) &&
          (role == MagicNumber.master || role == MagicNumber.user)
        ) {
          return true;
        }

        return false;

      }
    } catch (error) {
      return true;
    }
  }


  public async IsCanLogin(email: string, role: string): Promise<boolean> {
    try {
      var value = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).orderByChild('Email').equalTo(email).once('value');
      if (!value.exists()) return false;
      var data = this.ValueChange(value.val());
      var userModel = data.map(data => data as UserCrudModel);
      for (let i = 0; i < userModel.length; i++) {
        if (userModel[i].Role == role) return true;
      }
    } catch (error) {
      return false;
    }
  }

  public checkIDCard(id) {
    //  console.log('id',id)
    let i = 0;
    let sum = 0;
    if (id.length != 13) {
      // console.log('CASE 1')
      return false;
    }
    for (i = 0, sum = 0; i < 12; i++) {
      sum += parseFloat(id.charAt(i)) * (13 - i);
      // console.log('',)
    }
    if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) {
      // console.log('CASE 2')
      return false;
    } else {
      // console.log('CASE 3')
      return true;
    }
  }

}
