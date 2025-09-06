import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  email = '';
  password = '';
  greska = '';

  constructor(private router: Router) { }
/* funkcije pokazuju podatke iz Local Storage-a gde ako se uneti podaci podudaraju sa prvobitnim, korisnik se
uspesno prijavio, a ako ne, prikazace gresku*/
  login() {
    const podaci = localStorage.getItem('registrovaniKorisnik');
    if (!podaci) {
      this.greska = 'Nije pronađen nalog.';
      return;
    }

    const korisnik = JSON.parse(podaci);
    if (this.email === korisnik.email && this.password === korisnik.password) {
      localStorage.setItem('ulogovanKorisnik', JSON.stringify(korisnik));
      this.router.navigate(['/profil']);
    } else {
      this.greska = 'Pogrešan email ili lozinka.';
    }
  }
}
