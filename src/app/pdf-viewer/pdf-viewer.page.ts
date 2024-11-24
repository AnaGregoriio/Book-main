
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { lastValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {
  pdfFiles: Array<{ name: string; url: string }> = []; // PDFs carregados do Firebase Storage
  library: Array<{ id?: string; name: string; url: string }> = []; // PDFs da biblioteca no Firestore
  isLoading: boolean = false; // Indicador de carregamento
  pdfUrl: string = ''; // URL do PDF a ser exibido
  pdfName: string = ''; // Nome do PDF

  constructor(
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadPdfFiles(); // Carrega PDFs do Firebase Storage
    this.loadLibraryFromFirestore(); // Carrega PDFs da biblioteca do Firestore

    // Obtém parâmetros da rota para exibir um PDF
    this.route.queryParams.subscribe((params) => {
      this.pdfUrl = decodeURIComponent(params['url'] || '');
      this.pdfName = params['name'] || 'Documento';

      if (!this.pdfUrl) {
        this.showToast('URL do PDF não encontrada.');
      }
    });
  }

  // Carrega PDFs do Firebase Storage
  async loadPdfFiles() {
    this.isLoading = true;
    const folderPath = 'books/';

    try {
      const result = await lastValueFrom(this.storage.ref(folderPath).listAll());
      if (result.items.length > 0) {
        this.pdfFiles = [];
        for (const item of result.items) {
          const pdfUrl = await lastValueFrom(
            this.storage.ref(`${folderPath}${item.name}`).getDownloadURL()
          );

          this.pdfFiles.push({ name: item.name, url: pdfUrl });
        }
        this.showToast('PDFs carregados com sucesso!');
      } else {
        this.showToast('Nenhum PDF encontrado no Firebase Storage.');
      }
    } catch (error) {
      console.error('Erro ao carregar PDFs do Firebase Storage:', error);
      this.showToast('Erro ao carregar PDFs do Firebase Storage.');
    } finally {
      this.isLoading = false;
    }
  }

  // Carrega a biblioteca do Firestore
  loadLibraryFromFirestore() {
    this.isLoading = true;
    this.firestoreService.getDocuments('library').subscribe(
      (data: any[]) => {
        this.library = data.map((doc) => ({
          id: doc.id,
          name: doc.name,
          url: doc.url,
        }));
        console.log('Biblioteca carregada do Firestore:', this.library);
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar biblioteca do Firestore:', error);
        this.showToast('Erro ao carregar biblioteca do Firestore.');
        this.isLoading = false;
      }
    );
  }

  // Adiciona PDF à biblioteca no Firestore
  async addToLibrary(pdf: { name: string; url: string }) {
    if (!pdf || !pdf.name || !pdf.url) {
      this.showToast('Dados do PDF inválidos.');
      return;
    }

    const exists = this.library.some((item) => item.name === pdf.name);

    if (!exists) {
      try {
        await this.firestoreService.addDocument('library', pdf);
        this.showToast(`PDF "${pdf.name}" adicionado à biblioteca com sucesso!`);
        this.loadLibraryFromFirestore(); // Recarrega a biblioteca após adicionar
      } catch (error) {
        console.error('Erro ao adicionar PDF à biblioteca:', error);
        this.showToast('Erro ao adicionar PDF à biblioteca.');
      }
    } else {
      this.showToast(`O PDF "${pdf.name}" já está na biblioteca.`);
    }
  }

  // Remove PDF da biblioteca
  async removeFromLibrary(pdfId: string) {
    if (!pdfId) {
      this.showToast('ID do PDF inválido.');
      return;
    }

    try {
      await this.firestoreService.deleteDocument('library', pdfId);
      this.showToast('PDF removido da biblioteca!');
      this.loadLibraryFromFirestore(); // Recarrega a biblioteca após remover
    } catch (error) {
      console.error('Erro ao remover PDF da biblioteca:', error);
      this.showToast('Erro ao remover PDF da biblioteca.');
    }
  }

  // Abre um PDF na visualização interna do app
  openPdf(pdf: { name: string; url: string }) {
    if (!pdf || !pdf.url) {
      this.showToast('URL do PDF não encontrada.');
      return;
    }

    this.router.navigate(['/pdf-viewer'], {
      queryParams: { url: encodeURIComponent(pdf.url), name: pdf.name },
    });
  }

  // Mostra uma mensagem Toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
