import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pipe } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { Cart1Service } from 'src/app/api/cart1.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  viewId: any
  viewProduct: any

  showAdd: boolean = true
  showRemove: boolean = false
  showQuantity:boolean = false

  localGetData: any
  localParam: any

  showdashboard: boolean = false
  showhome: boolean = true



  constructor(private activatedRoute: ActivatedRoute, private api: ApiService,
    private cart1Api: Cart1Service) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(id => {
      this.viewId = id['viewId']
      this.viewData()
    })

    this.localStorage()
  }


  viewData() {
    this.api.getAllProductsById(this.viewId).subscribe(data => {
      this.viewProduct = data
    })
  }


  addToCart(item: any) {
    if (this.localParam) {
      this.cart1Api.ApiAddToCart(item)
      this.showRemove = true
      this.showAdd = false
      this.showQuantity = true
    }else{
      alert('Please SignIn before add the product to cart')
      this.showRemove = false
      this.showAdd = true
      this.showQuantity = false
    }
  }

  removeItemFromCart(viewProduct: any) {
    this.cart1Api.removeCartItem(viewProduct)
    this.showAdd = true
    this.showRemove = false
  }

  localStorage() {
    this.localGetData = localStorage.getItem('LogIn User')
    this.localParam = JSON.parse(this.localGetData)

    if (this.localParam) {
      this.showhome = false;
      this.showdashboard = true;
    }
  }

  
}





