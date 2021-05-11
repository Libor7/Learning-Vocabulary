import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private baseUrl = 'http://localhost';
  private port = '4200';
  private basePath = '/assets/json';
  private path = '/page/';
  
  pageContentSubject = new Subject<any>();
  passingWordsSubject = new Subject<any>();
  passingLevelSubject = new Subject<number>();

  constructor(private http: HttpClient) {}
  
  loadPageContent(country: string, file: string = 'content', fileExtension: string = '.json') {
    const url = this.baseUrl + ':' + this.port + this.basePath + this.path + file + '.' + country + fileExtension;
    this.http.get(url).subscribe(responseData => this.pageContentSubject.next(responseData));
  }

  startLearning(nativeLanguage: string, foreignLanguage: string) {
    const url = this.baseUrl + ':' + this.port + this.basePath + '/dictionary/words.json';
    this.http.get<any>(url).pipe(tap(responseData => this.addSymbolIterator(responseData)))
	.subscribe(words => this.passingWordsSubject.next({words, nativeLanguage, foreignLanguage}));
  }

  private addSymbolIterator(obj: any) {
    obj[Symbol.iterator] = function() {
      let properties = Object.keys(obj);
      let count = 0;
      let isDone = false;
      let next = () => {
        if (count >= properties.length) {
          isDone = true;
        }
        return {done: isDone, value: this[properties[count++]]};
      }
      return {next};
    }
  }
}
