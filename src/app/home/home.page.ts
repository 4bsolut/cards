import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cards = [];
  constructor() {
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
  console.log(this.cards.length)
  }
  logChoice(choice) {
    console.log(choice)
  };

}
