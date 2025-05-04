import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackupService, Backup } from '../../services/backup.service';

@Component({
  selector: 'app-backup-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backup-manager.component.html',
  styleUrls: ['./backup-manager.component.css']
})
export class BackupManagerComponent {
  // holds the backup list from the service.
  backups: Backup[] = [];
  addingNew: boolean = false;

  newBackupName = '';
  newCreatedBy = '';
  newRunningOn = '';

  // Example dropdown
  availableComputers: string[] = ['PC1', 'PC2', 'Server1'];
  availableUsers: string[] = ['Kenza', 'Balcar Podnikatel'];

  constructor(private router: Router, private backupService: BackupService) {}

  ngOnInit(): void {
    // Load the backup list from the service.
    this.backups = this.backupService.getBackups();
  }

  // Navigace menu menu.
  goBack(): void {
    this.router.navigate(['/menu']);
  }

  // Start adding a new backup
  addBackup(): void {
    this.addingNew = true;
    this.newBackupName = '';
    this.newCreatedBy = '';
    this.newRunningOn = '';
  }

  // Save new backup in the service
  saveNewBackup(): void {
    const nextId = this.backups.length ? Math.max(...this.backups.map(b => b.id)) + 1 : 1;
    const newBackup: Backup = {
      id: nextId,
      backupName: this.newBackupName,
      createdBy: this.newCreatedBy,
      runningOn: this.newRunningOn,
      source: '', // To be set in the config page.
      target: ''
    };
    this.backupService.addBackup(newBackup);
    this.backups = this.backupService.getBackups();
    this.addingNew = false;
  }

  // Cancel add form
  cancelAdd(): void {
    this.addingNew = false;
  }

  // Navigovat do configu
  editBackup(backup: Backup): void {
    this.router.navigate(['/config', backup.id]);
  }

  // odstranit backup pomoci service
  deleteBackup(backup: Backup): void {
    this.backupService.deleteBackup(backup.id);
    this.backups = this.backupService.getBackups();
  }
}
