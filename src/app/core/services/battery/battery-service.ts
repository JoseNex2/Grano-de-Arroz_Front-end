import { Injectable } from '@angular/core';
import { BatteryInterface } from '../../interfaces/batteryinterface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/develop.enviroment';


@Injectable({
  providedIn: 'root'
})
export class BatteryService {

    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

   postBattery(body: BatteryInterface): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/battery/registrybattery`, body);
  }
  }

