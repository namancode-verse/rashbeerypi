import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
    selector: 'small-spinner',
    templateUrl: './small-progress-indicator.component.html',
    styleUrls: ['./small-progress-indicator.component.scss']
})
export class SmallProgressIndicatorComponent implements OnInit, AfterViewInit {
    @Input() spinnerId = '';
    @Input() color = 'white';
    @Input() marginLeft = '5px';
    @Input() marginRight = '0px';
    @Input() size = '15px';
    @Input() isPagination: boolean = false;

    ngAfterViewInit(): void {}
    ngOnInit(): void {}
}
