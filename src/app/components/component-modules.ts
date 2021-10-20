import { NgModule} from '@angular/core';
 
import { IonicModule } from '@ionic/angular';
 
 
import { CardsComponent } from './cards/cards.component';
import { CommonModule } from '@angular/common';
 
 
@NgModule({  
    declarations: [
        CardsComponent
    ],
    exports: [
        CardsComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    providers: []
})
export class ComponentModule {}