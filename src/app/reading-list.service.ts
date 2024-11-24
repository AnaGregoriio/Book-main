import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReadingListService {
  private books: any[] = []; // Lista de livros armazenada localmente

  getBooks() {
    return this.books;
  }

  addBook(book: any) {
    this.books.push(book);
  }

  removeBook(book: any) {
    this.books = this.books.filter((b) => b !== book);
  }
}
