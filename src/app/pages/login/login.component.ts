import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin(event: Event): void {
    event.preventDefault();
    if (!this.username || !this.password) {
      alert('Please enter both username and password.');
      return;
    }
    console.log('Logging in with:', this.username, this.password);
    // Navigate to the menu after a successful login.
    this.router.navigate(['/menu']);
  }
}
