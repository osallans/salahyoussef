import { Component, OnInit, Input } from '@angular/core';
import { TransactionLog } from 'src/app/shared/models/transactionlog.model';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.css']
})
export class TransactionLogComponent implements OnInit {
  @Input() modalContentType: string;
  @Input() transaction: Transaction;
  logs:TransactionLog[];
  
  constructor(public modalService:ModalService,public transactionService:TransactionService) { }

  ngOnInit() {
    this.getLogs(this.transaction.salaryAdvanceId);
  }

  getLogs(id:number)
  {
    let input:any={};
    input.salaryAdvanceId=id;
    //Submitting the form
    this.transactionService.getLogs(input).subscribe((data: any) => {
      console.log(data);
      this.logs=data;
        },response => {
          console.error(response);
    });
  }

    ////////////////////////////////////////////////////////////////////////////////////////////
  //Modal Functions
  closeModal() {
    this.modalService.close('Modal Closed!');
  }

  dismissModal() {
    this.modalService.dismiss('Modal Dismissed!');
  }

}
