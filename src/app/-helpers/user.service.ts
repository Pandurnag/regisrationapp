import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_BASE_PATH: string = "https://localhost:4200/api/";

  constructor(private _httpService : HttpClient ) { }

  getUsers(){
    return this._httpService.get(this.API_BASE_PATH + "users");
  }
}
