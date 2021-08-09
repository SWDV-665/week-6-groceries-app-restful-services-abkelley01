import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertController: AlertController, public dataService: GroceriesServiceService) { }

/*shows prompt for adding and editing*/
  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? 'Please edit item...' : 'Please add item...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        }
                
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Save',
          handler: data => {
            console.log('Save Handler', data);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity =data.quantity;
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(data);
            }
            
          }
        }
      ]
    });

    await alert.present();
  }
}
