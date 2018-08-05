import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  fetchMovies(page: number): Observable<Movie[]> {
    const url = `http://www.omdbapi.com/?s=man&page=${page}&apikey=e5d808c8`;
    return this.http.get<Movie[]>(url);
  }

}
