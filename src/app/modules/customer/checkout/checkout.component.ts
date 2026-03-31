import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';

declare var M: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;

  checkoutForm = {
    fullName: '',
    phone: '',
    address: '',
    paymentMethod: 'COD',
    note: ''
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(
      res => {
        if (res && res.data) {
          this.cartItems = res.data.items || [];
          this.totalAmount = res.data.totalAmount || 0;

          if (this.cartItems.length === 0) {
            M.toast({html: 'Giỏ hàng trống!', classes: 'rounded orange'});
            this.router.navigate(['/cart']);
          }
        }
      },
      err => {
        console.error('Error loading cart for checkout', err);
      }
    );
  }

  onCheckout(): void {
    if (!this.checkoutForm.fullName || !this.checkoutForm.phone || !this.checkoutForm.address) {
      M.toast({html: 'Vui lòng điền đầy đủ thông tin giao hàng!', classes: 'rounded red'});
      return;
    }

    const payload = {
      addressId: null, // Simplification: we might need to create address first or pass direct details
      shippingAddress: this.checkoutForm.address,
      paymentMethod: this.checkoutForm.paymentMethod,
      note: this.checkoutForm.note
    };

    this.orderService.checkout(payload).subscribe(
      res => {
        M.toast({html: 'Đặt hàng thành công!', classes: 'rounded green'});
        this.router.navigate(['/']);
      },
      err => {
        M.toast({html: 'Lỗi đặt hàng!', classes: 'rounded red'});
      }
    );
  }

}
