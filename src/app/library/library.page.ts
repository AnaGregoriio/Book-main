import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  pdfFiles: Array<{ name: string; url: string }> = []; // PDFs carregados do Firebase Storage
  library: Array<{ id?: string; name: string; url: string }> = []; // PDFs na biblioteca (Firestore)
  selectedPdf: { name: string; url: string } | null = null; // PDF atualmente aberto
  isLoading: boolean = false; // Indicador de carregamento

  constructor(
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadLibraryFromFirestore(); // Carrega a biblioteca do Firestore ao iniciar
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
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar biblioteca do Firestore:', error);
        this.showToast('Erro ao carregar a biblioteca. Tente novamente.');
        this.isLoading = false;
      }
    );
  }

  // Adiciona um PDF à biblioteca do Firestore
  async addToLibrary(pdf: { name: string; url: string }) {
    const exists = this.library.some((item) => item.name === pdf.name);

    if (!exists) {
      try {
        await this.firestoreService.addDocument('library', pdf);
        this.showToast(`PDF "${pdf.name}" adicionado à biblioteca com sucesso!`);
        this.loadLibraryFromFirestore();
      } catch (error) {
        console.error('Erro ao adicionar PDF à biblioteca:', error);
        this.showToast('Erro ao adicionar PDF. Tente novamente.');
      }
    } else {
      this.showToast(`O PDF "${pdf.name}" já está na biblioteca.`);
    }
  }

  // Remove um PDF da biblioteca
  async removeFromLibrary(pdfId: string) {
    try {
      await this.firestoreService.deleteDocument('library', pdfId);
      this.showToast('PDF removido da biblioteca com sucesso!');
      this.loadLibraryFromFirestore();
    } catch (error) {
      console.error('Erro ao remover PDF da biblioteca:', error);
      this.showToast('Erro ao remover PDF. Tente novamente.');
    }
  }

  // Abre um PDF para visualização diretamente
  openPdf(pdf: { name: string; url: string }) {
    if (!pdf.url || !pdf.url.startsWith('http')) {
      this.showToast('URL do PDF inválida ou não encontrada.');
      return;
    }
    window.open(pdf.url, '_system');// Abre o PDF diretamente no navegador
  }

  // Fecha o PDF atualmente aberto
  closePdf() {
    this.selectedPdf = null; // Limpa o PDF selecionado
  }

  // Seleciona um arquivo para upload e adiciona à biblioteca
  selectFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf'; // Apenas arquivos PDF
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const folderPath = 'books/';
          const filePath = `${folderPath}${file.name}`;
          const fileRef = this.storage.ref(filePath);

          // Faz o upload do arquivo para o Firebase Storage
          const task = this.storage.upload(filePath, file);
          await task.snapshotChanges().toPromise();

          // Obtém a URL de download do arquivo
          const pdfUrl = await lastValueFrom(fileRef.getDownloadURL());

          // Adiciona o PDF à biblioteca
          const pdfData = { name: file.name, url: pdfUrl };
          this.addToLibrary(pdfData);

          this.showToast(`PDF "${file.name}" carregado e adicionado à biblioteca com sucesso!`);
        } catch (error) {
          console.error('Erro ao carregar arquivo:', error);
          this.showToast('Erro ao carregar arquivo. Tente novamente.');
        }
      } else {
        this.showToast('Nenhum arquivo selecionado.');
      }
    };
    input.click();
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
