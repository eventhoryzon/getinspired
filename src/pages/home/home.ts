import { Component,OnInit } from '@angular/core';
import { NavController, App, AlertController} from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../providers/search-service/search-service';
import { Item } from '../../providers/search-service/item';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  isLoggedIn : boolean
  storeItems: Item[] = [];
  errorMessage: string;
  private isOn: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(public itemservice: SearchService,public alertCtrl: AlertController,public navCtrl: NavController, public app: App,public _app: App) {
    {
      this.searchControl = new FormControl();
    }
  }
ionViewDidLoad() {
    
           this.setFilteredItems();
    
           this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    
               this.searching;
               this.setFilteredItems();
    
           });
       }

       onSearchInput(){
        this.searching = true;
    }
  getUsers(): void {
    this.itemservice.getItems().subscribe(
            data => this.storeItems = data,
        error =>  this.errorMessage = <any>error);
 }
 ngOnInit(): void {
      this.getUsers();
 }
 setFilteredItems() {

         this.storeItems = this.itemservice.filterItems(this.searchTerm);
 }

  getButtonText(): string {
    return `Switch ${ this.isOn ? 'Off' : 'On' }`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }

  doRefresh(refresher) {
    this.getUsers();
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

toggleDetails() {
    this.isOn = !this.isOn;
  }
}








