import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  data: any = input<any>();

}
