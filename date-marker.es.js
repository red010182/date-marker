import { defineComponent as fe, ref as H, computed as te, openBlock as w, createElementBlock as D, Fragment as I, createElementVNode as u, withDirectives as le, unref as y, renderList as N, toDisplayString as U, vModelSelect as ue, normalizeClass as he, pushScopeId as ve, popScopeId as $e } from "vue";
var me = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pe(v) {
  return v && v.__esModule && Object.prototype.hasOwnProperty.call(v, "default") ? v.default : v;
}
var de = { exports: {} };
(function(v, C) {
  (function(O, p) {
    v.exports = p();
  })(me, function() {
    var O = 1e3, p = 6e4, F = 36e5, W = "millisecond", L = "second", $ = "minute", A = "hour", g = "day", z = "week", b = "month", ne = "quarter", Y = "year", x = "date", E = "Invalid Date", se = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, ae = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, P = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t) {
      var n = ["th", "st", "nd", "rd"], e = t % 100;
      return "[" + t + (n[(e - 20) % 10] || n[e] || n[0]) + "]";
    } }, K = function(t, n, e) {
      var o = String(t);
      return !o || o.length >= n ? t : "" + Array(n + 1 - o.length).join(e) + t;
    }, ie = { s: K, z: function(t) {
      var n = -t.utcOffset(), e = Math.abs(n), o = Math.floor(e / 60), s = e % 60;
      return (n <= 0 ? "+" : "-") + K(o, 2, "0") + ":" + K(s, 2, "0");
    }, m: function t(n, e) {
      if (n.date() < e.date()) return -t(e, n);
      var o = 12 * (e.year() - n.year()) + (e.month() - n.month()), s = n.clone().add(o, b), i = e - s < 0, l = n.clone().add(o + (i ? -1 : 1), b);
      return +(-(o + (e - s) / (i ? s - l : l - s)) || 0);
    }, a: function(t) {
      return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
    }, p: function(t) {
      return { M: b, y: Y, w: z, d: g, D: x, h: A, m: $, s: L, ms: W, Q: ne }[t] || String(t || "").toLowerCase().replace(/s$/, "");
    }, u: function(t) {
      return t === void 0;
    } }, B = "en", T = {};
    T[B] = P;
    var re = "$isDayjsObject", q = function(t) {
      return t instanceof a || !(!t || !t[re]);
    }, G = function t(n, e, o) {
      var s;
      if (!n) return B;
      if (typeof n == "string") {
        var i = n.toLowerCase();
        T[i] && (s = i), e && (T[i] = e, s = i);
        var l = n.split("-");
        if (!s && l.length > 1) return t(l[0]);
      } else {
        var d = n.name;
        T[d] = n, s = d;
      }
      return !o && s && (B = s), s || !o && B;
    }, f = function(t, n) {
      if (q(t)) return t.clone();
      var e = typeof n == "object" ? n : {};
      return e.date = t, e.args = arguments, new a(e);
    }, r = ie;
    r.l = G, r.i = q, r.w = function(t, n) {
      return f(t, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
    };
    var a = function() {
      function t(e) {
        this.$L = G(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[re] = !0;
      }
      var n = t.prototype;
      return n.parse = function(e) {
        this.$d = function(o) {
          var s = o.date, i = o.utc;
          if (s === null) return /* @__PURE__ */ new Date(NaN);
          if (r.u(s)) return /* @__PURE__ */ new Date();
          if (s instanceof Date) return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var l = s.match(se);
            if (l) {
              var d = l[2] - 1 || 0, h = (l[7] || "0").substring(0, 3);
              return i ? new Date(Date.UTC(l[1], d, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, h)) : new Date(l[1], d, l[3] || 1, l[4] || 0, l[5] || 0, l[6] || 0, h);
            }
          }
          return new Date(s);
        }(e), this.init();
      }, n.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, n.$utils = function() {
        return r;
      }, n.isValid = function() {
        return this.$d.toString() !== E;
      }, n.isSame = function(e, o) {
        var s = f(e);
        return this.startOf(o) <= s && s <= this.endOf(o);
      }, n.isAfter = function(e, o) {
        return f(e) < this.startOf(o);
      }, n.isBefore = function(e, o) {
        return this.endOf(o) < f(e);
      }, n.$g = function(e, o, s) {
        return r.u(e) ? this[o] : this.set(s, e);
      }, n.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, n.valueOf = function() {
        return this.$d.getTime();
      }, n.startOf = function(e, o) {
        var s = this, i = !!r.u(o) || o, l = r.p(e), d = function(Z, M) {
          var j = r.w(s.$u ? Date.UTC(s.$y, M, Z) : new Date(s.$y, M, Z), s);
          return i ? j : j.endOf(g);
        }, h = function(Z, M) {
          return r.w(s.toDate()[Z].apply(s.toDate("s"), (i ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(M)), s);
        }, m = this.$W, _ = this.$M, k = this.$D, Q = "set" + (this.$u ? "UTC" : "");
        switch (l) {
          case Y:
            return i ? d(1, 0) : d(31, 11);
          case b:
            return i ? d(1, _) : d(0, _ + 1);
          case z:
            var J = this.$locale().weekStart || 0, X = (m < J ? m + 7 : m) - J;
            return d(i ? k - X : k + (6 - X), _);
          case g:
          case x:
            return h(Q + "Hours", 0);
          case A:
            return h(Q + "Minutes", 1);
          case $:
            return h(Q + "Seconds", 2);
          case L:
            return h(Q + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, n.endOf = function(e) {
        return this.startOf(e, !1);
      }, n.$set = function(e, o) {
        var s, i = r.p(e), l = "set" + (this.$u ? "UTC" : ""), d = (s = {}, s[g] = l + "Date", s[x] = l + "Date", s[b] = l + "Month", s[Y] = l + "FullYear", s[A] = l + "Hours", s[$] = l + "Minutes", s[L] = l + "Seconds", s[W] = l + "Milliseconds", s)[i], h = i === g ? this.$D + (o - this.$W) : o;
        if (i === b || i === Y) {
          var m = this.clone().set(x, 1);
          m.$d[d](h), m.init(), this.$d = m.set(x, Math.min(this.$D, m.daysInMonth())).$d;
        } else d && this.$d[d](h);
        return this.init(), this;
      }, n.set = function(e, o) {
        return this.clone().$set(e, o);
      }, n.get = function(e) {
        return this[r.p(e)]();
      }, n.add = function(e, o) {
        var s, i = this;
        e = Number(e);
        var l = r.p(o), d = function(_) {
          var k = f(i);
          return r.w(k.date(k.date() + Math.round(_ * e)), i);
        };
        if (l === b) return this.set(b, this.$M + e);
        if (l === Y) return this.set(Y, this.$y + e);
        if (l === g) return d(1);
        if (l === z) return d(7);
        var h = (s = {}, s[$] = p, s[A] = F, s[L] = O, s)[l] || 1, m = this.$d.getTime() + e * h;
        return r.w(m, this);
      }, n.subtract = function(e, o) {
        return this.add(-1 * e, o);
      }, n.format = function(e) {
        var o = this, s = this.$locale();
        if (!this.isValid()) return s.invalidDate || E;
        var i = e || "YYYY-MM-DDTHH:mm:ssZ", l = r.z(this), d = this.$H, h = this.$m, m = this.$M, _ = s.weekdays, k = s.months, Q = s.meridiem, J = function(M, j, ee, oe) {
          return M && (M[j] || M(o, i)) || ee[j].slice(0, oe);
        }, X = function(M) {
          return r.s(d % 12 || 12, M, "0");
        }, Z = Q || function(M, j, ee) {
          var oe = M < 12 ? "AM" : "PM";
          return ee ? oe.toLowerCase() : oe;
        };
        return i.replace(ae, function(M, j) {
          return j || function(ee) {
            switch (ee) {
              case "YY":
                return String(o.$y).slice(-2);
              case "YYYY":
                return r.s(o.$y, 4, "0");
              case "M":
                return m + 1;
              case "MM":
                return r.s(m + 1, 2, "0");
              case "MMM":
                return J(s.monthsShort, m, k, 3);
              case "MMMM":
                return J(k, m);
              case "D":
                return o.$D;
              case "DD":
                return r.s(o.$D, 2, "0");
              case "d":
                return String(o.$W);
              case "dd":
                return J(s.weekdaysMin, o.$W, _, 2);
              case "ddd":
                return J(s.weekdaysShort, o.$W, _, 3);
              case "dddd":
                return _[o.$W];
              case "H":
                return String(d);
              case "HH":
                return r.s(d, 2, "0");
              case "h":
                return X(1);
              case "hh":
                return X(2);
              case "a":
                return Z(d, h, !0);
              case "A":
                return Z(d, h, !1);
              case "m":
                return String(h);
              case "mm":
                return r.s(h, 2, "0");
              case "s":
                return String(o.$s);
              case "ss":
                return r.s(o.$s, 2, "0");
              case "SSS":
                return r.s(o.$ms, 3, "0");
              case "Z":
                return l;
            }
            return null;
          }(M) || l.replace(":", "");
        });
      }, n.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, n.diff = function(e, o, s) {
        var i, l = this, d = r.p(o), h = f(e), m = (h.utcOffset() - this.utcOffset()) * p, _ = this - h, k = function() {
          return r.m(l, h);
        };
        switch (d) {
          case Y:
            i = k() / 12;
            break;
          case b:
            i = k();
            break;
          case ne:
            i = k() / 3;
            break;
          case z:
            i = (_ - m) / 6048e5;
            break;
          case g:
            i = (_ - m) / 864e5;
            break;
          case A:
            i = _ / F;
            break;
          case $:
            i = _ / p;
            break;
          case L:
            i = _ / O;
            break;
          default:
            i = _;
        }
        return s ? i : r.a(i);
      }, n.daysInMonth = function() {
        return this.endOf(b).$D;
      }, n.$locale = function() {
        return T[this.$L];
      }, n.locale = function(e, o) {
        if (!e) return this.$L;
        var s = this.clone(), i = G(e, o, !0);
        return i && (s.$L = i), s;
      }, n.clone = function() {
        return r.w(this.$d, this);
      }, n.toDate = function() {
        return new Date(this.valueOf());
      }, n.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, n.toISOString = function() {
        return this.$d.toISOString();
      }, n.toString = function() {
        return this.$d.toUTCString();
      }, t;
    }(), c = a.prototype;
    return f.prototype = c, [["$ms", W], ["$s", L], ["$m", $], ["$H", A], ["$W", g], ["$M", b], ["$y", Y], ["$D", x]].forEach(function(t) {
      c[t[1]] = function(n) {
        return this.$g(n, t[0], t[1]);
      };
    }), f.extend = function(t, n) {
      return t.$i || (t(n, a, f), t.$i = !0), f;
    }, f.locale = G, f.isDayjs = q, f.unix = function(t) {
      return f(1e3 * t);
    }, f.en = T[B], f.Ls = T, f.p = {}, f;
  });
})(de);
var _e = de.exports;
const ce = /* @__PURE__ */ pe(_e);
function ye(v, C) {
  const O = [];
  for (let p = 0; p < v.length; p += C)
    O.push(v.slice(p, p + C));
  return O;
}
const R = (v) => (ve("data-v-2b5afeeb"), v = v(), $e(), v), Me = { class: "mt-8 relative w-120" }, ge = { class: "text-left" }, be = { class: "text-lg p-4 border" }, we = /* @__PURE__ */ R(() => /* @__PURE__ */ u("div", null, "快速選擇", -1)), De = /* @__PURE__ */ R(() => /* @__PURE__ */ u("span", { class: "ml-1" }, "從", -1)), ke = ["value"], Se = /* @__PURE__ */ R(() => /* @__PURE__ */ u("span", { class: "mx-1" }, "到", -1)), Ce = ["value"], Oe = /* @__PURE__ */ R(() => /* @__PURE__ */ u("span", { class: "mx-1" }, "的", -1)), Le = ["value"], Ye = { class: "space-x-2 ml-4 text-sm" }, Te = { class: "year-box row flex items-center" }, xe = { class: "year-cell" }, He = { class: "year-cell" }, Ie = { class: "next-year" }, We = { class: "mr-2" }, Ae = /* @__PURE__ */ R(() => /* @__PURE__ */ u("div", { class: "line" }, null, -1)), je = { class: "year-cell" }, Ne = { class: "year" }, Ue = { class: "ml-2" }, Ve = { class: "year-cell" }, Fe = { class: "row flex" }, Ee = /* @__PURE__ */ R(() => /* @__PURE__ */ u("div", { class: "col cell" }, null, -1)), Be = ["onClick"], Je = ["onClick"], Ze = ["onClick"], V = 31, S = 12, ze = /* @__PURE__ */ fe({
  __name: "DateMarker",
  props: {
    weekdayLabels: null,
    monthLabels: null,
    dayLabels: null,
    notDisplayWeekdayInCell: { type: Boolean },
    disableDates: null
  },
  setup(v) {
    const C = v, O = ce(), p = H(new Array(V * S).fill(!1)), F = H(new Array(V * S).fill("")), W = H(new Array(V).fill(!1)), L = H(new Array(S).fill(!1)), $ = H({
      fromMonth: 1,
      toMonth: 12,
      weekday: 1
    }), A = H(C.notDisplayWeekdayInCell), g = H(C.weekdayLabels ?? ["一", "二", "三", "四", "五", "六", "日"]), z = H(C.monthLabels ?? ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]), b = H(C.dayLabels ?? ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日", "31日"]), ne = H(C.disableDates ?? []), Y = te(() => ye(p.value, S)), x = te(() => O.format("YYYY-MM-DD")), E = te(() => +x.value.substring(0, 4)), se = te(() => +x.value.substring(5, 7));
    te(() => +x.value.substring(8, 10));
    const ae = (r, a) => {
      if (r >= 0 && r < V && a >= 0 && a < S)
        return p.value[r * S + a];
    }, P = (r, a, c) => {
      r >= 0 && r < V && a >= 0 && a < S && !T(r, a) && (p.value[r * S + a] = c);
    }, K = (r, a) => {
      P(r, a, !ae(r, a));
    }, ie = (r) => {
      L.value[r] = !L.value[r];
      for (let a = 0; a < V; a++)
        P(a, r, L.value[r]);
    }, B = (r) => {
      W.value[r] = !W.value[r];
      for (let a = 0; a < S; a++)
        P(r, a, W.value[r]);
    }, T = (r, a) => {
      const c = `${a + 1}/${r + 1}`;
      return ne.value.concat(["2/30", "2/31", "4/31", "6/31", "9/31", "11/31"]).includes(c);
    }, re = (r, a) => A.value || T(r, a) ? "" : g.value[ce(`${E}-${a + 1}-${r + 1}`).day()], q = async (r) => {
      console.log("weekSelector", $.value, r);
      const a = g.value[$.value.weekday];
      for (let c = 0; c < V; c++)
        for (let t = $.value.fromMonth; t <= $.value.toMonth; t++)
          F.value[c * S + t] === a && P(c, t, r);
    }, G = () => {
      for (let r = 0; r < V; r++)
        for (let a = 0; a < S; a++)
          F.value[r * S + a] = g.value[ce(`${E}-${a + 1}-${r + 1}`).day()];
    }, f = () => {
      p.value.fill(!1), W.value.fill(!1), L.value.fill(!1), $.value = {
        fromMonth: 1,
        toMonth: 12,
        weekday: 1
      }, G();
    };
    return f(), (r, a) => (w(), D(I, null, [
      u("div", { class: "text-left" }, [
        u("div", {
          class: "btn",
          onClick: f
        }, "Clear")
      ]),
      u("div", Me, [
        u("div", ge, [
          u("div", be, [
            we,
            De,
            le(u("select", {
              class: "border",
              "onUpdate:modelValue": a[0] || (a[0] = (c) => y($).fromMonth = c)
            }, [
              (w(), D(I, null, N(12, (c, t) => u("option", { value: t }, U(t + 1) + "月", 9, ke)), 64))
            ], 512), [
              [ue, y($).fromMonth]
            ]),
            Se,
            le(u("select", {
              class: "border",
              "onUpdate:modelValue": a[1] || (a[1] = (c) => y($).toMonth = c)
            }, [
              (w(), D(I, null, N(12, (c, t) => u("option", { value: t }, U(t + 1) + "月", 9, Ce)), 64))
            ], 512), [
              [ue, y($).toMonth]
            ]),
            Oe,
            le(u("select", {
              class: "border",
              "onUpdate:modelValue": a[2] || (a[2] = (c) => y($).weekday = c)
            }, [
              (w(), D(I, null, N(7, (c, t) => u("option", { value: t }, "周" + U(y(g)[t]), 9, Le)), 64))
            ], 512), [
              [ue, y($).weekday]
            ]),
            u("span", Ye, [
              u("div", {
                class: "btn",
                onClick: a[3] || (a[3] = (c) => q(!1))
              }, "取消"),
              u("div", {
                class: "btn",
                onClick: a[4] || (a[4] = (c) => q(!0))
              }, "打勾")
            ])
          ])
        ]),
        u("div", Te, [
          (w(!0), D(I, null, N(y(se) - 1, (c) => (w(), D("div", xe))), 256)),
          u("div", He, [
            u("div", Ie, [
              u("span", We, U(y(E) + 1), 1)
            ])
          ]),
          Ae,
          u("div", je, [
            u("div", Ne, [
              u("span", Ue, U(y(E)), 1)
            ])
          ]),
          (w(!0), D(I, null, N(12 - y(se), (c) => (w(), D("div", Ve))), 256))
        ]),
        u("div", Fe, [
          Ee,
          (w(), D(I, null, N(12, (c, t) => u("div", {
            class: "col cell",
            onClick: (n) => ie(t)
          }, U(y(z)[t]), 9, Be)), 64))
        ]),
        (w(!0), D(I, null, N(y(Y), (c, t) => (w(), D("div", {
          class: "row flex",
          key: t
        }, [
          u("div", {
            class: "col cell",
            onClick: (n) => B(t)
          }, U(y(b)[t]), 9, Je),
          (w(!0), D(I, null, N(c, (n, e) => (w(), D("div", {
            class: he(["col cell", { active: y(Y)[t][e], disabled: T(t, e) }]),
            onClick: (o) => K(t, e)
          }, U(re(t, e)), 11, Ze))), 256))
        ]))), 128))
      ])
    ], 64));
  }
}), Pe = (v, C) => {
  const O = v.__vccOpts || v;
  for (const [p, F] of C)
    O[p] = F;
  return O;
}, Ge = /* @__PURE__ */ Pe(ze, [["__scopeId", "data-v-2b5afeeb"]]);
export {
  Ge as default
};
