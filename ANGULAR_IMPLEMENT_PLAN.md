# Kế Hoạch Triển Khai Frontend - Dự án Web Bán Giày TLU

## 1. Tổng Quan
Dự án frontend xây dựng dựa trên hệ thống backend (Java Spring Boot) hiện tại của hệ thống "Web Bán Giày TLU". Giao diện sẽ bao gồm hai phần chính: **Trang Khách Hàng (Customer Portal)** và **Trang Quản Trị (Admin Dashboard)**.

## 2. Công Nghệ Sử Dụng
- **Framework**: Angular 9
- **UI/UX Framework**: 
  - **Bootstrap 4**: Hỗ trợ chia grid system, các component cơ bản và responsive.
  - **Materialize CSS**: Áp dụng Material Design cho các hiệu ứng, form, nút bấm và cảm giác hiện đại.
- **State Management**: RxJS (tích hợp sẵn trong Angular).
- **HTTP Client**: Sử dụng `HttpClientModule` kết hợp Interceptors để xử lý JWT token.

## 3. Phân Tích Chức Năng (Dựa trên Backend hiện tại)

### 3.1. Phân Hệ Xác Thực & Phân Quyền (Auth Module)
- Đăng nhập, Đăng ký cho Khách hàng.
- Đăng nhập cho Admin/Nhân viên.
- Quản lý Profile, Đổi mật khẩu.
- Interceptor đính kèm JWT Token và xử lý Refresh Token.

### 3.2. Phân Hệ Sản Phẩm (Product Module)
- **Trang Khách Hàng**: 
  - Hiển thị danh sách sản phẩm, phân trang, lọc theo danh mục (Category), thẻ (Tag), loại bề mặt (Surface).
  - Chi tiết sản phẩm: Xem hình ảnh, thông số kỹ thuật (Specs), biến thể (Size, Màu sắc).
  - Đánh giá sản phẩm (Reviews) và danh sách yêu thích (Wishlist).
- **Trang Quản Trị**: Quản lý danh mục, thêm/sửa/xóa sản phẩm và các biến thể.

### 3.3. Phân Hệ Giỏ Hàng & Đơn Hàng (Order & Cart Module)
- Giỏ hàng: Thêm, sửa số lượng, xóa sản phẩm khỏi giỏ hàng.
- Áp dụng mã giảm giá (Coupon).
- Quản lý sổ địa chỉ giao hàng.
- Thanh toán (Checkout): Hỗ trợ COD, Stripe, SePay.
- Theo dõi đơn hàng của khách.
- **Trang Quản Trị**: Quản lý trạng thái đơn hàng (AdminOrderService).

### 3.4. Phân Hệ Thanh Toán (Payment Module)
- Tích hợp thanh toán qua API của bên thứ ba (Stripe) và thanh toán nội địa (SePay).

### 3.5. Phân Hệ Bảng Điều Khiển Admin (Dashboard)
- Hiển thị các chỉ số thống kê doanh thu, đơn hàng, sản phẩm bán chạy.

### 3.6. Phân Hệ Chatbot
- Giao diện bong bóng chat AI hỗ trợ tìm kiếm sản phẩm cho khách hàng.

### 3.7. Real-time (WebSocket)
- Nhận thông báo cập nhật số lượng tồn kho (StockUpdate) và trạng thái đơn hàng realtime.

## 4. Thiết Kế Giao Diện (UI/UX)
- **Màu sắc chủ đạo**: Màu xanh navy (sự tin cậy) kết hợp với trắng và điểm nhấn màu cam (tạo sự nổi bật cho nút Mua Hàng).
- **Trang chủ**: Banner quảng cáo giày nổi bật, danh sách danh mục (Sneaker, Thể thao, Boot...), carousel sản phẩm bán chạy/mới nhất.
- **Trang chi tiết**: Hình ảnh to rõ, bên phải là lựa chọn kích cỡ/màu sắc với giao diện trực quan (dùng Materialize forms).
- **Admin**: Layout có Sidebar cố định, bảng dữ liệu sử dụng Materialize table, biểu đồ thống kê.

## 5. Lộ Trình Triển Khai

### Giai Đoạn 1: Khởi Tạo Dự Án & Cấu Hình Cơ Bản
- Cài đặt Angular CLI 9.
- Tạo dự án `frontend_angular`.
- Cài đặt và tích hợp Bootstrap, Materialize CSS.
- Thiết lập cấu trúc thư mục (core, shared, modules: admin, customer).
- Cấu hình Environment (API Endpoints).

### Giai Đoạn 2: Xây Dựng Shared & Core
- Tạo HTTP Interceptor cho JWT.
- Viết các Services giao tiếp API cơ bản.
- Tạo các Guard phân quyền (AdminGuard, AuthGuard).

### Giai Đoạn 3: Phát Triển Giao Diện Khách Hàng (Customer)
- Layout chính (Header, Footer, Chatbot UI).
- Trang chủ, Danh sách sản phẩm, Chi tiết sản phẩm.
- Giỏ hàng và Checkout flow.
- Tích hợp WebSocket nhận thông báo tồn kho.

### Giai Đoạn 4: Phát Triển Giao Diện Admin
- Admin Layout (Sidebar, Navbar).
- Dashboard (Thống kê).
- Quản lý Sản phẩm, Danh mục.
- Quản lý Đơn hàng.

### Giai Đoạn 5: Kiểm Thử & Hoàn Thiện
- Kiểm tra Responsive trên các thiết bị.
- Bắt lỗi giao diện và tối ưu trải nghiệm người dùng.
