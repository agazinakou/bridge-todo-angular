import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  loading = true;
  resume: any = {};

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .getResume()
      .pipe(first())
      .subscribe(
        (response: any) => {
          if(response.status === 'success'){
            this.resume = response.resume;
          }
        },
        (error: any) => {
          this.loading = false;
        }
      );
  }

}
