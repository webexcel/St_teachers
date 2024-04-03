import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
})
export class SelectModalComponent implements OnInit {
  @Input() optionsList: any[] = [];
  @Input() value: any;
  @Input() multi: any;
  @Input() parameters: any;

  searchTerm: any;
  selectAll: any;
  clearAll: any;
  filteredOptions: any[] = [];
  backButtonSubscription: any;
  optionsBkp: any;

  constructor(
    private modalController: ModalController,
    private platform: Platform
  ) { }

  ionViewWillEnter() {
    this.optionsBkp = JSON.parse(JSON.stringify(this.optionsList));
    this.searchTerm = '';
    this.filteredOptions = JSON.parse(JSON.stringify(this.optionsList));
    this.optionsControl();
    this.filterOptions(this.searchTerm);
  }

  ngOnInit() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  optionsControl() {
    // If single selection mode is enabled
    // if (this.multi) {
    //   // Uncheck all options except the currently selected one
    //   for (let i = 0; i < this.filteredOptions.length; i++) {
    //     if (
    //       this.value != undefined &&
    //       this.value[i][this.parameters[0]] === this.filteredOptions[i][this.parameters[0]]
    //     ) {
    //       this.filteredOptions[i]['checked'] = true;
    //     } else {
    //       this.filteredOptions[i]['checked'] = false;
    //     }
    //   }
    // }

    // Handle other logic for multi-selection mode
    if (this.multi) {
      for (let i = 0; i < this.filteredOptions.length; i++) {
        if (this.value != undefined && this.value.indexOf(this.filteredOptions[i][this.parameters[0]]) > -1) {
          this.filteredOptions[i]['checked'] = true;
        } else if (this.value != undefined && this.value.length > 0 && this.value[0] != undefined && isNaN(parseInt(this.value[0]))) {
          for (let j = 0; j < this.value.length; j++) {
            if (this.value[j][this.parameters[0]].indexOf(this.filteredOptions[i][this.parameters[0]]) > -1) {
              this.filteredOptions[i]['checked'] = true;
              break;
            }
          }
        } else {
          this.filteredOptions[i]['checked'] = false;
        }
      }

      let filData = [];
      for (let i = 0; i < this.filteredOptions.length; i++) {
        if (!this.filteredOptions[i].checked) {
          filData.push(this.filteredOptions[i]);
        }
      }
      if (filData.length > 0) {
        this.selectAll = false;
        this.clearAll = true;
      } else {
        this.selectAll = true;
        this.clearAll = false;
      }
    } else {
      this.selectAll = true;
      this.clearAll = true;
    }
  }

  filterOptions(searchTerm: any) {
    this.filteredOptions = this.optionsList.filter((option) =>
      option[this.parameters[1]].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  selectOption(option: any) {
    this.modalController.dismiss(option);
  }

  dismissModal() {
    this.modalController.dismiss(this.optionsBkp);
  }

  selectAllOption(option: any) {
    if (this.multi) {
      this.selectAll = true;
      this.clearAll = false;
      for (let i = 0; i < this.filteredOptions.length; i++) {
        this.filteredOptions[i]['checked'] = true;
      }
    }
  }

  clearAllOption(option: any) {
    if (this.multi) {
      this.selectAll = false;
      this.clearAll = true;
      for (let i = 0; i < this.filteredOptions.length; i++) {
        this.filteredOptions[i]['checked'] = false;
      }
    }
  }
}
