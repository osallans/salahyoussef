import { Injectable } from "@angular/core";
import { HttpRequestsService } from 'src/app/shared/services/http-request.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/shared/models/transaction.model';
import { TransactionLog } from '../shared/models/transactionlog.model';


@Injectable()

export class TransactionService {


  constructor(private httpService: HttpRequestsService) {}

  getTransactions(transaction: Transaction): Observable<Transaction[]> {
    return this.httpService.postHTTPRequest('transaction',transaction)
      .pipe(map((responseData: Transaction[]) => responseData));
  }

  getLogs(data: number): Observable<TransactionLog[]> {
    return this.httpService.postHTTPRequest('transaction/back/logs',data)
      .pipe(map((responseData: TransactionLog[]) => responseData));
  }

  updateStatus(data:any): Observable<any> {
    return this.httpService.postHTTPRequestFile('transaction/back/massStatusUpdate',data)
      .pipe(map((responseData: any) => responseData)); 
  }
 
} 