import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { adminGuard } from './core/auth/guards/admin.guard';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { UserDashboardComponent } from './components/pages/dashboard/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/pages/dashboard/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
    { path: 'admindashboard', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },

    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' }
];
