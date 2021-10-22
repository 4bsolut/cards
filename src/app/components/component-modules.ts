import { NgModule} from '@angular/core';
 
import { IonicModule } from '@ionic/angular';
 
import { CardsComponent } from './cards/cards.component';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
 
 
@NgModule({  
    declarations: [
        CardsComponent
    ],
    exports: [
        CardsComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SwiperModule
    ],
    providers: []
})
export class ComponentModule {}