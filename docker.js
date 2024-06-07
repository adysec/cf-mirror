(() => {
  addEventListener("fetch", (event) => {
    event.passThroughOnException();
    event.respondWith(handleRequest(event.request));
  });
  var routes = {
    "docker.adysec.com": "https://registry-1.docker.io",
    "quay.adysec.com": "https://quay.io",
    "gcr.adysec.com": "https://gcr.io",
    "k8s-gcr.adysec.com": "https://k8s.gcr.io",
    "k8s.adysec.com": "https://registry.k8s.io",
    "ghcr.adysec.com": "https://ghcr.io",
    "cloudsmith.adysec.com": "https://docker.cloudsmith.io"
  };
  function routeByHosts(host) {
    if (host in routes) {
      return routes[host];
    }
    if (MODE == "debug") {
      return TARGET_UPSTREAM;
    }
    return routes['docker.adysec.com'];
  }
  async function handleRequest(request) {
    const url = new URL(request.url);
    const upstream = routeByHosts(url.hostname);
    if (upstream === "") {
      return new Response(
        JSON.stringify({
          routes
        }),
        {
          status: 404
        }
      );
    }
    if (url.pathname == "/v2/") {
      const newUrl2 = new URL(upstream + "/v2/");
      const resp = await fetch(newUrl2.toString(), {
        method: "GET",
        redirect: "follow"
      });
      if (resp.status === 200) {
      } else if (resp.status === 401) {
        const headers = new Headers();
        if (MODE == "debug") {
          headers.set(
            "Www-Authenticate",
            `Bearer realm="${LOCAL_ADDRESS}/v2/auth",service="cloudflare-docker-proxy"`
          );
        } else {
          headers.set(
            "Www-Authenticate",
            `Bearer realm="https://${url.hostname}/v2/auth",service="cloudflare-docker-proxy"`
          );
        }
        return new Response(JSON.stringify({ message: "UNAUTHORIZED" }), {
          status: 401,
          headers
        });
      } else {
        return resp;
      }
    }
    if (url.pathname == "/v2/auth") {
      const newUrl2 = new URL(upstream + "/v2/");
      const resp = await fetch(newUrl2.toString(), {
        method: "GET",
        redirect: "follow"
      });
      if (resp.status !== 401) {
        return resp;
      }
      const authenticateStr = resp.headers.get("WWW-Authenticate");
      if (authenticateStr === null) {
        return resp;
      }
      const wwwAuthenticate = parseAuthenticate(authenticateStr);
      return await fetchToken(wwwAuthenticate, url.searchParams);
    }
    const newUrl = new URL(upstream + url.pathname);
    const newReq = new Request(newUrl, {
      method: request.method,
      headers: request.headers,
      redirect: "follow"
    });
    return await fetch(newReq);
  }
  function parseAuthenticate(authenticateStr) {
    const re = /(?<=\=")(?:\\.|[^"\\])*(?=")/g;
    const matches = authenticateStr.match(re);
    if (matches === null || matches.length < 2) {
      throw new Error(`invalid Www-Authenticate Header: ${authenticateStr}`);
    }
    return {
      realm: matches[0],
      service: matches[1]
    };
  }
  async function fetchToken(wwwAuthenticate, searchParams) {
    const url = new URL(wwwAuthenticate.realm);
    if (wwwAuthenticate.service.length) {
      url.searchParams.set("service", wwwAuthenticate.service);
    }
    if (searchParams.get("scope")) {
      url.searchParams.set("scope", searchParams.get("scope"));
    }
    return await fetch(url, { method: "GET", headers: {} });
  }
})();
