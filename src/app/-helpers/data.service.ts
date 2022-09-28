import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let users: User[] = [
      { id: 1, title: 'Mr', firstName: 'Pandurang', lastName: 'Hande', dob: '1989-08-01', email: 'panduranghande502@gmail.com', password: 'Pandu@1234', acceptTerms: true },
      { id: 2, title: 'Mr', firstName: 'Vaijenath', lastName: 'Hande', dob: '19893-08-01', email: 'vaijenathhande502@gmail.com', password: '123456', acceptTerms: true }
    ];

    return { users };
  }

}
