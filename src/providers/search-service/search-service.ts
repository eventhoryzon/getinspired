import { Injectable } from '@angular/core';
import { Http, Response,Headers,Request,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Item } from './item';

// LOcal
// let apiUrl = 'http://127.0.0.1:3333/';

// Heroku Deployment
let apiUrl = '/';

@Injectable()
export class SearchService {
    observableItems: Observable<Item[]>;
    allItems: Item[] = [];

    selectedItems: Item[] = [];
    errorMessage: any;
    headers:Headers;
    url = apiUrl+"getallusers";
	constructor(private http:Http) { 
	   this.observableItems = this.http.get(this.url).map((res: Response) => res.json());
	   this.observableItems.subscribe(
	             data => this.allItems = data,
                 error =>  this.errorMessage = <any>error);
	}
	getItems(): Observable<Item[]> {
	   return this.observableItems;
    }
    
	getSelectedItems(): Item[] {
	   return this.selectedItems;
	}	
    addItem(_id:string): void {
       let item = this.allItems.find(ob => ob._id === _id);
       
       console.log('item'+item);
       console.log(_id);
       if (this.selectedItems.indexOf(item) < 0) {	   
          this.selectedItems.push(item);
	   }
    }
 
    removeItem(_id:string): void {
	   let item = this.selectedItems.find(ob => ob._id === _id);
	   let itemIndex = this.selectedItems.indexOf(item);
       this.selectedItems.splice(itemIndex, 1);
    }
    filterItems(searchTerm){
        
               return this.allItems.filter((item) => {
                   return item.about.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
               });  
}
}