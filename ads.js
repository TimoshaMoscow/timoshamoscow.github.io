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
        fullscreenInterval: 1000 * 60 * 3, // 3 минуты
        // Задержка перед первым полноэкранным показом
        fullscreenFirstDelay: 1000 * 30, // 30 секунд

        // Проверка перекрытия важных элементов (на ПК)
        checkOverlap: true,
        // Минимальная ширина экрана для проверки перекрытия
        overlapMinWidth: 1200,

        // Всё рекламное наполнение в одном массиве
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
        /* === Десктопные боковые баннеры === */
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
        }
        .ct-ads-mobile.visible { display: block; }
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
        .ct-ads-fullscreen-icon {
            font-size: 32px;
            margin-bottom: 10px;
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

    /**
     * Безопасно создаёт блок с картинкой или фолбэком (иконка).
     * Если ad.image пустой или не загружается — показывается иконка.
     */
    function buildImageBlock(ad, imgClass, fallbackClass) {
        const wrapClass = imgClass.replace('-image', '-image-wrap');
        const iconChar = ad.icon || '📢';
        const bg = ad.color || '#06b6d4';

        if (ad.image) {
            // Оборачиваем в контейнер, чтобы при ошибке загрузки подменить на фолбэк
            return `
                <div class="${wrapClass}">
                    <img class="${imgClass}" src="${escapeAttr(ad.image)}" alt=""
                         loading="lazy"
                         onerror="this.outerHTML='&lt;div class=&quot;${fallbackClass}&quot; style=&quot;background:linear-gradient(135deg, ${bg}22, ${bg}44); color:${bg};&quot;&gt;${escapeHtml(iconChar)}&lt;/div&gt;'">
                </div>
            `;
        }
        // Нет картинки — сразу фолбэк с иконкой на цветном фоне
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

        // Картинка сверху карточки
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

        // Картинка / фолбэк
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
    // ПРОВЕРКА ПЕРЕКРЫТИЯ
    // ============================================================
    function checkOverlap(el, container) {
        if (!ADS_CONFIG.checkOverlap) return false;
        if (window.innerWidth < ADS_CONFIG.overlapMinWidth) return false;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;

        const containerRect = container.getBoundingClientRect();
        const isLeft = container.classList.contains('ct-ads-left');

        const candidates = document.querySelectorAll(
            '.container, .main-container, main, .panel, .main-grid, ' +
            '.hero, .tools-grid, .form-grid, .calculator, ' +
            'input, textarea, button, select, ' +
            '.btn, .tool-card, .panel-title'
        );

        for (const c of candidates) {
            if (c === container) continue;
            if (container.contains(c)) continue;
            if (el.contains(c)) continue;

            const r = c.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;

            if (isLeft) {
                if (r.left < containerRect.right && r.right > containerRect.left) {
                    if (r.top < containerRect.bottom && r.bottom > containerRect.top) {
                        return true;
                    }
                }
            } else {
                if (r.right > containerRect.left && r.left < containerRect.right) {
                    if (r.top < containerRect.bottom && r.bottom > containerRect.top) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function applyOverlapCheck() {
        if (window.innerWidth < ADS_CONFIG.overlapMinWidth) return;

        const containers = document.querySelectorAll('.ct-ads-container');
        containers.forEach(c => {
            const cards = c.querySelectorAll('.ct-ad-card');
            if (cards.length === 0) return;

            let overlap = false;
            for (const card of cards) {
                if (checkOverlap(card, c)) {
                    overlap = true;
                    break;
                }
            }

            if (overlap) {
                c.style.opacity = '0';
                c.style.pointerEvents = 'none';
                c.dataset.hiddenByOverlap = '1';
            } else if (c.dataset.hiddenByOverlap === '1') {
                c.style.opacity = '';
                c.style.pointerEvents = '';
                delete c.dataset.hiddenByOverlap;
            }
        });
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

        // Картинка / фолбэк
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
                setTimeout(() => banner.classList.add('visible'), ADS_CONFIG.delay);
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
                setTimeout(applyOverlapCheck, 300);
            }, ADS_CONFIG.delay);

            let resizeTimer = null;
            window.addEventListener('resize', () => {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    applyOverlapCheck();
                }, 250);
            });

            let scrollTimer = null;
            window.addEventListener('scroll', () => {
                if (scrollTimer) return;
                scrollTimer = setTimeout(() => {
                    applyOverlapCheck();
                    scrollTimer = null;
                }, 300);
            }, { passive: true });
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
                c.style.opacity = '';
                c.style.pointerEvents = '';
            });
            document.querySelectorAll('.ct-ads-mobile').forEach(c => c.classList.add('visible'));
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
