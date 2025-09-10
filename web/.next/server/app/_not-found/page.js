(() => {
  var e = {};
  ((e.id = 409),
    (e.ids = [409]),
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
      7466: (e, t, r) => {
        "use strict";
        (r.r(t),
          r.d(t, {
            GlobalError: () => o.a,
            __next_app__: () => p,
            originalPathname: () => c,
            pages: () => u,
            routeModule: () => x,
            tree: () => d,
          }),
          r(7112),
          r(4025),
          r(8475));
        var s = r(8305),
          n = r(9349),
          i = r(302),
          o = r.n(i),
          l = r(6841),
          a = {};
        for (let e in l)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "originalPathname",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (a[e] = () => l[e]);
        r.d(t, a);
        let d = [
            "",
            {
              children: [
                "/_not-found",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(r.bind(r, 4025)),
                        "/Users/salomax/src/neotool/neotool/web/app/not-found.tsx",
                      ],
                    },
                  ],
                },
                {},
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(r.bind(r, 8475)),
                "/Users/salomax/src/neotool/neotool/web/app/layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(r.bind(r, 4025)),
                "/Users/salomax/src/neotool/neotool/web/app/not-found.tsx",
              ],
            },
          ],
          u = [],
          c = "/_not-found/page",
          p = { require: r, loadChunk: () => Promise.resolve() },
          x = new s.AppPageRouteModule({
            definition: {
              kind: n.x.APP_PAGE,
              page: "/_not-found/page",
              pathname: "/_not-found",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      1015: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 7396));
      },
      762: (e, t, r) => {
        (Promise.resolve().then(r.t.bind(r, 8375, 23)),
          Promise.resolve().then(r.t.bind(r, 6021, 23)),
          Promise.resolve().then(r.t.bind(r, 1635, 23)),
          Promise.resolve().then(r.t.bind(r, 2834, 23)),
          Promise.resolve().then(r.t.bind(r, 6562, 23)),
          Promise.resolve().then(r.t.bind(r, 5810, 23)));
      },
      7354: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 1914));
      },
      2481: () => {},
      7396: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => i }));
        var s = r(7150);
        r(7197);
        var n = r(9917);
        function i() {
          let e = (0, n.useRouter)();
          return (0, s.jsxs)("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
              padding: "2rem",
            },
            children: [
              s.jsx("h1", { children: "404" }),
              s.jsx("h2", { children: "Page Not Found" }),
              s.jsx("p", {
                children: "The page you are looking for does not exist.",
              }),
              s.jsx("button", {
                onClick: () => e.push("/"),
                children: "Go Home",
              }),
            ],
          });
        }
      },
      1914: (e, t, r) => {
        "use strict";
        r.d(t, { ClientProviders: () => n });
        var s = r(7150);
        function n({ children: e }) {
          return s.jsx(s.Fragment, { children: e });
        }
        r(7197);
      },
      8475: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => u, metadata: () => d }));
        var s = r(9764);
        r(9999);
        var n = r(480);
        let i = (0, n.createProxy)(
            String.raw`/Users/salomax/src/neotool/neotool/web/src/components/ClientProviders.tsx`,
          ),
          { __esModule: o, $$typeof: l } = i;
        i.default;
        let a = (0, n.createProxy)(
            String.raw`/Users/salomax/src/neotool/neotool/web/src/components/ClientProviders.tsx#ClientProviders`,
          ),
          d = { title: "Invistus", description: "Invistus web app" };
        function u({ children: e }) {
          return s.jsx("html", {
            lang: "en",
            children: s.jsx("body", { children: s.jsx(a, { children: e }) }),
          });
        }
      },
      4025: (e, t, r) => {
        "use strict";
        (r.r(t),
          r.d(t, { $$typeof: () => o, __esModule: () => i, default: () => l }));
        var s = r(480);
        let n = (0, s.createProxy)(
            String.raw`/Users/salomax/src/neotool/neotool/web/app/not-found.tsx`,
          ),
          { __esModule: i, $$typeof: o } = n;
        n.default;
        let l = (0, s.createProxy)(
          String.raw`/Users/salomax/src/neotool/neotool/web/app/not-found.tsx#default`,
        );
      },
      7112: (e, t, r) => {
        "use strict";
        (Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "default", {
            enumerable: !0,
            get: function () {
              return i;
            },
          }),
          r(54));
        let s = r(9764);
        r(9999);
        let n = {
          error: {
            fontFamily:
              'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
          desc: { display: "inline-block" },
          h1: {
            display: "inline-block",
            margin: "0 20px 0 0",
            padding: "0 23px 0 0",
            fontSize: 24,
            fontWeight: 500,
            verticalAlign: "top",
            lineHeight: "49px",
          },
          h2: { fontSize: 14, fontWeight: 400, lineHeight: "49px", margin: 0 },
        };
        function i() {
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)("title", {
                children: "404: This page could not be found.",
              }),
              (0, s.jsx)("div", {
                style: n.error,
                children: (0, s.jsxs)("div", {
                  children: [
                    (0, s.jsx)("style", {
                      dangerouslySetInnerHTML: {
                        __html:
                          "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}",
                      },
                    }),
                    (0, s.jsx)("h1", {
                      className: "next-error-h1",
                      style: n.h1,
                      children: "404",
                    }),
                    (0, s.jsx)("div", {
                      style: n.desc,
                      children: (0, s.jsx)("h2", {
                        style: n.h2,
                        children: "This page could not be found.",
                      }),
                    }),
                  ],
                }),
              }),
            ],
          });
        }
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      54: (e, t, r) => {
        "use strict";
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (r.r(t), r.d(t, { _: () => s, _interop_require_default: () => s }));
      },
    }));
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [938], () => r(7466));
  module.exports = s;
})();
