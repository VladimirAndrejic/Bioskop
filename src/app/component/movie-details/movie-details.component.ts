import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../model/movie.interface';
import { MovieService } from '../../services/movie.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

const API_KEY = 'f67b7e73f571b89afaccc58259cc9197';
const BASE_URL = 'https://api.themoviedb.org/3';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  loading = false;
  recenzijeFilma: any[] = [];
  ulogovanKorisnik: any = null;
  komentar: string = '';
  ocena: number = 1;
  glumci: string[] = [];
  reziser: string = '';
  trajanje: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const korisnik = localStorage.getItem('ulogovanKorisnik');
    this.ulogovanKorisnik = korisnik ? JSON.parse(korisnik) : null;

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.loadMovieDetails(id);
      this.ucitajRecenzije(id);
    });
  }

  loadMovieDetails(id: number): void {
    this.loading = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.trajanje = movie.runtime;
        this.ucitajKredite(id);
        this.loading = false;
      },
      error: (error) => {
        console.error('Greška pri učitavanju detalja filma', error);
        this.loading = false;
      },
    });
  }

  ucitajKredite(filmId: number): void {
    const url = `${BASE_URL}/movie/${filmId}/credits?api_key=${API_KEY}&language=sr-RS`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.glumci = data.cast.slice(0, 5).map((actor: any) => actor.name);
        const reziserObj = data.crew.find((crew: any) => crew.job === 'Director');
        this.reziser = reziserObj?.name || 'Nepoznato';
      },
      error: (err) => {
        console.error('Greška pri učitavanju glumaca i ekipe', err);
      }
    });
  }

  get zanroviTekst(): string {
    return this.movie?.genres?.map((g) => g.name).join(', ') || '';
  }

  goBack(): void {
    window.history.back();
  }

  posaljiReview() {
    const recenzije = JSON.parse(localStorage.getItem('recenzije') || '[]');
    recenzije.push({
      korisnik: this.ulogovanKorisnik?.email || 'Nepoznat',
      filmId: this.movie.id,
      komentar: this.komentar,
      ocena: this.ocena,
    });
    localStorage.setItem('recenzije', JSON.stringify(recenzije));
    alert('Uspešno ste poslali recenziju!');
    this.komentar = '';
    this.ocena = 1;
    this.ucitajRecenzije(this.movie.id);
  }

  rezervisiKartu() {
    const korpa = JSON.parse(localStorage.getItem('korpa') || '[]');
    korpa.push({
      filmId: this.movie.id,
      naslov: this.movie.title,
      cena: 500,
    });
    localStorage.setItem('korpa', JSON.stringify(korpa));
    alert('Karta je dodata u korpu!');
  }

  ucitajRecenzije(filmId: number): void {
    const sveRecenzije = JSON.parse(localStorage.getItem('recenzije') || '[]');
    this.recenzijeFilma = sveRecenzije.filter((r: any) => r.filmId === filmId);
  }
}
