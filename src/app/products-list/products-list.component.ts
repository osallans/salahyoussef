import { ElementRef, SimpleChange, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CategoryService } from '../shared/api/category.service';
import { LookupService } from '../shared/api/lookup.service';
import { ProductService } from '../shared/api/product.service';
import { Category } from '../shared/models/category.model'; 
import { Store } from '../shared/models/store.model';
import { Product } from '../shared/models/product.model';
import { ProductSearch } from '../shared/models/productsearch.model';
import { Room } from '../shared/models/room.model';
import { Style } from '../shared/models/style.model';
import { StoreService } from '../shared/api/store.service';
import { ModalService } from '../shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FavouriteService } from '../shared/api/favourite.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ShowCaseService } from '../shared/api/showcase.service';
import { DateOf } from '../shared/commonFunctions/dateHelpers';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { District } from '../shared/models/district.model';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('popUp') popUp: ElementRef;
  @ViewChild('productPopup', { static: false }) productModalTemplate: TemplateRef<any>;
  
  categories: Category[] = [];
  productSearch: ProductSearch;
  rooms: Room[] = [];
  styles: Style[] = [];
  districts:District[]=[];
  stores: StoreService[] = [];
  productItems: Product[] = [];
  popularItems: Product[] = [];
  toggle:number;
  favouriteItems: Product[] = [];
  imgUrl: String;
  productsCount: Number;
  config: any;
  pageOfItems: Array<any>;
  pageEvent: PageEvent;
  datasource: any;
  pageIndex:Number;
  pageSize:Number;
  length:Number;
  filterParam:String;
  modalContentType:String;
  selectedItem:Product;
  options: Options = {
    floor: 0,
    ceil: 10000,
    step:1000
  };

  minValue: number = 0;
  maxValue: number = 10000;

  constructor(public translateService:TranslateService,public showCaseService:ShowCaseService,
    private spinner: NgxSpinnerService,private favouriteService:FavouriteService,public authenticationService:AuthenticationService,
    private categoryService:CategoryService,private storeService:StoreService,private productService:ProductService,
    private lookupService:LookupService,private router:Router, private route: ActivatedRoute,private modalService: ModalService) {}


  ngOnInit(): void {
 
    this.initializeProductSearch();
    this.selectedItem=new Product();
  
    /////////////////////////////////////////
    this.route.queryParams.subscribe(params => {
      this.filterParam = params['filterParam'];
      console.log(this.filterParam);
      this.initializeProductSearch();
      if(this.filterParam)
      {
       
       if(this.filterParam.includes('room'))this.productSearch.roomid=Number(this.filterParam.split('_')[1]);
       if(this.filterParam.includes('style'))this.productSearch.styleid=Number(this.filterParam.split('_')[1]);
       if(this.filterParam.includes('store'))this.productSearch.storeid=Number(this.filterParam.split('_')[1]);
       if(this.filterParam.includes('district'))this.productSearch.districtid=Number(this.filterParam.split('_')[1]);
      }
     
      this.loadPopularProducts();
      ////////////////////////////////////////
      this.loadFavourites();


      if(this.filterParam && this.filterParam.includes('cat'))
        this.loadCategories(Number(this.filterParam.split('_')[1]));
      else 
      {
        this.loadCategories(0);
        this.loadProducts(true);
      }

      /////////////////////////////////////////
      
      //this.router.navigate([], {queryParams: {'filterParam': null,},queryParamsHandling: 'merge'})
    });

    
  }
  
  toggleShowCase(id:number)
  {
    this.spinner.show();
    this.showCaseService.addProductToShowCase(this.authenticationService.currentUserValue.id,id).subscribe((data: any) => {
      
      let timestamp=new Date().getTime();
      this.showCaseService.cartRefresh.next('refresh_'+timestamp);
      this.spinner.hide();},response => {
      console.error(response);
      this.spinner.hide();
    });
  }
  sortBy(event)
  {
    this.productSearch.orderdir=event.split('_')[1];
    this.productSearch.orderfield=event.split('_')[0];
    this.loadProducts(true);
   }
   toggleCaret(id)
   {
     this.toggle=(this.toggle!=id)?id:0;
   }
  initializeProductSearch()
  { 
    this.productSearch=new ProductSearch();
    this.productSearch.isactive=1;
    this.productSearch.orderdir="asc";
    this.productSearch.orderfield="name";
    this.productSearch.page=1;
    this.productSearch.pagesize=20;
    this.pageIndex=0;
    this.pageSize=20;
   
  }
  loadPopularProducts()
  {
    let tempSearch=new ProductSearch();
    tempSearch.isactive=1;
    tempSearch.orderdir="asc";
    tempSearch.orderfield="name";
    tempSearch.page=1;
    tempSearch.pagesize=4;
    tempSearch.isfeatured=1;
   
    this.productService.getProducts(this.productSearch).subscribe((data: any) => {
     
      this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_product;
      this.popularItems=data.results;
      this.datasource = this.productItems;
      this.length = data.stats.count;
      this.applyScripts();
      

      //this.notifyService.onLoadCompelete(loadID);
      //this.notifyService.onLoadCompelete(loadID);
      //this.notifyService.onSuccess("Operation Succeeded .. ", "Success");
       },response => {
          console.error(response);
     });
  }
  loadFavourites()
  {
    if(this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.id)
    {
      this.favouriteService.getProducts(this.authenticationService.currentUserValue.id).subscribe((data: any) => 
      {this.favouriteItems=data.results;},response => {console.error(response)});
    }
  }
  loadCategories(id)
  {
    this.categoryService.getCategoriesList().subscribe((data: any) => {this.categories=data.results?data.results:data;
    if(id>0){this.productSearch.categoryids=this.assignProductIds(id);
      this.loadProducts(true);
    }
    },response => {});
  }
 
  //-----------------------------------------------------------------------------------------------------
  pagingEvent(event?:PageEvent)
  {
    this.productSearch.page=event?event.pageIndex+1:this.productSearch.page;
    this.productSearch.pagesize=event?event.pageSize:this.productSearch.pagesize;
    this.loadProducts(false);
    
  }
  checkInFavourites(id):boolean
  {
    for(var i=0;i<this.favouriteItems.length;i++)
    {
      if(this.favouriteItems[i].id==id) return true;
    }
    return false;
  }
  toggleFavourite(id)
  {
    this.spinner.show();
    if(!this.checkInFavourites(id))
    {
        this.favouriteService.addProduct(this.authenticationService.currentUserValue.id,id)
        .subscribe((data: any) => {
          this.loadFavourites();
          this.spinner.hide();
        },response => {
          console.error(response);
          this.spinner.hide();
        });
    }

    else
    {
        this.favouriteService.removeProduct(this.authenticationService.currentUserValue.id,id)
        .subscribe((data: any) => {
          this.loadFavourites();
          this.spinner.hide();
        },response => {
          console.error(response);
          this.spinner.hide();
        });
    }
  }
 

  loadProducts(resetPaginator)
  {
    this.spinner.show();
    this.productService.getProducts(this.productSearch).subscribe((data: any) => {
      console.log(data.stats);
      //this.productItems=data.results;
      this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_productpic;
      this.productItems=data.results;
      this.datasource = this.productItems;
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
 
  changePaginationLanguage()
  {
    this.paginator._intl.itemsPerPageLabel = this.translateService.currentLang=='ar'? 'منتج في الصفحة': 'Items per page';
    this.paginator._intl.getRangeLabel=(page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return '0 ' + ' - ' + '0 [' + length+']';
      }
      length = Math.max(length, 0);
      const startIndex = ((page * pageSize) > length) ?
        (Math.ceil(length / pageSize) - 1) * pageSize:
        page * pageSize;
  
      const endIndex = Math.min(startIndex + pageSize, length);
      return startIndex + 1 + ' - ' + endIndex + ' '  + ' [' + length + ']';
    };
  }
  changeSearch(event)
  {
    let selectedId:String;
    selectedId=event.srcElement.id;
    if(selectedId.includes('cat'))
    {
      if(selectedId.split('_')[1]==="0")
       { delete this.productSearch.categoryid;
        delete this.productSearch.categoryids;
       }
      else
        
      {
        this.productSearch.categoryids=this.assignProductIds(Number(selectedId.split('_')[1]));
      }
    }
    //-------------------------------------
    if(selectedId.includes('room'))
    {
      if(selectedId.split('_')[1]==="0")
        delete this.productSearch.roomid;
      else
        this.productSearch.roomid=Number(selectedId.split('_')[1]);
    }
  //--------------------------------------
  if(selectedId.includes('style'))
  {
    if(selectedId.split('_')[1]==="0")
      delete this.productSearch.styleid;
    else
      this.productSearch.styleid=Number(selectedId.split('_')[1]);
  }
    //--------------------------------------
    if(selectedId.includes('district'))
    {
      if(selectedId.split('_')[1]==="0")
        delete this.productSearch.districtid;
      else
        this.productSearch.districtid=Number(selectedId.split('_')[1]);
    }
  //--------------------------------------
  if(selectedId.includes('store'))
  {
    if(selectedId.split('_')[1]==="0")
      delete this.productSearch.storeid;
    else
      this.productSearch.storeid=Number(selectedId.split('_')[1]);
  }
  
  this.productSearch.page=1;
  this.loadProducts(true);
   
  }
  pageChange(newPage: number) {
  }

 assignProductIds(id):string
 {
   let output=""+id;
   for(let i=0;i<this.categories.length;i++)
   {
      if(this.categories[i].id==id)
      {
          output=id+",";
          for(let j=0;j<this.categories[i].children.length;j++)
          {
            output+=this.categories[i].children[j].id+",";
          }
          output.substr(0,output.length-1);
        
      }
      
   }
   return output;
 }
  openQuickView(event)
  {
    
    this.selectedItem=event;
    this.openModal('Show', this.productModalTemplate); 
  }

  //////////////////////////////////////////////////////////////////////////////
  //Open Modal for Add/Edit
  openModal(modalContentType: string, template: any) {
    this.modalContentType = modalContentType;
    this.modalService.open(template);
  }
  /////////////////////////////////////////////
  onSliderChange(event: any) {
   console.log(event);
    this.productSearch.pricemin=event.value;
    this.productSearch.pricemax=event.highValue;
   this.productSearch.page=1;
  this.loadProducts(true);
    /*if (this.mySliderValue!== value) {
      this.mySliderValue= value;
      console.log('changed: ', value);
    }
    */
  }

  toggleCategory()
  {
    
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  applyScripts()
      {
        if (document.getElementById('main_gallery_js') !=null) {document.getElementById('main_gallery_js').remove();}
        const node = document.createElement('script');
        node.src = 'assets/js/main_gallery.js';
        node.type = 'text/javascript';
        node.async = false;
        node.id = 'main_gallery_js';
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
      }
}