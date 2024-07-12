import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  loading = true;
  resume: any = {};

  data: any;

  options: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {

      this.getResume();
  }

  getResume = () => {
    this.dashboardService
      .getResume()
      .pipe(first())
      .subscribe(
        (response: any) => {
          if(response.status === 'success'){
            this.resume = response.resume;
            this.loading = false;
            this.initChart();
          }
        },
        (error: any) => {
          this.loading = false;
        }
      );
  }

  initChart = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
        labels: ['À faire', 'Terminées'],
        datasets: [
            {
                data: [this.resume.todo, this.resume.done],
                backgroundColor: [documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
        ]
    };

    this.options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
  }

}
