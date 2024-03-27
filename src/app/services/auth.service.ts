import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { AuthResponse } from '../components/interfaces/auth-response.interface';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {Auth} from '@angular/fire/auth'
import { ErrorService } from './error.service';
import { catchError, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ThemeService } from './theme.service';
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  
  constructor(private http:HttpClient, private db:Firestore, private errorService:ErrorService, private router:Router, private auth:Auth) { }


  signupWithEmailAndPassword(formValues:any){
    const restApiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`
    return this.http.post<AuthResponse>(restApiUrl,{
      email: formValues.email,
      password: formValues.password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this.errorService.handleAuthErrors(err)
      }),
      tap(res=>{
        this.authenticatedUser(res.email, res.localId, res.idToken, res.expiresIn)
      })
    )
  }
  signInWithEmailAndPassword(formValues:any){
    const restApiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`
    return this.http.post<AuthResponse>(restApiUrl,{
      email: formValues.email,
      password: formValues.password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this.errorService.handleAuthErrors(err)
      }),
      tap(res=>{
        this.authenticatedUser(res.email, res.localId, res.idToken, res.expiresIn)
      })
    )
  }
  sendPasswordResetCodeToEmail(email:string){
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.FIREBASE_API_KEY}`;
    return this.http.post(url,{
      requestType: 'PASSWORD_RESET',
      email
    }).pipe(
      catchError(err => {
        return this.errorService.handleAuthErrors(err)
      })
    )
  };
  
  

  async createUserData(formValues:any,userId:string){
    const data = {
      username: formValues.username,
      email: formValues.email,
      dateOfBirth: formValues.dateOfBirth.toLocaleDateString(),
      language: {
        iso_639_1: "en",
        english_name: "English",
        name: "English"
      },
      region:{
        iso_3166_1: "US",
        english_name: "United States of America",
        native_name: "United States"
      },
      include_adult: false,
      dark_mode: true,
      data_saving_mode: false,
      data_saving_type:null,
      accentColor: '#004124'
    }
    const savedList = {
      movies: [],
      celebrities: [],
      tvshows: [],
    }
    
    await setDoc(doc(this.db,'usersdata',userId), data)
    await setDoc(doc(this.db,'savedList',userId), savedList)
  }
  async updateUserData(newData:any, userId:string){
    const docRef = doc(this.db, 'usersdata', userId)
    await updateDoc(docRef,newData)
  }
  async getUserData(userId:string){
    const docSnap = await getDoc(doc(this.db,'usersdata',userId))
    if (docSnap.exists()) {
      const data = docSnap.data()
      // console.log(data);
      
      return data
    }else{
      return
    }
  }
  private async authenticatedUser(email:string, userId:string, token:string, expiresIn:string){
    const expirationDate = new Date(new Date().getTime() + +expiresIn*1000)
    const user = new User(email, userId, token, expirationDate);
    const data = await this.getUserData(userId);
    const userData = {
      user,
      data
    }
    const stringifiedData = JSON.stringify(userData)
    
    localStorage.setItem('user',stringifiedData)
    
  }
  loggedInUser:any = signal(null)


  getLoggedInUser(){
    if (!this.loggedInUser()) {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user)
        this.loggedInUser.set(parsedUser)
      }else{
        // this.router.navigate(['/login'])
        this.loggedInUser.set({
          language: {
            iso_639_1: "en",
            english_name: "English",
            name: "English"
          },
          region:{
            iso_3166_1: "US",
            english_name: "United States of America",
            native_name: "United States"
          },
          dark_mode: true,
          demoAccount: true
        })
      }
      return this.loggedInUser()
    }else{
      return this.loggedInUser();
    }
  }
}
