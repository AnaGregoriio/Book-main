import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Certifique-se de que o caminho está correto
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  passwordVisible: boolean = false; // Controle de visibilidade da senha

  constructor(private authService: AuthService, private router: Router) {}

  // Função de login
  async login() {
    const success = await this.authService.login(this.username, this.password); // Chamando o serviço de login
    if (success) {
      this.router.navigateByUrl('/tabs/home'); // Navegar para a página inicial
    } else {
      alert('Credenciais incorretas!'); // Mensagem de erro
    }
  }

  // Alternar visibilidade da senha
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Alterna a visibilidade
  }

  // A função de login com Google deve ser implementada
  loginWithGoogle() {
    // Implementar lógica para login com Google
  }

  // A função de login com Facebook deve ser implementada
  loginWithFacebook() {
    // Implementar lógica para login com Facebook
  }


  // Navegar para a página de registro
  goToRegister() {
    this.router.navigateByUrl('/register'); // Navegar para a página de registro
  }
}
