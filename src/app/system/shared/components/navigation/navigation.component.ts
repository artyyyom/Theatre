import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../../../shared/services/users.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  constructor(public usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.usersService.logout()
      .subscribe(data => {
        localStorage.removeItem('token');
        this.router.navigate(['/performances']);
      });
  }
  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe();
    
  }
}
