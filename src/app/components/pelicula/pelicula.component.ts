import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: []
})
export class PeliculaComponent implements OnInit {

  pelicula: any;
  regresarA: string;
  busqueda: string;

  constructor(public _ps: PeliculasService,
    public route: ActivatedRoute) {
      this.route.params.subscribe(params => {
      console.log(params);
      this.regresarA = params['pag'];
      if (params['busqueda']) {
        this.busqueda = params['busqueda'];
      }
      this._ps.getPelicula( params['id'])
            .subscribe( pelicula => this.pelicula = pelicula);
    });
  }

  ngOnInit() {
  }

}
