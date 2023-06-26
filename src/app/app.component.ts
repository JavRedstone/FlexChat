import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    window.onload = () => {
      // Trigger the Google Analytics event when the page is loaded
      gtag('event', 'page_view');
    };
  }
}
