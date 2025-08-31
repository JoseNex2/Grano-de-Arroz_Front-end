import { Injectable } from '@angular/core';
import {environment} from '../../../../enviroments/develop.enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //falta interfaz user

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Access/UsersSearch`);
  }

}
