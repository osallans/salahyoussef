import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/shared/models/company.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
   
  //////////////////////////////////////////////////////////////////////////////
  //Defining attributes
  dataLoaded: boolean = false;
  tableHeaders: any[] = [];
  data: Company[] = [];
  refreshValue: string ="";
  tableactions: any[] = [];
  modalContentType: string;
  companyRow: Company;
  showActions=true;
  @ViewChild('createCompany', { static: false }) createcompanyTemplate: TemplateRef<any>;
  companiesData: any;


  constructor(private modalService: ModalService, private notifyService: NotifyService) { }

  ngOnInit() {
    
    this.showActions =true;
    this.dataLoaded = true;
    
    //////////////////////////////////////////////////////////////////////////////
    //Table header
    this.tableHeaders = [
      // { key: 'id', label: 'Project Name', type: 'nested-name', secondLevel: 'name' },
      { key: 'companyName', label: 'Company Name', type: 'name' },
      { key: 'phone', label: 'Phone', type: 'name' },
      { key: 'approvesTransaction', label: 'Approves Transaction', type: 'boolean' }
    ];

    this.tableactions = [
      { icon: 'fa fa-pencil-alt', tooltip: 'Edit Row', actionhandler: 'onEditRow' }
    ];
  }

  //////////////////////////////////////////////////////////////////////////////
  //Table refresh after add/edit
  getNotification(event)
 {
   console.log(event);
   this.refreshValue="refresh_"+(new Date());
 }

  //////////////////////////////////////////////////////////////////////////////
  //Edit function
  onEditRow(row: any) {
    console.log("Edit Button is Clicked!");
    this.companyRow = row;
    console.log(this.companyRow);
    this.openModal('Edit', this.createcompanyTemplate); 
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
    this.modalService.open(template);
  }

  
}
