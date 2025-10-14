import {Injectable} from '@angular/core';
import {BatteryInterface} from "../../interfaces/batteryinterface";
import {Observable} from "rxjs";
import {ApiResponse} from "../../interfaces/api-response";
import {environment} from "../../../../enviroments/develop.enviroment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generateReport(chipId: string): Observable<ApiResponse<any>> {
    const body = { ChipId: chipId };
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/report/reportcreate`, body);
  }
}

