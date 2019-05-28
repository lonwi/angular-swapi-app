import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdFromUrlPipe } from './id-from-url.pipe';
import { NewLinePipe } from './new-line.pipe';

@NgModule({
  declarations: [IdFromUrlPipe, NewLinePipe],
  imports: [
    CommonModule
  ],
  exports: [IdFromUrlPipe, NewLinePipe]
})
export class PipesModule { }
