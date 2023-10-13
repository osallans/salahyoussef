import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ignoreElements } from 'rxjs/operators';
import { LookupService } from '../shared/api/lookup.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  createForm: FormGroup;
  constructor(
    public authService:AuthenticationService,
    private spinner: NgxSpinnerService,private lookUpService:LookupService,private notifyService:NotifyService,
    public translateService:TranslateService) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name:new FormControl(null, [Validators.required]),
      phone:new FormControl(null, [Validators.required]),
      mail: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      message : new FormControl(null, [Validators.required]),
      
     //  isActive:new FormControl(null,[Validators.required])
    });
    if(this.authService.currentUserValue && this.authService.currentUserValue.id)
    {
      console.log(this.authService.currentUserValue)
      this.createForm.setValue({
        name:this.authService.currentUserValue.name?this.authService.currentUserValue.name:null,
        mail:this.authService.currentUserValue.mail?this.authService.currentUserValue.mail:null,
        phone:this.authService.currentUserValue.mobile?this.authService.currentUserValue.mobile:null,
        message:null
        // isActive : this.comb.isActive,
       });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
//Helper functions
formField(fieldName: string) {
  return this.createForm.get(fieldName);
}
public findInvalidControls() {
  const invalid = [];
  const controls = this.createForm.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
          invalid.push(name);
      }
  }
  return invalid;
}

////////////////////////////////////////////////////////////////////////////////////////////
//Submit Form functions
onSubmitForm(formRef: any) {
  let newEntry = formRef.value;
  console.log(newEntry);
  this.spinner.show();
  //Adjusting data
  ////////////////////////////////////////////Edit Case////////////////////////////////////////
  this.lookUpService.sendEmail(newEntry).subscribe((data: any) => {
        this.spinner.hide();
        this.notifyService.onSuccess(this.translateService.instant('email_sent_success'),this.translateService.instant('success'));
        this.createForm.reset();   
      },response => {
          this.spinner.hide();
          let errorString:String=response;
          if(errorString.includes('20'))// || errorString.includes('Accepted'))
          {
            this.notifyService.onSuccess(this.translateService.instant('email_sent_success'),this.translateService.instant('success'));
            this.createForm.reset();
          }
          else
          {
           console.error(response);
           this.notifyService.onError(this.translateService.instant('registration_error'),this.translateService.instant('error'));
          }
        });
      
  }

  clearForm()
  {
    this.createForm.setValue({
      name:this.authService.currentUserValue.name?this.authService.currentUserValue.name:null,
      mail:this.authService.currentUserValue.mail?this.authService.currentUserValue.mail:null,
      phone:this.authService.currentUserValue.mobile?this.authService.currentUserValue.mobile:null,
      message:null
      // isActive : this.comb.isActive,
     });
  }
}
