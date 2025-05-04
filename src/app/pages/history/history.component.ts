import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  searchTerm = '';

  // Example data to match your wireframe.
  // Each record can have multiple source & target entries.
  historyRecords = [
    {
      client: 'PC1',
      user: 'Kenza',
      type: 'Full',
      timestamp: '9:00:00',
      source: ['C:\\Users\\Kenza\\Fofy\\Kocicek'],
      target: ['C:\\Backup']
    },
    {
      client: 'PC1',
      user: 'Kenza',
      type: 'Full',
      timestamp: '10:00:00',
      source: ['C:\\Users\\Kenza\\Fofy\\Kocicek'],
      target: ['C:\\Backup']
    },
    {
      client: 'PC1',
      user: 'Kenza',
      type: 'Incremental',
      timestamp: '12:38:36',
      source: ['C:\\Users\\Kenza\\Fofy\\Kocicek'],
      target: ['C:\\Backup']
    },
    {
      client: 'Server',
      user: 'Administrator',
      type: 'Differential',
      timestamp: '22:16:02',
      source: ['C:\\Sys'],
      target: ['D:\\Sys']
    }
  ];

  constructor(private router: Router) {}

  // Simple back button to return to the menu
  goBack(): void {
    this.router.navigate(['/menu']);
  }

  // Optional: If you want to actually filter by searchTerm,
  // you'd do so in the template or in a getter.
  // For now, we'll keep it as a placeholder.
}
