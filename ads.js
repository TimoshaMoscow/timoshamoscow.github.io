/* ===== ads.js ===== */
/* Фиксированные рекламные баннеры по бокам страницы */

(function() {
    'use strict';

    // ============================================================
    // НАСТРОЙКИ РЕКЛАМЫ — РЕДАКТИРУЙТЕ ЗДЕСЬ
    // ============================================================
    
    // Название нашего сайта — используется как реферальная метка в ссылках
    const REFERRAL_TAG = 'timoshamoscow';
    
    const ADS_CONFIG = {
        // Показывать ли рекламу (true/false)
        enabled: true,

        // Задержка перед показом (мс)
        delay: 800,

        // Сколько карточек максимум показывать с одной стороны
        maxPerSide: 2,

        // Через сколько миллисекунд "мягко скрытая" реклама снова может показаться
        // Например: 1000 * 60 * 60 * 24 = 1 день (24 часа)
        // 1000 * 60 * 30 = 30 минут
        // 1000 * 60 * 5 = 5 минут (для теста)
        softHideDuration: 1000 * 60 * 60 * 6, // 6 часов

        // Сколько реклам минимум должно быть с каждой стороны
        minPerSide: 2,

        // Левая колонка рекламы
        left: [
            {
                id: 'ad-left-1',
                title: '🚀 Лучший генератор промптов для нейросетей',
                description: 'Соберите точный запрос для нейросети за пару минут — без пустого листа и бесконечных правок.',
                buttonText: 'Попробовать',
                link: 'https://timoshamoscow.github.io/taiprompts.github.io/',
                color: '#5e72e4',
                icon: '🚀',
                label: 'Реклама'
            },
            {
                id: 'ad-left-2',
                title: '🔮 Язык будущего (проще русского)',
                description: 'Простой, логичный, современный. Создан Тимофеем Сибилевым для лёгкого общения',
                buttonText: 'Узнать больше',
                link: 'https://timoshamoscow.github.io/sibylevec-site.github.io/',
                color: '#3ea9bf',
                icon: '🔮',
                label: 'Реклама'
            }
        ],

        // Правая колонка рекламы
        right: [
            {
                id: 'ad-right-1',
                title: '🖥️ TPlayer',
                description: 'Профессиональный видеоплеер с 40+ функциями: PiP, скриншоты, закладки, эквалайзер, режим "Только аудио", A/B повтор и многое другое.',
                buttonText: 'Установить',
                link: 'https://timoshamoscow.github.io/tplayer/',
                color: '#ff0000',
                icon: '🖥️',
                label: 'Реклама'
            },
            {
                id: 'ad-right-2',
                title: '🎨 Студия скинов, рендеров и многого другого по Minecraft',
                description: 'Индивидуальный дизайн, быстрые сроки и доступные цены. От идеи до готового результата — за 1-2 дня.',
                buttonText: 'Заказать',
                link: 'https://timoshamoscow.github.io/tstudios/',
                color: '#3b82f6',
                icon: '🎨',
                label: 'Реклама'
            }
        ]
    };

    // ============================================================
    // УТИЛИТЫ
    // ============================================================

    /**
     * Добавляет реферальную метку к URL.
     */
    function addReferral(url, ref) {
        if (!url || url === '#') return url;
        
        const separator = url.includes('?') ? '&' : '?';
        
        if (/[?&]ref=/.test(url)) {
            return url.replace(/([?&]ref=)[^&]*/, '$1' + encodeURIComponent(ref));
        }
        
        return url + separator + 'ref=' + encodeURIComponent(ref);
    }

    /**
     * Перемешивает массив (алгоритм Фишера–Йетса).
     */
    function shuffleArray(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * Выбирает случайные N элементов из массива.
     */
    function pickRandom(array, count) {
        if (array.length <= count) return array.slice();
        return shuffleArray(array).slice(0, count);
    }

    // ============================================================
    // СТИЛИ
    // ============================================================
    const AD_STYLES = `
        .ct-ads-container {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            z-index: 800;
            display: flex;
            flex-direction: column;
            gap: 20px;
            pointer-events: none;
            width: 180px;
            transition: opacity 0.5s ease;
            opacity: 0;
        }
        .ct-ads-container.visible {
            opacity: 1;
            pointer-events: auto;
        }
        .ct-ads-left {
            left: 15px;
        }
        .ct-ads-right {
            right: 15px;
        }
        .ct-ad-card {
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
            border: 1px solid #e5e7eb;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        .ct-ad-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
            border-color: #06b6d4;
        }
        .ct-ad-topbar {
            height: 4px;
            width: 100%;
            background: #06b6d4;
        }
        .ct-ad-label {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 9px;
            font-weight: 600;
            color: #9ca3af;
            background: #f9fafb;
            padding: 2px 8px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            z-index: 2;
        }
        .ct-ad-body {
            padding: 16px 14px 14px;
        }
        .ct-ad-icon {
            font-size: 26px;
            margin-bottom: 8px;
            line-height: 1;
        }
        .ct-ad-title {
            font-size: 13px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 6px;
            line-height: 1.3;
            word-break: break-word;
        }
        .ct-ad-description {
            font-size: 11px;
            color: #6b7280;
            line-height: 1.4;
            margin-bottom: 12px;
            word-break: break-word;
        }
        .ct-ad-btn {
            display: block;
            width: 100%;
            padding: 8px 10px;
            border: none;
            border-radius: 8px;
            background: #06b6d4;
            color: #ffffff;
            font-size: 11px;
            font-weight: 600;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            letter-spacing: 0.3px;
            text-decoration: none;
        }
        .ct-ad-card:hover .ct-ad-btn {
            filter: brightness(1.1);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }
        .ct-ad-close {
            position: absolute;
            top: 6px;
            left: 6px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e5e7eb;
            color: #9ca3af;
            font-size: 10px;
            font-weight: 700;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 0;
            line-height: 1;
            z-index: 3;
            transition: all 0.2s ease;
            font-family: inherit;
        }
        .ct-ad-card:hover .ct-ad-close {
            display: flex;
        }
        .ct-ad-close:hover {
            background: #ef4444;
            color: #ffffff;
            border-color: #ef4444;
        }

        @media (max-width: 1400px) {
            .ct-ads-container {
                width: 150px;
            }
            .ct-ad-title {
                font-size: 12px;
            }
            .ct-ad-description {
                font-size: 10px;
            }
        }
        @media (max-width: 1200px) {
            .ct-ads-container {
                display: none !important;
            }
        }

        [data-theme="dark"] .ct-ad-card {
            background: #1f2937;
            border-color: #374151;
        }
        [data-theme="dark"] .ct-ad-title {
            color: #f3f4f6;
        }
        [data-theme="dark"] .ct-ad-description {
            color: #9ca3af;
        }
        [data-theme="dark"] .ct-ad-label {
            background: #111827;
            border-color: #374151;
            color: #6b7280;
        }
        [data-theme="dark"] .ct-ad-close {
            background: #111827;
            border-color: #374151;
            color: #6b7280;
        }
    `;

    // ============================================================
    // ХРАНИЛИЩЕ "МЯГКО СКРЫТЫХ" РЕКЛАМ
    // ============================================================

    const STORAGE_KEY = 'ct_hidden_ads';

    function getHiddenMap() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return {};
            const parsed = JSON.parse(raw);
            return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
        } catch (e) {
            return {};
        }
    }

    function saveHiddenMap(map) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
        } catch (e) {
            // localStorage переполнен или заблокирован
        }
    }

    /**
     * Скрывает рекламу "мягко" — запоминает время скрытия.
     */
    function hideAdSoft(adId) {
        const map = getHiddenMap();
        map[adId] = Date.now();
        saveHiddenMap(map);
    }

    /**
     * Проверяет, скрыта ли реклама прямо сейчас (с учётом времени).
     */
    function isAdHidden(adId) {
        const map = getHiddenMap();
        const hiddenAt = map[adId];
        if (!hiddenAt) return false;

        const elapsed = Date.now() - hiddenAt;
        if (elapsed >= ADS_CONFIG.softHideDuration) {
            return false;
        }
        return true;
    }

    /**
     * Очищает устаревшие записи.
     */
    function cleanupHiddenMap() {
        const map = getHiddenMap();
        const now = Date.now();
        let changed = false;
        for (const id in map) {
            if (now - map[id] >= ADS_CONFIG.softHideDuration) {
                delete map[id];
                changed = true;
            }
        }
        if (changed) saveHiddenMap(map);
    }

    // ============================================================
    // ЛОГИКА ФИЛЬТРАЦИИ
    // ============================================================

    /**
     * Возвращает массив реклам для показа с учётом:
     * 1. Мягко скрытых (по таймеру)
     * 2. Минимума реклам
     * 3. Случайного выбора до maxPerSide
     */
    function selectAdsToShow(allAds) {
        const visibleAds = allAds.filter(ad => !isAdHidden(ad.id));
        let pool = visibleAds.slice();

        if (pool.length < ADS_CONFIG.minPerSide) {
            const map = getHiddenMap();
            const hiddenAds = allAds
                .filter(ad => !pool.some(p => p.id === ad.id))
                .map(ad => ({
                    ad: ad,
                    hiddenAt: map[ad.id] || 0
                }))
                .sort((a, b) => a.hiddenAt - b.hiddenAt)
                .map(entry => entry.ad);

            const need = ADS_CONFIG.minPerSide - pool.length;
            const forced = hiddenAds.slice(0, need);
            pool = pool.concat(forced);
        }

        if (pool.length > ADS_CONFIG.maxPerSide) {
            pool = pickRandom(pool, ADS_CONFIG.maxPerSide);
        }

        return pool;
    }

    // ============================================================
    // ОТОБРАЖЕНИЕ
    // ============================================================

    function createAdCard(ad) {
        const card = document.createElement('div');
        card.className = 'ct-ad-card';
        card.dataset.adId = ad.id;

        const finalLink = addReferral(ad.link, REFERRAL_TAG);

        card.innerHTML = `
            <div class="ct-ad-topbar" style="background: ${ad.color || '#06b6d4'};"></div>
            <span class="ct-ad-label">${ad.label || 'Реклама'}</span>
            <button class="ct-ad-close" title="Скрыть">✕</button>
            <div class="ct-ad-body">
                ${ad.icon ? `<div class="ct-ad-icon">${ad.icon}</div>` : ''}
                <div class="ct-ad-title">${escapeHtml(ad.title || '')}</div>
                ${ad.description ? `<div class="ct-ad-description">${escapeHtml(ad.description)}</div>` : ''}
                <a href="${escapeAttr(finalLink)}" target="_blank" rel="noopener noreferrer" class="ct-ad-btn" style="background: ${ad.color || '#06b6d4'};">
                    ${escapeHtml(ad.buttonText || 'Подробнее')}
                </a>
            </div>
        `;

        const closeBtn = card.querySelector('.ct-ad-close');
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            hideAdSoft(ad.id);

            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateX(' + (card.closest('.ct-ads-left') ? '-40px' : '40px') + ')';
            
            setTimeout(() => {
                const container = card.parentNode;
                card.remove();
                if (container) {
                    refillContainer(container);
                }
            }, 300);
        });

        return card;
    }

    /**
     * Дозаполняет контейнер рекламой, если после закрытия
     * осталось меньше minPerSide.
     */
    function refillContainer(container) {
        const isLeft = container.classList.contains('ct-ads-left');
        const allAds = isLeft ? ADS_CONFIG.left : ADS_CONFIG.right;
        const currentCount = container.querySelectorAll('.ct-ad-card').length;

        if (currentCount >= ADS_CONFIG.minPerSide) return;

        const shownIds = Array.from(container.querySelectorAll('.ct-ad-card'))
            .map(el => el.dataset.adId);
        
        const need = ADS_CONFIG.minPerSide - currentCount;
        const candidates = allAds.filter(ad => !shownIds.includes(ad.id));
        
        if (candidates.length === 0) return;
        
        const picked = pickRandom(candidates, need);
        
        picked.forEach(ad => {
            const card = createAdCard(ad);
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            container.appendChild(card);
            
            requestAnimationFrame(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        });
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    function escapeAttr(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function createContainer(side) {
        const container = document.createElement('div');
        container.className = `ct-ads-container ct-ads-${side}`;
        container.setAttribute('aria-label', side === 'left' ? 'Реклама слева' : 'Реклама справа');
        container.dataset.side = side;
        return container;
    }

    function fillContainer(container, ads) {
        const adsToShow = selectAdsToShow(ads);

        if (adsToShow.length === 0) {
            container.style.display = 'none';
            return;
        }

        adsToShow.forEach(ad => {
            container.appendChild(createAdCard(ad));
        });
    }

    // ============================================================
    // ИНИЦИАЛИЗАЦИЯ
    // ============================================================

    function init() {
        if (!ADS_CONFIG.enabled) return;

        cleanupHiddenMap();

        if (!document.getElementById('ct-ads-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'ct-ads-styles';
            styleEl.textContent = AD_STYLES;
            document.head.appendChild(styleEl);
        }

        const leftContainer = createContainer('left');
        const rightContainer = createContainer('right');

        if (ADS_CONFIG.left && ADS_CONFIG.left.length > 0) {
            fillContainer(leftContainer, ADS_CONFIG.left);
            if (leftContainer.children.length > 0) {
                document.body.appendChild(leftContainer);
            }
        }
        if (ADS_CONFIG.right && ADS_CONFIG.right.length > 0) {
            fillContainer(rightContainer, ADS_CONFIG.right);
            if (rightContainer.children.length > 0) {
                document.body.appendChild(rightContainer);
            }
        }

        setTimeout(() => {
            if (leftContainer.parentNode) leftContainer.classList.add('visible');
            if (rightContainer.parentNode) rightContainer.classList.add('visible');
        }, ADS_CONFIG.delay);

        window.addEventListener('resize', () => {
            [leftContainer, rightContainer].forEach(c => {
                if (c.parentNode && c.querySelectorAll('.ct-ad-card').length === 0) {
                    c.style.display = 'none';
                }
            });
        });

        // Периодическая проверка: не пора ли вернуть какую-то рекламу?
        setInterval(() => {
            [leftContainer, rightContainer].forEach(c => {
                if (!c.parentNode) return;
                const currentCount = c.querySelectorAll('.ct-ad-card').length;
                if (currentCount < ADS_CONFIG.minPerSide) {
                    refillContainer(c);
                }
            });
        }, 60 * 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================
    // API
    // ============================================================
    window.CreativeAds = {
        config: ADS_CONFIG,
        referral: REFERRAL_TAG,
        
        show: () => {
            ADS_CONFIG.enabled = true;
            document.querySelectorAll('.ct-ads-container').forEach(c => c.classList.add('visible'));
        },
        hide: () => {
            document.querySelectorAll('.ct-ads-container').forEach(c => c.classList.remove('visible'));
        },
        
        resetAll: () => {
            localStorage.removeItem(STORAGE_KEY);
            document.querySelectorAll('.ct-ads-container').forEach(c => c.remove());
            init();
        },
        
        reshuffle: () => {
            document.querySelectorAll('.ct-ads-container').forEach(c => c.remove());
            init();
        },
        
        debugHidden: () => {
            const map = getHiddenMap();
            const now = Date.now();
            console.table(
                Object.entries(map).map(([id, ts]) => ({
                    id,
                    hiddenAt: new Date(ts).toLocaleString('ru-RU'),
                    elapsedMin: Math.round((now - ts) / 60000),
                    willReturnIn: Math.max(0, Math.round((ADS_CONFIG.softHideDuration - (now - ts)) / 60000)) + ' мин'
                }))
            );
        },
        
        addRef: (url) => addReferral(url, REFERRAL_TAG)
    };

})();
