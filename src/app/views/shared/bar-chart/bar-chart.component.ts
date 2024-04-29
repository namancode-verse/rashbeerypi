import { Component } from '@angular/core';

@Component({
     selector: 'app-bar-chart',
     templateUrl: './bar-chart.component.html',
     styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
     showXAxis: boolean = true;
     showYAxis: boolean = true;
     gradient: boolean = false;
     showLegend: boolean = false;
     legendPosition: string = 'below';
     showXAxisLabel: boolean = true;
     yAxisLabel: string = 'State';
     showYAxisLabel: boolean = false;
     xAxisLabel = 'Buildings';

     colorScheme = {
          domain: ['#ff7070']
     };
     schemeType: string = 'linear';

     public multi = [
          {
               name: 'Haryana',
               series: [
                    {
                         name: 'Buildings',
                         value: 40
                    }
               ]
          },
          {
               name: 'New Delhi',
               series: [
                    {
                         name: 'Buildings',
                         value: 96
                    }
               ]
          },
          {
               name: 'Uttar Pradesh',
               series: [
                    {
                         name: 'Buildings',
                         value: 48
                    }
               ]
          },
          {
               name: 'Rajasthan',
               series: [
                    {
                         name: 'Buildings',
                         value: 64
                    }
               ]
          },
          {
               name: 'Punjab',
               series: [
                    {
                         name: 'Buildings',
                         value: 72
                    }
               ]
          },
          {
               name: 'Uttarakhand',
               series: [
                    {
                         name: 'Buildings',
                         value: 90
                    }
               ]
          },
          {
               name: 'Jammu and Kashmir',
               series: [
                    {
                         name: 'Buildings',
                         value: 32
                    }
               ]
          },
          {
               name: 'Himachal Pradesh',
               series: [
                    {
                         name: 'Buildings',
                         value: 64
                    }
               ]
          },
          {
               name: 'Chandigarh',
               series: [
                    {
                         name: 'Buildings',
                         value: 120
                    }
               ]
          }
     ];

     constructor() {}

     onSelect(data: any): void {}

     onActivate(data: any): void {}

     onDeactivate(data: any): void {}
}
