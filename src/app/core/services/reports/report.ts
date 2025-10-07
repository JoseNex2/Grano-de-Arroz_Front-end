import {Injectable} from '@angular/core';
import {BatteryInterface} from "../../interfaces/batteryinterface";
import {Observable} from "rxjs";
import {ApiResponse} from "../../interfaces/api-response";
import {environment} from "../../../../enviroments/develop.enviroment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Report {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


}

