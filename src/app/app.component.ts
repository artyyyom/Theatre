import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {NotificationService} from './shared/core/services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notification: string;
  type: string;
  constructor(
    private notificationService: NotificationService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.notificationService
      .notification$
      .subscribe(data => {
        this.notification = data.message;
        this.type = data.type;
        this.ref.detectChanges();
      });
  }  
  closeNotification() {
    this.notification = null;
    this.ref.detectChanges();
  }
}
