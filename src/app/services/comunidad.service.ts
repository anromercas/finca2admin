import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IComunidad } from '../models/IComunidad';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  private comunidadCollection: AngularFirestoreCollection<IComunidad>;
  private comunidades: Observable<IComunidad[]>;

  constructor( db: AngularFirestore) {
    this.comunidadCollection = db.collection<IComunidad>('comunidad');
    this.comunidades = this.comunidadCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getcomunidades() {
    return this.comunidades;
  }

  getComunidad(id) {
    return this.comunidadCollection.doc<IComunidad>(id).valueChanges();
  }

  updateTodo(comunidad: IComunidad, id: string) {
    return this.comunidadCollection.doc(id).update(comunidad);
  }

  addTodo(comunidad: IComunidad) {
    return this.comunidadCollection.add(comunidad);
  }

  removeTodo(id) {
    return this.comunidadCollection.doc(id).delete();
  }
}
