import { ElementRef, SimpleChange, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CategoryService } from '../shared/api/category.service';
import { LookupService } from '../shared/api/lookup.service';

import { Category } from '../shared/models/category.model'; 

import { Store } from '../shared/models/store.model';
import { StoreSearch } from '../shared/models/storesearch.model';
import { Room } from '../shared/models/room.model';
import { Style } from '../shared/models/style.model';
import { StoreService } from '../shared/api/store.service';
import { ModalService } from '../shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { District } from '../shared/models/district.model';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})

export class StoresListComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('popUp') popUp: ElementRef;
  @ViewChild('storePopup', { static: false }) storeModalTemplate: TemplateRef<any>;
  
  categories: Category[] = [];
  storeSearch: StoreSearch;
  districts: District[] = [];
  styles: Style[] = [];
  stores: StoreService[] = [];
  storeItems: Store[] = [];
  popularItems: Store[] = [];
  imgUrl: String;
  storesCount: Number;
  config: any;
  pageOfItems: Array<any>;
  pageEvent: PageEvent;
  datasource: any;
  pageIndex:Number;
  pageSize:Number;
  length:Number;
  filterParam:String;
  modalContentType:String;
  selectedItem:Store;
  constructor(public translateService:TranslateService,    
    private spinner: NgxSpinnerService,private categoryService:CategoryService,private storeService:StoreService,
    private lookupService:LookupService,private router:Router, private route: ActivatedRoute,private modalService: ModalService) {}


  ngOnInit(): void {
 
    this.initializestoreSearch();
    this.selectedItem=new Store();
    /////////////////////////////////////////
    this.route.queryParams.subscribe(params => {
      this.filterParam = params['filterParam'];
      this.initializestoreSearch();
      if(this.filterParam)
      {
       if(this.filterParam.includes('district'))this.storeSearch.districtid=Number(this.filterParam.split('_')[1]);
       if(this.filterParam.includes('style'))this.storeSearch.styleid=Number(this.filterParam.split('_')[1]);
      }
      
     
      ////////////////////////////////////////

      this.loadStyles();
      /////////////////////////////////////////
      this.loadstores(true);
      //this.router.navigate([], {queryParams: {'filterParam': null,},queryParamsHandling: 'merge'})
    });

    
  }

 
  initializestoreSearch()
  { 
    this.storeSearch=new StoreSearch();
    //this.storeSearch.isactive=1;
    this.storeSearch.page=1;
    this.storeSearch.pagesize=20;
    this.pageIndex=0;
    this.pageSize=20;
   
  }
  
  loadStyles()
  {
    this.lookupService.getStylesList().subscribe((datal: any) => {this.styles=datal;
      this.loadDistricts();
      
    },response => {});
  }
  loadDistricts()
  {
    this.lookupService.getDistrictsList().subscribe((data: any) => {this.districts=data;
    
    this.applyScripts();},response => {});
  }
  
  //-----------------------------------------------------------------------------------------------------
  pagingEvent(event?:PageEvent)
  {
    console.log(event);
    this.storeSearch.page=event?event.pageIndex+1:this.storeSearch.page;
    this.storeSearch.pagesize=event?event.pageSize:this.storeSearch.pagesize;
    this.loadstores(false);
  }
  loadstores(resetPaginator)
  {
    this.spinner.show();
    console.log(this.storeSearch);
    this.storeService.getStoresListFiltered(this.storeSearch).subscribe((data: any) => {
      console.log(data.results);
      //this.storeItems=data.results;
      this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_store;
      this.storeItems=data.results;
      this.datasource = this.storeItems;
      this.length = data.stats.count;
      if(resetPaginator)this.paginator.firstPage();
      this.spinner.hide();
      
      //this.notifyService.onLoadCompelete(loadID);
      //this.notifyService.onLoadCompelete(loadID);
      //this.notifyService.onSuccess("Operation Succeeded .. ", "Success");
       },response => {
        this.spinner.hide();
          console.error(response);
     });
  }
 
  changePaginationLanguage()
  {
    console.log(this.translateService.currentLang);
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
    //-------------------------------------
    if(selectedId.includes('district'))
    {
      if(selectedId.split('_')[1]==="0")
        delete this.storeSearch.districtid;
      else
        this.storeSearch.districtid=Number(selectedId.split('_')[1]);
    }
  //--------------------------------------
  if(selectedId.includes('style'))
  {
    if(selectedId.split('_')[1]==="0")
      delete this.storeSearch.styleid;
    else
      this.storeSearch.styleid=Number(selectedId.split('_')[1]);
  }
 
  
  this.storeSearch.page=1;
  this.loadstores(true);
   
  }
  pageChange(newPage: number) {
    console.log(newPage);
  }


  openQuickView(event)
  {
    for(let i=0;i<this.storeItems.length;i++)
    {
      this.selectedItem=(this.storeItems[i].id==event)?this.storeItems[i]:this.selectedItem;
    }
    this.openModal('Show', this.storeModalTemplate); 
  }

  //////////////////////////////////////////////////////////////////////////////
  //Open Modal for Add/Edit
  openModal(modalContentType: string, template: any) {
    this.modalContentType = modalContentType;
    this.modalService.open(template);
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