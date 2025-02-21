addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const mirrors = {
  "/system/ubuntu/security": "http://security.ubuntu.com/ubuntu",
  "/system/ubuntu": "http://archive.ubuntu.com/ubuntu",
  "/system/centos": "http://vault.centos.org",
  "/system/epel": "http://mirrors.kernel.org/fedora-epel",
  "/system/deepin": "https://community-packages.deepin.com/deepin",
  "/system/kali": "http://http.kali.org/kali",
  "/system/debian": "http://ftp.debian.org/debian",
  "/system/debian-debug": "http://ftp.debian.org/debian-debug",
  "/system/debian-ports": "http://ftp.debian.org/debian-ports",
  "/system/debian-security": "http://ftp.debian.org/debian-security",
  "/system/debian-security-debug": "http://ftp.debian.org/debian-security-debug",
  "/system/manjaro": "http://ftp.tsukuba.wide.ad.jp/manjaro",
  "/system/gnu": "https://lists.gnu.org/archive/html",
  "/system/openwrt": "https://archive.openwrt.org",
  "/system/KaOS": "https://ca.kaosx.cf",
  "/system/arch4edu": "https://arch4edu.org",
  "/system/archlinuxcn": "https://repo.archlinuxcn.org",
  "/system/bioarchlinux": "https://repo.bioarchlinux.org",
  "/system/archlinuxarm": "http://dk.mirror.archlinuxarm.org",
  "/system/archlinux": "https://mirror.pkgbuild.com",
  "/system/fedora": "https://ap.edge.kernel.org/fedora",
  "/system/OpenBSD": "https://cdn.openbsd.org/pub/OpenBSD",
  "/system/opensuse": "http://download.opensuse.org",
  "/system/freebsd": "https://download.freebsd.org",
  "/language/rust": "https://static.rust-lang.org",
  "/language/npm": "https://registry.npmjs.org",
  "/container/docker-ce": "https://download.docker.com",
  "/software/tailscale": "https://pkgs.tailscale.com"
};

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return new Response("AdySec 镜像源", {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (url.pathname.startsWith("/language/pypi")) {
    return proxyPypiRequest(url);
  }

  if (url.pathname.startsWith("/special/pypi/files/")) {
    return proxyRequest(url, "https://files.pythonhosted.org");
  }

  if (url.pathname.startsWith("/software/tailscale")) {
    return proxyTailscaleRequest(url);
  }

  for (const [prefix, baseUrl] of Object.entries(mirrors)) {
    if (url.pathname.startsWith(prefix)) {
      return proxyRequest(url, baseUrl, prefix);
    }
  }

  return new Response("404 Not Found", { status: 404 });
}

async function proxyRequest(url, base, prefix = "") {
  const targetUrl = base + url.pathname.replace(prefix, "");
  const response = await fetch(targetUrl);
  return new Response(response.body, { headers: response.headers });
}

async function proxyPypiRequest(url) {
  const targetUrl = `https://pypi.org${url.pathname.replace("/language/pypi", "/simple")}`;
  const response = await fetch(targetUrl);
  let body = await response.text();
  body = body.replace(/https:\/\/files.pythonhosted.org/g, `${url.origin}/special/pypi/files`);
  return new Response(body, { headers: { "Content-Type": "text/html" } });
}

async function proxyTailscaleRequest(url) {
  const targetUrl = `https://pkgs.tailscale.com${url.pathname.replace("/software/tailscale", "")}`;
  const response = await fetch(targetUrl);

  if (url.pathname.endsWith(".list")) {
    let body = await response.text();
    body = body.replace(/https:\/\/pkgs.tailscale.com/g, `${url.origin}/software/tailscale`);
    return new Response(body, { headers: { "Content-Type": "text/plain" } });
  }

  return new Response(response.body, { headers: response.headers });
}
