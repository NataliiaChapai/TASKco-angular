import { DebugElement } from "@angular/core";

export const ButtonClickEvents = {
    left: { button: 1 },
    right: { button: 0 },
  };

export function click(
    el: DebugElement | HTMLElement,
    eventObj: any = ButtonClickEvents.right
  ): void {
    if (el instanceof HTMLElement) {
      el.click();
    } else {
      el.triggerEventHandler('click', eventObj);
    }
  }