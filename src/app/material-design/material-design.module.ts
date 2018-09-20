import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialDesignModule { }
