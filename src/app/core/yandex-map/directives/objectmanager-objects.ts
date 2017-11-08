import { Component, Directive, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { YaObjectManager } from "app/core/yandex-map/directives/objectmanager";

@Directive({
    selector: 'ya-objectmanager-objects'
})
export class YaObjectManagerObjects implements OnInit, OnChanges {
    @Input() objects: ymaps.ObjectManagerObjectsCollectionCore;
    
    private objectManager: YaObjectManager;
    private added: boolean = false;

    setObjectManager(objectManager: YaObjectManager) {
        this.objectManager = objectManager;
        if ((this.objects) && (!this.added)) {
            this.objectManager.addObjects(this.objects);
            this.added = true;    
        }
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.objectManager) {
            var objectsChanges = changes['objects'];
            if (objectsChanges) {
                this.objectManager.addObjects(objectsChanges.currentValue);
            }
        }
    }
    
}