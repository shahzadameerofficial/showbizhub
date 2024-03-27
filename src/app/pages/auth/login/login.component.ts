import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MiniCelebrityCardComponent } from "../../../components/cards/mini-celebrity-card/mini-celebrity-card.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [MessageService],
    imports: [PasswordModule, InputTextModule, ButtonModule, ReactiveFormsModule, CardModule, RouterModule, ToastModule, MessagesModule, MiniCelebrityCardComponent]
})
export class LoginComponent {
    constructor(private authService:AuthService, private messageService:MessageService, private router:Router) {
      
    }
    loginForm:FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })
    login(){
      if (this.loginForm.valid) {
        console.log(this.loginForm);
        this.authService.signInWithEmailAndPassword(this.loginForm.value).subscribe(
          (res:any)=>{
            this.router.navigate(['home'])
            this.showToast('success','Welcome Back',res, 5000)
          },
          err=>{
            console.log(err);
            this.showToast('error','An Error Occcurred',err, 5000)
          }
        )
      }
    }
    showToast(severity:string, summary:string, detail:string, delay?:number){
        this.messageService.add({severity, summary, detail, life:delay})
    }

}
