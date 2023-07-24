import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  @Input() data: Object [] = [];
  primaryXAxis: Object = { valueType: 'Category' }; 
}
