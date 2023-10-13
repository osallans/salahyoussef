import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModalService: NgbModal) { }

  closeResult: string;
  modalReference: any;
/*

Open Modal Initializes the bootstrap Modal

@Params
  content : the html template to open
  options : Modal options for size , styles , etc
*/
  public open(content: any,options:any=null) {
    if(!options)options={};
    // backdrop and keyboard options are used to prevent close when click outside
      options.backdrop ='static';
      options.keyboard =false;
      options.scrollable= true
    this.modalReference = this.ngbModalService.open(content,options);

    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public close(msg: any) {
    this.modalReference.close(msg);
  }

  public dismiss(msg: string) {
    this.modalReference.dismiss(msg);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
