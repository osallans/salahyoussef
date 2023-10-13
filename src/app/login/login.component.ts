import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

   constructor(
       
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notifyService : NotifyService
    ) { 
      //this.authenticationService.logout();
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

  ngOnInit() {
    this.authenticationService.logout();

    this.loginForm = new FormGroup({
        username:new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

formField(fieldName: string) {
    return this.loginForm.get(fieldName);
  }

onSubmit(loginForm: any, event: Event) {
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

   let loadId = this.notifyService.onLoad("Signing in... Please wait.", "Loading").id;
    

    this.authenticationService.login(this.f.username.value, this.f.password.value,null)
        .pipe(first())
        .subscribe(
            data => {
                this.notifyService.onLoadCompelete(loadId);
                this.router.navigate([this.returnUrl]);
            },
            error => {
              this.notifyService.onLoadCompelete(loadId);
              this.notifyService.onError("Username and password are incorrect , please try again", "Error");
             
            });

            
}

}

