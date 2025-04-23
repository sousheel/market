import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CaV_ZNZT.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_BB3ffHEJ.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/sousheel/code/web/market/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BScVxmeO.js"}],"styles":[{"type":"external","src":"/_astro/cart.CjaH-x_X.css"}],"routeData":{"route":"/cart","isIndex":false,"type":"page","pattern":"^\\/cart\\/?$","segments":[[{"content":"cart","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cart.astro","pathname":"/cart","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BScVxmeO.js"}],"styles":[{"type":"external","src":"/_astro/cart.CjaH-x_X.css"}],"routeData":{"route":"/checkout","isIndex":false,"type":"page","pattern":"^\\/checkout\\/?$","segments":[[{"content":"checkout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/checkout.astro","pathname":"/checkout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/order/create","isIndex":false,"type":"endpoint","pattern":"^\\/order\\/create\\/?$","segments":[[{"content":"order","dynamic":false,"spread":false}],[{"content":"create","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/order/create.ts","pathname":"/order/create","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BScVxmeO.js"}],"styles":[{"type":"external","src":"/_astro/cart.CjaH-x_X.css"}],"routeData":{"route":"/order/[id]","isIndex":false,"type":"page","pattern":"^\\/order\\/([^/]+?)\\/?$","segments":[[{"content":"order","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/order/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BScVxmeO.js"}],"styles":[{"type":"external","src":"/_astro/cart.CjaH-x_X.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://dounut-astro.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/sousheel/code/web/market/src/pages/cart.astro",{"propagation":"none","containsHead":true}],["/Users/sousheel/code/web/market/src/pages/checkout.astro",{"propagation":"none","containsHead":true}],["/Users/sousheel/code/web/market/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/sousheel/code/web/market/src/pages/order/[id].astro",{"propagation":"none","containsHead":true}],["/Users/sousheel/code/web/market/src/pages/shop/[product].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/cart@_@astro":"pages/cart.astro.mjs","\u0000@astro-page:src/pages/checkout@_@astro":"pages/checkout.astro.mjs","\u0000@astro-page:src/pages/order/create@_@ts":"pages/order/create.astro.mjs","\u0000@astro-page:src/pages/order/[id]@_@astro":"pages/order/_id_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/shop/[product]@_@astro":"pages/shop/_product_.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/sousheel/code/web/market/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_Dokw6g2t.mjs","/Users/sousheel/code/web/market/src/components/local-cart.tsx":"_astro/local-cart.CO3IMeni.js","/Users/sousheel/code/web/market/src/components/checkout":"_astro/checkout.haoN2K2y.js","/Users/sousheel/code/web/market/src/components/header":"_astro/header.BM2V8E1p.js","@astrojs/react/client.js":"_astro/client.DrE9CFQR.js","/astro/hoisted.js?q=0":"_astro/hoisted.BScVxmeO.js","/Users/sousheel/code/web/market/src/components/product":"_astro/product.BXOgPx8P.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/cart.CjaH-x_X.css","/favicon.png","/_astro/DailyMotion.BsyGzDAu.js","/_astro/Facebook.DxMWSq5s.js","/_astro/FilePlayer.BM9jQzv4.js","/_astro/Kaltura.7Phz0aU1.js","/_astro/Mixcloud.B-k6B5Xi.js","/_astro/Mux.DwgfS5hX.js","/_astro/Preview.BsaAqGNT.js","/_astro/SoundCloud.B0aDhsJN.js","/_astro/Streamable.Fsiddrdo.js","/_astro/Twitch.B0FtqlLT.js","/_astro/Vidyard.BFfnoIEg.js","/_astro/Vimeo.DVAtdrtG.js","/_astro/Wistia.BAKaE7mh.js","/_astro/YouTube.OttzYpON.js","/_astro/astro-logo.D23cMVHt.svg","/_astro/checkout.haoN2K2y.js","/_astro/client.DrE9CFQR.js","/_astro/header.BM2V8E1p.js","/_astro/hoisted.BScVxmeO.js","/_astro/index.CVf8TyFT.js","/_astro/jsx-runtime.TBa3i5EZ.js","/_astro/local-cart.CO3IMeni.js","/_astro/product.BXOgPx8P.js","/_astro/product.D43XAXHg.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"52fX9eF3TXNavok+RvCySiORi5IF+MjDbBMcD5FYbHM=","experimentalEnvGetSecretEnabled":false});

export { manifest };
