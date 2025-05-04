import { Injectable } from '@angular/core';

// Defines the Backup interface.
export interface Backup {
  id: number;
  backupName: string;
  createdBy: string;
  runningOn: string;
  source: string;
  target: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  // The local array that stores backup information.
  private backups: Backup[] = [
    {
      id: 1,
      backupName: 'Kenza Backup',
      createdBy: 'Kenza',
      runningOn: 'PC1',
      source: 'C:\\VideaSKocickama',
      target: 'D:\\mnau'
    },
    {
      id: 2,
      backupName: 'Podnik',
      createdBy: 'Balcar Podnikatel',
      runningOn: 'Server1',
      source: 'C:\\Source',
      target: 'D:\\Target'
    }
  ];

  // Returns the current backups.
  getBackups(): Backup[] {
    return this.backups;
  }

  // Returns a backup with the given ID.
  getBackupById(id: number): Backup | undefined {
    return this.backups.find(b => b.id === id);
  }

  // Adds a new backup to the array.
  addBackup(backup: Backup): void {
    this.backups.push(backup);
  }

  // Updates an existing backup.
  updateBackup(updated: Backup): void {
    const index = this.backups.findIndex(b => b.id === updated.id);
    if (index !== -1) {
      this.backups[index] = updated;
    }
  }

  // Deletes a backup by its ID.
  deleteBackup(id: number): void {
    this.backups = this.backups.filter(b => b.id !== id);
  }
}
