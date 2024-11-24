import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  bookId: string | null = null; // Inicialização correta

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('bookId'); // Obtendo o ID do livro da rota
    // Aqui você pode buscar os detalhes do livro usando o bookId
  }
}
