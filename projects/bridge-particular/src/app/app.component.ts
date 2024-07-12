import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreService } from '../../../bridebank/core/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bridge-particular';

  constructor(private coreService: CoreService){
    console.log(this.coreService.getDate());
  }
}
