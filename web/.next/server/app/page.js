(() => {
  var e = {};
  ((e.id = 931),
    (e.ids = [931]),
    (e.modules = {
      7849: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/action-async-storage.external");
      },
      2934: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/action-async-storage.external.js");
      },
      5403: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/request-async-storage.external");
      },
      4580: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/request-async-storage.external.js");
      },
      4749: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/static-generation-async-storage.external");
      },
      5869: (e) => {
        "use strict";
        e.exports = require("next/dist/client/components/static-generation-async-storage.external.js");
      },
      399: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      6063: (e, s, t) => {
        "use strict";
        (t.r(s),
          t.d(s, {
            GlobalError: () => a.a,
            __next_app__: () => p,
            originalPathname: () => c,
            pages: () => d,
            routeModule: () => x,
            tree: () => u,
          }),
          t(2306),
          t(8475),
          t(4025));
        var r = t(8305),
          i = t(9349),
          n = t(302),
          a = t.n(n),
          o = t(6841),
          l = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "originalPathname",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (l[e] = () => o[e]);
        t.d(s, l);
        let u = [
            "",
            {
              children: [
                "__PAGE__",
                {},
                {
                  page: [
                    () => Promise.resolve().then(t.bind(t, 2306)),
                    "/Users/salomax/src/neotool/neotool/web/app/page.tsx",
                  ],
                },
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(t.bind(t, 8475)),
                "/Users/salomax/src/neotool/neotool/web/app/layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(t.bind(t, 4025)),
                "/Users/salomax/src/neotool/neotool/web/app/not-found.tsx",
              ],
            },
          ],
          d = ["/Users/salomax/src/neotool/neotool/web/app/page.tsx"],
          c = "/page",
          p = { require: t, loadChunk: () => Promise.resolve() },
          x = new r.AppPageRouteModule({
            definition: {
              kind: i.x.APP_PAGE,
              page: "/page",
              pathname: "/",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: u },
          });
      },
      1015: (e, s, t) => {
        Promise.resolve().then(t.bind(t, 7396));
      },
      541: (e, s, t) => {
        Promise.resolve().then(t.bind(t, 2863));
      },
      762: (e, s, t) => {
        (Promise.resolve().then(t.t.bind(t, 8375, 23)),
          Promise.resolve().then(t.t.bind(t, 6021, 23)),
          Promise.resolve().then(t.t.bind(t, 1635, 23)),
          Promise.resolve().then(t.t.bind(t, 2834, 23)),
          Promise.resolve().then(t.t.bind(t, 6562, 23)),
          Promise.resolve().then(t.t.bind(t, 5810, 23)));
      },
      7354: (e, s, t) => {
        Promise.resolve().then(t.bind(t, 1914));
      },
      7396: (e, s, t) => {
        "use strict";
        (t.r(s), t.d(s, { default: () => n }));
        var r = t(7150);
        t(7197);
        var i = t(9917);
        function n() {
          let e = (0, i.useRouter)();
          return (0, r.jsxs)("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              padding: "2rem",
            },
            children: [
              r.jsx("h1", { children: "404" }),
              r.jsx("h2", { children: "Page Not Found" }),
              r.jsx("p", {
                children: "The page you are looking for does not exist.",
              }),
              r.jsx("button", {
                onClick: () => e.push("/"),
                children: "Go Home",
              }),
            ],
          });
        }
      },
      2863: (e, s, t) => {
        "use strict";
        (t.r(s), t.d(s, { default: () => i }));
        var r = t(7150);
        function i() {
          return (0, r.jsxs)("div", {
            style: { padding: "2rem" },
            children: [
              r.jsx("h1", { children: "Invistus" }),
              r.jsx("p", { children: "Welcome to Invistus" }),
              r.jsx("p", { children: "This is a minimal test page." }),
            ],
          });
        }
        t(7197);
      },
      1914: (e, s, t) => {
        "use strict";
        t.d(s, { ClientProviders: () => i });
        var r = t(7150);
        function i({ children: e }) {
          return r.jsx(r.Fragment, { children: e });
        }
        t(7197);
      },
      8475: (e, s, t) => {
        "use strict";
        (t.r(s), t.d(s, { default: () => d, metadata: () => u }));
        var r = t(9764);
        t(9999);
        var i = t(480);
        let n = (0, i.createProxy)(
            String.raw`/Users/salomax/src/neotool/neotool/web/src/components/ClientProviders.tsx`,
          ),
          { __esModule: a, $$typeof: o } = n;
        n.default;
        let l = (0, i.createProxy)(
            String.raw`/Users/salomax/src/neotool/neotool/web/src/components/ClientProviders.tsx#ClientProviders`,
          ),
          u = { title: "Invistus", description: "Invistus web app" };
        function d({ children: e }) {
          return r.jsx("html", {
            lang: "en",
            children: r.jsx("body", { children: r.jsx(l, { children: e }) }),
          });
        }
      },
      4025: (e, s, t) => {
        "use strict";
        (t.r(s),
          t.d(s, { $$typeof: () => a, __esModule: () => n, default: () => o }));
        var r = t(480);
        let i = (0, r.createProxy)(
            String.raw`/Users/salomax/src/neotool/neotool/web/app/not-found.tsx`,
          ),
          { __esModule: n, $$typeof: a } = i;
        i.default;
        let o = (0, r.createProxy)(
          String.raw`/Users/salomax/src/neotool/neotool/web/app/not-found.tsx#default`,
        );
      },
      2306: (e, s, t) => {
        "use strict";
        (t.r(s),
          t.d(s, { $$typeof: () => a, __esModule: () => n, default: () => o }));
        var r = t(480);
        let i = (0, r.createProxy)(
            String.raw`/Users/salomax/src/neotool/neotool/web/app/page.tsx`,
          ),
          { __esModule: n, $$typeof: a } = i;
        i.default;
        let o = (0, r.createProxy)(
          String.raw`/Users/salomax/src/neotool/neotool/web/app/page.tsx#default`,
        );
      },
    }));
  var s = require("../webpack-runtime.js");
  s.C(e);
  var t = (e) => s((s.s = e)),
    r = s.X(0, [938], () => t(6063));
  module.exports = r;
})();
