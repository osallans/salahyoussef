import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';
import { NgxSpinnerService } from "ngx-spinner";
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
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
      email:new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    
  });
  }



  // convenience getter for easy access to form fields
  get l() { return this.loginForm.controls; }

  formLoginField(fieldName: string) {
      return this.loginForm.get(fieldName);
    }

    changePassword(loginForm: any, event: Event)
    {
      // stop here if form is invalid
      if (this.loginForm.invalid) {
        return;
      }
      
  
      this.spinner.show();
  
      this.authenticationService.sendPassword(this.l.email.value) 
      .pipe(first())
      .subscribe(
          data => {
            this.spinner.hide();  
            this.notifyService.onSuccess(this.translateService.instant('email_reset_password'),this.translateService.instant('success'));
              this.router.navigate(['/home']);
          },
          error => {
            this.spinner.hide();
            let errorString:String=error;
            if(errorString.includes('No user'))
               this.notifyService.onError(this.translateService.instant('no_email_found'),this.translateService.instant('error'));
           else if(errorString.includes('Created') || errorString.includes('200'))
           {
                this.notifyService.onSuccess(this.translateService.instant('email_reset_password'),this.translateService.instant('success'));
                this.router.navigate(['/home']);
            }
                else
               this.notifyService.onError(this.translateService.instant('registration_error'),this.translateService.instant('error'));
            
          });
          
        }
      }


