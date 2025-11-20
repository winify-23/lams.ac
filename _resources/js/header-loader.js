// Header Loader - Tự động điều chỉnh đường dẫn header cho mọi cấp thư mục
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

// Function để điều chỉnh đường dẫn trong header
function adjustHeaderPaths(htmlContent, targetDepth) {
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

// Function chính để load header
function loadHeader() {
    var headerPath = '_components/header.html';
    var currentDepth = getDirectoryDepth();
    
    // Điều chỉnh đường dẫn đến header component
    for (var i = 0; i < currentDepth; i++) {
        headerPath = '../' + headerPath;
    }
    
    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            // Điều chỉnh đường dẫn trong header dựa trên số cấp thư mục
            data = adjustHeaderPaths(data, currentDepth);
            var container = document.getElementById('header-container');
            if (container) {
                container.innerHTML = data;
                // Re-initialize Bootstrap components if needed
                if (typeof bootstrap !== 'undefined') {
                    // Reinitialize dropdowns and other Bootstrap components
                    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
                    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
                        return new bootstrap.Dropdown(dropdownToggleEl);
                    });
                }
            }
        })
        .catch(error => console.error('Error loading header:', error));
}

// Tự động load header khi DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}

