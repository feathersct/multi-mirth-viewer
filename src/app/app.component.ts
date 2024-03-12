import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'multi-mirth-viewer';
  loadedFeature = 'instances';

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
  }

  onDisplay(feature){
    this.loadedFeature = feature
  }
}
