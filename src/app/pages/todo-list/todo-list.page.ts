import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ITask } from 'src/app/models/task.interface';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  todos: ITask[];
  comunidadId = null;
  datos = false;

  constructor(  private todoService: TodoService,
                private route: ActivatedRoute,
                private nav: NavController,
                private loadingCtrl: LoadingController) {}

  ngOnInit() {
   /*  this.todoService.getTodos().subscribe( res => {
      console.log('Tareas', res);
      this.todos = res;
    }); */
    this.comunidadId = this.route.snapshot.params.idcomunidad;

    this.tareas(this.comunidadId);

  }

  segmentChanged(event: string) {
    console.log(event);
  }


  async borrar( id: string ) {
    console.log(id);
    const loading = await this.loadingCtrl.create({
      message: 'Borrando...'
    });
    await loading.present();

    this.todoService.removeTodo(id)
                    .then( () => {
                      loading.dismiss();
                    });
  }

  async tareas( id: string ) {

    this.todoService.getTodosPorComunidad(id)
                    .subscribe( ( res: any) => {
                      this.todos = res;
                      if (this.todos) {
                        this.datos = true;
                      }
                    });
  }

  realizada( todo: string ) {
    console.log(todo);
  }

}
