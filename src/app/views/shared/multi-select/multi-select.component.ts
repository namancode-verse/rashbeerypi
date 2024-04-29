import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import $ from 'jquery';

@Component({
     selector: 'app-multi-select',
     templateUrl: './multi-select.component.html',
     styleUrl: './multi-select.component.scss',
     providers: [
          {
               provide: NG_VALUE_ACCESSOR,
               useExisting: forwardRef(() => MultiSelectComponent),
               multi: true
          }
     ]
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit {
     @Input() options = [];
     @Input() disabled = false;
     @Input() placeHolder = '';
     @Input() id = 'multi-select-dropdown';
     @Input() visibleSelectedCounts = 2;

     public fieldValues: any = [];
     public isVisibleMenu: boolean = false;
     public selectedElements: any = null;
     public isSelectedAllElements: boolean = false;

     @Output() change = new EventEmitter<any>();
     @Output() select = new EventEmitter<any>();
     @Output() selectAll = new EventEmitter<any>();

     ngOnInit(): void {}

     ngAfterViewInit(): void {
          setTimeout(() => {
               this.setInitialValue();
               this.onDocumentClick();
          });
     }

     public onTouch = () => {};

     public onChange = (value: any) => {};

     public writeValue(value: any): void {
          if (value) {
               this.onChange(value);
               this.change.emit(value);
               this.select.emit(value);
          }
     }

     public registerOnChange(fn: any): void {
          this.onChange = fn;
     }

     public registerOnTouched(fn: any): void {
          this.onTouch = fn;
     }

     public setDisabledState?(isDisabled: boolean): void {
          this.disabled = isDisabled;
     }

     public onMenuClick() {
          this.isVisibleMenu = !this.isVisibleMenu;
     }

     public setInitialValue() {
          this.fieldValues = [];
          this.options.forEach((option: any) => {
               if (option.selected) {
                    this.fieldValues.push(option.value);
               }
          });
          this.writeValue(this.fieldValues);
          this.setSelectedElement();
     }

     public onSelectElement(element: any) {
          this.fieldValues = [];
          this.options.forEach((option: any) => {
               if (option.id == element.id) {
                    element.selected = !element.selected;
               }
               if (option.selected) {
                    this.fieldValues.push(option.value);
               }
          });
          this.writeValue(this.fieldValues);
          this.setSelectedElement();
     }

     public toggleSelectAllElement() {
          this.fieldValues = [];
          if (this.isSelectedAllElements) {
               this.options.forEach((option: any) => {
                    option.selected = false;
               });
               this.isSelectedAllElements = false;
          } else {
               this.options.forEach((option: any) => {
                    option.selected = true;
                    this.fieldValues.push(option.value);
               });
               this.isSelectedAllElements = true;
          }
          this.writeValue(this.fieldValues);
          this.setSelectedElement();
     }

     public setSelectedElement() {
          if (this.fieldValues.length > 0) {
               this.selectedElements = this.updatePlaceholder(this.fieldValues, this.visibleSelectedCounts);
          } else {
               this.selectedElements = null;
          }
     }

     public onDocumentClick() {
          $(document).on('click', (element: any) => {
               try {
                    if ($(element.target).closest('.multi-select-dropdown').length != 0) {
                    } else {
                         this.isVisibleMenu = false;
                    }
               } catch (e) {}
          });
     }

     public updatePlaceholder(selectedElements: string[], visibleCount: number): string {
          const numSelected = selectedElements.length;
          if (numSelected === 0) {
               return 'Select elements...';
          } else if (numSelected === this.options.length) {
               return 'All elements selected';
          } else {
               const selectedLabels = selectedElements.slice(0, visibleCount);
               const remainingCount = numSelected - selectedLabels.length;
               let placeholder = selectedLabels.join(', ');
               if (remainingCount > 0) {
                    placeholder += ` +${remainingCount} selected`;
               }
               return placeholder;
          }
     }
}
