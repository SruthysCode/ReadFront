import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  error: string | null = '404';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {

    this.error = this.route.snapshot.paramMap.get('code');
    //  });
  }
}
