import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MessageService } from 'primeng/api';
// import { ToastModule } from 'primeng/toast';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  commonErrors:any = {
    UNKNOWN:'An unknown error is occurred.',
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND: 'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD: 'The password is invalid or the user does not have a password.',
    USER_DISABLED: 'The user account has been disabled by an administrator.',
    EXPIRED_OOB_CODE: 'Your Verification Code Has Been Expired, Request a New Code and Try Again.',
    INVALID_OOB_CODE: 'Your Verification Code is Invalid or Already Used, Enter a Valid Code.',
  }
  handleAuthErrors(err:HttpErrorResponse){
    if (!err.error || !err.error.error) {
      return throwError(this.commonErrors['UNKNOWN']);
    }else{
      let errorCode:string = err.error.error.message;
      // this.showToast('error','Error',this.commonErrors[errorCode])
      return throwError(this.commonErrors[errorCode])
    }
  }

  // showToast(severity:string, summary:string, detail:string){
  //   this.messageService.add({severity, summary, detail})
  // }
}
