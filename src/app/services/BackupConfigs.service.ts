// src/app/services/backup-config.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BackupConfig {
  id?: number;
  method: string;
  retentionCount: number;
  retentionSize: number;
  cronTiming: string;
}

@Injectable({ providedIn: 'root' })
export class BackupConfigService {
  private url = 'http://localhost:5114/api/backupconfigs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BackupConfig[]> {
    return this.http.get<BackupConfig[]>(this.url);
  }

  get(id: number): Observable<BackupConfig> {
    return this.http.get<BackupConfig>(`${this.url}/${id}`);
  }

  create(cfg: BackupConfig): Observable<BackupConfig> {
    return this.http.post<BackupConfig>(this.url, cfg);
  }

  update(id: number, cfg: BackupConfig): Observable<BackupConfig> {
    return this.http.put<BackupConfig>(`${this.url}/${id}`, cfg);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
