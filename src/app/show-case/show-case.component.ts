import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../shared/api/product.service';
import { ShowCaseService } from '../shared/api/showcase.service';
import { Product } from '../shared/models/product.model';
import { ShowCase } from '../shared/models/showcase.model';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/services/authentication.service';
@Component({
  selector: 'app-show-case',
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.css']
})
export class ShowCaseComponent implements OnInit {
  showCase: ShowCase;
  imgUrl:String;
  products : Product[]=[];
  filterParam : Number;
  constructor(public productService:ProductService,
    public showCaseService:ShowCaseService,
    private spinner: NgxSpinnerService,
    public authenticateService:AuthenticationService,
    public translateService: TranslateService,private router:Router,
     private route: ActivatedRoute) {


      }

 
  ngOnInit(): void {
    this.filterParam = Number(this.route.snapshot.paramMap.get('id'));
      if(this.filterParam)
        this.loadShowCase((this.filterParam));
      else
        this.router.navigate(['stores-list'], {queryParams: {'filterParam': null,},queryParamsHandling: 'merge'})
  
  }

  loadShowCase(id)
  {
  this.spinner.show();
  this.showCaseService.getShowCaseById(id).subscribe((data: any) => {
    this.showCase=data.results?data.results:data;
    //if(this.showCase.userid!=this.authenticateService.currentUserValue.id)
     // this.router.navigate(['home'],{});
    this.imgUrl=data.stats? environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_showcase:
    environment.apiUrl.substr(0,environment.apiUrl.length-1)+'/uploads/showcase/';
    console.log(this.imgUrl);
    this.spinner.hide();
    },response => {
        console.error(response);
        this.spinner.hide();
   });  
}
loadProducts(id)
  {
  this.spinner.show();
  this.showCaseService.getShowCaseById(id).subscribe((data: any) => {
    this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_store;
    this.spinner.hide();
    this.products=data.results;
       },response => {
        console.error(response);
        this.spinner.hide();
   });  
}

}
