import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  password: string;
  editing?: boolean;
}

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent {
  users: User[] = [
    { username: 'Kenza', password: 'kenzachcespat' },
    { username: 'Balcar Admin', password: 'doudera' }
  ];

  addingNew: boolean = false;
  newUser: Partial<User> = {};

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/menu']);
  }

  addUser(): void {
    this.addingNew = true;
    this.newUser = {};
  }

  saveNewUser(): void {
    this.users.push({
      username: this.newUser.username || '',
      password: this.newUser.password || ''
    });
    this.addingNew = false;
    this.newUser = {};
  }

  cancelAdd(): void {
    this.addingNew = false;
    this.newUser = {};
  }

  toggleEdit(user: User): void {
    user.editing = !user.editing;
  }

  saveUser(user: User): void {
    user.editing = false;
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(u => u !== user);
  }

  resetPassword(user: User): void {
    alert(`Reset password for ${user.username}`);
  }
}
