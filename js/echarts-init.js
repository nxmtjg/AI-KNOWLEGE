document.addEventListener('DOMContentLoaded', function() {
    var chartDom = document.getElementById('skillRadar');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        legend: {
            data: ['掌握度', '实践']
        },
        radar: {
            shape: 'circle',
            indicator: [
                { name: 'PS', max: 100 },
                { name: 'PR', max: 100 },
                { name: 'AE', max: 100 },
                { name: 'AU', max: 100 },
                { name: 'DW', max: 100 },
                { name: 'LR', max: 100 }
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [90, 85, 80, 75, 70, 85],
                    name: '掌握度',
                    areaStyle: {
                        color: 'rgba(64,158,255,0.3)'
                    },
                    lineStyle: {
                        color: '#409EFF'
                    }
                },
                {
                    value: [85, 80, 75, 70, 65, 80],
                    name: '实践',
                    areaStyle: {
                        color: 'rgba(103,194,58,0.3)'
                    },
                    lineStyle: {
                        color: '#67C23A'
                    }
                }
            ]
        }]
    };

    // 设置图表配置项
    myChart.setOption(option);

    // 监听卡片放大事件，重新渲染图表
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.classList.contains('active')) {
                setTimeout(() => {
                    myChart.resize();
                }, 400);
            }
        });
    });

    const skillCard = document.querySelector('.card[data-index="2"]');
    observer.observe(skillCard, { attributes: true });
}); 