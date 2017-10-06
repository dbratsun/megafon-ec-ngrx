import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

type CheckboxCheck = {
  name: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css']
})
export class CheckboxGroupComponent implements OnInit {

  valuesDef: CheckboxCheck[];
  valuesDefSaved: CheckboxCheck[];

  @Input() values: string[];
  @Input() checkedValues: string[];
  @Input() superValue: string;

  @Output() valuesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() {
      this.valuesDef = [];
      this.valuesDefSaved = [];
  }

  ngOnInit() {

  }

  private setValueByName(name: string, checked: boolean) {
      let value = this.valuesDef.find(value => value.name === name);
      if (value) {
          value.checked = checked;
      }
  }

  private setAllValues(checked: boolean): void {
      this.valuesDef.forEach(value => {
          value.checked = checked;
      })
  }

  private isValueChecked(name: string): boolean {
      let value = this.valuesDef.find(value => value.name === name);
      if (value) {
        return value.checked;
      }
      return false;
  }

  private checkedCount(withoutSuperValue: boolean) {
      if (withoutSuperValue) {
          return this.valuesDef.filter(value => (value.checked) && (!(value.name === this.superValue))).length;
      }
      else {
          return this.valuesDef.filter(value => value.checked).length;
      }
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['values'].currentValue !== changes['values'].previousValue) {
          let values: string[] = changes['values'].currentValue;
          let index = 1;
          this.valuesDef.length = 0;
          values.forEach(value => {
              this.valuesDef.push({
                  name: value,
                  value: index.toString(),
                  checked: false
              })
          })
          Object.assign(this.valuesDefSaved, this.valuesDef);
      }
      if (changes['checkedValues'].currentValue !== changes['checkedValues'].previousValue) {
          this.setAllValues(false);
          let values: string[] = changes['checkedValues'].currentValue;
          values.forEach(value => {
              this.setValueByName(value, true);
          })
          Object.assign(this.valuesDefSaved, this.valuesDef);
      }
      /*
      if (changes['superValue'].currentValue !== changes['superValue'].previousValue) {
          let superValue = changes['superValue'].currentValue;
          if (this.isValueChecked(superValue)) {
              this.setAllValues(false);
              this.setValueByName(superValue, true);
              Object.assign(this.valuesDefSaved, this.valuesDef);
            }
      }
      */
  }

  valueChanged(event: any) {
      let value = this.valuesDef.find(value => value.name === this.superValue);

      if (value && value.checked && (this.checkedCount(true) > 0)) {
          this.setValueByName(this.superValue, false);
      }
      if (value && value.checked) {
          this.setAllValues(false);
          this.setValueByName(this.superValue, true);
      }

      Object.assign(this.valuesDefSaved, this.valuesDef);

      let newValues = [];
      this.valuesDef.filter(b => b.checked).map(b => {
          newValues.push(b.name);
      })
      this.checkedValues = newValues;
      this.valuesChange.emit(this.checkedValues);
  }
}


