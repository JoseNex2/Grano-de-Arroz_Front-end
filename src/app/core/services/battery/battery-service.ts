import {Injectable, signal} from '@angular/core';
import { BatteryInterface } from '../../interfaces/batteryinterface';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // Convenience: search batteries by data using only ChipId
  getBatteriesByDataFromChipId(chipId: string): Observable<ApiResponse<any>> {
        const body = { ChipId: chipId } as any;
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

    getBatteriesById(id: string[]): Observable<ApiResponse<any>> {
        let params = new HttpParams();
        if (Array.isArray(id)) {
            id.filter(v => v != null && v !== '').forEach(v => {
                params = params.append('id', String(v));
            });
        } else if (id != null as any) {
            params = params.set('id', String(id as any));
        }
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/battery/batterysearchwithid`, { params });
    }

    getBatteriesByUserId(id: number): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(
            `${this.apiUrl}/battery/batterysearchbyclientid`,
            { params: { ClientId: id } }
        );
    }

    getPercentsOfAnalisis(): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/battery/getbatteryanalysispercentageasync`);
    }

    getMetricsSelled(): Observable<ApiResponse<any>> {
        return this.http.get<ApiResponse<any>>(`${this.apiUrl}/battery/getbatterymetricsporcentageasync`);
    }
}