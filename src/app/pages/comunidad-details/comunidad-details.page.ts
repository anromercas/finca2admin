import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { IComunidad } from '../../models/IComunidad';
import { ComunidadService } from '../../services/comunidad.service';

@Component({
  selector: 'app-comunidad-details',
  templateUrl: './comunidad-details.page.html',
  styleUrls: ['./comunidad-details.page.scss'],
})
export class ComunidadDetailsPage implements OnInit {

  comunidad: IComunidad = {
    nombre: '',
    direccion: '',
  };

  comunidadId = null;

  constructor(  private route: ActivatedRoute,
                private nav: NavController,
                private comunidadService: ComunidadService,
                private loadingCtrl: LoadingController ) { }

  ngOnInit() {
    this.comunidadId = this.route.snapshot.params.id;
    if ( this.comunidadId ) {
      this.loadComunidad();
    }
  }

  async loadComunidad() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });

    await loading.present();
    this.comunidadService.getComunidad(this.comunidadId)
                    .subscribe( res => {
                      loading.dismiss();
                      this.comunidad = res;
                    });
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando...'
    });
    await loading.present();
    if ( this.comunidadId ) {
      // update
      this.comunidadService.updateTodo(this.comunidad, this.comunidadId)
                      .then( () => {
                        loading.dismiss();
                        this.nav.pop();
                      });
    } else {
      // add todo
      this.comunidadService.addTodo(this.comunidad)
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

    this.comunidadService.removeTodo(id)
                    .then( () => {
                      loading.dismiss();
                      this.nav.pop();
                    });
  }

}
