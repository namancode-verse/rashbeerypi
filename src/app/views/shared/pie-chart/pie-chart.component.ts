import { Component, Input, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
     selector: 'app-pie-chart',
     templateUrl: './pie-chart.component.html',
     styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
     percentage: number = 0;
     @Input() CurrentNumber: number = 0;
     @Input() TotalNumber: number = 0;
     @Input() PieTitle: string = 'Pie Chart';
     @Input() activeColor: string = '#000';
     @Input() accentColor: string = '#F0F0F0';
     @Input() iconClass: string = 'fas fa-home';

     single: any[] = [];
     colorScheme!: Color;

     view: [number, number] = [160, 160];

     constructor() {
          Object.assign(this, { this: this.single });
     }

     ngOnInit(): void {
          this.percentage = Math.floor((this.CurrentNumber / this.TotalNumber) * 100);

          this.single = [
               {
                    name: 'Available',
                    value: this.CurrentNumber
               },
               {
                    name: 'Unavailable',
                    value: this.TotalNumber - this.CurrentNumber
               }
          ];

          this.colorScheme = {
               name: 'myScheme',
               selectable: true,
               group: ScaleType.Ordinal,
               domain: [this.activeColor, this.accentColor]
          };
     }
}
