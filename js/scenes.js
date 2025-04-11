// 场景页面交互增强
class ScenesEnhancer {
    constructor() {
        this.sceneItems = document.querySelectorAll('.scene-item');
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.addScrollAnimation();
    }

    addHoverEffects() {
        this.sceneItems.forEach(item => {
            const overlay = item.querySelector('.scene-overlay');
            
            item.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        });
    }

    addScrollAnimation() {
        const options = {
            root: null,
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);

        this.sceneItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'all 0.8s ease-out';
            observer.observe(item);
        });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new ScenesEnhancer();
});

// 添加滚动触发动画
document.addEventListener('DOMContentLoaded', () => {
    const sceneBlocks = document.querySelectorAll('.scene-block');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    sceneBlocks.forEach(block => {
        observer.observe(block);
    });
}); 