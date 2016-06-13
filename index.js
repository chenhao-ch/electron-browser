let url = '';
const $ = (id) => {
  return document.getElementById(id);
};
var locationInput = $('locationInput');
const locationBar = $('locationBar');
const webview = $('webview');

const inlinePage = {
  newtab: 'electron://newtab',
  bookmark: 'electron://bookmark',
  setting: 'electron://setting'
};

locationBar.addEventListener('click', (e) => {
  const target = e.target;
  if(target.tagName.toLowerCase() !== 'i') {
    return;
  }
  const clz = target.className;
  switch(clz) {
    case 'home':
      loadPage(inlinePage.newtab, true);
      break;
    case 'refresh':
      loadPage(url, true);
      break;
    case 'bookmark':
      loadPage(inlinePage.bookmark, true);
      break;
    case 'setting':
      loadPage(inlinePage.setting, true);
      break;
    default:
      console.warn('unkonw location icon');
      break;
  }
});

locationInput.addEventListener('keydown', (e) => {
  const key = e.keyIdentifier;
  if(key === 'Enter') {
    loadPage(locationInput.value, false);
  }
});

const loadPage = (newUrl, refresh) => {
  if(newUrl === url && refresh) {
    return;
  }

  locationInput.value = newUrl;  // 显示地址
  url = newUrl;
  
  if(url.indexOf('electron://') === 0) {
    // 内置页面
    webview.src = `${__dirname}/${url.replace('electron://', '')}/index.html`;
  } else {
    webview.src = url;
  }
};

setTimeout(() => {
  loadPage('electron://newtab');
}, 100);