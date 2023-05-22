import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const expand = trigger('expand', [
  state('void', style({ height: 0, overflow: 'hidden' })),
  state('*', style({ height: '*', overflow: 'hidden' })),
  transition('void => *', animate('500ms ease-in-out')),
  transition('* => void', animate('500ms ease-in-out')),
]);
