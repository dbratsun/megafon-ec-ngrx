export enum MouseEventType {
    click, contextMenu, dblClick, mousedown, mouseenter, mouseleave, mousemove, mouseup, wheel
}
  
export interface MouseEvent {
    type: MouseEventType;
    name: string;
    coords: number[];
    globalPixels: number[];
    pagePixels: number[];
    clientPixels: number[];
}
