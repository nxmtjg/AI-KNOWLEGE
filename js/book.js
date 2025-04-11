class CardGallery {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.isAnimating = false;
        
        // 调整对称布局
        this.positions = [
            { x: 0, z: 150, angle: 0, scale: 1 },          // 正前方
            { x: 400, z: -100, angle: -30, scale: 0.85 },  // 右侧
            { x: 0, z: -350, angle: 0, scale: 0.7 },       // 后方
            { x: -400, z: -100, angle: 30, scale: 0.85 }   // 左侧
        ];
        
        this.cardPositions = [0, 1, 2, 3];
        this.init();
        this.bindEvents();
    }

    init() {
        this.updateCardsPosition();
    }

    updateCardsPosition() {
        this.cards.forEach((card, index) => {
            if (!card.classList.contains('active')) {
                const posIndex = this.cardPositions[index];
                const pos = this.positions[posIndex];
                
                if (posIndex !== 2) {
                    card.style.display = 'block';
                    // 保持垂直位置一致
                    card.style.transform = `translate(-50%, -50%) 
                        translateX(${pos.x}px) 
                        translateZ(${pos.z}px) 
                        rotateY(${pos.angle}deg) 
                        scale(${pos.scale})`;
                    card.style.zIndex = 1000 + pos.z;
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    bindEvents() {
        // 点击卡片放大
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => this.zoomCard(index));
        });

        // 导航按钮
        document.querySelector('.prev-btn').addEventListener('click', () => this.navigate('prev'));
        document.querySelector('.next-btn').addEventListener('click', () => this.navigate('next'));

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate('prev');
            if (e.key === 'ArrowRight') this.navigate('next');
            if (e.key === 'Escape') this.resetZoom();
        });
    }

    zoomCard(index) {
        if (this.isAnimating) return;
        
        const card = this.cards[index];
        if (card.classList.contains('active')) {
            this.resetZoom();
            return;
        }

        this.isAnimating = true;
        this.cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // 放大时保持在中心位置
        card.style.transform = `translate(-50%, -50%) 
            translateZ(200px) 
            rotateY(0deg) 
            scale(1.15)`;
        card.style.zIndex = 2000;

        setTimeout(() => {
            this.isAnimating = false;
        }, 400);
    }

    handleCardClick = (e) => {
        const card = e.currentTarget;
        if (card.classList.contains('active')) {
            this.resetZoom();
            // 移除点击事件监听
            card.removeEventListener('click', this.handleCardClick);
        }
    }

    resetZoom() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.cards.forEach(card => {
            card.classList.remove('active');
            // 移除所有卡片的点击事件监听
            card.removeEventListener('click', this.handleCardClick);
        });
        
        this.updateCardsPosition();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    navigate(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        if (direction === 'next') {
            this.cardPositions.unshift(this.cardPositions.pop());
        } else {
            this.cardPositions.push(this.cardPositions.shift());
        }

        this.updateCardsPosition();

        setTimeout(() => {
            this.isAnimating = false;
        }, 400);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new CardGallery();
}); 