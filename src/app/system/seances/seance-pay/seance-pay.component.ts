import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-seance-pay',
  templateUrl: './seance-pay.component.html',
  styleUrls: ['./seance-pay.component.css']
})
export class SeancePayComponent implements OnInit {
  cardform: FormGroup;
  @Output() updateTicketPayStatus = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.cardform = this.fb.group({
      'cc-number': new FormControl('', Validators.required),
      'cc-exp-date': new FormControl('', Validators.required),
      'cc-cvc': new FormControl('', Validators.required),
    });
  }
  _updateTicketPayStatus() {
    this.updateTicketPayStatus.emit();
  }
}
