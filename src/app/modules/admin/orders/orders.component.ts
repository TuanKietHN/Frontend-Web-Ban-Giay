import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';

declare var M: any;
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAdminOrders(0, 50).subscribe(
      res => {
        if (res && res.data && res.data.content) {
          this.orders = res.data.content;
          
          // Init materialize dropdowns after view update
          setTimeout(() => {
            $('.dropdown-trigger').dropdown({
              constrainWidth: false
            });
          }, 100);
        }
      },
      err => {
        console.error('Error loading orders', err);
      }
    );
  }

  updateStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      res => {
        M.toast({html: 'Cập nhật trạng thái thành công!', classes: 'rounded green'});
        this.loadOrders();
      },
      err => {
        M.toast({html: 'Lỗi cập nhật trạng thái', classes: 'rounded red'});
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
