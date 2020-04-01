import { Injectable } from '@angular/core';
import { ResponseModel, UserModel, UserCrudModel } from '../interfaces/index';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { MagicNumber } from '../interfaces/MagicNumber';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    public AngularFireDatabase: AngularFireDatabase,
    public AngularFireAuth: AngularFireAuth
  ) { }


  public async Login(input: UserModel) {
    try {
      var user = await this.AngularFireAuth.auth.signInWithEmailAndPassword(input.email, input.password);
      return new ResponseModel().Success(user.user.uid);
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }

  public async InsertUser(input: UserCrudModel) {
    try {
      input.ConfirmPassword = null;
      input.Key = (await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).push()).key;
      var result = await this.AngularFireDatabase.database.ref(MagicNumber.UserTable).push(input);
      return new ResponseModel().Success(result);
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }


  public async Register(email: string, password: string) {
    try {
      var result = await this.AngularFireAuth.auth.createUserWithEmailAndPassword(email, password);
      return new ResponseModel().Success(result);
    } catch (error) {
      return new ResponseModel().Failed(error, error.message);
    }
  }
}
