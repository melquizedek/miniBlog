import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mini Blog';

  constructor(private _location: Location) {

  }

  backClicked() : void {
    this._location.back();
  }

}
