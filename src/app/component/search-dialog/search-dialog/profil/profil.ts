import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class ProfilComponent implements OnInit {
  korisnik: any = null;
  editMode = false;
  formPodaci: any = {};
  constructor(private router: Router) {}
  ngOnInit() {
    const ulogovan = localStorage.getItem('ulogovanKorisnik');
    this.korisnik = ulogovan ? JSON.parse(ulogovan) : null;
    this.formPodaci = { ...this.korisnik };
  }
  sacuvajIzmene() {
    this.korisnik = { ...this.korisnik, ...this.formPodaci };
    localStorage.setItem('ulogovanKorisnik', JSON.stringify(this.korisnik));
    this.editMode = false;
  }
  odjaviSe() {
    localStorage.removeItem('ulogovanKorisnik');
    this.router.navigate(['/login']);
  }
  idiNaLogin() {
  this.router.navigate(['/login']);
}
}
