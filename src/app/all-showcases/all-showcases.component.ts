import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ShowCaseService } from '../shared/api/showcase.service';
import { ShowCase } from '../shared/models/showcase.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-all-showcases',
  templateUrl: './all-showcases.component.html',
  styleUrls: ['./all-showcases.component.css']
})
export class AllShowcasesComponent implements OnInit {
  showCases:ShowCase[]=[];
  imgUrl:string;
  constructor(private showCaseService:ShowCaseService, 
    public translateService:TranslateService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadShowCases();
  }

  loadShowCases()
  {
    this.spinner.show();
    this.showCaseService.getAllShowCases().subscribe((data: any) => {
      this.imgUrl=data.stats? environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_showcase:null;
      this.showCases=data.results?data.results:data;
      console.log(this.showCases);
      this.spinner.hide();
    },response => {
      this.spinner.hide()}
    );
  }

}
