import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';
import { LookupService } from '../shared/api/lookup.service';
import { Blog } from '../shared/models/blog.model';
import { ProductSearch } from '../shared/models/productsearch.model';
import { AuthenticationService } from '../shared/services/authentication.service';
import { NotifyService } from '../shared/services/notify.service';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  productSearch: ProductSearch;
  pageIndex:Number;
  pageSize:Number;
  length:Number;
  datasource: any;
  filterParam:String;
  blogs:Blog[];
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(public translateService:TranslateService,    
    private spinner: NgxSpinnerService,
    private lookupService:LookupService,
    public authenticationService:AuthenticationService,
    public notifyService:NotifyService,
    private router:Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeProductSearch();
    /////////////////////////////////////////
    this.loadBlogs(true);
  }
  
    //-----------------------------------------------------------------------------------------------------
    pagingEvent(event?:PageEvent)
    {
      this.productSearch.page=event?event.pageIndex+1:this.productSearch.page;
      this.productSearch.pagesize=event?event.pageSize:this.productSearch.pagesize;
      this.loadBlogs(false);
      
    }
    
  initializeProductSearch()
  { 
    this.productSearch=new ProductSearch();
    this.productSearch.isactive=1;
    this.productSearch.orderdir="asc";
    this.productSearch.orderfield="name";
    this.productSearch.page=1;
    this.productSearch.pagesize=5;
    this.pageIndex=0;
    this.pageSize=5;
   
  }
  //-----------------------------------------------------------------------------------------------------
  loadBlogs(resetPaginator)
  {
    this.spinner.show();
    this.lookupService.getBlogs(this.productSearch.page,this.productSearch.pagesize).subscribe((data: any) => {
      //this.productItems=data.results;
      this.blogs=data.results;
      for(let i=0;i<this.blogs.length;i++)
      {
        this.blogs[i].shortbody=this.blogs[i].body.replace(/<img[^>]*>/g,"");
        this.blogs[i].shortbodyar=this.blogs[i].bodyar.replace(/<img[^>]*>/g,"");
        
      }
      this.datasource = this.blogs;
      this.length = data.stats.count;
      if(resetPaginator)this.paginator.firstPage();
      this.spinner.hide();
      //this.notifyService.onLoadCompelete(loadID);
      //this.notifyService.onLoadCompelete(loadID);
      //this.notifyService.onSuccess("Operation Succeeded .. ", "Success");
       },response => {
          console.error(response);
          this.spinner.hide();
     });
  }
}
