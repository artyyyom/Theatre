import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public authService: UsersService) { }

  ngOnInit() {
  }

}
