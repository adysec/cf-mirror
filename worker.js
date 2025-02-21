addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const mirrors = new Map([
  ["/system/ubuntu/security", "http://security.ubuntu.com/ubuntu"],
  ["/system/ubuntu", "http://archive.ubuntu.com/ubuntu"],
  ["/system/centos", "http://vault.centos.org"],
  ["/system/epel", "http://mirrors.kernel.org/fedora-epel"],
  ["/system/deepin", "https://community-packages.deepin.com/deepin"],
  ["/system/kali", "http://http.kali.org/kali"],
  ["/system/debian", "http://ftp.debian.org/debian"],
  ["/system/debian-debug", "http://ftp.debian.org/debian-debug"],
  ["/system/debian-ports", "http://ftp.debian.org/debian-ports"],
  ["/system/debian-security", "http://ftp.debian.org/debian-security"],
  ["/system/debian-security-debug", "http://ftp.debian.org/debian-security-debug"],
  ["/system/manjaro", "http://ftp.tsukuba.wide.ad.jp/manjaro"],
  ["/system/gnu", "https://lists.gnu.org/archive/html"],
  ["/system/openwrt", "https://archive.openwrt.org"],
  ["/system/KaOS", "https://ca.kaosx.cf"],
  ["/system/arch4edu", "https://arch4edu.org"],
  ["/system/archlinuxcn", "https://repo.archlinuxcn.org"],
  ["/system/bioarchlinux", "https://repo.bioarchlinux.org"],
  ["/system/archlinuxarm", "http://dk.mirror.archlinuxarm.org"],
  ["/system/archlinux", "https://mirror.pkgbuild.com"],
  ["/system/fedora", "https://ap.edge.kernel.org/fedora"],
  ["/system/OpenBSD", "https://cdn.openbsd.org/pub/OpenBSD"],
  ["/system/opensuse", "http://download.opensuse.org"],
  ["/system/freebsd", "https://download.freebsd.org"],
  ["/language/rust", "https://static.rust-lang.org"],
  ["/language/npm", "https://registry.npmjs.org"],
  ["/container/docker-ce", "https://download.docker.com"],
  ["/software/tailscale", "https://pkgs.tailscale.com"]
]);

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    return new Response('AdySec 镜像源', {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  // 直接查找匹配的前缀
  for (const [prefix, baseUrl] of mirrors) {
    if (url.pathname.startsWith(prefix)) {
      return proxyRequest(url, prefix, baseUrl);
    }
  }

  // 处理特殊情况
  if (url.pathname.startsWith('/language/pypi')) {
    return proxyHtmlRequest(url, 'https://pypi.org/simple', '/language/pypi', '/special/pypi/files');
  }

  if (url.pathname.startsWith('/special/pypi/files/')) {
    return proxyBinaryRequest(url, 'https://files.pythonhosted.org');
  }

  if (url.pathname.startsWith('/software/tailscale')) {
    return proxyTextRequest(url, 'https://pkgs.tailscale.com', '/software/tailscale');
  }

  return new Response('404 Not Found', { status: 404 });
}

/**
 * 通用代理请求（静态文件/二进制文件）
 */
async function proxyRequest(url, prefix, baseUrl) {
  try {
    const targetUrl = baseUrl + url.pathname.replace(prefix, '');
    const response = await fetch(targetUrl);
    return new Response(response.body, { headers: response.headers });
  } catch (err) {
    return new Response('Error fetching: ' + err.message, { status: 500 });
  }
}

/**
 * 代理 HTML 文件并替换内部链接
 */
async function proxyHtmlRequest(url, base, replaceFrom, replaceTo) {
  try {
    const targetUrl = base + url.pathname.replace(replaceFrom, '');
    const response = await fetch(targetUrl);
    let body = await response.text();

    // 替换文件链接
    body = body.replace(/https:\/\/files.pythonhosted.org/g, `${url.origin}${replaceTo}`);

    return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  } catch (err) {
    return new Response('Error fetching HTML: ' + err.message, { status: 500 });
  }
}

/**
 * 代理文本文件（如 tailscale.list）并替换内部链接
 */
async function proxyTextRequest(url, base, replacePrefix) {
  try {
    const targetUrl = base + url.pathname.replace(replacePrefix, '');
    const response = await fetch(targetUrl);

    if (url.pathname.endsWith('.list')) {
      let body = await response.text();
      body = body.replace(new RegExp(base, 'g'), `${url.origin}${replacePrefix}`);
      return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    return new Response(response.body, { headers: response.headers });
  } catch (err) {
    return new Response('Error fetching text file: ' + err.message, { status: 500 });
  }
}

/**
 * 代理二进制文件（如 PyPI 资源）
 */
async function proxyBinaryRequest(url, base) {
  try {
    const fileUrl = base + url.pathname.replace('/special/pypi/files', '');
    const response = await fetch(fileUrl);
    return new Response(response.body, { headers: response.headers });
  } catch (err) {
    return new Response('Error fetching binary file: ' + err.message, { status: 500 });
  }
}
