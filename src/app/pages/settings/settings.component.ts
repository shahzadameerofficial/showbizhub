import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TmdbService } from '../../services/tmdb.service';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, DropdownModule, CardModule, ButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  loading:boolean = true
  currentUser:any;
  allLanguages:any[] = [];
  constructor(private authService: AuthService, private tmdbService:TmdbService) {
    const userData:any = authService.getLoggedInUser()
    if (userData) {
      this.currentUser = userData;
      this.setFormValues(this.currentUser.data)
      
    }
  }
  async getLanguages(){

    setTimeout(() => {
      this.allLanguages = this.tmdbService.select('languages')()
    }, 2000);
    
  }

  settingsForm:FormGroup = new FormGroup({
    username: new FormControl(''),
    language: new FormControl(''),
    region: new FormControl(''),
  })
  setFormValues(data:any){
    this.settingsForm.get('username')?.setValue(data?.username)
    this.settingsForm.get('email')?.setValue(data?.email)
    this.settingsForm.get('dateOfBirth')?.setValue(data?.dateOfBirth)
    this.settingsForm.get('language')?.setValue(data?.language)
    
    this.getLanguages()
    this.loading = false
  }
  updateUser(){
    const updatedData = this.mergeObjects(this.currentUser.data, this.settingsForm.value)
    this.loading = true
    this.authService.updateUserData(updatedData, this.currentUser.user.id).then(
      ()=>{
        this.loading = false
        console.log('updated');
        localStorage.setItem('user',JSON.stringify(
          {
            user:this.currentUser.user,
            data:updatedData
          }
        ));
        this.currentUser.data = updatedData
        this.authService.loggedInUser.set(this.currentUser)
      }
      ).catch(
        ()=>{
        console.log('failed');
        this.loading = false
      }
    )
  }
  mergeObjects(oldObj:any, newObj:any) {
    const mergedObj = { ...oldObj }; 
  
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        if (oldObj.hasOwnProperty(key)) {
          mergedObj[key] = newObj[key];
        } else {
          mergedObj[key] = newObj[key];
        }
      }
    }
  
    return mergedObj;
  }
}
