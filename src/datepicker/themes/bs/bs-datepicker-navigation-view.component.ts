import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  BsDatepickerViewMode,
  BsNavigationDirection,
  DaysCalendarViewModel
} from '../../models';

@Component({
  selector: 'bs-datepicker-navigation-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="d-flex justify-content-between">
      <button class="previous"
              [disabled]="calendar.disableLeftArrow"
              [style.visibility]="calendar.hideLeftArrow ? 'hidden' : 'visible'"
              (click)="navTo(true)"><span>&lsaquo;</span>
      </button>

      <div>
        <button class="current"
                *ngIf="calendar.monthTitle"
                (click)="view('month')"
        ><span>{{ calendar.monthTitle }}</span>
        </button>

        <button class="current" (click)="view('year')"
        ><span>{{ calendar.yearTitle }}</span></button>
      </div>

      <button class="next"
              [disabled]="calendar.disableRightArrow"
              [style.visibility]="calendar.hideRightArrow ? 'hidden' : 'visible'"
              (click)="navTo(false)"><span>&rsaquo;</span>
      </button>
    </div>
  `
})
export class BsDatepickerNavigationViewComponent {
  @Input() calendar: DaysCalendarViewModel;

  @Output() onNavigate = new EventEmitter<BsNavigationDirection>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  navTo(down: boolean): void {
    this.onNavigate.emit(
      down ? BsNavigationDirection.DOWN : BsNavigationDirection.UP
    );
  }

  view(viewMode: BsDatepickerViewMode): void {
    this.onViewMode.emit(viewMode);
  }
}
