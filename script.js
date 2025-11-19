// Lấy các phần tử
const phongBi = document.querySelector('.phongbi');
const thiep = document.querySelector('.thiepchucmung');
const audio = document.getElementById('audio-nen'); // Lấy thẻ audio

// Biến đếm bước
// 0: Chưa chạy
// 1: Đã vào giữa (Sẵn sàng mở)
// 2: Đã mở nắp (Sẵn sàng hiện thiệp)
// 3: Đang hiện thiệp (Sẵn sàng đóng lại)
let buoc = 0;

// 1. KHI VÀO TRANG WEB: Phong bì bay từ trái vào giữa
window.addEventListener('load', () => {
    setTimeout(() => {
        phongBi.classList.add('slide-in');
        buoc = 1; // Đánh dấu là phong bì đã vào vị trí
    }, 500);
});

// 2. XỬ LÝ SỰ KIỆN CLICK TRÊN PHONG BÌ
phongBi.addEventListener('click', () => {
    if (buoc === 1) {
        // CLICK LẦN 1: Mở phong bì
        phongBi.classList.add('open');
        buoc = 2; 
        
        // --- THÊM: PHÁT NHẠC KHI MỞ PHONG BÌ ---
        if(audio) {
            audio.play().catch(e => console.log("Trình duyệt chặn autoplay: ", e));
        }
        // ---------------------------------------

    } else if (buoc === 2) {
        // CLICK LẦN 2: Ẩn phong bì -> Hiện thiệp
        phongBi.classList.add('hide-di'); // Ẩn phong bì
        
        // Đợi phong bì mờ đi chút rồi hiện thiệp
        setTimeout(() => {
            thiep.classList.add('hien-len');
        }, 300);
        
        buoc = 3;
    }
});

// 3. XỬ LÝ SỰ KIỆN CLICK TRÊN THIỆP (CLICK LẦN 3 - RESET TẠI CHỖ)
thiep.addEventListener('click', (e) => {
    // Ngăn việc click vào link (nút bấm) mà lại bị đóng thiệp
    if (e.target.closest('.btn-thiep')) return;

    if (buoc === 3) {
        // Ẩn thiệp đi trước
        thiep.classList.remove('hien-len');

        // --- THÊM: DỪNG NHẠC KHI ĐÓNG THIỆP ---
        if(audio) {
            audio.pause();
            audio.currentTime = 0; // Tua lại từ đầu cho lần mở sau
        }
        // --------------------------------------

        // Đợi thiệp mờ đi (300ms) thì hiện lại phong bì ở trạng thái đóng
        setTimeout(() => {
            // Hiện lại phong bì
            phongBi.classList.remove('hide-di'); 
            
            // Đóng nắp phong bì và hạ giấy xuống
            phongBi.classList.remove('open');    
            
            // LƯU Ý: KHÔNG gỡ class 'slide-in' -> Phong bì vẫn đứng yên giữa màn hình
            
            // Quay về bước 1 (Bước chờ click để mở)
            buoc = 1; 
            
        }, 300); 
    }
});