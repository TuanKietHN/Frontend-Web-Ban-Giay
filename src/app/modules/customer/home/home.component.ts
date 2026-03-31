import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

declare var $: any;
declare var M: any; // Materialize

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  products: any[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    this.loadProducts();

    $(document).ready(function() {
      // Init Bootstrap Carousel
      $('.carousel').carousel();
      // Init Materialize Sidenav
      $('.sidenav').sidenav();
      // Init Materialize Tabs
      $('.tabs').tabs();
    });
  }

  loadProducts(): void {
    this.productService.getProducts(0, 8).subscribe(
      res => {
        if (res && res.data && res.data.content) {
          this.products = res.data.content;
        }
      },
      err => {
        console.error('Error loading products', err);
      }
    );
  }

  addToCart(product: any): void {
    if (!this.isLoggedIn) {
      M.toast({html: 'Vui lòng đăng nhập để thêm vào giỏ hàng!', classes: 'rounded red'});
      return;
    }

    // Attempt to pick first variant for simplification
    const variantId = (product.variants && product.variants.length > 0) ? product.variants[0].id : null;
    
    if (!variantId) {
      M.toast({html: 'Sản phẩm này hiện chưa có biến thể cụ thể!', classes: 'rounded orange'});
      return;
    }

    const payload = {
      productVariantId: variantId,
      quantity: 1
    };

    this.cartService.addToCart(payload).subscribe(
      res => {
        M.toast({html: 'Đã thêm vào giỏ hàng!', classes: 'rounded green'});
      },
      err => {
        M.toast({html: 'Có lỗi xảy ra, vui lòng thử lại sau!', classes: 'rounded red'});
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
