import { Component, OnInit, Input } from '@angular/core';
import { AbonentDetailVM } from "../abonent-detail-section/abonent-detail.vm";

@Component({
  selector: 'abonent-detail-view',
  templateUrl: './abonent-detail-view.component.html',
  styleUrls: ['./abonent-detail-view.component.scss']
})
export class AbonentDetailViewComponent implements OnInit {

  @Input()
  abonentDetails: AbonentDetailVM[];

  constructor() { }

  ngOnInit() {
  }

}
