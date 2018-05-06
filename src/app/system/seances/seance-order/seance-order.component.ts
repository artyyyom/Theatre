import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'FIO': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required, Validators.pattern('[0-9]+'),
                                   Validators.minLength(10),
                                   Validators.maxLength(10)]),
      'checkboxRules': ['', Validators.required],
      'checkboxReserve': ['', Validators.requiredTrue],
    });
  }

  onSubmit(value: string) {
    alert("hello");
  }

}
