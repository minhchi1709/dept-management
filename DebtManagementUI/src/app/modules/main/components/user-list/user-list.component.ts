import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {User} from "../../../../api-services/models/user";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {

  }

  dataSource = new MatTableDataSource<User>()
  columnsToDisplay = ['id', 'name', 'delete']

  @Output() deleteEvent = new EventEmitter<string>()

  @Input()
  set setUsers(users: User[]) {
    this.dataSource = new MatTableDataSource<User>(users)
  }

  deleteUser(user: User) {
    this.deleteEvent.emit(user.id)
  }
}
