import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../shared/services/dictionary.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  pageContent: any;
  appName: string = '';
  counter: number = 0;
  timeout: number = 250;
  clear: any;
  private contentSubscription!: Subscription;
  @Output() appTitleEmitter = new EventEmitter<string>();

  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    this.contentSubscription = this.dictionaryService.pageContentSubject.subscribe(pageContentData => {
      this.pageContent = pageContentData;
      this.appTitleEmitter.emit(pageContentData.application.name);
      this.dictionaryService.startLearning(this.pageContent.content.country, this.pageContent.content.languages[0].shortcut);
      this.loadApplicationName();
    });
  }

  onCountryChange(country: HTMLSelectElement) {
    clearTimeout(this.clear);
    this.appName = '';
    this.counter = 0;
    this.timeout = 250;
    this.dictionaryService.loadPageContent(country.value);
  }
  
  onLanguageSelection(lang: string) {
    this.dictionaryService.startLearning(this.pageContent.content.country, lang);
  }

  onLevelChange(level: number) {
    this.dictionaryService.passingLevelSubject.next(level);
  }

  private loadApplicationName(): void {
    if (this.counter < this.pageContent.application.name.length) {
      this.clear = setTimeout(() => {
        this.appName += this.pageContent.application.name[this.counter];
        this.counter++;
		this.timeout -= 25;
        this.loadApplicationName();
      }, this.timeout);
    }
  }

  loadHeadingStyles(): any {
    switch (this.pageContent.content.country) {
      case 'sk':
        return {'color': '#0052b4'};
      case 'de':
      case 'en':
        return {'color': '#d81b27'};
    }
  }

  loadSelectCountryStyles(): any {
    switch (this.pageContent.content.country) {
      case 'sk':
        return {'background-color': '#d81b27', 'color': '#fff'};
      case 'de':
        return {'background-color': '#feda44', 'color': '#000'};
      case 'en':
        return {'background-color': '#0052b4', 'color': '#fff'};
    }
  }

  ngOnDestroy() {
    this.contentSubscription.unsubscribe();
  }
}
