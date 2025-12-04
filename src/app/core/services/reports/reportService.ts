import {Injectable, signal} from '@angular/core';
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

  reportsByData = signal<any | null>(null);

  currentAnalisis = signal<any | null>(null);

  constructor(private http: HttpClient) {}

  generateReport(chipId: string): Observable<ApiResponse<any>> {
    const body = { ChipId: chipId };
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/report/reportcreate`, body);
  }

  getReportByData(body: any ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/report/reportssearch`, body);
  }

  getIdReportToAnalize(reportId: string | number): Observable<ApiResponse<any>> {
    const params = { reportId: String(reportId) };
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/report/reportgetbyid`, { params });
  }

  updateMeasurementReport(body: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
        `${this.apiUrl}/report/updatemeasurementreport`,
        body
    );
  }

  getAllReports(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/report/getreporthistory`);
  }

}