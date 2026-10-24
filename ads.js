/* ===== ads.js ===== */
/* Рекламные баннеры */

(function() {
    'use strict';

    // ============================================================
    // НАСТРОЙКИ
    // ============================================================
    const REFERRAL_TAG = 'Timosha_Moscow';

    const ADS_CONFIG = {
        enabled: true,
        delay: 228,
        maxPerSide: 2,
        minPerSide: 2,
        mobileMax: 1,

        // Интервал показа полноэкранной рекламы (мс). 0 = выключено
        fullscreenInterval: 1000 * 60 * 3,
        fullscreenFirstDelay: 1000 * 30,

        // Проверка перекрытия важных элементов
        checkOverlap: true,
        // Минимальная ширина экрана для проверки (на мобилке своя логика)
        overlapMinWidth: 1200,

        // Как вести себя при перекрытии:
        // 'hide'   — прятать баннер до освобождения места
        // 'shift'  — искать свободное место (сдвиг вверх/вниз)
        overlapStrategy: 'shift',

        // Отступ для поиска свободного места (px)
        shiftStep: 40,
        // Максимальный сдвиг (px)
        maxShift: 400,

        ads: [
            {
                id: 'ad-left-1',
                title: '🚀 Лучший генератор промптов для нейросетей',
                description: 'Соберите точный запрос для нейросети за пару минут — без пустого листа и бесконечных правок.',
                buttonText: 'Попробовать',
                link: 'https://timoshamoscow.github.io/taiprompts.github.io/',
                color: '#5e72e4',
                icon: '🚀',
                label: 'Реклама',
                image: 'https://timoshamoscow.github.io/images/taiprompts.png'
            },
            {
                id: 'ad-left-2',
                title: '🎚️ YATAVO STORE',
                description: 'Прокси Telegram, настройка VPS и удобный VPN! Промокод TIM даёт скидку 15%.',
                buttonText: 'Подключить',
                link: 'https://t.me/yatavostore',
                color: '#00ba22',
                icon: '🎚️',
                label: 'Реклама',
                image: 'https://timoshamoscow.github.io/images/yatavostore.png'
            },
            {
                id: 'ad-left-3',
                title: '🎮 Удобный майнкрафт лаунчер',
                description: 'MILLIDA Лаунчер — лучший лаунчер для Майнкрафт, заменяет Дискорд, Модринт и сайт MC Tiers. Промокод Timosha_Moscow в магазине лаунчера даёт кейс с косметикой',
                buttonText: 'Скачать',
                link: 'https://millida.net/?ref=46DXDAMT',
                color: '#00ba22',
                icon: '🎮',
                label: 'Реклама',
                image: 'https://timoshamoscow.github.io/images/millida.png'
            },
            {
                id: 'ad-left-4',
                title: '🎨 Студия скинов, рендеров и многого другого по Minecraft',
                description: 'Индивидуальный дизайн, быстрые сроки и доступные цены. От идеи до готового результата — за 1-2 дня.',
                buttonText: 'Заказать',
                link: 'https://timoshamoscow.github.io/tstudios/',
                color: '#3b82f6',
                icon: '🎨',
                label: 'Реклама',
                image: 'https://timoshamoscow.github.io/images/tstudios.png'
            },
            {
                id: 'ad-right-1',
                title: '🖥️ TPlayer',
                description: 'Профессиональный видеоплеер с 40+ функциями: PiP, скриншоты, закладки, эквалайзер, режим "Только аудио", A/B повтор и многое другое.',
                buttonText: 'Установить',
                link: 'https://timoshamoscow.github.io/tplayer/',
                color: '#ff0000',
                icon: '🖥️',
                label: 'Реклама',
                image: 'https://timoshamoscow.github.io/images/tplyer.png'
            },
            {
                id: 'ad-right-2',
                title: '🎥 Коллекция профессиональных инструментов',
                description: 'Все необходимые инструменты для работы с документами, цветами, форматами и аудио в одном месте. Работайте эффективно прямо в браузере.',
                buttonText: 'Узнать больше',
                link: 'https://timoshamoscow.github.io/creativetools.github.io/',
                color: '#3ea9bf',
                icon: '🎥',
                label: 'Реклама',
                image: 'https://timoshamoscow.github.io/images/creativet.png'
            },
            {
                id: 'ad-right-3',
                title: '🔮 Язык будущего (проще русского)',
                description: 'Простой, логичный, современный. Создан Тимофеем Сибилевым для лёгкого общения',
                buttonText: 'Узнать больше',
                link: 'https://timoshamoscow.github.io/sibylevec-site.github.io/',
                color: '#3ea9bf',
                icon: '🔮',
                label: 'Реклама',
                image: 'https://timoshamoscow.github.io/images/syb.png'
            },
            {
                id: 'ad-right-4',
                title: '🔥 Багрянство',
                description: 'Это уникальный Minecraft проект с кастомными плагинами и картой. Расы, могилы, крюки, рисование, фаерболы и огнестрел!',
                buttonText: 'Играть',
                link: 'https://discord.gg/6eaRvUKXXs',
                color: '#ff0000',
                icon: '🔥',
                label: 'Реклама',
                image: 'https://timoshamoscow.github.io/images/bagryanez.png'
            }
        ]
    };

    // ============================================================
    // УТИЛИТЫ
    // ============================================================
    function addReferral(url, ref) {
        if (!url || url === '#') return url;
        const separator = url.includes('?') ? '&' : '?';
        if (/[?&]ref=/.test(url)) {
            return url.replace(/([?&]ref=)[^&]*/, '$1' + encodeURIComponent(ref));
        }
        return url + separator + 'ref=' + encodeURIComponent(ref);
    }

    function shuffleArray(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function pickRandom(array, count) {
        if (array.length <= count) return array.slice();
        return shuffleArray(array).slice(0, count);
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
            transition: opacity 0.4s ease, transform 0.4s ease;
            opacity: 0;
        }
        .ct-ads-container.visible {
            opacity: 1;
            pointer-events: auto;
        }
        /* Скрыто из-за перекрытия — плавно */
        .ct-ads-container.ct-ads-obstructed {
            opacity: 0 !important;
            pointer-events: none !important;
            transform: translateY(-50%) scale(0.95);
        }
        .ct-ads-left { left: 15px; }
        .ct-ads-right { right: 15px; }

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
        .ct-ad-image-wrap {
            position: relative;
            width: 100%;
            height: 100px;
            overflow: hidden;
            background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        }
        .ct-ad-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .ct-ad-image-fallback {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 38px;
            background: linear-gradient(135deg, #e0f2fe, #bae6fd);
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
        .ct-ad-body { padding: 16px 14px 14px; }
        .ct-ad-icon { font-size: 26px; margin-bottom: 8px; line-height: 1; }
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
            box-sizing: border-box;
        }
        .ct-ad-card:hover .ct-ad-btn {
            filter: brightness(1.1);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }

        /* === Мобильный баннер сверху === */
        .ct-ads-mobile {
            display: none;
            position: sticky;
            top: 0;
            z-index: 800;
            background: #fff;
            border-bottom: 1px solid #e5e7eb;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 8px 12px;
            padding-top: calc(8px + env(safe-area-inset-top, 0px));
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .ct-ads-mobile.visible { display: block; }
        .ct-ads-mobile.ct-ads-mobile-hidden {
            opacity: 0;
            pointer-events: none;
            transform: translateY(-100%);
            height: 0;
            padding: 0;
            overflow: hidden;
            border: none;
        }
        .ct-ad-mobile-inner {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: inherit;
        }
        .ct-ad-mobile-img {
            width: 56px;
            height: 56px;
            border-radius: 10px;
            object-fit: cover;
            flex-shrink: 0;
            background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        }
        .ct-ad-mobile-img-fallback {
            width: 56px;
            height: 56px;
            border-radius: 10px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
        }
        .ct-ad-mobile-content {
            flex: 1;
            min-width: 0;
        }
        .ct-ad-mobile-title {
            font-size: 13px;
            font-weight: 700;
            color: #1f2937;
            line-height: 1.25;
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .ct-ad-mobile-desc {
            font-size: 11px;
            color: #6b7280;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .ct-ad-mobile-arrow {
            flex-shrink: 0;
            color: #06b6d4;
            font-size: 16px;
        }
        .ct-ad-mobile-label {
            position: absolute;
            top: 4px;
            right: 8px;
            font-size: 8px;
            font-weight: 600;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* === Полноэкранное модальное окно === */
        .ct-ads-fullscreen-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .ct-ads-fullscreen-overlay.show {
            opacity: 1;
            pointer-events: auto;
        }
        .ct-ads-fullscreen {
            background: #fff;
            border-radius: 20px;
            max-width: 480px;
            width: 100%;
            max-height: 90vh;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            flex-direction: column;
        }
        .ct-ads-fullscreen-overlay.show .ct-ads-fullscreen {
            transform: scale(1);
        }
        .ct-ads-fullscreen-topbar {
            height: 6px;
            width: 100%;
            flex-shrink: 0;
        }
        .ct-ads-fullscreen-image-wrap {
            position: relative;
            width: 100%;
            height: 220px;
            flex-shrink: 0;
            overflow: hidden;
            background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        }
        .ct-ads-fullscreen-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .ct-ads-fullscreen-image-fallback {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 80px;
            background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        }
        .ct-ads-fullscreen-body {
            padding: 24px 24px 22px;
            overflow-y: auto;
        }
        .ct-ads-fullscreen-title {
            font-size: 20px;
            font-weight: 800;
            color: #1f2937;
            margin-bottom: 10px;
            line-height: 1.3;
        }
        .ct-ads-fullscreen-desc {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.55;
            margin-bottom: 20px;
        }
        .ct-ads-fullscreen-btn {
            display: block;
            width: 100%;
            padding: 14px 20px;
            border: none;
            border-radius: 12px;
            background: #06b6d4;
            color: #fff;
            font-size: 15px;
            font-weight: 700;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            font-family: inherit;
            box-sizing: border-box;
            transition: all 0.2s ease;
        }
        .ct-ads-fullscreen-btn:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(6, 182, 212, 0.35);
        }
        .ct-ads-fullscreen-close {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.95);
            border: none;
            color: #374151;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .ct-ads-fullscreen-close:hover {
            background: #ef4444;
            color: #fff;
            transform: rotate(90deg);
        }
        .ct-ads-fullscreen-label {
            position: absolute;
            top: 16px;
            left: 16px;
            background: rgba(255, 255, 255, 0.95);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            z-index: 2;
        }

        @media (max-width: 1400px) {
            .ct-ads-container { width: 150px; }
            .ct-ad-title { font-size: 12px; }
            .ct-ad-description { font-size: 10px; }
        }

        @media (max-width: 1200px) {
            .ct-ads-container { display: none !important; }
            .ct-ads-mobile { display: block; }
        }

        @media (max-width: 640px) {
            .ct-ads-fullscreen-body { padding: 20px 18px 18px; }
            .ct-ads-fullscreen-title { font-size: 17px; }
            .ct-ads-fullscreen-desc { font-size: 13px; }
            .ct-ads-fullscreen-image-wrap { height: 180px; }
        }

        [data-theme="dark"] .ct-ad-card,
        [data-theme="dark"] .ct-ads-mobile,
        [data-theme="dark"] .ct-ads-fullscreen {
            background: #1f2937;
        }
        [data-theme="dark"] .ct-ad-title,
        [data-theme="dark"] .ct-ad-mobile-title,
        [data-theme="dark"] .ct-ads-fullscreen-title { color: #f3f4f6; }
        [data-theme="dark"] .ct-ad-description,
        [data-theme="dark"] .ct-ad-mobile-desc,
        [data-theme="dark"] .ct-ads-fullscreen-desc { color: #9ca3af; }
        [data-theme="dark"] .ct-ads-mobile { border-color: #374151; }
        [data-theme="dark"] .ct-ad-label { background: #111827; border-color: #374151; color: #6b7280; }
        [data-theme="dark"] .ct-ads-fullscreen-close { background: #111827; color: #9ca3af; }
        [data-theme="dark"] .ct-ads-fullscreen-label { background: #111827; color: #9ca3af; }
    `;

    // ============================================================
    // СОЗДАНИЕ КАРТОЧЕК
    // ============================================================
    function buildImageBlock(ad, imgClass, fallbackClass) {
        const wrapClass = imgClass.replace('-image', '-image-wrap');
        const iconChar = ad.icon || '📢';
        const bg = ad.color || '#06b6d4';

        if (ad.image) {
            return `
                <div class="${wrapClass}">
                    <img class="${imgClass}" src="${escapeAttr(ad.image)}" alt=""
                         loading="lazy"
                         onerror="this.outerHTML='&lt;div class=&quot;${fallbackClass}&quot; style=&quot;background:linear-gradient(135deg, ${bg}22, ${bg}44); color:${bg};&quot;&gt;${escapeHtml(iconChar)}&lt;/div&gt;'">
                </div>
            `;
        }
        return `
            <div class="${wrapClass}">
                <div class="${fallbackClass}" style="background:linear-gradient(135deg, ${bg}22, ${bg}44); color:${bg};">
                    ${escapeHtml(iconChar)}
                </div>
            </div>
        `;
    }

    function createAdCard(ad) {
        const card = document.createElement('a');
        card.className = 'ct-ad-card';
        card.dataset.adId = ad.id;
        card.href = addReferral(ad.link, REFERRAL_TAG);
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        const imageHtml = buildImageBlock(ad, 'ct-ad-image', 'ct-ad-image-fallback');

        card.innerHTML = `
            <div class="ct-ad-topbar" style="background: ${ad.color || '#06b6d4'};"></div>
            ${imageHtml}
            <span class="ct-ad-label">${escapeHtml(ad.label || 'Реклама')}</span>
            <div class="ct-ad-body">
                <div class="ct-ad-title">${escapeHtml(ad.title || '')}</div>
                ${ad.description ? `<div class="ct-ad-description">${escapeHtml(ad.description)}</div>` : ''}
                <div class="ct-ad-btn" style="background: ${ad.color || '#06b6d4'};">
                    ${escapeHtml(ad.buttonText || 'Подробнее')}
                </div>
            </div>
        `;
        return card;
    }

    function createMobileBanner(ad) {
        const wrap = document.createElement('div');
        wrap.className = 'ct-ads-mobile';
        wrap.id = 'ct-ads-mobile';

        const link = addReferral(ad.link, REFERRAL_TAG);
        const bg = ad.color || '#06b6d4';
        const iconChar = ad.icon || '📢';

        let imgHtml;
        if (ad.image) {
            imgHtml = `<img class="ct-ad-mobile-img" src="${escapeAttr(ad.image)}" alt=""
                            loading="lazy"
                            onerror="this.outerHTML='&lt;div class=&quot;ct-ad-mobile-img-fallback&quot; style=&quot;background:linear-gradient(135deg, ${bg}22, ${bg}44); color:${bg};&quot;&gt;${escapeHtml(iconChar)}&lt;/div&gt;'">`;
        } else {
            imgHtml = `<div class="ct-ad-mobile-img-fallback" style="background:linear-gradient(135deg, ${bg}22, ${bg}44); color:${bg};">${escapeHtml(iconChar)}</div>`;
        }

        wrap.innerHTML = `
            <a class="ct-ad-mobile-inner" href="${escapeAttr(link)}" target="_blank" rel="noopener noreferrer">
                ${imgHtml}
                <div class="ct-ad-mobile-content">
                    <div class="ct-ad-mobile-title">${escapeHtml(ad.title || '')}</div>
                    ${ad.description ? `<div class="ct-ad-mobile-desc">${escapeHtml(ad.description)}</div>` : ''}
                </div>
                <i class="fas fa-chevron-right ct-ad-mobile-arrow"></i>
            </a>
            <span class="ct-ad-mobile-label">${escapeHtml(ad.label || 'Реклама')}</span>
        `;
        return wrap;
    }

    // ============================================================
    // ГЕОМЕТРИЯ И ПЕРЕКРЫТИЯ
    // ============================================================

    /**
     * Собирает список важных элементов, которые нельзя перекрывать.
     * Исключает сами рекламные контейнеры.
     */
    function getImportantElements() {
        const selectors = [
            '.container', '.main-container', 'main', '.panel', '.main-grid',
            '.hero', '.tools-grid', '.form-grid', '.calculator',
            'input', 'textarea', 'button', 'select',
            '.btn', '.tool-card', '.panel-title', '.footer-logo',
            '.hero-title', '.hero-description'
        ];
        const set = new Set();
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (el.closest('.ct-ads-container, .ct-ads-mobile, .ct-ads-fullscreen-overlay')) return;
                if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return;
                const r = el.getBoundingClientRect();
                if (r.width === 0 || r.height === 0) return;
                set.add(el);
            });
        });
        return Array.from(set);
    }

    /**
     * Проверяет, пересекается ли прямоугольник rect с каким-либо важным элементом.
     */
    function rectOverlapsImportant(rect, importantEls) {
        for (const el of importantEls) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            if (
                rect.left < r.right &&
                rect.right > r.left &&
                rect.top < r.bottom &&
                rect.bottom > r.top
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Пытается найти свободное вертикальное положение для рекламного контейнера.
     * Возвращает { top, found } где top — рекомендуемое значение top в px,
     * либо null, если места нет.
     */
    function findFreeVerticalPosition(container, importantEls) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const isLeft = container.classList.contains('ct-ads-left');

        const viewportH = window.innerHeight;
        const viewportW = window.innerWidth;

        // Базовая левая/правая позиция
        const sideOffset = 15;
        const baseLeft = isLeft ? sideOffset : viewportW - sideOffset - containerWidth;

        // Пробуем сдвигать от центра
        const centerTop = (viewportH - containerHeight) / 2;

        const candidates = [centerTop];
        for (let shift = ADS_CONFIG.shiftStep; shift <= ADS_CONFIG.maxShift; shift += ADS_CONFIG.shiftStep) {
            // Вверх
            candidates.push(centerTop - shift);
            // Вниз
            candidates.push(centerTop + shift);
        }

        for (const top of candidates) {
            // Ограничиваем сверху/снизу с небольшим отступом
            if (top < 10) continue;
            if (top + containerHeight > viewportH - 10) continue;

            const rect = {
                left: baseLeft,
                right: baseLeft + containerWidth,
                top: top,
                bottom: top + containerHeight
            };

            if (!rectOverlapsImportant(rect, importantEls)) {
                return { top: top, found: true };
            }
        }
        return { top: null, found: false };
    }

    /**
     * Главная функция проверки перекрытия для десктопных контейнеров.
     * Стратегия:
     *  - 'shift' : пробуем сдвинуть контейнер по вертикали в свободное место
     *  - 'hide'  : прячем контейнер, если места нет (и показываем, когда появится)
     */
    function updateDesktopOverlap() {
        if (window.innerWidth < ADS_CONFIG.overlapMinWidth) return;

        const importantEls = getImportantElements();
        const containers = document.querySelectorAll('.ct-ads-container');

        containers.forEach(c => {
            if (c.querySelectorAll('.ct-ad-card').length === 0) return;

            const strategy = ADS_CONFIG.overlapStrategy || 'hide';

            if (strategy === 'shift') {
                const pos = findFreeVerticalPosition(c, importantEls);
                if (pos.found) {
                    // Нашли место — сдвигаем и показываем
                    c.style.top = pos.top + 'px';
                    c.style.transform = 'none';
                    c.classList.remove('ct-ads-obstructed');
                    c.classList.add('visible');
                } else {
                    // Места нет — прячем
                    c.classList.add('ct-ads-obstructed');
                }
            } else {
                // 'hide' — просто проверяем текущее положение
                const rect = c.getBoundingClientRect();
                const isLeft = c.classList.contains('ct-ads-left');
                const testRect = {
                    left: isLeft ? 15 : window.innerWidth - 15 - c.offsetWidth,
                    right: isLeft ? 15 + c.offsetWidth : window.innerWidth - 15,
                    top: rect.top,
                    bottom: rect.bottom
                };
                if (rectOverlapsImportant(testRect, importantEls)) {
                    c.classList.add('ct-ads-obstructed');
                } else {
                    c.classList.remove('ct-ads-obstructed');
                    c.classList.add('visible');
                }
            }
        });
    }

    /**
     * Мобильная проверка: скрываем sticky-баннер, если он перекрывает важные элементы.
     * Здесь простое правило — если в верхней части экрана (первые ~80px) находится
     * что-то критичное и при этом пользователь уже проскроллил — прячем.
     * На практике sticky-баннер не перекрывает контент, т.к. он в потоке.
     * Но если страница позиционирует хедер фиксированно — может быть наложение.
     */
    function updateMobileOverlap() {
        const banner = document.querySelector('.ct-ads-mobile.visible');
        if (!banner) return;

        if (!ADS_CONFIG.checkOverlap) {
            banner.classList.remove('ct-ads-mobile-hidden');
            return;
        }

        const bannerRect = banner.getBoundingClientRect();
        // Если баннер скрыт — пропускаем
        if (bannerRect.height === 0) {
            banner.classList.remove('ct-ads-mobile-hidden');
            return;
        }

        const importantEls = getImportantElements();
        let overlap = false;

        // Проверяем только "верхние" важные элементы, которые могут оказаться под баннером
        for (const el of importantEls) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;

            if (
                r.left < bannerRect.right &&
                r.right > bannerRect.left &&
                r.top < bannerRect.bottom &&
                r.bottom > bannerRect.top
            ) {
                // Игнорируем элементы, которые сами sticky/fixed сверху
                const pos = getComputedStyle(el).position;
                if (pos === 'sticky' || pos === 'fixed') continue;
                overlap = true;
                break;
            }
        }

        if (overlap) {
            banner.classList.add('ct-ads-mobile-hidden');
        } else {
            banner.classList.remove('ct-ads-mobile-hidden');
        }
    }

    /**
     * Диспетчер: вызывает нужную проверку
     */
    function applyOverlapCheck() {
        if (!ADS_CONFIG.checkOverlap) return;
        if (window.innerWidth <= 1200) {
            updateMobileOverlap();
        } else {
            updateDesktopOverlap();
        }
    }

    // ============================================================
    // ПОЛНОЭКРАННАЯ РЕКЛАМА
    // ============================================================
    let fullscreenTimer = null;
    let fullscreenFirstTimer = null;
    let currentFullscreenOverlay = null;

    function showFullscreenAd() {
        if (!ADS_CONFIG.enabled) return;
        if (!ADS_CONFIG.ads || ADS_CONFIG.ads.length === 0) return;
        if (currentFullscreenOverlay) return;

        const ad = ADS_CONFIG.ads[Math.floor(Math.random() * ADS_CONFIG.ads.length)];
        if (!ad) return;

        const overlay = document.createElement('div');
        overlay.className = 'ct-ads-fullscreen-overlay';
        currentFullscreenOverlay = overlay;

        const finalLink = addReferral(ad.link, REFERRAL_TAG);
        const bg = ad.color || '#06b6d4';
        const iconChar = ad.icon || '📢';

        let imageHtml;
        if (ad.image) {
            imageHtml = `
                <div class="ct-ads-fullscreen-image-wrap">
                    <img class="ct-ads-fullscreen-image" src="${escapeAttr(ad.image)}" alt=""
                         onerror="this.outerHTML='&lt;div class=&quot;ct-ads-fullscreen-image-fallback&quot; style=&quot;background:linear-gradient(135deg, ${bg}22, ${bg}44); color:${bg};&quot;&gt;${escapeHtml(iconChar)}&lt;/div&gt;'">
                </div>
            `;
        } else {
            imageHtml = `
                <div class="ct-ads-fullscreen-image-wrap">
                    <div class="ct-ads-fullscreen-image-fallback" style="background:linear-gradient(135deg, ${bg}22, ${bg}44); color:${bg};">
                        ${escapeHtml(iconChar)}
                    </div>
                </div>
            `;
        }

        overlay.innerHTML = `
            <div class="ct-ads-fullscreen">
                <span class="ct-ads-fullscreen-label">Реклама</span>
                <button class="ct-ads-fullscreen-close" type="button" aria-label="Закрыть">✕</button>
                <div class="ct-ads-fullscreen-topbar" style="background: ${bg};"></div>
                ${imageHtml}
                <div class="ct-ads-fullscreen-body">
                    <div class="ct-ads-fullscreen-title">${escapeHtml(ad.title || '')}</div>
                    ${ad.description ? `<div class="ct-ads-fullscreen-desc">${escapeHtml(ad.description)}</div>` : ''}
                    <a class="ct-ads-fullscreen-btn" href="${escapeAttr(finalLink)}" target="_blank" rel="noopener noreferrer" style="background: ${bg};">
                        ${escapeHtml(ad.buttonText || 'Подробнее')}
                    </a>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => overlay.classList.add('show'));

        const closeBtn = overlay.querySelector('.ct-ads-fullscreen-close');
        closeBtn.addEventListener('click', () => closeFullscreenAd());

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeFullscreenAd();
        });

        const escHandler = (e) => {
            if (e.key === 'Escape') closeFullscreenAd();
        };
        document.addEventListener('keydown', escHandler);
        overlay._escHandler = escHandler;
    }

    function closeFullscreenAd() {
        if (!currentFullscreenOverlay) return;
        const overlay = currentFullscreenOverlay;
        currentFullscreenOverlay = null;

        if (overlay._escHandler) {
            document.removeEventListener('keydown', overlay._escHandler);
        }

        overlay.classList.remove('show');
        document.body.style.overflow = '';

        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 300);
    }

    function startFullscreenTimer() {
        if (!ADS_CONFIG.fullscreenInterval || ADS_CONFIG.fullscreenInterval <= 0) return;

        if (ADS_CONFIG.fullscreenFirstDelay && ADS_CONFIG.fullscreenFirstDelay > 0) {
            fullscreenFirstTimer = setTimeout(() => {
                showFullscreenAd();
            }, ADS_CONFIG.fullscreenFirstDelay);
        }

        fullscreenTimer = setInterval(() => {
            showFullscreenAd();
        }, ADS_CONFIG.fullscreenInterval);
    }

    function stopFullscreenTimer() {
        if (fullscreenTimer) { clearInterval(fullscreenTimer); fullscreenTimer = null; }
        if (fullscreenFirstTimer) { clearTimeout(fullscreenFirstTimer); fullscreenFirstTimer = null; }
        closeFullscreenAd();
    }

    // ============================================================
    // ИНИЦИАЛИЗАЦИЯ
    // ============================================================
    function init() {
        if (!ADS_CONFIG.enabled) return;

        if (!document.getElementById('ct-ads-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'ct-ads-styles';
            styleEl.textContent = AD_STYLES;
            document.head.appendChild(styleEl);
        }

        const allAds = ADS_CONFIG.ads || [];
        if (allAds.length === 0) return;

        const isMobile = window.innerWidth <= 1200;

        if (isMobile) {
            const adCount = Math.min(ADS_CONFIG.mobileMax, allAds.length);
            const picked = pickRandom(allAds, adCount);
            if (picked.length > 0) {
                const banner = createMobileBanner(picked[0]);
                document.body.insertBefore(banner, document.body.firstChild);
                setTimeout(() => {
                    banner.classList.add('visible');
                    setTimeout(applyOverlapCheck, 200);
                }, ADS_CONFIG.delay);
            }
        } else {
            const leftAds = allAds.filter(a => a.id.startsWith('ad-left-'));
            const rightAds = allAds.filter(a => a.id.startsWith('ad-right-'));

            const leftContainer = document.createElement('div');
            leftContainer.className = 'ct-ads-container ct-ads-left';
            leftContainer.dataset.side = 'left';

            const rightContainer = document.createElement('div');
            rightContainer.className = 'ct-ads-container ct-ads-right';
            rightContainer.dataset.side = 'right';

            const leftPicked = pickRandom(leftAds, Math.min(ADS_CONFIG.maxPerSide, leftAds.length));
            leftPicked.forEach(ad => leftContainer.appendChild(createAdCard(ad)));

            const rightPicked = pickRandom(rightAds, Math.min(ADS_CONFIG.maxPerSide, rightAds.length));
            rightPicked.forEach(ad => rightContainer.appendChild(createAdCard(ad)));

            if (leftContainer.children.length > 0) document.body.appendChild(leftContainer);
            if (rightContainer.children.length > 0) document.body.appendChild(rightContainer);

            setTimeout(() => {
                if (leftContainer.parentNode) leftContainer.classList.add('visible');
                if (rightContainer.parentNode) rightContainer.classList.add('visible');
                // Проверяем перекрытие после появления
                setTimeout(applyOverlapCheck, 300);
            }, ADS_CONFIG.delay);

            // Слушаем ресайз (с дебаунсом)
            let resizeTimer = null;
            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(applyOverlapCheck, 250);
            });

            // Слушаем скролл (с троттлингом через requestAnimationFrame)
            let scrollScheduled = false;
            window.addEventListener('scroll', () => {
                if (scrollScheduled) return;
                scrollScheduled = true;
                requestAnimationFrame(() => {
                    applyOverlapCheck();
                    scrollScheduled = false;
                });
            }, { passive: true });

            // Наблюдаем за изменениями DOM и размеров важных элементов
            if ('ResizeObserver' in window) {
                const ro = new ResizeObserver(() => {
                    applyOverlapCheck();
                });
                document.querySelectorAll('main, .container, .panel, .main-grid').forEach(el => {
                    ro.observe(el);
                });
            }
        }

        if (window.innerWidth > 768) {
            startFullscreenTimer();
        }
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
            document.querySelectorAll('.ct-ads-container').forEach(c => {
                c.classList.add('visible');
                c.classList.remove('ct-ads-obstructed');
            });
            document.querySelectorAll('.ct-ads-mobile').forEach(c => {
                c.classList.add('visible');
                c.classList.remove('ct-ads-mobile-hidden');
            });
            applyOverlapCheck();
        },
        hide: () => {
            document.querySelectorAll('.ct-ads-container').forEach(c => c.classList.remove('visible'));
            document.querySelectorAll('.ct-ads-mobile').forEach(c => c.classList.remove('visible'));
        },

        reshuffle: () => {
            document.querySelectorAll('.ct-ads-container, .ct-ads-mobile').forEach(c => c.remove());
            stopFullscreenTimer();
            init();
            if (window.innerWidth > 768) startFullscreenTimer();
        },

        showFullscreen: () => showFullscreenAd(),
        closeFullscreen: () => closeFullscreenAd(),

        checkOverlap: () => applyOverlapCheck(),

        addRef: (url) => addReferral(url, REFERRAL_TAG)
    };

})();
