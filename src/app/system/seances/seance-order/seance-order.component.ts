import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() createUser = new EventEmitter();

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

  onSubmit(value: string) {
    console.log(value);
    this.userform.disabled;
    this.userform.reset;
    this.createUser.emit(value);
  }

}
