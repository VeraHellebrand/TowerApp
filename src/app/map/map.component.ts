import { Component, input, OnChanges, OnInit } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit,OnChanges {
  data: any = input();
  private map!: L.Map;

  constructor() {
  }
  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    if(!this.map)
      this.initMap();
    // Vykreslení bodů na mapě
    this.data().forEach((point: { date: string; lat: string; lon: string; cell_id: any; cell_rnc: any; signal: any; type: any; }) => {
      const lat = parseFloat(point.lat);
      const lon = parseFloat(point.lon);
      if (!isNaN(lat) && !isNaN(lon)) {
        const date = new Date(point.date);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${(date.getMinutes())}:${(date.getSeconds())}`;
        const marker = L.marker([parseFloat(point.lat), parseFloat(point.lon)])
          .bindPopup(`Datum: ${formattedDate} <br>Cell ID: ${point.cell_id}<br>RNC: ${point.cell_rnc}<br>Signal: ${point.signal}<br>Type: ${point.type}`)
          .addTo(this.map);
      }
      else {
        console.log("neplatny bod", point)
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [49.83720500, 18.179736666667],  // Výchozí souřadnice
      zoom: 10
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
