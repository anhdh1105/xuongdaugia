import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private router: Router) {}
  user: any;
  role: any;
  ngAfterViewInit(): void {
    console.warn(localStorage.getItem('user'));
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.role = this.user.user.role;
      console.warn(this.role);
      if (this.role !== 'admin') {
        this.router.navigate(['/notAdmin']);
      }
    } else {
      this.router.navigate(['/notAdmin']);
    }
  }
  onActivate(): void {
    // window.scroll(0,0);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
