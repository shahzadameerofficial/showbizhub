import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, CalendarModule, PasswordModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private authService:AuthService, private db: Firestore) {
    
  }
  signupForm:FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  signup(){
    if (this.signupForm.valid) {
      console.log(this.signupForm);
      this.authService.signupWithEmailAndPassword(this.signupForm.value).subscribe(
        (res:any)=>{
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res))
          this.authService.createUserData(this.signupForm.value,res.localId)
        }
      )
    }
  }
}
