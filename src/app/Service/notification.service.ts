import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private socket: Socket,
    private http: HttpClient,
  ) {}
  

  joinNotifications(data: string) {
    this.socket.emit('joinNotifications', data);
  }
  leaveNotifications(data: string) {
    this.socket.emit('leaveNotifications', data);
  }

  sendNotification(data : {receiverID : string, type : string} ) {
    this.socket.emit('notification', data);
  }

  getNotification() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('new notification', (notification: Notification) => {
        console.log("in new notifi")
        observer.next(notification);
      });
    });
  }

}
