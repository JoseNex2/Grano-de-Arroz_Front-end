import { Injectable } from '@angular/core';
import {environment} from '../../../../enviroments/develop.enviroment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/api-response';
import {UserInterface} from '../../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse<UserInterface[]>> {
    return this.http.get<ApiResponse<UserInterface[]>>(`${this.apiUrl}/access/userssearch`);
  }

  createUser(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/access/registry`, body);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/access/userdelete?id=${id}`, {});
  }

}

