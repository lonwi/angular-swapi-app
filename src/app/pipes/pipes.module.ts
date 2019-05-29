import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdFromUrlPipe } from './id-from-url/id-from-url.pipe';
import { NewLinePipe } from './new-line/new-line.pipe';
import { SpeciePipe } from './specie/specie.pipe';

@NgModule({
  declarations: [IdFromUrlPipe, NewLinePipe, SpeciePipe],
  imports: [
    CommonModule
  ],
  exports: [IdFromUrlPipe, NewLinePipe, SpeciePipe]
})
export class PipesModule { }
