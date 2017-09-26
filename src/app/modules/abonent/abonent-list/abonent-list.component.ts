import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbonentVM } from "app/modules/abonent/abonent-section/abonent.vm";

@Component({
  selector: 'abonent-list',
  templateUrl: './abonent-list.component.html',
  styleUrls: ['./abonent-list.component.scss']
})
export class AbonentListComponent implements OnInit {

  @Input()
  abonents: AbonentVM[];

  @Input()
  currentSelectedAbonentId: number;

  @Output()
  abonentSelected = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  selectAbonent(abonentId: number) {
    this.abonentSelected.next(abonentId);
  }
}
