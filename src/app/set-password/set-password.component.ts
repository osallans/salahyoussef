import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  resethash:string

  constructor(public translateService:TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private notifyService:NotifyService
    ) { }
  ngOnInit(): void {
  this.resethash = String(this.route.snapshot.paramMap.get('resethash'));
  this.loginForm = new FormGroup({
    newpassword: new FormControl('', [Validators.required,Validators.minLength(8)]),
    confirmpassword:new FormControl('', [Validators.required,Validators.minLength(8)]),
   
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
      
      let validationResult=this.validatePassword(
      this.l.newpassword.value,this.l.confirmpassword.value);
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
  
      this.authenticationService.setPassword(this.resethash,
        this.l.newpassword.value) 
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

