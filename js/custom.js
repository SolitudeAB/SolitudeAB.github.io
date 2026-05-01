/* ===== 音乐播放器（原生 APlayer） =====
  把 MP3 文件放到 source/music/ 目录下，取消注释并替换为你的歌曲信息
  ============================================================ */
// 有歌曲后再取消下面注释启用播放器

window.addEventListener('load', () => {
    if (typeof APlayer !== 'undefined' && document.getElementById('aplayer')) {
        new APlayer({
            container: document.getElementById('aplayer'),
            fixed: true,
            mini: true,
            autoplay: false,
            theme: '#DEAC96',
            loop: 'all',
            order: 'random',
            preload: 'auto',
            volume: 0.5,
            mutex: true,
            lrcType: 0,
            listFolded: true,
            audio: [
                { name: '鼓楼', artist: '赵雷', url: '/music/song_1.mp3' },
                { name: '小行迹', artist: '赵雷', url: '/music/song_2.mp3' },
                { name: '凌晨计程车', artist: '赵雷', url: '/music/song_3.mp3' }
            ]
        });
    }
});


/* ===== 页脚运行时间统计 ===== */
document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date('2026/05/01');
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const runtimeText = '本站已运行 ' + days + ' 天 ' + hours + ' 小时';

    const footerEl = document.querySelector('#footer-wrap .framework-info')
                  || document.querySelector('#footer .copyright')
                  || document.querySelector('#footer');
    if (footerEl) {
        const span = document.createElement('span');
        span.className = 'runtime';
        span.innerHTML = '<br>' + runtimeText;
        span.style.cssText = 'font-size:0.85em;color:#fff;';
        footerEl.appendChild(span);
    }
});

/* ===== 归档按月折叠 ===== */
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('div#archive')) return;

    const archiveEl = document.querySelector('div#archive');
    // 找到年份标题 (h2) 和月份标题 (h3)
    const years = archiveEl.querySelectorAll('.article-sort-title');

    years.forEach(year => {
        const yearText = year.textContent.trim();
        // 生成年份 ID
        const yearId = 'year-' + yearText.replace(/[^0-9]/g, '');
        year.setAttribute('data-year', yearId);

        let next = year.nextElementSibling;
        const items = [];
        while (next && !next.classList.contains('article-sort-title')) {
            items.push(next);
            next = next.nextElementSibling;
        }

        // 将同一年下的条目包裹在一个容器中
        if (items.length > 0) {
            const wrapper = document.createElement('div');
            wrapper.className = 'year-items';
            items.forEach(item => wrapper.appendChild(item));
            year.parentNode.insertBefore(wrapper, year.nextElementSibling);
        }
    });

    // 点击年份折叠
    archiveEl.querySelectorAll('.article-sort-title').forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function () {
            const wrapper = this.nextElementSibling;
            if (wrapper && wrapper.classList.contains('year-items')) {
                const isOpen = wrapper.style.display !== 'none';
                wrapper.style.display = isOpen ? 'none' : 'block';
                // 旋转指示箭头
                const icon = this.querySelector('.article-sort-item-icon');
                if (icon) {
                    icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
                }
            }
        });
    });
});
