// Create all favicons last, since they are less important than the page content:
window.globalControl.tagBuilder({
  attr: {
    href: 'apple-touch-icon',
    rel: 'apple-touch-icon',
    sizes: '180x180',
  },
  elType: 'link',
  favicon: true,
  fileType: 'png',
});

window.globalControl.tagBuilder({
  attr: {
    href: 'favicon-32x32',
    rel: 'icon',
    sizes: '32x32',
    type: 'image/png',
  },
  elType: 'link',
  favicon: true,
  fileType: 'png',
});

window.globalControl.tagBuilder({
  attr: {
    href: 'favicon-16x16',
    rel: 'icon',
    sizes: '16x16',
    type: 'image/png',
  },
  elType: 'link',
  favicon: true,
  fileType: 'png',
});

window.globalControl.tagBuilder({
  attr: {
    href: 'site',
    rel: 'manifest',
  },
  elType: 'link',
  favicon: true,
  fileType: 'webmanifest',
});

window.globalControl.tagBuilder({
  attr: {
    color: '#000',
    href: 'safari-pinned-tab',
    rel: 'mask-icon',
  },
  elType: 'link',
  favicon: true,
  fileType: 'svg',
});

window.globalControl.tagBuilder({
  attr: {
    content: '#000',
    name: 'msapplication-TileColor',
  },
  elType: 'meta',
  favicon: true,
});

window.globalControl.tagBuilder({
  attr: {
    content: '#FFF',
    name: 'theme-color',
  },
  elType: 'meta',
  favicon: true,
});