import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosCollection: AngularFirestoreCollection<ITask>;
  private todos: Observable<ITask[]>;

  constructor( private db: AngularFirestore) {
    this.todosCollection = db.collection<ITask>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

   }


  getTodos() {
    return this.todos;
  }

  getTodosPorComunidad( idComunidad: string ) {

    console.log(idComunidad);

    this.db.collection('todos', ref => ref.where('comunidad', '==', idComunidad))
            .valueChanges()
            .pipe(
              map((todos: any) => {
                console.log(todos);
                this.todos = todos;
              })
            );
    return this.todos;
  }

  getTodo(id) {
    return this.todosCollection.doc<ITask>(id).valueChanges();
  }

  updateTodo(todo: ITask, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }

  addTodo(todo: ITask) {
    return this.todosCollection.add(todo);
  }

  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}
