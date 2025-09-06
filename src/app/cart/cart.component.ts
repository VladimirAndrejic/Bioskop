import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  korpa: any[] = [];
  ukupno = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const ulogovan = localStorage.getItem('ulogovanKorisnik');
    if (!ulogovan) {
      alert('Niste ulogovani.');
      this.router.navigate(['/login']);
      return;
    }

    this.ucitajKorpu();
  }

  ucitajKorpu() {
    this.korpa = JSON.parse(localStorage.getItem('korpa') || '[]');
    this.ukupno = this.korpa.reduce((suma, r) => suma + r.cena, 0);
  }

  obrisi(index: number) {
    this.korpa.splice(index, 1);
    localStorage.setItem('korpa', JSON.stringify(this.korpa));
    this.ucitajKorpu();
  }

  kupi() {
    if (this.korpa.length === 0) {
      alert('Korpa je prazna');
      return;
    }

    alert('Uspešno ste obavili kupovino');
    this.korpa = [];
    this.ukupno = 0;
    localStorage.removeItem('korpa');
  }
}


