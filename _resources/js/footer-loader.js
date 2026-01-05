// Footer Loader - Tự động điều chỉnh đường dẫn footer cho mọi cấp thư mục
// Sử dụng lại function từ header-loader.js nếu có, hoặc định nghĩa riêng
// Function để tính số cấp thư mục từ root
function getDirectoryDepth() {
    var path = window.location.pathname;
    // Loại bỏ index.html hoặc tên file
    path = path.replace(/\/[^\/]+$/, '');
    // Loại bỏ dấu / ở đầu nếu có
    path = path.replace(/^\/+/, '');
    // Đếm số cấp thư mục (số segment không rỗng)
    var depth = path.split('/').filter(function(segment) {
        return segment.length > 0;
    }).length;
    return depth;
}

// Function để điều chỉnh đường dẫn trong footer
function adjustFooterPaths(htmlContent, targetDepth) {
    // Tạo chuỗi ../ tương ứng với số cấp
    var rootPath = '';
    for (var i = 0; i < targetDepth; i++) {
        rootPath += '../';
    }
    
    if (targetDepth === 0) {
        // Ở root, loại bỏ ../ nếu có (giữ nguyên các link không có ../)
        htmlContent = htmlContent.replace(/href="\.\.\//g, 'href="');
        htmlContent = htmlContent.replace(/src="\.\.\//g, 'src="');
    } else {
        // Ở subdirectory
        // 1. Thay thế các link có ../ bằng rootPath
        htmlContent = htmlContent.replace(/href="\.\.\//g, 'href="' + rootPath);
        htmlContent = htmlContent.replace(/src="\.\.\//g, 'src="' + rootPath);
        
        // 2. Thêm rootPath vào các link tương đối không có ../ và không phải link đặc biệt
        htmlContent = htmlContent.replace(/href="([^"]+)"/g, function(match, path) {
            // Bỏ qua các link đặc biệt
            if (path === '#' || 
                path.indexOf('http://') === 0 || 
                path.indexOf('https://') === 0 || 
                path.indexOf('mailto:') === 0 || 
                path.indexOf('tel:') === 0 || 
                path.indexOf('javascript:') === 0 ||
                path.indexOf('#') === 0 ||
                path.indexOf('../') === 0 ||
                path.indexOf('/') === 0) {
                return match;
            }
            // Thêm rootPath vào các link tương đối
            return 'href="' + rootPath + path + '"';
        });
        
        // Xử lý src cho images
        htmlContent = htmlContent.replace(/src="([^"]+)"/g, function(match, path) {
            // Bỏ qua các link đặc biệt hoặc đã có ../
            if (path.indexOf('http://') === 0 || 
                path.indexOf('https://') === 0 || 
                path.indexOf('data:') === 0 ||
                path.indexOf('../') === 0 ||
                path.indexOf('/') === 0) {
                return match;
            }
            // Thêm rootPath vào các đường dẫn tương đối
            return 'src="' + rootPath + path + '"';
        });
    }
    
    return htmlContent;
}

// Function chính để load footer
function loadFooter() {
    var currentDepth = getDirectoryDepth();
    var footerPath;
    
    // Tính toán base path từ root (xử lý trường hợp GitHub Pages có subpath)
    var pathname = window.location.pathname;
    // Loại bỏ tên file và trailing slash
    var basePath = pathname.replace(/\/[^\/]*$/, '');
    if (!basePath) {
        basePath = '';
    }
    
    if (currentDepth === 0) {
        // Ở root, sử dụng đường dẫn tuyệt đối từ root để tránh lỗi trên GitHub Pages
        footerPath = basePath + '/_components/footer.html';
    } else {
        // Ở subdirectory, sử dụng đường dẫn tương đối
        footerPath = '_components/footer.html';
        for (var i = 0; i < currentDepth; i++) {
            footerPath = '../' + footerPath;
        }
    }
    
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            // Điều chỉnh đường dẫn trong footer dựa trên số cấp thư mục
            data = adjustFooterPaths(data, currentDepth);
            var container = document.getElementById('footer-container');
            if (container) {
                container.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Tự động load footer khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}

