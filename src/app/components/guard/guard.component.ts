import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './guard.component.html',
  styleUrl: './guard.component.css',
})
export class GuardComponent {}
