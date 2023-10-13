import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class HttpRequestsService {
  private baseURL: string = environment.apiUrl;
 
  constructor(private http: HttpClient ) {
    console.log(this.baseURL);
  }

  getHTTPRequest(url: string): Observable<any> {
    return this.http.get(this.baseURL + url);
  }
  deleteHTTPRequest(url: string): Observable<any> {
    return this.http.delete(this.baseURL + url);
  }
  getByIdHTTPRequest(url: string, id: number): Observable<any> {
    console.log('url ' + (this.baseURL + url + `/${id}`));
    return this.http.get(this.baseURL + url + `/${id}`);
  }
  
  getHTTPRequestWithParameter(url: string, input: string): Observable<any> {
    console.log('url ' + (this.baseURL + url + `/${input}`));
    return this.http.get(this.baseURL + url + `/${input}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }

  postHTTPRequestText(url: string, postData: any): Observable<any> {
    // let jsonData = JSON.stringify(postData);
    // console.log('JSON Data: ' + jsonData);

    let options = { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Accept': 'application/json'})};

    return this.http.post(
      this.baseURL + url,
      postData,
      {responseType: 'text'}
    );
  }
  postHTTPRequest(url: string, postData: any): Observable<any> {
    // let jsonData = JSON.stringify(postData);
    // console.log('JSON Data: ' + jsonData);

    let options = { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Accept': 'application/json'})};

    return this.http.post(
      this.baseURL + url,
      postData,
      options
    );
  }

  postHTTPRequestFile(url: string, postData: any): Observable<any> {
    // let jsonData = JSON.stringify(postData);
    let options = { headers: new HttpHeaders({ 
      
      'Accept': 'application/json'})};

    return this.http.post(
      this.baseURL + url,
      postData,
      options
    );
  }

  putHTTPRequest(url: string, putData: any) {
    let options = { headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Accept': 'application/json'})};

    return this.http.put(
      this.baseURL + url,
      putData,
      options
    );
  }
}
