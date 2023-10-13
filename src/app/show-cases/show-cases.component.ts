import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from 'src/environments/environment';
import { ShowCaseService } from '../shared/api/showcase.service';
import { ShowCase } from '../shared/models/showcase.model';
import { AuthenticationService } from '../shared/services/authentication.service';
@Component({
  selector: 'app-show-cases',
  templateUrl: './show-cases.component.html',
  styleUrls: ['./show-cases.component.css']
})
export class ShowCasesComponent implements OnInit {
  showCases:ShowCase[]=[];
  imgUrl:string;
  constructor(private showCaseService:ShowCaseService, 
    public authenticateService:AuthenticationService,
    public translateService:TranslateService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadShowCases();
  }

  loadShowCases()
  {
    this.spinner.show();
    this.showCaseService.getShowCasesByUserId(this.authenticateService.currentUserValue.id).subscribe((data: any) => {
      this.imgUrl=data.stats? environment.apiUrl.substr(0,environment.apiUrl.length-1)+data.stats.imagepath_showcase:
      environment.apiUrl.substr(0,environment.apiUrl.length-1)+'/uploads/showcase/';
     this.showCases=data.results?data.results:data;
      console.log(this.showCases);
      this.spinner.hide();
    },response => {
      this.spinner.hide()}
    );
  }

}
