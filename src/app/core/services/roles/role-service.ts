import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {ApiResponse} from "../../interfaces/api-response";
import {UserInterface} from "../../interfaces/userInterface";
import {environment} from "../../../../enviroments/develop.enviroment";
import {HttpClient} from "@angular/common/http";
import {mapRolesForDropdown} from "../../mappers/roleMap";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/Access/RolesSearch`);
  }
}
