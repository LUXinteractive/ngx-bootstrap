import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  Host,
  Provider,
  Renderer2,
  Input
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import {
  parseDate,
  formatDate,
  getLocale,
  isAfter,
  isBefore,
  isDate,
  isDateValid
} from 'lux-ngx-bootstrap/chronos';

import { BsDatepickerDirective } from './bs-datepicker.component';
import { BsLocaleService } from './bs-locale.service';
import { BsDatepickerConfig } from './bs-datepicker.config';

const BS_DATEPICKER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => BsDateInputDirective),
  multi: true
};

const BS_DATEPICKER_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => BsDateInputDirective),
  multi: true
};

@Directive({
  selector: `input[bsDate]`,
  host: {
    '(change)': 'onChange($event)',
    '(keyup.esc)': 'hide()',
    '(blur)': 'onBlur()'
  },
  providers: [BS_DATEPICKER_VALUE_ACCESSOR, BS_DATEPICKER_VALIDATOR]
})
export class BsDateInputDirective
  implements ControlValueAccessor, Validator {
  /**
   * Minimum date which is available for selection
   */
  @Input() minDate: Date;
  /**
   * Maximum date which is available for selection
   */
  @Input() maxDate: Date;

  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;
  /* tslint:disable-next-line: no-unused-variable */
  private _validatorChange = Function.prototype;
  private _value: Date;

  constructor(public _config: BsDatepickerConfig,
              private _localeService: BsLocaleService,
              private _renderer: Renderer2,
              private _elRef: ElementRef,
              private changeDetection: ChangeDetectorRef) {
    Object.assign(this, this._config);
    // update input value on locale change
    this._localeService.localeChange.subscribe(() => {
      this._setInputValue(this._value);
    });
  }

  _setInputValue(value: Date): void {
    const initialDate = !value ? ''
      : formatDate(value, this._config.dateInputFormat, this._localeService.currentLocale);

    this._renderer.setProperty(this._elRef.nativeElement, 'value', initialDate);
  }

  onChange(event: Event) {
    /* tslint:disable-next-line: no-any*/
    this.writeValue((event.target as any).value);
    this._onChange(this._value);
    this._onTouched();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const _value: Date | string = c.value;

    /* tslint:disable-next-line: prefer-switch */
    if (_value === null || _value === undefined || _value === '') {
      return null;
    }

    if (isDate(_value)) {
      const _isDateValid = isDateValid(_value);
      if (!_isDateValid) {
        return { bsDate: { invalid: _value } };
      }

      if (this.minDate && isBefore(_value, this.minDate, 'date')) {
        return { bsDate: { minDate: this.minDate } };
      }

      if (this.maxDate && isAfter(_value, this.maxDate, 'date')) {
        return { bsDate: { maxDate: this.maxDate } };
      }
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorChange = fn;
  }

  writeValue(value: Date | string) {
    if (!value) {
      this._value = null;
    } else {
      const _localeKey = this._localeService.currentLocale;
      const _locale = getLocale(_localeKey);
      if (!_locale) {
        throw new Error(
          `Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`
        );
      }
      this._value = parseDate(value, this._config.dateInputFormat, this._localeService.currentLocale);
    }

    this._setInputValue(this._value);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this._renderer.setAttribute(this._elRef.nativeElement, 'disabled', 'disabled');

      return;
    }
    this._renderer.removeAttribute(this._elRef.nativeElement, 'disabled');
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  onBlur() {
    this._onTouched();
  }
}
