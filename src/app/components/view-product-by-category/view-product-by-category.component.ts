import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
import { Cart1Service } from 'src/app/api/cart1.service';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.css']
})
export class ViewProductByCategoryComponent implements OnInit {
categoryId : number = 0
productByCategory !:any

localGetData :any
localParam:any

showdashboard :boolean = false
showhome :boolean = true

  constructor(private activatedRoute:ActivatedRoute, private api:ApiService,
              private car1Api:Cart1Service){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(catId=>{
     
      this.categoryId = catId['category']
      this.displayProductByCategory()
    })

    this.localStorage();
    
 
  }

  displayProductByCategory(){
   this.api.byCategory(this.categoryId).subscribe(catProduct=>{

    this.productByCategory = catProduct
   })
  }

  addToCart(product:any){
    this.car1Api.ApiAddToCart(product)
    }

    localStorage(){
      this.localGetData = localStorage.getItem('LogIn User')
      this.localParam = JSON.parse(this.localGetData)

      if(this.localParam){
        this.showhome = false;
        this.showdashboard = true;
      }

    }



  // addToCart(product:any){
  //   this.cartApi.addCartItems(product)
  // }

  }




