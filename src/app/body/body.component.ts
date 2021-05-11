import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../shared/services/dictionary.service';
import { HelperService } from '../shared/services/helper.service';
import { Word } from '../shared/models/word.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {
  pageContent: any;
  words: any;
  filteredWords: any;
  nativeLang: string = '';
  foreignLang: string = '';
  level: number = 0;
  randomInt: number = 0;
  randomNumbers: number[] = [];
  isCorrectAnswer: boolean = false;
  isModalOpened: boolean = false;
  answer: string = '';
  isGermanSelected: boolean = false;
  screenSize: number = 0;
  private contentSubscription!: Subscription;
  private wordsSubscription!: Subscription;
  private levelSubscription!: Subscription;

  constructor(private dictionaryService: DictionaryService, private helperService: HelperService) {}

  ngOnInit(): void {
    this.contentSubscription = this.dictionaryService.pageContentSubject.subscribe(pageContentData => this.pageContent = pageContentData);
    this.wordsSubscription = this.dictionaryService.passingWordsSubject.subscribe(data => {
      this.words = data.words;
      this.nativeLang = data.nativeLanguage;
      this.foreignLang = data.foreignLanguage;
      let level = this.level ? this.level : 1;
      this.filterWordsBylevel(level);
      this.setRandomInteger();
      this.togglePageContent();
	});
    this.levelSubscription = this.dictionaryService.passingLevelSubject.subscribe(level => {
      this.level = level;
      this.filterWordsBylevel(this.level);
      this.setRandomInteger();
    });
  }

  private togglePageContent(): void {
    if (this.foreignLang == 'de') {
      this.isGermanSelected = true;
	  this.screenSize = window.innerWidth;
    } else {
      this.isGermanSelected = false;
    }
  }

  private setRandomInteger() {
    if (this.randomNumbers.length == this.filteredWords.length) {
      this.randomNumbers = [];
    }
	
    let randomInt;
    do {
      randomInt = Math.floor(Math.random() * this.filteredWords.length);
    } while (this.helperService.checkElementInArray(randomInt, this.randomNumbers));

    this.randomInt = randomInt;
    this.randomNumbers.push(this.randomInt);
  }
  
  private filterWordsBylevel(level: number) {
    if (this.randomNumbers.length > 0) this.randomNumbers = [];
    this.filteredWords = this.words.filter((word: Word) => {
      return word.level === level;
    });
  }
 
  onTranslate(form: NgForm) {
    this.answer = form.value.translation;
    this.isCorrectAnswer = this.helperService.
	checkTranslationInDictionary(form.value.translation, this.filteredWords[this.randomInt][this.foreignLang]);
	form.reset();
    this.isModalOpened = true;
  }

  onNewWordRequired() {
    this.isModalOpened = false;
    this.setRandomInteger();
  }

  loadFooterStyles(): any {
    switch (this.pageContent.content.country) {
      case 'sk':
        return {'background-color': '#0052b4', 'color': '#f7f2f2'};
      case 'de':
        return {'background-color': '#feda44', 'color': '#d81b27'};
      case 'en':
        return {'background-color': '#0052b4', 'color': '#d81b27'};
    }
  }

  loadAnchorStyles(): any {
    switch (this.pageContent.content.country) {
      case 'sk':
        return {'color': '#f7f2f2'};
      case 'de':
        return {'color': '#000'};
      case 'en':
        return {'color': '#d81b27'};
    }
  }

  ngOnDestroy() {
    this.contentSubscription.unsubscribe();
    this.wordsSubscription.unsubscribe();
	this.levelSubscription.unsubscribe();
  }
}
