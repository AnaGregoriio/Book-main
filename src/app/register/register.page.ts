import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private storage: Storage, private router: Router) {
    this.init(); // Chama a função de inicialização
  }

  async init() {
    // Inicializa o Ionic Storage
    await this.storage.create();
  }

  async register() {
    // Verifica se a senha e a confirmação são iguais
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!'); // Mensagem de erro
      return;
    }

    // Armazenar usuário no storage
    await this.storage.set('user', { email: this.email, password: this.password });
    await this.storage.set('loggedInUser', this.email); // Armazenar o nome do usuário
    alert('Usuário registrado com sucesso!'); // Mensagem de sucesso
    this.router.navigateByUrl('/home'); // Redirecionar para a página inicial
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirecionar para a página de login
  }
}

