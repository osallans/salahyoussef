import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  registerForm:FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

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
      password: new FormControl('', [Validators.required])

  });

  this.registerForm=new FormGroup({
    firstname:new FormControl('', [Validators.required,Validators.minLength(3)]),
    lastname:new FormControl('', [Validators.required,Validators.minLength(3)]),
    mobile: new FormControl('', []),
    email:new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    confirmpassword:new FormControl('', [Validators.required,Validators.minLength(8)]),
  });
  this.applyScripts();
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
get r() { return this.registerForm.controls; }

formRegisterField(fieldName: string) {
    return this.registerForm.get(fieldName);
  }
  // convenience getter for easy access to form fields
get l() { return this.loginForm.controls; }

formLoginField(fieldName: string) {
    return this.loginForm.get(fieldName);
  }

  login(loginForm: any, event: Event)
  {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    this.spinner.show();
    ///////////////////////////////////////////////////////////////////////////
    this.authenticationService.login(this.l.email.value, this.l.password.value,null)
    .pipe(first())
    .subscribe(
        data => {
            this.spinner.hide();
            this.router.navigate(['/home']);
        },
        error => {
          this.spinner.hide();
          this.notifyService.onError(this.translateService.instant('login_error'),this.translateService.instant('error'));
          
         
        });
  }
  register(registerForm: any, event: Event)
  {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let validationResult=this.validatePassword(this.r.password.value,this.r.confirmpassword.value);
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

    let name=(this.translateService.instant('success')!='success')?this.r.firstname.value+" "+this.r.lastname.value:
    this.r.lastname.value+" "+this.r.firstname.value;
    this.authenticationService.register(this.r.email.value, this.r.password.value,name,this.r.mobile.value)
    .pipe(first())
    .subscribe(
        data => {
          this.spinner.hide();  
          this.notifyService.onSuccess(this.translateService.instant('registration_success'),this.translateService.instant('success'));
            this.router.navigate(['/home']);
        },
        error => {
          this.spinner.hide();
          let errorString:String=error;
          console.log(errorString);
            if(errorString.includes('20'))// || errorString.includes('Accepted'))
            {
              this.notifyService.onSuccess(this.translateService.instant('registration_success'),this.translateService.instant('success'));
              this.router.navigate(['/home']);
            }
            else if(errorString.includes('registered'))
            {
              this.notifyService.onError(this.translateService.instant('email_exists'),this.translateService.instant('error'));
            }
            else
            this.notifyService.onError(this.translateService.instant('registration_error'),this.translateService.instant('error'));
          
        });
        
      }
    }
            ////////////////////////////////////////////////////////////////////////////////////////////
            applyScripts()
            {
              if (document.getElementById('main_gallery_js') !=null) {document.getElementById('main_gallery_js').remove();}
              const node = document.createElement('script');
              node.src = 'assets/js/main_gallery.js';
              node.type = 'text/javascript';
              node.async = false;
              node.id = 'main_gallery_js';
              node.charset = 'utf-8';
              document.getElementsByTagName('head')[0].appendChild(node);
            }
}
