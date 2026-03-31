import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

declare var M: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(
      res => {
        if (res && res.data) {
          this.cartItems = res.data.items || [];
          this.totalAmount = res.data.totalAmount || 0;
        }
      },
      err => {
        console.error('Error loading cart', err);
      }
    );
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1) return;
    this.cartService.updateCartItem(itemId, quantity).subscribe(
      res => {
        this.loadCart();
      },
      err => {
        M.toast({html: 'Lỗi cập nhật số lượng!', classes: 'rounded red'});
      }
    );
  }

  removeItem(itemId: number): void {
    this.cartService.removeCartItem(itemId).subscribe(
      res => {
        M.toast({html: 'Đã xóa sản phẩm khỏi giỏ hàng', classes: 'rounded green'});
        this.loadCart();
      },
      err => {
        M.toast({html: 'Lỗi xóa sản phẩm!', classes: 'rounded red'});
      }
    );
  }

}
