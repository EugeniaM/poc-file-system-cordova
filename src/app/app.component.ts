import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.interface';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 1;

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.moviesService.fetchMovies(this.currentPage)
      .subscribe((movies: any) => {
        console.log('!!!!!!!!', movies);
        this.movies = this.movies.concat(movies.Search);
      });
  }

  onScrollDown() {
    this.currentPage += 1;
    this.fetchMovies();
  }
}
