import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Certifique-se de que o AuthService existe e está implementado

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isUserLoggedIn(); // Supondo que o AuthService tem este método
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redireciona para login se o utilizador não estiver autenticado
      return false;
    }
    return true;
  }
}
