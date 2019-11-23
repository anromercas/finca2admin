import { Component, OnInit } from '@angular/core';
import { ITask } from '../../models/task.interface';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo: ITask = {
    nombre: '',
    info: '',
    prioridad: '',
    realizada: false,
    creada: new Date().getTime()
  };

  todoId = null;

  constructor(  private route: ActivatedRoute,
                private nav: NavController,
                private todoService: TodoService,
                private loadingCtrl: LoadingController ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params.id;
    if ( this.todoId ) {
      this.loadTodo();
    }
  }
  prioridad( evento: string ) {
    this.todo.prioridad = evento;
  }


  async loadTodo() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });

    await loading.present();
    this.todoService.getTodo(this.todoId)
                    .subscribe( res => {
                      loading.dismiss();
                      this.todo = res;
                    });
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando...'
    });
    await loading.present();
    if ( this.todoId ) {
      // update
      this.todoService.updateTodo(this.todo, this.todoId)
                      .then( () => {
                        loading.dismiss();
                        this.nav.pop();
                      });
    } else {
      // add todo
      this.todoService.addTodo(this.todo)
                      .then( () => {
                        loading.dismiss();
                        this.nav.pop();
                      });
    }
  }

  async borrar( id: string ) {
    const loading = await this.loadingCtrl.create({
      message: 'Borrando...'
    });
    await loading.present();

    this.todoService.removeTodo(id)
                    .then( () => {
                      loading.dismiss();
                      this.nav.pop();
                    });
  }

}
