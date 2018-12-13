/* tslint:disable */
import { BsDaterangepickerConfig } from './datepicker/bs-daterangepicker.config';
import { BsDatepickerInlineConfig } from './datepicker/bs-datepicker-inline.config';
import { DatepickerModule } from './datepicker/datepicker.module';

export { listLocales } from './chronos/locale/locales';
export { setTheme } from './utils/theme-provider';

export {
  DateFormatter,
  DatePickerComponent,
  DatepickerConfig,
  DatepickerModule,
  DayPickerComponent,
  MonthPickerComponent,
  YearPickerComponent,
  BsDatepickerModule,
  BsDatepickerConfig,
  BsDaterangepickerConfig,
  BsDatepickerInlineConfig,
  BsLocaleService,
  BsDaterangepickerDirective,
  BsDatepickerDirective
} from './datepicker/index';

export {
  OnChange,
  document,
  window,
  parseTriggers,
  LinkedList,
  isBs3,
  Trigger,
  warnOnce,
  Utils,
  listenToTriggersV2,
  registerOutsideClick
} from './utils/index';

export {
  ComponentLoader,
  ComponentLoaderFactory,
  ContentRef,
  BsComponentRef
} from './component-loader/index';

export {
  Positioning,
  PositioningOptions,
  PositioningService,
  positionElements
} from './positioning/index';

export {
  Action,
  MiniState,
  MiniStore
} from './mini-ngrx/index';

export {
  defineLocale,
  getSetGlobalLocale,
  LocaleData,
  parseDate,
  formatDate,
  getDay,
  isFirstDayOfWeek,
  isSameYear,
  isSameDay,
  isSameMonth,
  getFullYear,
  getFirstDayOfMonth,
  getMonth,
  getLocale,
  updateLocale,
  isAfter,
  isBefore,
  isArray,
  isDateValid,
  isDate,
  shiftDate,
  setFullDate,
  endOf,
  startOf,
  TimeUnit
} from './chronos/index';

export * from './locale';
