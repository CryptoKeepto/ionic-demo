import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomerProvider } from "../../providers/customer/customer";

import * as moment from "moment";
import { StaticInjector } from '@angular/core/src/di/injector';

interface IResponse {
  id: number, 
  name: string 
}

@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
})
export class AddCustomerPage {

  private token: string;
  private sexes: Array<IResponse> = [];
  private groups: Array<IResponse> = [];

  private firstName: string;
  private lastName: string;
  private sex: string;
  private email: string;
  private telephone: string;
  private customerTypeId: number;
  // private image: string;
  private date: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private customerProvider: CustomerProvider) {
    this.token = localStorage.getItem("token");
    this.sexes.push({ id: 1, name: "ชาย" });
    this.sexes.push({ id: 2, name: "หญิง" });
    this.date = moment().format("YYYY-MM-DD");
  }

  ionViewDidLoad() {
    this.customerProvider.getGroups(this.token)
      .then((value: { ok: boolean, rows: Array<IResponse> }) => {
        this.groups = value.rows;
      })
      .catch((error) => {
        console.error(error);
      })
  }

  private save() {
    const customer = {
      firstName: this.firstName,
      lastName: this.lastName,
      sex: this.sex,
      email: this.email,
      telephone: this.telephone,
      customerTypeId: this.customerTypeId,
      image: null
    }

    this.customerProvider.saveCustomer(this.token, customer)
      .then((value: { ok: boolean, rows: Array<IResponse> }) => {
        console.log(value)
      })
      .catch((error) => {
        console.error(error);
      })
  }

}
