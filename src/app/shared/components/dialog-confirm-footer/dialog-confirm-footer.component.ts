import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-confirm-footer',
  templateUrl: './dialog-confirm-footer.component.html',
  styleUrl: './dialog-confirm-footer.component.scss',
})
export class DialogConfirmFooterComponent {
  @Output() result: EventEmitter<boolean> = new EventEmitter();
  @Input() confirmLabel: string = '';
  @Input() cancelLabel: string = '';

  public confirm(): void {
    this.result.emit(true);
  }

  public cancel(): void {
    this.result.emit(false);
  }
}
