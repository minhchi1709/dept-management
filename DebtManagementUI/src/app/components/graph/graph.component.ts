import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    CanvasJSAngularChartsModule,
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit, OnChanges {

  datapoints: any[] = []
  title: string = ''
  chartOptions:any = {
    title: {
      fontFamily: "sans-serif",
      text: "Ausgeben und Einkommen"
    },
    data: [{
      type: "line",
      dataPoints: [
        { label: "Start",  y: 0  }
      ]
    }]
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }
  ngOnInit(): void {
    this.chartOptions = {
      title: {
        fontFamily: "sans-serif",
        fontWeight: 'bold',
        text: this.title
      },
      data: [{
        type: "line",
        dataPoints: this.datapoints
      }]
    };
  }

  @Input()
  set input(data: any[]) {
    this.datapoints = data
  }

  @Input()
  set graphTitle(title: string) {
    this.title = title
  }
}
