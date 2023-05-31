import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const expand = trigger('expand', [
  state('void', style({ height: 0 })),
  state('*', style({ height: '*'})),
  transition('void => *', animate('500ms ease-in-out')),
  transition('* => void', animate('500ms ease-in-out')),
]);
