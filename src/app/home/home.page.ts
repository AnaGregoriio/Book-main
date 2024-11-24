import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReadingListService } from '../reading-list.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  Books: any[] = [];
  isLoggedIn: boolean = false; // Variável para verificar se o usuário está logado

  constructor(
    private http: HttpClient,
    private readingListService: ReadingListService,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.fetchBooks();
    this.checkLoginStatus(); // Verifica o status de login ao iniciar
  }

  fetchBooks() {
    this.http.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10').subscribe(
      (response: any) => {
        this.Books = response.items || [];
        console.log('Livros carregados:', this.Books);
      },
      (error) => {
        console.error('Erro ao buscar livros:', error);
      }
    );
  }

  async checkLoginStatus() {
    const loggedInUser = await this.storage.get('loggedInUser');
    this.isLoggedIn = !!loggedInUser; // Define isLoggedIn como verdadeiro se o usuário estiver logado
  }

  async addToReadingList(book: any) {
    if (!this.isLoggedIn) {
      this.goToLogin(); // Se o usuário não estiver autenticado, redireciona para a página de login
      return;
    }

    const user = await this.storage.get('user');
    if (user && user.token) {
      // Se o usuário estiver autenticado, adiciona o livro
      this.readingListService.addBook(book);
      console.log('Livro adicionado à lista de leitura:', book);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  async goToDetails(book: any) {
    const user = await this.storage.get('user');
    if (user && user.token) {
      // Se o usuário estiver autenticado, redireciona para a página de detalhes
      this.router.navigate(['/details', { bookId: book.id }]);
    } else {
      this.goToLogin(); // Se o usuário não estiver autenticado, redireciona para a página de login
    }
  }
}
