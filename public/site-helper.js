// public/site-helper.js
(function () {
  'use strict';

  const CONFIG = Object.freeze({
    domain: 'https://m-web-leyusports.com.cn',
    keyword: '乐鱼体育',
    cards: [
      { title: '欢迎使用', content: '本站提供体育资讯与赛事动态，内容持续更新。' },
      { title: '快速定位', content: '使用导航栏可跳转至各分类板块，节省查找时间。' },
      { title: '互动反馈', content: '如有疑问或建议，可通过页面底部联系方式与我们沟通。' }
    ],
    badges: ['热门', '最新', '赛事', '乐鱼体育', '资讯']
  });

  function createElement(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    }
    children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    });
    return el;
  }

  function createBadge(text) {
    const badge = createElement('span', { class: 'keyword-badge' });
    badge.textContent = text;
    badge.style.cssText = `
      display: inline-block;
      background: #e3f2fd;
      color: #0d47a1;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 10px;
      margin: 4px 4px 0 0;
      border: 1px solid #90caf9;
    `;
    return badge;
  }

  function createCard(cardData) {
    const card = createElement('div', { class: 'info-card' });
    const title = createElement('h4', { class: 'card-title' }, cardData.title);
    const content = createElement('p', { class: 'card-content' }, cardData.content);
    card.appendChild(title);
    card.appendChild(content);
    card.style.cssText = `
      background: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 14px 16px;
      margin: 10px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    `;
    title.style.cssText = `margin: 0 0 6px 0; font-size: 16px; color: #333;`;
    content.style.cssText = `margin: 0; font-size: 14px; color: #555; line-height: 1.5;`;
    return card;
  }

  function renderCards(container) {
    if (!container) return;
    CONFIG.cards.forEach(cardData => {
      const card = createCard(cardData);
      container.appendChild(card);
    });
  }

  function renderBadges(container) {
    if (!container) return;
    CONFIG.badges.forEach(text => {
      const badge = createBadge(text);
      container.appendChild(badge);
    });
  }

  function renderAccessNote(container) {
    if (!container) return;
    const note = createElement('div', { class: 'access-note' });
    const link = createElement('a', {
      href: CONFIG.domain,
      target: '_blank',
      rel: 'noopener',
      style: 'color: #1a73e8; text-decoration: underline;'
    }, CONFIG.domain);
    const text = document.createTextNode(' 当前页面为 ' + CONFIG.keyword + ' 访问入口，更多内容请访问：');
    note.appendChild(text);
    note.appendChild(link);
    note.style.cssText = `
      margin-top: 16px;
      padding: 10px 14px;
      background: #fff3e0;
      border-left: 4px solid #ff9800;
      border-radius: 4px;
      font-size: 14px;
      color: #444;
    `;
    container.appendChild(note);
  }

  function init() {
    const app = document.getElementById('app') || document.body;
    const wrapper = createElement('div', {
      id: 'site-helper-root',
      style: 'max-width: 720px; margin: 20px auto; padding: 0 16px; font-family: system-ui, sans-serif;'
    });

    const heading = createElement('h2', {
      style: 'font-size: 20px; margin: 0 0 10px 0; color: #222;'
    }, '提示卡与关键词');
    wrapper.appendChild(heading);

    const cardsContainer = createElement('div', { class: 'cards-container' });
    renderCards(cardsContainer);
    wrapper.appendChild(cardsContainer);

    const badgesContainer = createElement('div', {
      class: 'badges-container',
      style: 'margin-top: 12px;'
    });
    const label = createElement('span', {
      style: 'font-weight: 600; margin-right: 8px; vertical-align: middle;'
    }, '关键词：');
    badgesContainer.appendChild(label);
    renderBadges(badgesContainer);
    wrapper.appendChild(badgesContainer);

    renderAccessNote(wrapper);

    if (app === document.body) {
      app.insertBefore(wrapper, app.firstChild);
    } else {
      app.appendChild(wrapper);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();