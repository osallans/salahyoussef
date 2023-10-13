import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';
import { NgxSpinnerService } from "ngx-spinner";
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loginForm: FormGroup;


  constructor(public translateService:TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private notifyService:NotifyService
    ) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      newpassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
      confirmpassword:new FormControl('', [Validators.required,Validators.minLength(8)]),
      oldpassword: new FormControl('', [Validators.required,Validators.minLength(8)])

  });
  }

  validatePassword(passA:string,passB:string):string
{
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if(passA!==passB)
  return 'no_match';
  if(!format.test(passA))
  return 'special_character';
  return 'success';
}

  // convenience getter for easy access to form fields
  get l() { return this.loginForm.controls; }

  formLoginField(fieldName: string) {
      return this.loginForm.get(fieldName);
    }

    changePassword(loginForm: any, event: Event)
    {
      // stop here if form is invalid
      if (this.loginForm.invalid) 
      {
        return;
      }
      //If old = new password
      if(this.l.newpassword.value==this.l.oldpassword.value)
     {  
       this.notifyService.onError(this.translateService.instant('same_passwords'),this.translateService.instant('error'));
       return;
     }
      let validationResult=this.validatePassword(
      this.l.newpassword.value,this.l.confirmpassword.value);
      console.log(validationResult);
      if(validationResult!='success')
      {
        if(validationResult=='no_match')
        this.notifyService.onError(this.translateService.instant('password_no_match'),this.translateService.instant('error'));
        if(validationResult=='special_character')
        this.notifyService.onError(this.translateService.instant('password_special_character'),this.translateService.instant('error'));
       }
      else
      {
  
      this.spinner.show();
  
      this.authenticationService.changePassword(this.authenticationService.currentUserValue.id,
        this.l.newpassword.value,this.l.oldpassword.value) 
      .pipe(first())
      .subscribe(
          data => {
            this.spinner.hide();  
            this.notifyService.onSuccess(this.translateService.instant('password_change_success'),this.translateService.instant('success'));
              this.router.navigate(['/home']);
          },
          error => {
            this.spinner.hide();
            this.notifyService.onError(this.translateService.instant('registration_error'),this.translateService.instant('error'));
            
          });
          
        }
      }

}
