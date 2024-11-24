import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor(private storage: Storage) {}

  // Inicializa o armazenamento e verifica o estado de login
  async init() {
    await this.storage.create();
    const loggedInUser = await this.storage.get('loggedInUser');
    this.isLoggedIn = !!loggedInUser; // Atualiza o estado de autenticação
  }

  // Função de login
  async login(username: string, password: string): Promise<boolean> {
    const user = await this.storage.get('user'); // Recupera os dados do usuário
    if (user && user.username === username && user.password === password) {
      await this.storage.set('loggedInUser', username); // Armazena o usuário logado
      this.isLoggedIn = true;
      return true; // Login bem-sucedido
    }
    return false; // Falha no login
  }

  // Função de registro
  async register(username: string, password: string): Promise<boolean> {
    const existingUser = await this.storage.get('user');
    if (existingUser) {
      return false; // Retorna falso se o usuário já estiver registrado
    }
    // Armazena o novo usuário
    await this.storage.set('user', { username, password });
    await this.storage.set('loggedInUser', username); // Armazena o usuário logado
    this.isLoggedIn = true;
    return true; // Registro bem-sucedido
  }

  // Função de logout
  async logout() {
    await this.storage.remove('loggedInUser'); // Remove o usuário logado do storage
    this.isLoggedIn = false;
  }

  // Retorna o estado de login
  async isUserLoggedIn(): Promise<boolean> {
    return this.isLoggedIn;
  }

  // Define o estado de login
  setLoggedIn(status: boolean) {
    this.isLoggedIn = status;
  }
}
