import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  declarations: []
})
export class MaterialDesignModule { }
