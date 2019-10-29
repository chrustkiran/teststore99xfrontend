import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';


class Item {
  id: number;
  name: string;
  total: number;
  price: number;
  // tslint:disable-next-line:variable-name
  number_of_item: number;
  // tslint:disable-next-line:variable-name
  number_of_box: number;
  added = false;

  // tslint:disable-next-line:variable-name
  constructor(id: number, name: string, total: number, price: number, number_of_item: number, number_of_box: number) {
    this.id = id;
    this.name = name;
    this.total = total;
    this.price = price;
    this.number_of_box = number_of_box;
    this.number_of_item = number_of_item;
  }

}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// tslint:disable-next-line:component-class-suffix


export class AppComponent implements OnInit {
  itemArray: Item[] = [];
  calculatedPrice: number;
  pageNumbers: number[];
  itemArrayToSend: Item[] = [];

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.getItems(1);
    this.getItemCount();

  }

  getItemCount() {
    this.appService.getItemCount().subscribe((count) => {
      console.log(count);
      if (count >= 50) {
        this.pageNumbers = Array(Math.floor(count / 50) + 1).fill(0).map((x, i) => i);
      }
    });
  }

  getItems(page: number) {
    this.itemArray = [];
    this.appService.getData(page).subscribe((data) => {
      console.log(data);
      for (const item of data) {
        this.itemArray.push(new Item(item.id, item.name, item.total, item.price, 0, 0));
      }
    });
  }

  save() {
    this.appService.save().subscribe();
    location.reload();
  }

  calculate() {
    console.log(this.itemArray);
    this.getCalculatedResult();
  }

  toNumber(item: Item) {
    item.number_of_box = Number(item.number_of_box);
    item.number_of_item = Number(item.number_of_item);
  }

  addItem(item: Item) {
    if (item.number_of_item > 0 || item.number_of_box > 0) {
      item.added = true;
      this.itemArrayToSend.push(item);
    }
  }

  updateItem(item: Item) {
    for (const item1 of this.itemArrayToSend) {
      if (item1.id === item.id) {
        this.itemArrayToSend.splice(this.itemArrayToSend.indexOf(item), 1);
        break;
      }
    }
    if (item.number_of_item > 0 || item.number_of_box > 0) {
      this.itemArrayToSend.push(item);
    } else {
      item.added = false;
    }

  }

  getCalculatedResult() {
    this.appService.calculate(this.itemArrayToSend).subscribe((data) => {
      this.calculatedPrice = data;
    });
  }


}
