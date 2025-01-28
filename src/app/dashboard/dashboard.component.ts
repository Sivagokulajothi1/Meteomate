import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent  {
  iconurl: any = '';
  city: string = '';
  message: any = '';
  currentWeather: any = null;
  forecastData: any = null;
  date: string = '';
  time: string = '';
  latitude: number | null = null;
  longitude: number | null = null;

  apiurl = 'http://api.weatherapi.com/v1/current.json?key=746c722968084f0fb3d132245252101&q=';
  forecastUrl = 'http://api.weatherapi.com/v1/forecast.json?key=746c722968084f0fb3d132245252101&q=';

  constructor(private http: HttpClient) {}
  
  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Position:', position.coords);
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          if (this.latitude && this.longitude) {
            this.getWeatherByLocation();
          } else {
            console.error('Coordinates are undefined.');
            this.message = 'Unable to retrieve location data.';
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          this.message = 'Unable to retrieve your location. Please enable location access.';
        }
      );
    } else {
      this.message = 'Geolocation is not supported by your browser.';
    }
  }
  

  // Fetch weather data using latitude and longitude
  getWeatherByLocation(): void {
    const locationQuery = `${this.latitude},${this.longitude}`;
    this.http.get(`${this.apiurl}${locationQuery}`).subscribe(
      (data: any) => {
        this.iconurl = data.current.condition.icon;
        this.currentWeather = data;
        console.log('Current Weather Data:', data);
      },
      (err) => {
        console.error('Error fetching current weather:', err);
        this.message = 'Unable to fetch weather data for your location.';
      }
    );

    this.http.get<any>(`${this.forecastUrl}${locationQuery}&days=10`).subscribe(
      (data) => {
        this.forecastData = data;
        console.log('Forecast Data:', data);
      },
      (err) => {
        console.error('Error fetching forecast data:', err);
      }
    );
  }

  // Fetch weather data by city name
  search(event: any): void {
    const inputValue = this.city.trim();

    if (!inputValue || inputValue.length < 3) {
      this.message = 'Please enter a valid city name (at least 3 characters)';
      return; 
    }
  
    this.http.get(`${this.apiurl}${this.city}`).subscribe(
      (data: any) => {
        this.iconurl = data.current.condition.icon;
        this.currentWeather = data;
        console.log('Weather Data for City:', data);
        this.message = ''; 
      },
      (err) => {
        console.error('Error fetching current weather:', err);
        this.message = 'City not found. Please try again.';
      }
    );
  
    this.http.get<any>(`${this.forecastUrl}${this.city}&days=7`).subscribe(
      (data) => {
        this.forecastData = data;
        console.log('Forecast Data for City:', data);
      },
      (err) => {
        console.error('Error fetching forecast data:', err);
      }
    );
  }
}
