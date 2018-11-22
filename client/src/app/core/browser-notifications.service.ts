import { Injectable } from '@angular/core';

enum NotificationPermission {
  Denied = 'denied',
  Default = 'default',
  Granted = 'granted'
}

@Injectable({
  providedIn: 'root'
})
export class BrowserNotificationsService {
  private Notification: any = Notification;

  public requestPermission(): Promise<boolean> {
    if (this.Notification.permission === NotificationPermission.Default) {
      return this.Notification.requestPermission();
    }

    return Promise.resolve(false);
  }

  public push(title: string, options?: NotificationOptions): Notification {
    if (this.Notification.permission === NotificationPermission.Granted) {
      return new this.Notification(title, options);
    }

    return null;
  }
}
