import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { BackupManagerComponent } from './pages/backup-manager/backup-manager.component';
import { ClientManagerComponent } from './pages/client-manager/client-manager.component';
import { HistoryComponent } from './pages/history/history.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { ConfigComponent } from './pages/config/config.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'backup-manager', component: BackupManagerComponent },
  { path: 'client-manager', component: ClientManagerComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'user-manager', component: UserManagerComponent },
  { path: 'config/:id', component: ConfigComponent },
  { path: '**', redirectTo: '' }
];
