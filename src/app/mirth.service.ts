import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class MirthService {
    private apiUrl = `https://:8443/api`;
    private username = 'test';
    private password = 'test';
  
    constructor(private http: HttpClient) {}

    setDomain(domain:string):void {
        this.apiUrl=`https://${domain}:8443/api`
        console.log(this.apiUrl)
    }
  
    login() {
        let headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          });
          
        const body = new HttpParams()
            .set('username', 'admin')
            .set('password', 'admin');
        
        this.http.post(`${this.apiUrl}/users/_login`, body.toString(), { headers: headers, observe: 'response', withCredentials: true });
    }

    getServerSettings() {
        var headers_object = new HttpHeaders();
        headers_object.append("Authorization", "Basic " + btoa(`${this.username}:${this.password}`));

        const httpOptions = {
          headers: headers_object,
          withCredentials: true
        };

        return this.http.get(`${this.apiUrl}/server/settings`, httpOptions);
    }

    getJvm(){
        var headers_object = new HttpHeaders();
        headers_object.set("Authorization", "Basic " + btoa(`${this.username}:${this.password}`));

        return this.http.get(`${this.apiUrl}/server/jvm`, {headers: headers_object, withCredentials: true, responseType: 'text'});
    }

    getMirthVersion(){
        var headers_object = new HttpHeaders();
        headers_object.set("Authorization", "Basic " + btoa(`${this.username}:${this.password}`));

        return this.http.get(`${this.apiUrl}/server/version`, {headers: headers_object, withCredentials: true, responseType: 'text'});
    }

    getSystemInfo(){
        var headers_object = new HttpHeaders();
        headers_object.set("Authorization", "Basic " + btoa(`${this.username}:${this.password}`));

        return this.http.get(`${this.apiUrl}/system/info`, {headers: headers_object, withCredentials: true});
    }

    getSystemStats(){
        var headers_object = new HttpHeaders();
        headers_object.set("Authorization", "Basic " + btoa(`${this.username}:${this.password}`));

        return this.http.get(`${this.apiUrl}/system/stats`, {headers: headers_object, withCredentials: true});
    }

    getDataPrunerStatus(){
        var headers_object = new HttpHeaders();
        headers_object.set("Authorization", "Basic " + btoa(`${this.username}:${this.password}`));

        return this.http.get(`${this.apiUrl}/extensions/Data%20Pruner/properties`, {headers: headers_object, withCredentials: true});
    }
  }