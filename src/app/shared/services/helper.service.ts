import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private chars: Object[] = [
    {formatUTF: 'ä', formatASCII: 'a'},
    {formatUTF: 'Ä', formatASCII: 'A'},
    {formatUTF: 'á', formatASCII: 'a'},
    {formatUTF: 'Á', formatASCII: 'A'},
    {formatUTF: 'č', formatASCII: 'c'},
    {formatUTF: 'Č', formatASCII: 'C'},
    {formatUTF: 'ď', formatASCII: 'd'},
    {formatUTF: 'Ď', formatASCII: 'D'},
    {formatUTF: 'ě', formatASCII: 'e'},
    {formatUTF: 'Ě', formatASCII: 'E'},
    {formatUTF: 'é', formatASCII: 'e'},
    {formatUTF: 'É', formatASCII: 'E'},
    {formatUTF: 'ë', formatASCII: 'e'},
    {formatUTF: 'Ë', formatASCII: 'E'},
    {formatUTF: 'í', formatASCII: 'i'},
    {formatUTF: 'Í', formatASCII: 'I'},
    {formatUTF: 'ľ', formatASCII: 'l'},
    {formatUTF: 'Ľ', formatASCII: 'L'},
    {formatUTF: 'ĺ', formatASCII: 'l'},
    {formatUTF: 'Ĺ', formatASCII: 'L'},
    {formatUTF: 'ň', formatASCII: 'n'},
    {formatUTF: 'Ň', formatASCII: 'N'},
    {formatUTF: 'ó', formatASCII: 'o'},
    {formatUTF: 'Ó', formatASCII: 'O'},
    {formatUTF: 'ö', formatASCII: 'o'},
    {formatUTF: 'Ö', formatASCII: 'O'},
    {formatUTF: 'ô', formatASCII: 'o'},
    {formatUTF: 'ŕ', formatASCII: 'r'},
    {formatUTF: 'š', formatASCII: 's'},
    {formatUTF: 'Š', formatASCII: 'S'},
    {formatUTF: 'ť', formatASCII: 't'},
    {formatUTF: 'Ť', formatASCII: 'T'},
    {formatUTF: 'ú', formatASCII: 'u'},
    {formatUTF: 'Ú', formatASCII: 'U'},
    {formatUTF: 'ü', formatASCII: 'u'},
    {formatUTF: 'Ü', formatASCII: 'U'},
    {formatUTF: 'ý', formatASCII: 'y'},
    {formatUTF: 'Ý', formatASCII: 'Y'},
    {formatUTF: 'ž', formatASCII: 'z'},
    {formatUTF: 'Ž', formatASCII: 'Z'},
    {formatUTF: 'ß', formatASCII: 'ss'}
  ];

  constructor() {}

  private convertStringToASCII(str: string): string {
    return str.split('').map(char => this.convertCharacterToASCII(char)).join('');
  }

  private convertCharacterToASCII(char: string): string {
    let foundObj: any = this.chars.find((charObj: any) => charObj.formatUTF === char);
    return foundObj ? foundObj.formatASCII : char;
  }

  private convertStringToTitleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }

  private removeDefiniteArticle(word: string): string {
    let wordsArray = word.split(' ');
    return wordsArray[wordsArray.length - 1];
  }

  checkTranslationInDictionary(userAnswer: string, wordInDictionary: string): boolean {
    let answer = this.removeDefiniteArticle(this.convertStringToASCII(userAnswer));
    let dictionary = this.removeDefiniteArticle(this.convertStringToASCII(wordInDictionary));

    if (answer === dictionary) {
      return true;
    } else {
      return this.convertStringToTitleCase(answer) === dictionary ? true : false;
    }
  }

  checkElementInArray(element: number, array: number[]): boolean {
    return array.indexOf(element) > -1;
  }
}
