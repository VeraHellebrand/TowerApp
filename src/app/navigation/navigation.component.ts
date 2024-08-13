import { Component, output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  componentChoose = output<string>()
  chooseButton: string = 'info'

  onComponentChoose(target: string){
    this.chooseButton = target
    this.componentChoose.emit(target)
  }
}
