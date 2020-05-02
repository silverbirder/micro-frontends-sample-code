import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket-button',
  templateUrl: './basket-button.component.html',
  styleUrls: ['./basket-button.component.css']
})
export class BasketButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onClick(): void {
    alert('Added!');
  }
}
