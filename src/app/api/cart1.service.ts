import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart1Service {
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([])
  amount: number = 0
  loginData: any


  constructor() { }

  ApiAddToCart(data: any) {
    // this.cartItemList.push(data)
    // this.productList.next(this.cartItemList)

    
    
    this.loginData = localStorage.getItem('LogIn User')

    const loginUser = JSON.parse(this.loginData)

    if (loginUser) {
      this.cartItemList.push(data)
      this.productList.next(this.cartItemList)

      // Add a 'quantity' property to each object of displayCart1Items and set it to 0

      this.cartItemList.forEach((element: any) => {
        element.quantity = 1
      });

    } else {
      alert('Please SignIn  before adding the product to cart')
    }

  }

  products() {
    return this.productList.asObservable();
  }

  removeCartItem(data: any) {

    const indexToRemove = this.cartItemList.findIndex((item: any) => item.id === data.id);
    // console.log('indext to remove =', indexToRemove)
    if (indexToRemove !== -1) {
      this.cartItemList.splice(indexToRemove, 1);
    }

    this.productList.next(this.cartItemList)
  }

  // total calculation

  calculateprice() {
    let total = 0
    this.cartItemList.map((a: any) => {
      total += a.price 
    })

    return total
    
  }

  totalQuantityPrice(a:number , b:number): number{
    return a * b
  }

  // passing data from one component(cart1 component) to other component(order page component)

  sendFinalAmount(data: number) {
    this.amount = data
  }
  // recive final amount

  recieveFinalAmount() {
    return this.amount
  }


  // empty cart

  emptyCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList)
  }



}
