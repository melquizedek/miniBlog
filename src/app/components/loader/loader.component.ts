import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})

export class LoaderComponent implements OnInit {

    @Input() show: boolean;

    constructor() { console.log(this.show); }

    ngOnInit() { 
            
        }
}