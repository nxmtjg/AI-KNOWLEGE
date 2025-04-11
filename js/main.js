document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    
    // 如果是主页或index.html，加载index01.html的内容
    if (currentPath === '/' || currentPath === '/index.html') {
        loadContent('/index01.html');
    } else {
        // 否则加载对应页面的内容
        loadContent(currentPath);
    }

    // 添加导航栏滚动隐藏效果
    let lastScrollTop = 0;
    const nav = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 向下滚动时隐藏导航栏
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
            nav.style.opacity = '0';
        } 
        // 向上滚动时显示导航栏
        else {
            nav.style.transform = 'translateY(0)';
            nav.style.opacity = '1';
        }
        
        lastScrollTop = currentScroll;
    });

    // 轮播图功能
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    const slideInterval = 5000; // 设置轮播间隔为5秒
    let slideTimer;

    // 创建轮播点
    carouselSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        carouselDots.appendChild(dot);
        
        // 点击轮播点切换到对应幻灯片
        dot.addEventListener('click', () => {
            clearInterval(slideTimer); // 清除当前定时器
            goToSlide(index);
            startSlideTimer(); // 重新开始自动播放
        });
    });

    // 更新轮播点状态
    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // 切换到指定幻灯片
    function goToSlide(index) {
        carouselSlides[currentSlide].style.display = 'none';
        currentSlide = index;
        if (currentSlide >= carouselSlides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = carouselSlides.length - 1;
        carouselSlides[currentSlide].style.display = 'block';
        updateDots();
    }

    // 下一张幻灯片
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // 上一张幻灯片
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // 开始自动播放
    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // 初始化显示第一张幻灯片
    carouselSlides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
    });

    // 添加按钮事件监听
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideTimer);
            prevSlide();
            startSlideTimer();
        });

        nextBtn.addEventListener('click', () => {
            clearInterval(slideTimer);
            nextSlide();
            startSlideTimer();
        });
    }

    // 鼠标悬停时暂停自动播放
    document.querySelector('.carousel').addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });

    // 鼠标离开时恢复自动播放
    document.querySelector('.carousel').addEventListener('mouseleave', () => {
        startSlideTimer();
    });

    // 开始自动播放
    startSlideTimer();
});

function loadContent(path) {
    fetch(path)
        .then(response => response.text())
        .then(html => {
            // 将内容插入到主框架的内容区域
            document.querySelector('main').innerHTML = html;
            
            // 更新导航栏激活状态
            updateNavigation(path);
        });
}

function updateNavigation(path) {
    // 移除所有导航项的激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // 为当前页面的导航项添加激活状态
    const currentNav = document.querySelector(`.nav-link[href="${path}"]`);
    if (currentNav) {
        currentNav.classList.add('active');
    } else if (path === '/index01.html' && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
        // 如果是主页加载index01的内容，激活"笔记"导航项
        document.querySelector('.nav-link[href="index01.html"]').classList.add('active');
    }
}