addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // 处理根目录请求
  if (url.pathname === '/') {
    return new Response('AdySec镜像源', { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }  })
  }
  // 系统
  // 处理 /ubuntusec 请求
  if (url.pathname.startsWith('/system/ubuntu/security')) {
    const ubuntusecUrl = 'http://security.ubuntu.com' + url.pathname.replace('/system/ubuntu/security', '/ubuntu')
    return fetch(ubuntusecUrl)
  }
  if (url.pathname.startsWith('/system/ubuntu')) {
    const ubuntuUrl = 'http://archive.ubuntu.com' + url.pathname.replace('/system/ubuntu', '/ubuntu')
    return fetch(ubuntuUrl)
  }
  // 处理 /centos 请求
  if (url.pathname.startsWith('/system/centos')) {
    const centosUrl = 'http://vault.centos.org' + url.pathname.replace('/system/centos', '/')
    return fetch(centosUrl)
  }
  // 处理 /epel 请求
  if (url.pathname.startsWith('/system/epel')) {
    const epelUrl = 'http://mirrors.kernel.org' + url.pathname.replace('/system/epel', '/fedora-epel')
    return fetch(epelUrl)
  }
  // 处理 /deepin 请求
  if (url.pathname.startsWith('/system/deepin')) {
    const deepinUrl = 'https://community-packages.deepin.com' + url.pathname.replace('/system/deepin', '/deepin')
    return fetch(deepinUrl)
  }
  // 处理 /kali 请求
  if (url.pathname.startsWith('/system/kali')) {
    const kaliUrl = 'http://http.kali.org' + url.pathname.replace('/system/kali', '/kali')
    return fetch(kaliUrl)
  }
  // 处理 /debian 请求
  if (url.pathname.startsWith('/system/debian')) {
    const debianUrl = 'http://ftp.debian.org' + url.pathname.replace('/system/debian', '/debian')
    return fetch(debianUrl)
  }
  if (url.pathname.startsWith('/system/debian-debug')) {
    const debianDebugUrl = 'http://ftp.debian.org' + url.pathname.replace('/system/debian-debug', '/debian-debug')
    return fetch(debianDebugUrl)
  }
  if (url.pathname.startsWith('/system/debian-ports')) {
    const debianPortsUrl = 'http://ftp.debian.org' + url.pathname.replace('/system/debian-ports', '/debian-ports')
    return fetch(debianPortsUrl)
  }
  if (url.pathname.startsWith('/system/debian-security')) {
    const debianSecurityUrl = 'http://ftp.debian.org' + url.pathname.replace('/system/debian-security', '/debian-security')
    return fetch(debianSecurityUrl)
  }
  if (url.pathname.startsWith('/system/debian-security-debug')) {
    const debianSecurityDebugUrl = 'http://ftp.debian.org' + url.pathname.replace('/system/debian-security-debug', '/debian-security-debug')
    return fetch(debianSecurityDebugUrl)
  }
  // 处理 /manjaro 请求
  if (url.pathname.startsWith('/system/manjaro')) {
    const manjaroUrl = 'http://ftp.tsukuba.wide.ad.jp' + url.pathname.replace('/system/manjaro', '/manjaro')
    return fetch(manjaroUrl)
  }
  // 处理 /gnu 请求
  if (url.pathname.startsWith('/system/gnu')) {
    const gnuUrl = 'https://lists.gnu.org' + url.pathname.replace('/system/gnu', '/archive/html')
    return fetch(gnuUrl)
  }
  // 处理 /openwrt 请求
  if (url.pathname.startsWith('/system/openwrt')) {
    const openwrtUrl = 'https://archive.openwrt.org' + url.pathname.replace('/system/openwrt', '/')
    return fetch(openwrtUrl)
  }
  // 处理 /KaOS 请求
  if (url.pathname.startsWith('/system/KaOS')) {
    const KaOSUrl = 'https://ca.kaosx.cf' + url.pathname.replace('/system/KaOS', '/')
    return fetch(KaOSUrl)
  }
  // 处理 /arch4edu 请求
  if (url.pathname.startsWith('/system/arch4edu')) {
    const arch4eduUrl = 'https://arch4edu.org' + url.pathname.replace('/system/arch4edu', '/')
    return fetch(arch4eduUrl)
  }
  // 处理 /archlinuxcn 请求
  if (url.pathname.startsWith('/system/archlinuxcn')) {
    const archlinuxcnUrl = 'https://repo.archlinuxcn.org' + url.pathname.replace('/system/archlinuxcn', '/')
    return fetch(archlinuxcnUrl)
  }
  // 处理 /bioarchlinux 请求
  if (url.pathname.startsWith('/system/bioarchlinux')) {
    const bioarchlinuxUrl = 'https://repo.bioarchlinux.org' + url.pathname.replace('/system/bioarchlinux', '/')
    return fetch(bioarchlinuxUrl)
  }
  // 处理 /archlinuxarm 请求
  if (url.pathname.startsWith('/system/archlinuxarm')) {
    const archlinuxarmUrl = 'http://dk.mirror.archlinuxarm.org' + url.pathname.replace('/system/archlinuxarm', '/')
    return fetch(archlinuxarmUrl)
  }
  // 处理 /archlinux 请求
  if (url.pathname.startsWith('/system/archlinux')) {
    const archlinuxUrl = 'https://mirror.pkgbuild.com' + url.pathname.replace('/system/archlinux', '/')
    return fetch(archlinuxUrl)
  }
  // 处理 /fedora 请求
  if (url.pathname.startsWith('/system/fedora')) {
    const fedoraUrl = 'https://ap.edge.kernel.org' + url.pathname.replace('/system/fedora', '/fedora')
    return fetch(fedoraUrl)
  }
  // 处理 /OpenBSD 请求
  if (url.pathname.startsWith('/system/OpenBSD')) {
    const OpenBSDUrl = 'https://cdn.openbsd.org' + url.pathname.replace('/system/OpenBSD', '/pub/OpenBSD')
    return fetch(OpenBSDUrl)
  }
  // 处理 /opensuse 请求
  if (url.pathname.startsWith('/system/opensuse')) {
    const opensuseUrl = 'http://download.opensuse.org' + url.pathname.replace('/system/opensuse', '/')
    return fetch(opensuseUrl)
  }
  // 处理 /freebsd 请求
  if (url.pathname.startsWith('/system/freebsd')) {
    const freebsdUrl = 'https://download.freebsd.org' + url.pathname.replace('/system/freebsd', '/')
    return fetch(freebsdUrl)
  }
  
  
  
  // 编程语言
  // 处理 /pypi 请求
  if (url.pathname.startsWith('/language/pypi')) {
    const pypiUrl = 'https://pypi.org' + url.pathname.replace('/language/pypi', '/simple')
    // return fetch(pypiUrl)
    const response = await fetch(pypiUrl);
    let body = await response.text();

    // Rewrite URLs in the response body to go through the Cloudflare Worker
    body = body.replace(/https:\/\/files.pythonhosted.org/g, `${url.origin}/special/pypi/files`);
    return new Response(body, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  // Handle requests to files.pythonhosted.org
  if (url.pathname.startsWith('/special/pypi/files/')) {
    const filePath = url.pathname.replace('/special/pypi/files', '');
    const fileUrl = `https://files.pythonhosted.org${filePath}`;
    const response = await fetch(fileUrl);
    // Ensure the response is forwarded as a binary stream
    return new Response(response.body, {
      headers: response.headers
    });
  }

  // 处理 /rust 请求https://mirrors.adysec.com/language/rust
  if (url.pathname.startsWith('/language/rust')) {
    const rustupUrl = 'https://static.rust-lang.org' + url.pathname.replace('/language/rust', '')
    return fetch(rustupUrl)
  }
  // 容器
  // 处理 /docker-ce 请求
  if (url.pathname.startsWith('/container/docker-ce')) {
    // https://download.docker.com/linux/ubuntu/gpg 修正：替换为空，以避免多余的 /
    const dockerceUrl = 'https://download.docker.com' + url.pathname.replace('/container/docker-ce', '')
    return fetch(dockerceUrl)
  }

  // 软件
  // tailscale
  // https://mirrors.885210.xyz/software/tailscale/stable/ubuntu/jammy.noarmor.gpg
  // https://pkgs.tailscale.com/stable/debian/bookworm.noarmor.gpg
  if (url.pathname.startsWith('/software/tailscale')) {
    const tailscaleUrl = 'https://pkgs.tailscale.com' + url.pathname.replace('/software/tailscale', '')
    if (url.pathname.endsWith('.list')) {
      const response = await fetch(tailscaleUrl);
      let body = await response.text();
      // Rewrite URLs in the response body to go through the Cloudflare Worker
      body = body.replace(/https:\/\/pkgs.tailscale.com/g, `${url.origin}/software/tailscale`);
      return new Response(body, {
        headers: { 'Content-Type': response.headers.get('Content-Type') }
      });
    } else {
      return fetch(tailscaleUrl)
    }
  }

  // 其他情况返回 404 Not Found
  return new Response('Not Found', { status: 404 })
}
