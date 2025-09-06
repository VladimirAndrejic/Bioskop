import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MovieService } from '../../../../../services/movie.service';
import { Movie } from '../../../../../model/movie.interface';
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  loading = false;
  currentPage = 1;
  movies: Movie[] = [];
  totalItems = 0;
  isInViewport = false;
  pageSize = 10;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.loadMovie();
    this.setupLazyLoading();
  }
  loadMovie(): void {
    this.loading = true;
    const pageNumber = this.currentPage + 1;

    this.movieService.getMovies(pageNumber).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.totalItems = response.total_results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movies', error);
        this.loading = false;
      },
    });
  }
  setupLazyLoading() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isInViewport = true;
        }
      });
    }, options);

    document.querySelectorAll('.movie-card').forEach((card) => {
      observer.observe(card);
    });
  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadMovie();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  onScroll() {
    this.loadMovie();
  }
}
