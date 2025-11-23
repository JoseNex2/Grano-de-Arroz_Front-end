import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientStore {
  readonly selectedClientId = signal<number | null>(null);

  setSelectedClientId(id: number | null): void {
    this.selectedClientId.set(id);
  }

  clear(): void {
    this.selectedClientId.set(null);
  }
}
