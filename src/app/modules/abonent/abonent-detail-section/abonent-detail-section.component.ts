import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ApplicationState } from "../../../core/store/application-state";
import { Observable } from "rxjs/Observable";
import { AbonentDetailVM } from "./abonent-detail.vm";
import { abonentNameSelector } from "./abonentNameSelector";
import { abonentDetailsSelector } from "./abonentDetailsSelector";

@Component({
  selector: 'abonent-detail-section',
  templateUrl: './abonent-detail-section.component.html',
  styleUrls: ['./abonent-detail-section.component.scss']
})
export class AbonentDetailSectionComponent implements OnInit {

  abonentName$: Observable<string>;
  abonentDetails$: Observable<AbonentDetailVM[]>;

  constructor(private store: Store<ApplicationState>) { 
    this.abonentName$ = store.select(abonentNameSelector);
    this.abonentDetails$ = store.select(abonentDetailsSelector);
  }

  ngOnInit() {
  }

}