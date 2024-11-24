import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Obtém documentos de uma coleção específica
  getDocuments(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges({ idField: 'id' });
  }

  // Adiciona um documento a uma coleção específica
  addDocument(collection: string, data: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(collection).doc(id).set(data);
  }

  // Deleta um documento pelo ID em uma coleção
  deleteDocument(collection: string, id: string): Promise<void> {
    return this.firestore.collection(collection).doc(id).delete();
  }
}
