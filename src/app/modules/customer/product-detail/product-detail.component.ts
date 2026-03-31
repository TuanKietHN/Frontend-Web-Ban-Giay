import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

declare var M: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  selectedImage: string = '';
  selectedVariantId: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(Number(id));
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      res => {
        if (res && res.data) {
          this.product = res.data;
          if (this.product.images && this.product.images.length > 0) {
            this.selectedImage = this.product.images[0].imageUrl;
          } else {
            this.selectedImage = 'https://via.placeholder.com/500x500?text=No+Image';
          }
        }
      },
      err => {
        console.error('Error loading product details', err);
        M.toast({html: 'Không thể tải thông tin sản phẩm', classes: 'rounded red'});
      }
    );
  }

  addToCart(): void {
    if (!this.authService.isLoggedIn()) {
      M.toast({html: 'Vui lòng đăng nhập để thêm vào giỏ hàng!', classes: 'rounded red'});
      this.router.navigate(['/login']);
      return;
    }

    if (!this.selectedVariantId) {
      M.toast({html: 'Vui lòng chọn Size và Màu sắc!', classes: 'rounded orange'});
      return;
    }

    const payload = {
      productVariantId: Number(this.selectedVariantId),
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
}
