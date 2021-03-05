import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[] = [];
  public nameFilter: string = "";
  public discontinuedFilter: string = "";

  constructor(
    private productService: ProductService
  ) { }

  async ngOnInit() {
    await this.refresh();
  }
  
  async refresh() {
    this.products = await this.productService.getProductsAsync(this.nameFilter, this.discontinuedFilter);
  }
}
