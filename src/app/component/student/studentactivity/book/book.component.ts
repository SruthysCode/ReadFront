import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Service/student.service';
import { StudentactivityService } from 'src/app/Service/studentactivity.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  // pdfUrl : string= '';
  showBook: boolean = false;

  pdfUrl!: SafeResourceUrl;

  isFullScreen: boolean = false;
  constructor(
    private studentactivityservice: StudentactivityService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.bookAvailable();
  }

  bookAvailable() {
    this.subscription = this.studentactivityservice
      .bookCheck()
      .subscribe((res: any) => {
        console.log('Book is ', res.data[0].title);
        const Url = res.data[0].link;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(Url);

        this.showBook = true;
      });
  }

  toggleFullScreen() {
    const elem = document.querySelector('iframe');
    // if (elem) {
    //     if (!this.isFullScreen) {
    //         if (elem.requestFullscreen) {
    //             elem.requestFullscreen();
    //         } else if ((elem as any).webkitRequestFullscreen) {
    //           (elem as any).webkitRequestFullscreen();
    //         } else if ((elem as any).msRequestFullscreen) {
    //             (elem as any).msRequestFullscreen();
    //         }
    //     } else {
    //         if (document.exitFullscreen) {
    //             document.exitFullscreen();
    //         } else if ((document as any).webkitExitFullscreen) {
    //           (document as any).webkitExitFullscreen();
    //         } else if ((document as any).msExitFullscreen) {
    //             (document as any).msExitFullscreen();
    //         }
    //     }
    //     this.isFullScreen = !this.isFullScreen;

    (elem as any).allowFullscreen = !this.isFullScreen;
    (elem as any).requestFullscreen();
    console.log('clikkkk');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
