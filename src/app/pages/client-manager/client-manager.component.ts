import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Computer {
  name: string;
  ip: string;
  status: string;
  editing?: boolean;
}

@Component({
  selector: 'app-client-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-manager.component.html',
  styleUrls: ['./client-manager.component.css']
})
export class ClientManagerComponent {
  // Local array of computers
  computers: Computer[] = [
    { name: 'PC1', ip: '192.168.1.101', status: 'Online' },
    { name: 'PC2', ip: '192.168.1.102', status: 'Offline' },
    { name: 'Server1', ip: '192.168.1.201', status: 'Online' }
  ];

  addingNew: boolean = false;
  newComputer: Partial<Computer> = {};

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/menu']);
  }

  // Start adding a new computer
  addComputer(): void {
    this.addingNew = true;
    this.newComputer = {};
  }

  // Save new computer
  saveNewComputer(): void {
    this.computers.push({
      name: this.newComputer.name || '',
      ip: this.newComputer.ip || '',
      status: this.newComputer.status || 'Offline'
    });
    this.addingNew = false;
    this.newComputer = {};
  }

  cancelAdd(): void {
    this.addingNew = false;
    this.newComputer = {};
  }

  // Vyfiltruje jen na cisla v ip.
  filterIp(event: any): void {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
  }

  toggleEdit(computer: Computer): void {
    computer.editing = !computer.editing;
  }

  saveComputer(computer: Computer): void {
    computer.editing = false;
  }

  deleteComputer(computer: Computer): void {
    this.computers = this.computers.filter(c => c !== computer);
  }
}
