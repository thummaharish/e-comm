import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Cart1Service } from 'src/app/api/cart1.service';

@Component({
  selector: 'app-all-products-list',
  templateUrl: './all-products-list.component.html',
  styleUrls: ['./all-products-list.component.css']
})
export class AllProductsListComponent implements OnInit {
  allProductsList: any;
  allId !: string
  showAdd = true

  constructor(private api: ApiService, private activateRoute: ActivatedRoute,
              private cart1Api:Cart1Service) { }

  ngOnInit(): void {
    this.api.viewAllProducts().subscribe(AllProducts => {
      this.allProductsList = AllProducts
    })

    this.activateRoute.params.subscribe(id => {
      this.allId = id['viewId']
    })


  }

  // addToCart(x: any) {
  //   this.cartApi.addCartItems(x)
  // }

  addToCart(item:any){
    this.cart1Api.ApiAddToCart(item)
    this.showAdd = false
    console.log('add item',item)
  }

  

}
