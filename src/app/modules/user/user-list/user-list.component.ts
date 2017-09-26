import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserVM } from "app/modules/user/user-section/user.vm";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input()
  users: UserVM[];

  @Input()
  currentSelectedUserId: number;

  @Output()
  userSelected = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  selectUser(userId: number) {
    this.userSelected.next(userId);
  }

}
