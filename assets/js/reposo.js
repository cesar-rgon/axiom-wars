/* Tropas terráneas en reposo (2026-10-20): las mismas animaciones sutiles
   que en el juego (cmd/gclient/idleanim.go), dibujadas sobre un canvas con el
   sprite de cada ficha. Los efectos y sus valores son los que Cesar eligió en
   el mockup «Tropas en reposo» (idleanim.json del cliente, embebido abajo).
   Sin JS, con prefers-reduced-motion o si el sprite no carga, queda la
   <img> estática de siempre. Sólo se anima lo que está en pantalla. */
(function () {
  'use strict';
  var CFG = {"reproduccion":{"modo":"hibrido","pausaMin":3,"pausaMax":8,"gestoDur":2.2,"rampa":0.3,"desfase":true},"unidades":{"militar":{"respiracion":{"amp":0.014,"periodo":3.6,"capa":"micro"},"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"cientifico":{"respiracion":{"amp":0.012,"periodo":4,"capa":"micro"},"balanceo":{"grados":0.8,"periodo":5.5,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"constructor":{"respiracion":{"amp":0.012,"periodo":3.8,"capa":"micro"},"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"droide":{"flotar":{"altura":0.022,"periodo":2.6,"deriva":0,"capa":"micro"},"vibracion":{"px":0.002,"hz":18,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"explorador":{"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}],"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0}},"meca":{"respiracion":{"amp":0.009,"periodo":4.2,"capa":"micro"},"vapor":[{"nombre":"hombro izq.","x":0.2,"y":0.1,"cantidad":2,"tamano":0.05,"subida":0.12,"color":"#cfd6d8","capa":"gesto","periodo":3,"opacidad":0.35},{"nombre":"hombro der.","x":0.76,"y":0.12,"cantidad":2,"tamano":0.05,"subida":0.12,"color":"#cfd6d8","capa":"gesto","periodo":3,"opacidad":0.35}],"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"vibracion":{"px":0.002,"hz":18,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"transporte_apc":{"vibracion":{"px":0.0025,"hz":16,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"raptor":{"flotar":{"altura":0.016,"periodo":2.8,"deriva":0,"capa":"micro"},"balanceo":{"grados":1,"periodo":4.5,"capa":"micro","desplaza":0,"pie":0.95},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}],"vapor":[{"nombre":"salida","x":0.5,"y":0.2,"cantidad":2,"tamano":0.05,"subida":0.12,"color":"#cfd6d8","capa":"gesto","periodo":3,"opacidad":0.35}]}}};
  var BASE = { militar: 0.95, cientifico: 0.96, constructor: 0.95, droide: 0.9, explorador: 0.95, meca: 0.96, transporte_apc: 0.97, raptor: 0.9 };
  var PLAY = CFG.reproduccion, TAU = Math.PI * 2, BANDS = 40, SIDE = 384, FPS = 30;
  if (!document.querySelector || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

  function smooth(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { var a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = (t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255); }

  /* Reproducción híbrida: la capa «micro» va siempre; la «gesto» sólo dentro
     de una ventana que se abre cada pausaMin..pausaMax s y dura gestoDur,
     con rampa de entrada y salida para empezar y acabar en reposo. */
  function Unit(canvas, img, type) {
    this.c = canvas; this.ctx = canvas.getContext('2d'); this.img = img; this.type = type;
    this.fx = CFG.unidades[type]; this.r = rng(hash(type + canvas.id));
    this.clock = 0; this.last = 0; this.acting = false; this.nextAt = (PLAY.desfase ? this.r() * PLAY.pausaMax : PLAY.pausaMin);
    this.gStart = 0; this.puffs = []; this.due = []; this.visible = false;
  }
  Unit.prototype.step = function (dt) {
    this.clock += dt; var t = this.clock, newG = false;
    for (;;) {
      if (!this.acting && t >= this.nextAt) { this.acting = true; this.gStart = this.nextAt; newG = true; }
      else if (this.acting && t >= this.gStart + PLAY.gestoDur) { this.acting = false; this.nextAt = this.gStart + PLAY.gestoDur + PLAY.pausaMin + this.r() * (PLAY.pausaMax - PLAY.pausaMin); }
      else break;
    }
    var u = 0, gE = 0;
    if (this.acting) { u = Math.min(1, (t - this.gStart) / PLAY.gestoDur); var r = Math.max(0.05, Math.min(0.5, PLAY.rampa)); gE = smooth(u / r) * smooth((1 - u) / r); }
    return { t: t, dt: dt, u: u, gE: gE, newG: newG };
  };
  function raw(e, capa, per, fase) {
    per = per || 3; fase = fase || 0;
    if (capa === 'gesto') return Math.sin(TAU * (Math.max(1, Math.round(PLAY.gestoDur / per)) * e.u + fase)) * e.gE;
    return Math.sin(TAU * (e.t / per + fase));
  }
  function light(e, capa) { return capa === 'gesto' ? e.gE : 1; }

  /* Pose de este fotograma: cuánto se desplaza cada punto del sprite
     (fracciones de su tamaño). */
  function pose(type, fx, e) {
    var p = { dx: 0, dy: 0, ang: 0, sc: 1, pie: BASE[type] || 0.95, head: null }, v;
    if ((v = fx.respiracion)) p.sc += v.amp * raw(e, v.capa, v.periodo, v.fase);
    if ((v = fx.balanceo)) { var w = raw(e, v.capa, v.periodo, v.fase); p.ang = Math.tan(v.grados * Math.PI / 180) * w; p.dx += (v.desplaza || 0) * w; if (v.pie > 0) p.pie = v.pie; }
    if ((v = fx.flotar)) { p.dy -= v.altura * (0.5 + 0.5 * raw(e, v.capa, v.periodo, v.fase)); p.dx += (v.deriva || 0) * raw(e, v.capa, v.periodo * 2.3, 0.3); }
    if ((v = fx.vibracion)) { var k = light(e, v.capa), ph = e.t * v.hz; p.dx += v.px * Math.sin(ph * TAU * 0.93) * k; p.dy += v.px * Math.sin(ph * TAU * 1.07 + 1) * k; }
    if ((v = fx.cabeceo)) { var wv = raw(e, v.capa, v.periodo, v.fase); if (wv) p.head = { y0: v.y0, y1: v.y1, cuello: v.cuello, rot: v.giro * Math.PI / 180 * wv, baja: v.baja * Math.abs(wv) }; }
    return p;
  }
  function disp(p, v) {
    var mx = p.dx + p.ang * (p.pie - v), my = p.dy - (p.pie - v) * (p.sc - 1), h = p.head;
    if (h && v >= h.y0) { var w = smooth((h.y1 - v) / 0.05), k = h.cuello - v; mx += w * Math.sin(h.rot) * k; my += w * (h.baja + (Math.cos(h.rot) - 1) * k * 0.2); }
    return [mx, my];
  }
  function disc(c, x, y, r, col, a, add) {
    if (a <= 0.003 || r <= 0) return;
    var g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(' + col + ',' + a + ')'); g.addColorStop(0.35, 'rgba(' + col + ',' + a * 0.4 + ')'); g.addColorStop(1, 'rgba(' + col + ',0)');
    c.globalCompositeOperation = add ? 'lighter' : 'source-over';
    c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  }
  Unit.prototype.draw = function (e) {
    var c = this.ctx, S = SIDE, fx = this.fx, p = pose(this.type, fx, e), i, v;
    c.clearRect(0, 0, S, S);
    c.globalCompositeOperation = 'source-over';
    var iw = this.img.naturalWidth, bh = iw / BANDS;
    for (i = 0; i < BANDS; i++) {
      var d = disp(p, (i + 0.5) / BANDS);
      c.drawImage(this.img, 0, i * bh, iw, bh + 0.6, d[0] * S, (i / BANDS + d[1]) * S, S, S / BANDS + 1.2);
    }
    (fx.brillos || []).forEach(function (g) {
      var k = light(e, g.capa); if (k <= 0.001) return;
      var ph = e.t / Math.max(g.periodo, 0.1) + (g.fase || 0), s = g.modo === 1 ? (Math.sin(TAU * ph) > 0.45 ? 1 : 0.12) : 0.5 + 0.5 * Math.sin(TAU * ph);
      var m = disp(p, g.y);
      disc(c, (g.x + m[0]) * S, (g.y + m[1]) * S, g.r * S * 1.6, rgb(g.color), Math.min(1, g.intens * s * k), true);
    });
    /* vapor: cada fuente «gesto» suelta cantidad bocanadas al abrirse el gesto */
    var self = this;
    if (e.newG) (fx.vapor || []).forEach(function (vp) { if (vp.capa === 'gesto') for (var k = 0; k < vp.cantidad; k++) self.due.push({ at: e.t + k * 0.22, v: vp }); });
    for (i = this.due.length - 1; i >= 0; i--) if (e.t >= this.due[i].at) { v = this.due.splice(i, 1)[0].v; this.puffs.push({ fx: v.x + (this.r() - 0.5) * 0.03, fy: v.y, v: v, age: 0, life: 1.8 + this.r() * 0.8, dxs: (this.r() - 0.3) * 0.05 }); }
    for (i = this.puffs.length - 1; i >= 0; i--) {
      var q = this.puffs[i]; q.age += e.dt;
      if (q.age >= q.life) { this.puffs.splice(i, 1); continue; }
      var u = q.age / q.life, m = disp(p, q.fy);
      disc(c, (q.fx + q.dxs * u) * S, (q.fy - q.v.subida * u + m[1]) * S, q.v.tamano * S * (0.7 + 1.6 * u), rgb(q.v.color), q.v.opacidad * Math.sin(Math.PI * Math.min(1, u * 1.2)) * (1 - u * 0.5), false);
    }
    c.globalCompositeOperation = 'source-over';
  };

  var units = [], io = null, running = false, lastT = 0, acc = 0;
  function loop(ts) {
    var dt = Math.min(0.1, (ts - lastT) / 1000); lastT = ts; acc += dt;
    if (document.hidden) { running = false; return; }
    if (acc >= 1 / FPS - 0.002) {
      units.forEach(function (u) { if (u.visible) u.draw(u.step(acc)); });
      acc = 0;
    }
    if (units.some(function (u) { return u.visible; })) requestAnimationFrame(loop); else running = false;
  }
  function kick() { if (!running && !document.hidden) { running = true; lastT = performance.now(); requestAnimationFrame(loop); } }

  function setup(img, type) {
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = SIDE; canvas.id = 'reposo-' + type; canvas.className = img.className;
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', img.alt || type);
    var probe = new Image();
    probe.onload = function () {
      var u = new Unit(canvas, probe, type);
      u.draw(u.step(0));
      img.parentNode.insertBefore(canvas, img); img.style.display = 'none';
      units.push(u);
      if (io) { canvas._u = u; io.observe(canvas); } else { u.visible = true; kick(); }
    };
    probe.src = img.currentSrc || img.src;
  }
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.target._u) en.target._u.visible = en.isIntersecting; }); kick(); }, { rootMargin: '80px' });
  }
  document.addEventListener('visibilitychange', kick);
  document.querySelectorAll('#faccion .units:not(.compact) .unit img').forEach(function (img) {
    var m = /\/units\/([a-z_]+)\.png/.exec(img.getAttribute('src') || '');
    if (m && CFG.unidades[m[1]]) setup(img, m[1]);
  });
})();
