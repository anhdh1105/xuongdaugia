import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchResult: string = '';
  constructor(private router: Router) {}
  user: any;
  ngOnInit(): void {
    // console.warn(localStorage.getItem('user'));
    // console.warn('name', localStorage.getItem('user'));

    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  logout() {
    if (confirm('Are you sure to log out ?') === true) {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
      location.reload();
      alert('Log out Succesfully!');
    }
  }
}
