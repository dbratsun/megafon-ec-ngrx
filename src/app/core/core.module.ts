import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MapObject, ChildObject } from './test-inject/testobjects';

const COMPONENTS = [
  NavComponent, MapObject, ChildObject  
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CoreModule { }
