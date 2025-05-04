import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackupService, Backup } from '../../services/backup.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  backupId!: number;
  backup?: Backup;

  // Model fields for configuration
  backupType = 'Full';
  retentionCount = 0;
  retentionSize = 0;
  source = '';
  target = '';

  availableBackupTypes: string[] = ['Full', 'Differential', 'Incremental'];

  constructor(private router: Router, private route: ActivatedRoute, private backupService: BackupService) {}

  ngOnInit(): void {
    // Get backup ID from route parameters
    this.backupId = Number(this.route.snapshot.paramMap.get('id'));
    this.backup = this.backupService.getBackupById(this.backupId);
    if (this.backup) {
      this.source = this.backup.source;
      this.target = this.backup.target;
    }
  }

  // Navigate back to backup Manager page
  goBack(): void {
    this.router.navigate(['/backup-manager']);
  }

  // Save the configuration and update the backup
  saveConfig(): void {
    if (this.backup) {
      this.backup.source = this.source;
      this.backup.target = this.target;
      this.backupService.updateBackup(this.backup);
    }
    this.router.navigate(['/backup-manager']);
  }
}
