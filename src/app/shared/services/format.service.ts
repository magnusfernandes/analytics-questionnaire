import { Injectable } from '@angular/core';

import * as data from '../data/format.json';
import { AppData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  appData = new AppData((data as any).default);

  constructor() {
    console.log(this.appData);
  }
}
