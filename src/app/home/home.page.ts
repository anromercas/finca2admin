import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { IComunidad } from '../models/IComunidad';
import { ComunidadService } from '../services/comunidad.service';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  comunidades: IComunidad[];

  constructor(  private comunidadService: ComunidadService,
                private todoService: TodoService,
                private nav: NavController,
                private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.comunidadService.getcomunidades().subscribe( res => {
      console.log('comunidades', res);
      this.comunidades = res;
    });

  }


  tarea(idcomunidad: string) {
    console.log(idcomunidad);
  }

}

