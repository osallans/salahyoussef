import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyTier } from 'src/app/shared/models/tier.model';
import { CompanyTierService } from '../company-tier.service';
import { DatePipe } from '@angular/common';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/shared/models/company.model';

@Component({
  selector: 'app-company-tier-add',
  templateUrl: './company-tier-add.component.html',
  styleUrls: ['./company-tier-add.component.css']
})
export class CompanyTierAddComponent implements OnInit {
 //Defining attributes
 @Input() modalContentType: string;
 @Input() companyTier: CompanyTier;
 companiesList:Company[];
 @Input() companiesTiers: CompanyTier[];
 createForm: FormGroup;
 @Output() notifyParent: EventEmitter<any> = new EventEmitter();
 //Constructor functions
 constructor(private modalService: ModalService,private notifyService: NotifyService,private companyService: CompanyService,
   private CompanyTierService:CompanyTierService,private datePipe: DatePipe) {}
 //////////////////////////////////////////////////////////////////////////////
 ngOnInit() {
  this.companyService.getCompaniesList().subscribe( (data: any[]) => {
    this.companiesList = data;
    console.log(this.companiesList);
 });
  ////////////////////////////////////////////////////////////////////////////////////////////
  //Creating form validators
   this.createForm = new FormGroup({
    companyId:new FormControl(null, [Validators.required]), 
     rangeFrom:new FormControl(null, [Validators.required]),
     rangeTo:new FormControl(null, [Validators.required]),
     fees : new FormControl(null, [Validators.required])
    //  isActive:new FormControl(null,[Validators.required])
   });
   ////////////////////////////////////////////////////////////////////////////////////////////
   //Setting Form fields
   if (this.modalContentType == "Edit") {
     
     this.createForm.setControl('companyTierId', new FormControl(''));
     // Set value one by one to add CompanyTier by id 
     this.createForm.setValue({
      companyTierId:this.companyTier.companyTierId, 
      companyId:this.companyTier.companyId,
      rangeFrom:this.companyTier.rangeFrom,
      rangeTo:this.companyTier.rangeTo,
      fees : this.companyTier.fees,
     // isActive : this.companyTier.isActive,
     });

    }
  
 }
 ////////////////////////////////////////////////////////////////////////////////////////////
 //Helper functions
 formField(fieldName: string) {
   return this.createForm.get(fieldName);
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
   let loadID = this.notifyService.onLoad("Saving CompanyTier ... Please wait ", "Loading").id;
   //Adjusting data
   if(this.modalContentType != "Edit") delete newEntry.CompanyTierId;
   console.log(newEntry);
   newEntry.rangeFrom=Number(newEntry.rangeFrom);
   newEntry.rangeTo=Number(newEntry.rangeTo);
   newEntry.fees=Number(newEntry.fees);
   ///////////////////////////////////////////////////////////////////////////////////////////
   //Submitting the form
   this.CompanyTierService.addCompanyTier(newEntry).subscribe((CompanyTier: CompanyTier) => {
         this.notifyParent.emit('refresh_'+(new Date()));
         this.notifyService.onLoadCompelete(loadID);
         this.notifyService.onSuccess("Operation Succeeded .. ", "Success");
          this.closeModal();
          },response => {
            console.log(response);
          if(response=="New tier range must link with max available tier"){
            this.notifyService.onError("New tier range must link with max available tier","New tier range error");
          }else if(response=="Invalid tier range"){
            this.notifyService.onError("Invalid tier range", "Error");
          }
          else
          {
            this.notifyService.onError("Error occurred .. Please check your network connection and try again", "Error");
          }
          this.notifyService.onLoadCompelete(loadID);
          this.closeModal();
        });
 }
}
