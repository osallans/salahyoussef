import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FavouriteService } from '../shared/api/favourite.service';
import { Product } from '../shared/models/product.model';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { NotifyService } from '../shared/services/notify.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  products:Product[]=[];
  imgUrl:string;
  constructor(
    public authenticationService:AuthenticationService,
    private favouriteService:FavouriteService, public translateService:TranslateService,public notifyService:NotifyService,

    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadFavourites();
  }

  loadFavourites()
  {
    this.spinner.show();
    this.favouriteService.getProducts(this.authenticationService.currentUserValue.id).subscribe((datal: any) => {
      console.log(datal);
      this.imgUrl=environment.apiUrl.substr(0,environment.apiUrl.length-1)+"/uploads/product/";
      //datal.stats.imagepath_product;
      this.products=datal.results;
      this.spinner.hide();
    },response => {
      this.notifyService.onError(this.translateService.instant('registration_error'),this.translateService.instant('error'));
      this.spinner.hide()}
    );
  }
  removeProduct(id)
  {
    this.spinner.show();
    this.favouriteService.removeProduct(this.authenticationService.currentUserValue.id,id).subscribe((datal: any) => {
      this.spinner.hide();
      this.loadFavourites();
    },response => {
      this.spinner.hide()}
    );
  }
}
