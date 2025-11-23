import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/develop.enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../../interfaces/api-response";
import { ClientInterface } from "../../interfaces/clientinterface";
import {ClientsResponse} from "../../interfaces/client/ClientResponse";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getClients(): Observable<ApiResponse<ClientsResponse>> {
        return this.http.get<ApiResponse<ClientsResponse>>(
            `${this.apiUrl}/client/clientssearch`
        );
    }

    createClient(body: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/client/registryclient`, body);
    }

    updateClient(id: number, body: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/client/clientupdate?id=${id}`, body);
    }

    getClientById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/client/clientsearch`, {
            params: { id: id }
        });
    }

}