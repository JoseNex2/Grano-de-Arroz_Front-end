import {Injectable, signal} from '@angular/core';
import { BatteryInterface } from '../../interfaces/batteryinterface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/develop.enviroment';
import {ClientsResponse} from "../../interfaces/client/ClientResponse";


@Injectable({
  providedIn: 'root'
})
export class BatteryService {

  private apiUrl = environment.apiUrl;

    batteriesByClientData = signal<any | null>(null);

    constructor(private http: HttpClient) {}

  postBattery(body: BatteryInterface): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/battery/registrybattery`, body);
  }

  getRatteriesByClientData(body: BatteryInterface): Observable<ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(`${this.apiUrl}/battery/batteriessearchwithfilter`, body);
  }

  getAllBateries(): Observable<ApiResponse<ClientsResponse>> {
        return this.http.get<ApiResponse<ClientsResponse>>(
            `${this.apiUrl}/battery/batteriessearch`
        );
  }

    fetchBatteriesByClientData(body: BatteryInterface) {
        this.http.post<ApiResponse<any>>(
            `${this.apiUrl}/battery/batteriessearchwithfilter`,
            body
        ).subscribe({
            next: (res) => {
                if (res.code === 200 && res.response) {
                    this.batteriesByClientData.set(res.response);
                } else {
                    this.batteriesByClientData.set(null);
                }
            },
            error: (err) => {
                console.error('Error cargando baterías filtradas:', err);
                this.batteriesByClientData.set(null);
            }
        });
    }



}