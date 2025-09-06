import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  ime = '';
  prezime = '';
  nickname = '';
  email = '';
  adresa = '';
  telefon = '';
  password = '';
  /* sem prikaza klasa i konstruktora, funkcije su tu da samo potvrde registraciju novog korisnika */
  constructor(private router: Router) { }

  register() {
    const korisnik = {
      ime: this.ime,
      prezime: this.prezime,
      nickname: this.nickname,
      email: this.email,
      adresa: this.adresa,
      telefon: this.telefon,
      password: this.password
    };

    localStorage.setItem('registrovaniKorisnik', JSON.stringify(korisnik));
    alert('Uspešno ste se registrovali!');
    this.router.navigate(['/login']);
  }
}
