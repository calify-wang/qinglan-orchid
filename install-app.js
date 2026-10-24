(function () {
  'use strict';
  const BASE = "/qinglan-orchid/";
  if (!window.isSecureContext || !('serviceWorker' in navigator)) return;
  let deferredPrompt, registration, preparing = false, dialog;
  const isExperience = [BASE + 'experience', BASE + 'experience/', BASE + 'experience/index.html'].includes(location.pathname);
  const installed = () => !!navigator.standalone || !!(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  function setStatus(text) { document.querySelectorAll('[data-qinglan-offline-status]').forEach(el => { el.textContent = text; }); }
  function setBusy(value) { preparing = value; document.querySelectorAll('[data-qinglan-offline="prepare"]').forEach(el => { el.disabled = value; el.textContent = value ? '正在保存，请保持联网…' : '准备离线资源 · 约 46MB'; }); }
  const ready = navigator.serviceWorker.register(BASE + 'service-worker.js', { scope: BASE }).then(reg => { registration = reg; return navigator.serviceWorker.ready; });
  ready.catch(() => setStatus('当前浏览器未能启用离线保存，可继续在线体验。'));
  function message(type, progress) {
    return ready.then(reg => new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => { channel.port1.close(); reject(new Error('保存超时，请联网后重试。')); }, type === 'STATUS' ? 15000 : 300000);
      channel.port1.onmessage = event => {
        const data = event.data || {};
        if (data.type === 'PROGRESS') { if (progress) progress(data); return; }
        clearTimeout(timer); channel.port1.close();
        if (data.type === 'ERROR') reject(new Error(data.message)); else resolve(data);
      };
      const worker = reg.active || reg.waiting || reg.installing;
      if (!worker) { clearTimeout(timer); reject(new Error('离线服务还在启动，请稍后重试。')); return; }
      worker.postMessage({ type }, [channel.port2]);
    }));
  }
  async function prepareOffline() {
    if (preparing) return;
    setBusy(true); setStatus('正在准备，完整花境较大，首次保存需要一点时间。');
    try {
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
      const result = await message('PREPARE_OFFLINE', data => setStatus(data.path === BASE + 'experience/' ? '正在保存三段完整体验、图片、音乐与手势模型…' : '正在保存应用资源（' + (data.current + 1) + '/' + data.total + '）…'));
      if (!result.ready) throw new Error('资源尚未完整保存，请保持联网后重试。');
      setStatus('离线资源已准备好。可从主屏幕打开体验；浏览器清理存储后需重新准备。');
    } catch (error) { setStatus(error.message || '保存未完成，请联网后重试。'); }
    finally { setBusy(false); }
  }
  function closeGuide() { if (dialog) { dialog.remove(); dialog = null; } }
  function guide(platform) {
    closeGuide();
    const ios = platform === 'ios';
    dialog = document.createElement('div'); dialog.id = 'qinglanInstallGuide';
    dialog.innerHTML = '<article role="dialog" aria-modal="true" aria-labelledby="qinglanInstallTitle"><button type="button" class="ql-app-close" aria-label="关闭">×</button><img src="/qinglan-orchid/icons/orchid-180.png" width="64" height="64" alt="清兰蝴蝶兰应用图标"><h2 id="qinglanInstallTitle">把清兰，放进主屏幕。</h2><p>' + (installed() ? '清兰已在独立应用窗口中打开。' : ios ? '在 Safari 中，点“分享”，再选择“添加到主屏幕”。若看到“作为网页 App 打开”，请保留开启。' : '在 Chrome 菜单中选择“安装应用”或“添加到主屏幕”。若使用微信内置浏览器，请先在系统浏览器中打开。') + '</p><p>安装后会出现蝴蝶兰图标。首次离线使用前，请联网准备完整资源。</p>' + (!isExperience ? '<a class="ql-app-main" href="/qinglan-orchid/experience/?install=' + (ios ? 'ios' : 'android') + '">打开体验并查看安装步骤 ↗</a>' : '') + '<button type="button" class="ql-app-main" data-qinglan-offline="prepare">准备离线资源 · 约 46MB</button><p data-qinglan-offline-status role="status" aria-live="polite">图片、音乐与手势模型均在本机使用。</p><button type="button" class="ql-app-dismiss">知道了</button></article>';
    document.body.appendChild(dialog);
    dialog.querySelector('.ql-app-close').onclick = closeGuide;
    dialog.querySelector('.ql-app-dismiss').onclick = closeGuide;
    dialog.addEventListener('click', event => { if (event.target === dialog) closeGuide(); });
    dialog.querySelector('.ql-app-close').focus();
    updateStatus();
  }
  async function install(platform) {
    if (platform === 'android' && deferredPrompt && !installed()) {
      const prompt = deferredPrompt; deferredPrompt = null;
      try { await prompt.prompt(); await prompt.userChoice; } catch (_) { guide(platform); }
    } else guide(platform);
  }
  function updateStatus() { return message('STATUS').then(data => { if (data.ready) setStatus('离线资源已准备好。浏览器清理存储后需重新准备。'); }).catch(() => {}); }
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredPrompt = event; });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; document.querySelectorAll('[data-qinglan-install]').forEach(el => { el.textContent = '已添加到主屏幕'; }); });
  document.addEventListener('click', event => {
    const target = event.target.closest && event.target.closest('[data-qinglan-install],[data-qinglan-offline="prepare"]');
    if (!target) return;
    event.preventDefault();
    if (target.hasAttribute('data-qinglan-install')) install(target.getAttribute('data-qinglan-install'));
    else prepareOffline();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeGuide(); });
  function init() {
    const style = document.createElement('style'); style.textContent = '#qinglanInstallGuide{position:fixed;inset:0;z-index:2147483647;background:#112e22bb;display:grid;place-items:center;padding:18px;overflow:auto;font-family:system-ui,-apple-system,"Microsoft YaHei",sans-serif}#qinglanInstallGuide article{position:relative;background:#f7f2e5;color:#234634;border:1px solid #c5ceaf;border-radius:18px;padding:28px;max-width:470px;box-sizing:border-box;width:100%;max-height:90vh;overflow:auto}#qinglanInstallGuide h2{font-size:25px;line-height:1.45;font-weight:750;margin:16px 0}#qinglanInstallGuide p{font-size:15px;font-weight:500;line-height:1.8;margin:13px 0}#qinglanInstallGuide img{border-radius:13px}#qinglanInstallGuide button,#qinglanInstallGuide a{font-family:inherit;font-size:15px;font-weight:650;line-height:1.6;cursor:pointer}#qinglanInstallGuide .ql-app-close{position:absolute;right:14px;top:10px;border:0;background:transparent;color:#31533e;font-size:30px;width:44px;height:44px}#qinglanInstallGuide .ql-app-main{display:block;box-sizing:border-box;width:100%;text-align:center;border:1px solid #345b43;border-radius:8px;padding:13px;background:#2b513c;color:#fff8e8;text-decoration:none;margin-top:14px;font-size:15px;font-weight:650}#qinglanInstallGuide .ql-app-main:disabled{opacity:.7;cursor:wait}#qinglanInstallGuide .ql-app-dismiss{padding:10px 22px;min-height:44px;background:transparent;color:#345b43;border:1px solid #8da17c;border-radius:8px}#qinglanInstallGuide [data-qinglan-offline-status]{font-size:12px;line-height:1.7;color:#596b50}.ql-app-help{min-height:44px;padding:10px 14px;font:650 14px/1.5 system-ui;color:#31543d;background:#f1efdf;border:1px solid #9bac88;border-radius:8px;margin:6px}'; document.head.appendChild(style);
    if (isExperience) {
      const add = () => { const host = document.querySelector('#gestureGuide article'); if (host && !host.querySelector('.ql-app-help')) { const button = document.createElement('button'); button.type = 'button'; button.className = 'ql-app-help'; button.textContent = '应用安装 / 离线保存'; button.onclick = () => guide(/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? 'ios' : 'android'); host.appendChild(button); return true; } return false; };
      if (!add()) { const observer = new MutationObserver(() => { if (add()) observer.disconnect(); }); observer.observe(document.body, { childList: true, subtree: true }); setTimeout(() => observer.disconnect(), 20000); }
      const platform = new URLSearchParams(location.search).get('install'); if (platform === 'ios' || platform === 'android') guide(platform);
    }
    updateStatus();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
  window.QinglanInstall = Object.freeze({ status: () => message('STATUS'), prepare: prepareOffline, show: guide, installed });
})();
