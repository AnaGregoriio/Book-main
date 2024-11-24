import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReadingListService } from '../reading-list.service'; // Importando o serviço de leitura

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  searchTerm: string = '';
  books: any[] = [];
  loading: boolean = false;

  constructor(private http: HttpClient, private readingListService: ReadingListService) {} // Injetando o serviço

  // Função para buscar livros da API do Google Books
  searchBooks() {
    if (this.searchTerm.trim() === '') return;
    this.loading = true;
    this.http
      .get(`https://www.googleapis.com/books/v1/volumes?q=${this.searchTerm}`)
      .subscribe((response: any) => {
        this.books = response.items || [];
        this.loading = false;
      }, (error) => {
        console.error('Erro ao buscar livros:', error);
        this.loading = false;
      });
  }

  // Função para adicionar um livro à lista de leitura
  addToLibrary(book: any) {
    this.readingListService.addBook(book);
    alert(`${book.volumeInfo.title} foi adicionado à sua biblioteca!`);
  }
}
