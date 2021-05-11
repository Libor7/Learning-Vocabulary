import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() foreignWord!: string;
  @Input() isCorrectAnswer!: boolean;
  @Input() pageContent!: any;
  @Input() userAnswer!: string;
  @Input() modalOpened!: boolean;
  @Output() newWordRequired = new EventEmitter();

  loadClasses() {
    return {
      'modal-box': true,
      'right-answer': this.isCorrectAnswer,
      'wrong-answer': !this.isCorrectAnswer
    };
  }

  loadNewWord() {
    this.newWordRequired.emit();
  }
}
