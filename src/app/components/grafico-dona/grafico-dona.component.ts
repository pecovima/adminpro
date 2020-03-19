import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  
      // Doughnut
  @Input() chartLabels:Label[] = [];
  @Input() chartData:MultiDataSet = [ [],[],[250, 130, 70],
  ];
  @Input() chartType: ChartType = 'doughnut';


  constructor() { }

  ngOnInit() {
  }

}
