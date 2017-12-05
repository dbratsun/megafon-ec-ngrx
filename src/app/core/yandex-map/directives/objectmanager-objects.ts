import { Component, Directive, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { YaObjectManager } from "app/core/yandex-map/directives/objectmanager";

@Directive({
    selector: 'ya-objectmanager-objects'
})
export class YaObjectManagerObjects implements OnChanges {
    @Input() objects: ymaps.ObjectManagerObjectsCollectionCore;
    @Input() hasBalloon: boolean = true;
    @Input() hasHint: boolean = true;
    @Input() hideIconOnBalloonOpen: boolean = true;
    @Input() openBalloonOnClick: boolean = true; 
    
    private objectManager: YaObjectManager;
    private added: boolean = false;

    private isDefaultOptions() : boolean {
        return (this.hasBalloon && this.hasHint && this.hideIconOnBalloonOpen && this.openBalloonOnClick)
    }

    private setOptionsToAllObjects() {
        var options = this.getOptions();
        this.objects.features.forEach(o => {
            this.objectManager.setObjectOptions(o.id, options)
        })
    }

    setObjectManager(objectManager: YaObjectManager) {
        this.objectManager = objectManager;
        if ((this.objects) && (!this.added)) {
            this.objectManager.addObjects(this.objects, this.getOptions());
            if (!this.isDefaultOptions()) {
                this.setOptionsToAllObjects();
            }
            this.added = true;    
        }
    }

    private getOptions(): ymaps.objectManager.IObjectCollectionOptions {
        return {
            hasBalloon: this.hasBalloon,
            hasHint: this.hasHint,
            hideIconOnBalloonOpen: this.hideIconOnBalloonOpen,
            openBalloonOnClick: this.openBalloonOnClick
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.objectManager) {
            var objectsChanges = changes['objects'];
            if (objectsChanges) {
                this.objectManager.addObjects(objectsChanges.currentValue, this.getOptions());
            }
            if (changes['hasBalloon'] || changes['hasHint'] || changes['hideIconOnBalloonOpen'] || changes['openBalloonOnClick']) {
                var options: ymaps.objectManager.IObjectCollectionOptions = {
                    hasBalloon: changes['hasBalloon'].currentValue,
                    hasHint: changes['hasHint'].currentValue,
                    hideIconOnBalloonOpen: changes['hideIconOnBalloonOpen'].currentValue,
                    openBalloonOnClick: changes['openBalloonOnClick'].currentValue,
                }
                this.objectManager.setObjectsOptions(options);
            }
        }
    }
    
}