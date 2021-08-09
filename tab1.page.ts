import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery"

  items = [];
  errorMessage: string;


  constructor(public toastController: ToastController, public dataService: GroceriesServiceService, public alertController: AlertController, public inputDialogService: InputDialogService, private socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

ionViewDidLoad() {
  this.loadItems();
}

  loadItems() {
    this.dataService.getItems()
    .subscribe(
      items => this.items = items,
      error => this.errorMessage = <any>error);
  }

  async removeItem(id) {
    this.dataService.removeItem(id);
  }

  async shareItem(item) {
    console.log("sharing item - ", item);

    const toast = await this.toastController.create({
      message: 'Sharing item ' + item.name + '...',
      duration: 2000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      // Sharing via email is not possible
      console.error("Error while sharing", error);
    });
  
  }

  async editItem(item, index) {
    console.log("editing item - ", item, index);

    const toast = await this.toastController.create({
      message: 'editing item ' + index + '...',
      duration: 2000
    });
    toast.present();
    this.inputDialogService.showPrompt(item,index);

  }

  addItem() {
    console.log("Add Item");
    this.inputDialogService.showPrompt();
  }

  
  
}
