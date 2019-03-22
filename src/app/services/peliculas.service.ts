import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class PeliculasService {

   private apikey = 'd6a181620cd9c9847bd22b853b34538e';
   private urlMoviedb = 'https://api.themoviedb.org/3';

   peliculas: any[] = [];

   constructor(private _http: HttpClient) {}

   getCartelera() {

     const desde = new Date();
     const hasta = new Date();
     hasta.setDate(hasta.getDate() + 7);

     const desdeStr = `${desde.getFullYear()}-${ desde.getMonth() + 1}-${desde.getDate()}`;
     const hastaStr = `${hasta.getFullYear()}-${ hasta.getMonth() + 1}-${hasta.getDate()}`;



    // tslint:disable-next-line:max-line-length
    const url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${ this.apikey }&language=es`;
    return this._http.jsonp(url, 'callback=JSONP_CALLBACK')
               .pipe(map((res: any) => res.results));
   }


   getPopulares() {
    const url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;

   return this._http.jsonp(url, 'callback=JSONP_CALLBACK')
               .pipe(map((res: any) => res.results));
   }
   getPopularesNinos() {
    // tslint:disable-next-line:max-line-length
    const url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;

   return this._http.jsonp(url, 'callback=JSONP_CALLBACK')
               .pipe(map((res: any) => res.results));
  }
   buscarPelicula( texto: string ) {

    const url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;

    return this._http.jsonp( url, 'callback=JSONP_CALLBACK')
                .pipe(map((res: any) => {
                  this.peliculas = res.results;
                  console.log(this.peliculas);
                  return res.results;
                }));
  }
  getPelicula( id: string ) {
    // tslint:disable-next-line:max-line-length
    const url = `${ this.urlMoviedb }/movie/${id}?api_key=${ this.apikey }&language=es`;

   return this._http.jsonp(url, 'callback=JSONP_CALLBACK')
               .pipe(map((res: any) => res));
  }


}
