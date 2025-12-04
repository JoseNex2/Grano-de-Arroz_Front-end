import {ClientInterface} from "../clientinterface";

export interface ClientsResponse {
    clients: ClientInterface[];
    totalClients: number;
}