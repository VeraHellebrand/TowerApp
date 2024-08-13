import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataComponent } from './data/data.component';
import { TableComponent } from './table/table.component';
import { MapComponent } from "./map/map.component";
import { InfoComponent } from "./info/info.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavigationComponent,
    DataComponent,
    TableComponent,
    MapComponent,
    InfoComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tower-info';
  data: any = [];
  curentComponent: string = 'info';

  onDataSelect(inputData: EventTarget) {
    this.data = inputData;
  }

  setCurentComponent(name: string) {
    this.curentComponent = name;
  }
}
