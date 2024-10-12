import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from "./components/navigation/navigation.component";
import {
  DeleteConfirmationComponent
} from "./components/delete-confirmation/delete-confirmation.component";
import * as _moment from 'moment';
import {default as _rollupMoment} from "moment/moment";
import {MatDivider} from "@angular/material/divider";
const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, DeleteConfirmationComponent, MatDivider],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DebtManagementUI';
  constructor() {
    moment.updateLocale('vi', {
      months: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      monthsShort: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      weekdays: [
        'Chủ nhật',
        'Thứ 2',
        'Thứ 3',
        'Thứ 4',
        'Thứ 5',
        'Thứ 6',
        'Thứ 7'
      ],
      weekdaysShort: [
        'Chủ nhật',
        'Thứ 2',
        'Thứ 3',
        'Thứ 4',
        'Thứ 5',
        'Thứ 6',
        'Thứ 7'
      ],
      weekdaysMin: [
        'CN',
        'T2',
        'T3',
        'T4',
        'T5',
        'T6',
        'T7'
      ]
    })
  }
}
