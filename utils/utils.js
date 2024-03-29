export function formatToken() {
  let token = localStorage.getItem('token');
  if (token === 'null') token = JSON.parse(token);
  else token = token?.replace(/\"/g, '');
  return token;
}

// 操作导航
export function handleNav(key, config, push) {
  if (key === 'home' || key === 'mainLogo') {
    push('/');
    return;
  }
  if (key === 'companycontactus') {
    push('/ajak');
    return;
  }
  let url;
  let newTab = false;
  switch (key) {
    case 'startnow':
      url = `${config.VITE_OMNI_URL}/register`;
      break;
    case 'destypage':
      url = config.VITE_PAGE_URL;
      break;
    case 'destystore':
      url = config.VITE_STORE_URL;
      break;
    case 'destyomni':
      newTab = true;
      url = 'https://omnihome.desty.app';
      break;
    case 'destymenu':
      newTab = true;
      url = config.VITE_MENU_URL;
      break;
    case 'blog':
    case 'companyblog':
      newTab = true;
      url = 'https://desty.page/blog';
      break;
    case 'career':
    case 'companycareer':
      newTab = true;
      url = 'https://desty.freshteam.com/jobs';
      break;
    case 'helpcenter':
      newTab = true;
      url = 'https://desty.tawk.help/category/desty-menu';
      break;
    case 'instagram':
      url = 'https://www.instagram.com/desty.app';
      break;
    case 'facebook':
      url = 'https://www.facebook.com/desty.commerce';
      break;
    case 'linkedin':
      url = 'https://www.linkedin.com/company/destyapp';
      break;
    case 'youtube':
      url = 'https://www.youtube.com/channel/UC7xucpjHrWRs3XGJJoC8lJA';
      break;
    case 'privacy':
      url = `${config.VITE_HOME_URL}/privacy`;
      break;
    case 'terms':
      url = `${config.VITE_HOME_URL}/terms`;
      break;
    default:
      break;
  }
  if (url) {
    if (newTab) window.open(url);
    else location.href = url;
  };
}

// Linear interpolation
export const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
export const getMousePos = (e) => {
  return {
    x: e.clientX,
    y: e.clientY,
  }
}

export const distance = (x1, y1, x2, y2) => {
  const a = x1 - x2
  const b = y1 - y2

  return Math.hypot(a, b);
}
