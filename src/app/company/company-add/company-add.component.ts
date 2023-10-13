import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/models/company.model';
import { CompanyService } from '../company.service';
import { DatePipe } from '@angular/common';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {
 //Defining attributes
 @Input() modalContentType: string;
 @Input() companies: Company[];
 @Input() company: Company;
 companiesList:Company[];
 statusList:any[];
 createForm: FormGroup;
 @Output() notifyParent: EventEmitter<any> = new EventEmitter();
 //Constructor functions
 constructor(private companysService: CompanyService,private modalService: ModalService,private notifyService: NotifyService,
   private companyService:CompanyService,private datePipe: DatePipe) {}
 //////////////////////////////////////////////////////////////////////////////
 ngOnInit() {
  ////////////////////////////////////////////////////////////////////////////////////////////
  //Creating form validators
   this.createForm = new FormGroup({
     companyName:new FormControl('', [Validators.required]),
     address:new FormControl('', [Validators.required]),
     approvesTransaction:new FormControl(null, [Validators.required]),
     phone : new FormControl(null, [Validators.required]),
     limitPercent:new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
     limitValue:new FormControl(null, [Validators.required, Validators.min(0), Validators.max(999999999)]),
     payrollDayStart:new FormControl(null, [Validators.required, Validators.min(1), Validators.max(31)]),
     payrollDayEnd:new FormControl(null, [Validators.required, Validators.min(1), Validators.max(31)]),
     earnDay: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(31)]),
     requestHandlingDay: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(31)]),
     requestHandlingDayFixed:new FormControl(null, [Validators.required]),
     requestHandlingPayrollMonthIsCurrent:new FormControl(null, [Validators.required])
   });
   ////////////////////////////////////////////////////////////////////////////////////////////
   //Setting Form fields
   if (this.modalContentType == "Edit") {
     
     this.createForm.setControl('companyId', new FormControl(''));
     // Set value one by one to add company by id 
     this.createForm.setValue({
       companyId:this.company.companyId ,
       companyName:this.company.companyName ,
       address:this.company.address ,
       approvesTransaction:this.company.approvesTransaction ,
       phone : this.company.phone,
       limitPercent:this.company.limitPercent,
       limitValue:this.company.limitValue,
       payrollDayStart:this.company.payrollDayStart ,
       payrollDayEnd:this.company.payrollDayEnd,
       earnDay: this.company.earnDay,
       requestHandlingDay: this.company.requestHandlingDay,
       requestHandlingDayFixed:this.company.requestHandlingDayFixed,
       requestHandlingPayrollMonthIsCurrent:this.company.requestHandlingPayrollMonthIsCurrent
     });
     this.onChange();
    }
  
 }
 ////////////////////////////////////////////////////////////////////////////////////////////
 //Helper functions
 formField(fieldName: string) {
   return this.createForm.get(fieldName);
 }

 onChange()
 {
   

  if (this.formField('requestHandlingDayFixed').value==0) {
    this.createForm.get('requestHandlingPayrollMonthIsCurrent').setValidators(null);
    this.createForm.get('payrollDayStart').setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
    this.createForm.get('payrollDayEnd').setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
    this.createForm.get('requestHandlingPayrollMonthIsCurrent').setValue(null);
    this.createForm.get('requestHandlingDay').setValue(null);
    this.createForm.get('requestHandlingDay').setValidators(null);

  } 
  else {
    this.createForm.get('requestHandlingPayrollMonthIsCurrent').setValidators([Validators.required]);
    this.createForm.get('payrollDayStart').setValidators(null);
    this.createForm.get('payrollDayEnd').setValidators(null);
    this.createForm.get('payrollDayStart').setValue(null);
    this.createForm.get('payrollDayEnd').setValue(null);
    this.createForm.get('requestHandlingDay').setValidators([Validators.required]);
  }
  this.createForm.get('requestHandlingPayrollMonthIsCurrent').updateValueAndValidity();
  this.createForm.get('payrollDayStart').updateValueAndValidity();
  this.createForm.get('payrollDayEnd').updateValueAndValidity();
  this.createForm.get('requestHandlingDay').updateValueAndValidity();
  //this.createForm.updateValueAndValidity();
}
 
 formFieldNumber(fieldName: string)
 {
  return Number(this.createForm.get(fieldName).value);
 }
 getFormDateFrom(mydate:Date){
   return {year:mydate.getFullYear(),month: mydate.getMonth()+1,day:mydate.getDate()};
 }
 getDateOfForm(formDate:any){
   return new Date(formDate.year , formDate.month-1, formDate.day,0,0,0,0);
 }
 ////////////////////////////////////////////////////////////////////////////////////////////
 //Modal Functions
 closeModal() {
   this.modalService.close('Modal Closed!');
 }
 dismissModal() {
   this.modalService.dismiss('Modal Dismissed!');
 }
 ////////////////////////////////////////////////////////////////////////////////////////////
 //Submit Form functions
 onSubmitForm(formRef: any) {
   let newEntry = formRef.value;
   let loadID = this.notifyService.onLoad("Saving Company ... Please wait ", "Loading").id;
   //Adjusting data
   //if(newEntry.nationalId)newEntry.nationalId=Number(newEntry.nationalId);
   //if(newEntry.dob)newEntry.dob= this.datePipe.transform(this.getDateOfForm(newEntry.dob),'yyyy-MM-dd');
   //if(this.modalContentType == "Edit")newEntry.companyId=this.companyId;
   console.log(newEntry);
   ///////////////////////////////////////////////////////////////////////////////////////////
   //Submitting the form
   this.companyService.addCompany(newEntry).subscribe((company: Company) => {
         this.notifyParent.emit('refresh_'+(new Date()));
         this.notifyService.onLoadCompelete(loadID);
         this.notifyService.onSuccess("Operation Succeeded .. ", "Success");
          this.closeModal();
          },response => {
          if(response.error=="Duplicate"){
            this.notifyService.onError("Duplicate Occurance of Entry is not allowed", "Duplicate Record Error");
          }else{
            this.notifyService.onError("Error occurred .. Please check your network connection and try again", "Error");
          }
          this.notifyService.onLoadCompelete(loadID);
          this.closeModal();
        });
 }
}
