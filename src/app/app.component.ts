import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DictionaryService } from './shared/services/dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private dictionaryService: DictionaryService, private titleService: Title) {}

  ngOnInit() {
    this.dictionaryService.loadPageContent(this.getCountry());
  }

  private getCountry(): string {
    switch (window.navigator.language) {
      case 'sk':
      case 'cs':
        return 'sk';
      case 'de':
        return 'de';
      default:
        return 'en';
    }

    // Fallback 
    return 'sk';
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onTitleEmitted(title: string) {
    this.setTitle(title);
  }
}
