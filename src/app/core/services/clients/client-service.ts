import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/develop.enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../../interfaces/api-response";
import { ClientInterface } from "../../interfaces/clientinterface";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getClients(): Observable<ApiResponse<ClientInterface[]>> {
        return this.http.get<ApiResponse<ClientInterface[]>>(`${this.apiUrl}/Client/ClientsSearch`);
    }

    createClient(body: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/Client/registryClient`, body);
    }
}