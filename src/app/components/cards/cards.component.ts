import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent  {

  
  @Input('cards') cards: Array<{
    images: Array<any>,
    title: string,
    description: string
  }>;

  @ViewChildren('bCard') projectCards: QueryList<ElementRef>;
  projectCardsArray: Array<ElementRef>;

  @Output() choiceMade = new EventEmitter();

  moveOutWidth: number;
  shiftRequired: boolean;
  transitionInProgress: boolean;
  heartVisible: boolean;
  crossVisible: boolean;

  constructor(private renderer: Renderer2) { 
  }

  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.cards.length) return false;
    if (heart) {
      this.renderer.setStyle(this.projectCardsArray[0].nativeElement, 'transform', 'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)');
      this.toggleChoiceIndicator(false,true);
      this.emitChoice(heart, this.cards[0]);
    } else {
      this.renderer.setStyle(this.projectCardsArray[0].nativeElement, 'transform', 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)');
      this.toggleChoiceIndicator(true,false);
      this.emitChoice(heart, this.cards[0]);
    };
    if(this.cards.length==1){//feed again the cards array
      for (let i=0; i<=20;i++){
        this.cards.push(
          {
            images:[ 
              {
                img: "https://placeimg.com/500/500/people"
              },{
                img: "https://placeimg.com/500/500/people"
              },{
                img: "https://placeimg.com/500/500/people"
              },{
                img: "https://placeimg.com/500/500/people"
              },{
                img: "https://placeimg.com/500/500/people"
              },{
                img: "https://placeimg.com/500/500/people"
              },
            ],
            title: "Demo Card "+i,
            description: "Demo card body"
          }
        )
      }
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;
  };

  handlePan(event) {

    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.cards.length) return;

    if (this.transitionInProgress) {
      this.handleShift();
    }

   // this.renderer.addClass(this.projectCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) { this.toggleChoiceIndicator(false,true) }
    if (event.deltaX < 0) { this.toggleChoiceIndicator(true,false) }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

  //  this.renderer.setStyle(this.projectCardsArray[0].nativeElement, 'transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)');

    this.shiftRequired = true;

  };

  handlePanEnd(event) {

    this.toggleChoiceIndicator(false,false);

    if (!this.cards.length) return;

  // this.renderer.removeClass(this.projectCardsArray[0].nativeElement, 'moving');

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {

    //  this.renderer.setStyle(this.projectCardsArray[0].nativeElement, 'transform', '');
      this.shiftRequired = false;

    } else {

      let endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

   //  this.renderer.setStyle(this.projectCardsArray[0].nativeElement, 'transform', 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)');

      this.shiftRequired = true;

      if(this.cards.length==1){ //feed again the cards array
        for (let i=0; i<=40;i++){
          this.cards.push(
            {
              images:[ 
                {
                  img: "https://placeimg.com/500/500/people"
                },{
                  img: "https://placeimg.com/500/500/people"
                },{
                  img: "https://placeimg.com/500/500/people"
                },{
                  img: "https://placeimg.com/500/500/people"
                },{
                  img: "https://placeimg.com/500/500/people"
                },{
                  img: "https://placeimg.com/500/500/people"
                },
              ],
              title: "Demo Card "+i,
              description: "Demo card body"
            }
          )
        }
      }

      this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
    }
    this.transitionInProgress = true;
  };

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  };

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false,false)
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.cards.shift();
    };
  };

  emitChoice(heart, card) {
    this.choiceMade.emit({
      choice: heart,
      payload: card
    })
  };

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.projectCardsArray = this.projectCards.toArray();
    this.projectCards.changes.subscribe(()=>{
      this.projectCardsArray = this.projectCards.toArray();
    })
  };

}
