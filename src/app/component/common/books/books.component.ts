import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/Model/activityModel';
import { StudentactivityService } from 'src/app/Service/studentactivity.service';

// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  Books: Book[] = [];
  constructor(private studentactivityservice: StudentactivityService,
  
    ) {}
  // @ViewChild('pdfViewer') pdfViewer!: ElementRef ;
  @ViewChild('pdfViewer') pdfViewer!: ElementRef<HTMLDivElement>;
  isFullScreen = false;

  toggleFullScreen() {
    console.log('cllll');
    const el = this.pdfViewer.nativeElement;
    console.log('ell,,', el);
    if (this.isFullScreen) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }

  ngOnInit(): void {
    this.GetBooks();
  }

  ngAfterViewInit() {
    if (this.pdfViewer) {
      const el = this.pdfViewer.nativeElement;
      // Use el for your full-screen logic here
      console.error('PDF viewer element available');
    } else {
      console.error('PDF viewer element not yet available');
    }
  }

  GetBooks() {
    this.studentactivityservice.GetBooks().subscribe((res: any) => {
      console.log('Boks ', res.data);
      this.Books = res.data;
    });
  }
}
