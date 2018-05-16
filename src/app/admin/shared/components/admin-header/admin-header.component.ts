import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../../../../shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  constructor(private authService: UsersService,
              private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.sub1 = this.authService.logout()
      .subscribe(data => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
  }

}
