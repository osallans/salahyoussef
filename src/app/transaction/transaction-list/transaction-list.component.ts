
import { Component, OnInit, ViewChild, TemplateRef, SimpleChanges } from '@angular/core';

import { ModalService } from 'src/app/shared/services/modal.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

import { Transaction } from 'src/app/shared/models/transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionLog } from 'src/app/shared/models/transactionlog.model';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog/confirmation-dialog.service';
@Component({ 
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

   
  //////////////////////////////////////////////////////////////////////////////
  //Defining attributes
  dataLoaded: boolean = false;
  tableHeaders: any[] = [];
  data: Transaction[] = [];
  refreshValue: string ="";
  getSelected: string ="";
  tableactions: any[] = [];
  modalContentType: string;
  transactionRow: Transaction;
  showActions=true;
  @ViewChild('transactionLog', { static: false }) transactionLogTemplate: TemplateRef<any>;
  transactionsData: any;


  constructor(private transactionService: TransactionService,private confirmationDialogService:ConfirmationDialogService,private modalService: ModalService, private notifyService: NotifyService) { }

  ngOnInit() {
    
    this.showActions =true;
    this.dataLoaded = true;
    
    //////////////////////////////////////////////////////////////////////////////
    //Table header
    this.tableHeaders = [
      // { key: 'id', label: 'Project Name', type: 'nested-name', secondLevel: 'name' },
      { key: 'companyName', label: 'Company', type: 'name' }, 
      { key: 'fName', label: 'Full Name', type: 'name' },
      { key: 'nationalId', label: 'National ID', type: 'name' },
      { key: 'transactionStatus', label: 'Status', type: 'name' }, 
      { key: 'amount', label: 'Amount', type: 'name' },
      { key: 'amountPlusFees', label: 'amountPlusFees', type: 'name' }, 
      { key: 'submissionDate', label: 'Submission Date', type: 'date' },
      { key: 'requestedCollectionDate', label: 'Collection Date', type: 'date' },
      { key: 'fromPayrollDate', label: 'Payroll Date', type: 'name' },
      { key: 'salary', label: 'Salary', type: 'name' },

    ];

    this.tableactions = [
      { icon: 'fa fa-history', tooltip: 'Show Logs', actionhandler: 'onShowLog' }
    ];
  }


  //////////////////////////////////////////////////////////////////////////////
//Edit function
onReject(row: any) {
  this.transactionRow = row;
  console.log(this.transactionRow);
  let loadID = this.notifyService.onLoad("Updating status ... Please wait ", "Loading").id;
  let output:any={};
  output.salaryAdvanceId=this.transactionRow.salaryAdvanceId;
  output.transactionStatus="Rejected";
  output.userCompanyId=this.transactionRow.userCompanyId;
  //Submitting the form
  this.transactionService.updateStatus(output).subscribe((data: any) => {
     this.refreshValue="refresh_"+(new Date());
     this.notifyService.onLoadCompelete(loadID);
     this.notifyService.onSuccess("Operation Succeeded .. status is updated", "Success");
      },response => {
        this.notifyService.onError("Error occurred .. Please check your network connection and try again", "Error");
      this.notifyService.onLoadCompelete(loadID);
  });
}
  //////////////////////////////////////////////////////////////////////////////
//Edit function
onApprove(row: any) {
  this.transactionRow = row;
  let loadID = this.notifyService.onLoad("Updating status ... Please wait ", "Loading").id;
  let output:any={};
  output.salaryAdvanceId=this.transactionRow.salaryAdvanceId;
  output.userCompanyId=this.transactionRow.userCompanyId;
  output.transactionStatus="Approved";
  //Submitting the form
  this.transactionService.updateStatus(output).subscribe((data: any) => {
     this.refreshValue="refresh_"+(new Date());
     this.notifyService.onLoadCompelete(loadID);
     this.notifyService.onSuccess("Operation Succeeded .. status is updated", "Success");
      },response => {
        this.notifyService.onError("Error occurred .. Please check your network connection and try again", "Error");
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
 //Acivate or Decativate the selected users
 setApproval(isApproved)
 {
  this.getSelected=(isApproved)+"_"+(new Date());
 }
 ///////////////////////////////////////////////////////////////////////////////
 approveSelected(data:Transaction[])
 {
   this.updateStatus(data,"Approved");
 }
 //////////////////////////////////////////////////////////////////////////////
 rejectSelected(data:Transaction[])
 {
  this.updateStatus(data,"Rejected");
 }
  ///////////////////////////////////////////////////////////////////////////////
  collectSelected(data:Transaction[])
  {
    this.updateStatus(data,"Collected");
  }
  //////////////////////////////////////////////////////////////////////////////
  settleSelected(data:Transaction[])
  {
   this.updateStatus(data,"Settled");
  }
 /////////////////////////////////////////////////////////////////////////////
 updateStatus(data:Transaction[],approvalStatus:string)
 {
  this.confirmationDialogService.confirm('Please confirm..', 'Are you sure ?')
  .then(
    (confirmed) => {
      if(confirmed)
        {
          let loadID = this.notifyService.onLoad("Updating users status ... Please wait ", "Loading").id;
          let output:any[]=[];
          data.forEach(entry=>{
            if(entry.selected)
            {
              let newEntry:any={};
              newEntry.salaryAdvanceId=entry.salaryAdvanceId;
              newEntry.userCompanyId=entry.userCompanyId;
              newEntry.transactionStatus=approvalStatus;
              output.push(newEntry);
            }
          });
          //Submitting the form
          this.transactionService.updateStatus(output).subscribe((data: any) => {
              this.refreshValue="refresh_"+(new Date());
              this.notifyService.onLoadCompelete(loadID);
              this.notifyService.onSuccess("Operation Succeeded .. status is updated", "Success");
              },response => {
                this.notifyService.onError("Error occurred .. Please check your network connection and try again", "Error");
              this.notifyService.onLoadCompelete(loadID);
          });
        }
      });
}
//////////////////////////////////////////////////////////////////////////////
//Edit function
onShowLog(row: any) {
  this.transactionRow = row;
  this.openModal('View', this.transactionLogTemplate); 
}

//////////////////////////////////////////////////////////////////////////////
 //Extra Method calls
 tableMethodCall(event: { methodName: string, methodParam: any }) {
    console.log(event);
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
