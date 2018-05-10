import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Validators,
        FormControl,
        FormGroup,
        FormBuilder, 
        } from '@angular/forms';

@Component({
  selector: 'app-seance-order',
  templateUrl: './seance-order.component.html',
  styleUrls: ['./seance-order.component.css']
})
export class SeanceOrderComponent implements OnInit {
  userform: FormGroup;
  submitted: boolean;
  visible: boolean = true;
  @Input() errorEmail;
  @Output() reserveTicket = new EventEmitter();
  @Output() buyTicket = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required, Validators.pattern('[0-9]+'),
                                   Validators.minLength(10),
                                   Validators.maxLength(10)]),
      'checkboxRules': ['', Validators.requiredTrue],
      'checkboxReserve': [false, Validators.required],
    });
  }
  updateEmail() {
    this.errorEmail = false;
  }
  _reserveTicket(value: string) {
    this.reserveTicket.emit(value);
  }
  _buyTicket(value: string) {
    this.buyTicket.emit(value);
  }

}
