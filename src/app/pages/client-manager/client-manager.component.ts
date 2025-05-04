import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService, Client } from '../../services/clients.service'; // adjust import path if needed

interface EditableClient extends Client {
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
export class ClientManagerComponent implements OnInit {
  computers: EditableClient[] = [];
  addingNew = false;
  newComputer: Partial<EditableClient> = {};

  constructor(private router: Router, private clientService: ClientsService) {}

  ngOnInit(): void {
    console.log('ClientManagerComponent loaded');
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(data => {
      this.computers = data.map(c => ({
        ...c,
        status: 'Online',  // Default or fetched value
        editing: false
      }));
    });
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }

  addComputer(): void {
    this.addingNew = true;
    this.newComputer = {};
  }

  saveNewComputer(): void {
    if (this.newComputer.name && this.newComputer.ip) {
      const status = this.newComputer.status || 'Offline';
      this.clientService.create({
        name: this.newComputer.name,
        ip: this.newComputer.ip,
        status: status
      }).subscribe(() => {
        this.addingNew = false;
        this.newComputer = {};
        this.loadClients();
      });
    }
  }

  cancelAdd(): void {
    this.addingNew = false;
    this.newComputer = {};
  }

  filterIp(event: any): void {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
  }

  toggleEdit(client: EditableClient): void {
    client.editing = !client.editing;
  }

  saveComputer(client: EditableClient): void {
    this.clientService.update(client).subscribe(() => {
      client.editing = false;
      this.loadClients();
    });
  }

  deleteComputer(client: EditableClient): void {
    this.clientService.delete(client.id).subscribe(() => {
      this.loadClients();
    });
  }
}

