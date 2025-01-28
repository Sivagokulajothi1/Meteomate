import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  islightTheme = false;
  
  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.add(savedTheme);
    }
  }

  toggleTheme() {
    this.islightTheme = !this.islightTheme;
    const body = document.body;
    body.classList.toggle('light');
    body.classList.toggle('dark');
    
    if (body.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }
}
