# AdySec CF拉平镜像站

站点地址：<https://mirror.adysec.com/>

项目地址：<https://github.com/adysec/cf-mirror>

官方源可信度和稳定性最高，但众所周知的原因国内访问速度较慢，因此产生了清华源、中科大源、阿里源之类的一系列开源镜像站，有些资源需要换n个源才能把系统和软件更新完成，第三方源相对官方源软件版本更低，维护者也可能会夹带私货，洁癖患者难以忍受。

KaOS，Deepin的官方源就在大陆，对于国内用户较为友好，但境外vps需要更新软件源有网络不稳定的情况，配置该源的目的主要是为了国外ip的服务器更新，更新源的选用应根据自己的地域和实际情况

自建软件源需要TB级的存储，而[mirrorz](https://github.com/mirrorz-org/mirrorz)项目的思路是索引和跳转到校园镜像站，本身并不提供具体内容。由此启发做了Cloudflare拉平镜像站。

众生平等Cloudflare，利用全球的边缘节点，将用户请求转发到离用户距离最近的节点，同时缓存静态内容加速，减少网络延迟和下载速度。Cloudflare Worker拥有极致的Serverless体验，因此使用Workers配置反代，仅做官方源的转发，给官方源加一层cdn。

本站使用Cloudflare Workers Free Plan，免费计划慷慨地给了每日10w个请求，可承受每日1000+正常用户使用，带宽至少10Tbps。

|          | Requests        | Duration               | CPU time                                   |
| -------- | --------------- | ---------------------- | ------------------------------------------ |
| **Free** | 100,000 per day | No charge for duration | 10 milliseconds of CPU time per invocation |

本地自助测速地址：https://speed.cloudflare.com/

## 系统镜像

配置文档可能存在描述有误的情况，请参考官方文档修改替换镜像源地址

| 系统         | 配置文档                                      | 下载地址                                       | 同步来源                                     |
| ------------ | --------------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| ubuntu       | https://mirror.adysec.com/system/ubuntu       | https://mirrors.adysec.com/system/ubuntu       | http://de.archive.ubuntu.com/ubuntu/ubuntu   |
| centos       | https://mirror.adysec.com/system/centos       | https://mirrors.adysec.com/system/centos       | http://mirror.webhostingghana.com/centos     |
| epel         | https://mirror.adysec.com/system/epel         | https://mirrors.adysec.com/system/epel         | http://mirrors.kernel.org/fedora-epel        |
| deepin       | https://mirror.adysec.com/system/deepin       | https://mirrors.adysec.com/system/deepin       | https://community-packages.deepin.com/deepin |
| kali         | https://mirror.adysec.com/system/kali         | https://mirrors.adysec.com/system/kali         | http://http.kali.org/kali                    |
| debian       | https://mirror.adysec.com/system/debian       | https://mirrors.adysec.com/system/debian       | http://ftp.debian.org/debian                 |
| manjaro      | https://mirror.adysec.com/system/manjaro      | https://mirrors.adysec.com/system/manjaro      | http://ftp.tsukuba.wide.ad.jp/manjaro        |
| GNU          | https://mirror.adysec.com/system/gnu          | https://mirrors.adysec.com/system/gnu          | https://lists.gnu.org/archive/html           |
| openwrt      | https://mirror.adysec.com/system/openwrt      | https://mirrors.adysec.com/system/openwrt      | https://archive.openwrt.org                  |
| kaos         | https://mirror.adysec.com/system/KaOS         | https://mirrors.adysec.com/system/KaOS         | https://ca.kaosx.cf                          |
| arch4edu     | https://mirror.adysec.com/system/arch4edu     | https://mirrors.adysec.com/system/arch4edu     | https://arch4edu.org                         |
| archlinux    | https://mirror.adysec.com/system/archlinux    | https://mirrors.adysec.com/system/archlinux    | https://mirror.pkgbuild.com                  |
| bioarchlinux | https://mirror.adysec.com/system/bioarchlinux | https://mirrors.adysec.com/system/bioarchlinux | https://repo.bioarchlinux.org                |
| archlinuxcn  | https://mirror.adysec.com/system/archlinuxcn  | https://mirrors.adysec.com/system/archlinuxcn  | https://repo.archlinuxcn.org                 |
| archlinuxarm | https://mirror.adysec.com/system/archlinuxarm | https://mirrors.adysec.com/system/archlinuxarm | http://dk.mirror.archlinuxarm.org            |
| fedora       | https://mirror.adysec.com/system/fedora       | https://mirrors.adysec.com/system/fedora       | https://ap.edge.kernel.org/fedora            |
| OpenBSD      | https://mirror.adysec.com/system/openbsd      | https://mirrors.adysec.com/system/OpenBSD      | https://cdn.openbsd.org/pub/OpenBSD          |
| opensuse     | https://mirror.adysec.com/system/opensuse     | https://mirrors.adysec.com/system/opensuse     | http://download.opensuse.org                 |
| freebsd      | https://mirror.adysec.com/system/freebsd      | https://mirrors.adysec.com/system/freebsd      | https://download.freebsd.org                 |

## 编程语言

配置文档可能存在描述有误的情况，请参考官方文档修改替换镜像源地址

| 语言 | 配置文档                                | 下载地址                                 | 同步来源                |
| ---- | --------------------------------------- | ---------------------------------------- | ----------------------- |
| pypi | https://mirror.adysec.com/language/pypi | https://mirrors.adysec.com/language/pypi | https://pypi.org/simple |
| rust | https://mirror.adysec.com/language/rust | https://mirrors.adysec.com/language/rust | https://static.rust-lang.org |

## 容器

配置文档可能存在描述有误的情况，请参考官方文档修改替换镜像源地址

| 语言      | 配置文档                                      | 下载地址                                       | 同步来源                     |
| --------- | --------------------------------------------- | ---------------------------------------------- | ---------------------------- |
| docker-ce | https://mirror.adysec.com/container/docker-ce | https://mirrors.adysec.com/container/docker-ce | https://download.docker.com/ |
