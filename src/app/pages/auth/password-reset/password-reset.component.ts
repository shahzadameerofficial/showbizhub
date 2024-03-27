import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ToastModule ],
  providers: [MessageService],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  constructor(private authService: AuthService, private messageService: MessageService, private router: Router, private firestoreService:FirestoreService) {
    this.getData()
  }
  sendResetRequest(email:string) { 
    this.authService.sendPasswordResetCodeToEmail(email).subscribe(
      ()=>{
        this.showToast('success', 'Request Sent', `A Password Reset Link Has Been Sent to Your Email ${email}`, 8000);
      },
      err=>{
        this.showToast('error','An Error Occcurred',err, 5000)
      }
    )
  }
  

  showToast(severity: string, summary: string, detail: string, delay?: number) {
    this.messageService.add({ severity, summary, detail, life: delay })
  }

  getData(){
    console.log()
    // let savedList = this.firestoreService.getList('hiasFc2YuLTiOmgVYFaxXEpXmOw2');
    // let a = this.firestoreService.updateList('hiasFc2YuLTiOmgVYFaxXEpXmOw2').then

  }
}
