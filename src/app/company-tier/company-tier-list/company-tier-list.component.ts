import { Component, OnInit, TemplateRef, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CompanyTier } from 'src/app/shared/models/tier.model';
import { CompanyTierService } from '../company-tier.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/shared/models/company.model';

@Component({
  selector: 'app-company-tier-list',
  templateUrl: './company-tier-list.component.html',
  styleUrls: ['./company-tier-list.component.css']
})
export class CompanyTierListComponent implements OnInit {

  //////////////////////////////////////////////////////////////////////////////
  //Defining attributes
  dataLoaded: boolean = false;
  tableHeaders: any[] = [];
  data: CompanyTier[] = [];
  refreshValue: string ="";
  tableactions: any[] = [];
  companySearchObject:any={};
  modalContentType: string;
  companyTierRow: CompanyTier;
  companiesList:Company[];
  showActions=true;
  @ViewChild('createCompanyTier', { static: false }) createcompanyTierTemplate: TemplateRef<any>;
  @ViewChild('companySelected') companySelected: ElementRef;
  companiesTiersData: any;


  constructor(private modalService: ModalService,private CompanyTierService:CompanyTierService, private companyService:CompanyService,private notifyService: NotifyService) { }

  ngOnInit() {
    
    this.companyService.getCompaniesList().subscribe( (data: any[]) => {
      this.companiesList = data;
      
      setTimeout(() => 
      {
        this.companySearchObject.key="companyName";
        this.companySearchObject.value=this.companiesList[this.companySelected.nativeElement.selectedIndex].companyName;
        this.refreshValue="refresh_"+(new Date());
      }, 500);

   });
   
    this.showActions =true;
    this.dataLoaded = true;
    
    //////////////////////////////////////////////////////////////////////////////
    //Table header
    this.tableHeaders = [
      // { key: 'id', label: 'Project Name', type: 'nested-name', secondLevel: 'name' },
      { key: 'rangeFrom', label: 'Range From', type: 'name' },
      { key: 'rangeTo', label: 'Range To', type: 'name' },
      { key: 'fees', label: 'Fees', type: 'name' }
    ];

    this.tableactions = [
      { icon: 'fa fa-pencil-alt', tooltip: 'Edit Row', actionhandler: 'onEditRow' }
    ];
    
   
  }

  
  OnChange(event)
  {
    this.companySearchObject.key="companyName";
    this.companySearchObject.value=event.srcElement.value;
    this.refreshValue="refresh_"+new Date();
  }

  OnPublish()
  {
    let id=this.companiesList[this.companySelected.nativeElement.selectedIndex].companyId;
    console.log(id);
    //this.refreshValue="refresh_"+new Date();
  }

  OnDelete()
  {
      let loadID = this.notifyService.onLoad("Deleting Company Tier ... Please wait ", "Loading").id;
      ///////////////////////////////////////////////////////////////////////////////////////////
      //Submitting the form
      let id=this.companiesList[this.companySelected.nativeElement.selectedIndex].companyId;
      this.CompanyTierService.deleteCompanyTier(id).subscribe((data:any) => {
            this.refreshValue="refresh_"+new Date();
            this.notifyService.onLoadCompelete(loadID);
            this.notifyService.onSuccess("Operation Succeeded .. ", "Success");
             },response => {
             this.notifyService.onError("Error Occured", "Please contact system administrator");
             this.notifyService.onLoadCompelete(loadID);
           });
  }

  //////////////////////////////////////////////////////////////////////////////
  //Table refresh after add/edit
  getNotification(event)
 {
   
   this.refreshValue="refresh_"+(new Date());
 }

  //////////////////////////////////////////////////////////////////////////////
  //Edit function
  onEditRow(row: any) {
    console.log("Edit Button is Clicked!");
    this.companyTierRow = row;
    console.log(this.companyTierRow);
    this.openModal('Edit', this.createcompanyTierTemplate); 
  }

  //////////////////////////////////////////////////////////////////////////////
  //Extra Method calls
  tableMethodCall(event: { methodName: string, methodParam: any }) {
    let methodName = event.methodName;
    if (this[methodName]) {
      let param = event.methodParam;

      if (param)
        this[methodName](param);
      else
        this[methodName];
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //Open Modal for Add/Edit
  openModal(modalContentType: string, template: any) {
    this.modalContentType = modalContentType;
    this.companyTierRow = {companyId:this.companiesList[this.companySelected.nativeElement.selectedIndex].companyId,
      companyName:this.companiesList[this.companySelected.nativeElement.selectedIndex].companyId,
      companyTierId:0,rangeFrom:0,rangeTo:0,fees:0,isActive:1};
    this.modalService.open(template);
  }

  
}