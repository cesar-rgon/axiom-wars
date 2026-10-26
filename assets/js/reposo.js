/* Tropas terráneas y criaturas del mapa en reposo (2026-10-20): las mismas
   animaciones sutiles que en el juego (cmd/gclient/idleanim.go), dibujadas
   sobre un canvas con el sprite de cada ficha. Los efectos y sus valores son
   los que Cesar eligió en los mockups «Tropas en reposo» y «Criaturas en
   reposo» (idleanim.json e idleanim_criaturas.json del cliente, embebidos
   abajo). Las coordenadas de las criaturas son fracciones de su arte original
   completo; FRAME dice dónde cae ese cuadro dentro de cada webp recortado.
   Sin JS, con prefers-reduced-motion o si el sprite no carga, queda la
   <img> estática de siempre. Sólo se anima lo que está en pantalla. */
(function () {
  'use strict';
  var CFG = {"reproduccion":{"modo":"hibrido","pausaMin":3,"pausaMax":8,"gestoDur":2.2,"rampa":0.3,"desfase":true},"unidades":{"militar":{"respiracion":{"amp":0.014,"periodo":3.6,"capa":"micro"},"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"trabajador":{"respiracion":{"amp":0.014,"periodo":3.6,"capa":"micro"},"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"cientifico":{"respiracion":{"amp":0.012,"periodo":4,"capa":"micro"},"balanceo":{"grados":0.8,"periodo":5.5,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"constructor":{"respiracion":{"amp":0.012,"periodo":3.8,"capa":"micro"},"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"droide":{"flotar":{"altura":0.022,"periodo":2.6,"deriva":0,"capa":"micro"},"vibracion":{"px":0.002,"hz":18,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"explorador":{"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}],"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0}},"meca":{"respiracion":{"amp":0.009,"periodo":4.2,"capa":"micro"},"vapor":[{"nombre":"hombro izq.","x":0.2,"y":0.1,"cantidad":2,"tamano":0.05,"subida":0.12,"color":"#cfd6d8","capa":"gesto","periodo":3,"opacidad":0.35},{"nombre":"hombro der.","x":0.76,"y":0.12,"cantidad":2,"tamano":0.05,"subida":0.12,"color":"#cfd6d8","capa":"gesto","periodo":3,"opacidad":0.35}],"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"vibracion":{"px":0.002,"hz":18,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"transporte_apc":{"vibracion":{"px":0.0025,"hz":16,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]},"raptor":{"flotar":{"altura":0.016,"periodo":2.8,"deriva":0,"capa":"micro"},"balanceo":{"grados":1,"periodo":4.5,"capa":"micro","desplaza":0,"pie":0.95},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}],"vapor":[{"nombre":"salida","x":0.5,"y":0.2,"cantidad":2,"tamano":0.05,"subida":0.12,"color":"#cfd6d8","capa":"gesto","periodo":3,"opacidad":0.35}]}}};
  var CFGC = {"aquadeso":{"variante":"A","nombre":"Acecho","efectos":{"respiracion":{"amp":0.016,"periodo":3.2,"capa":"micro"},"balanceo":{"grados":1.5,"periodo":3.8,"capa":"micro","desplaza":0,"pie":0.95},"brillos":[{"nombre":"ojo izq.","x":0.34,"y":0.31,"r":0.03,"color":"#f0b030","intens":0.8,"periodo":2.6,"modo":0,"capa":"micro","fase":0},{"nombre":"ojo der.","x":0.47,"y":0.31,"r":0.03,"color":"#f0b030","intens":0.8,"periodo":2.6,"modo":0,"capa":"micro","fase":0.3}],"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0}}},"obidicto":{"variante":"A","nombre":"Guardia","efectos":{"respiracion":{"amp":0.01,"periodo":3.8,"capa":"micro"},"balanceo":{"grados":1,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"brillos":[{"nombre":"visor","x":0.475,"y":0.14,"r":0.035,"color":"#ff3030","intens":0.9,"periodo":2.2,"modo":0,"capa":"micro","fase":0}],"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0}}},"aratico":{"variante":"A","nombre":"Vigía","efectos":{"respiracion":{"amp":0.012,"periodo":4,"capa":"micro"},"brillos":[{"nombre":"ojo","x":0.33,"y":0.44,"r":0.03,"color":"#ff3030","intens":0.9,"periodo":3,"modo":1,"capa":"micro","fase":0},{"nombre":"piloto","x":0.56,"y":0.45,"r":0.025,"color":"#ff3030","intens":0.8,"periodo":3,"modo":1,"capa":"micro","fase":0.4}],"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0}}},"pescualido":{"variante":"A","nombre":"Latidos","efectos":{"respiracion":{"amp":0.014,"periodo":3.6,"capa":"micro"},"brillos":[{"nombre":"ojo mayor","x":0.51,"y":0.17,"r":0.04,"color":"#3a8cff","intens":0.95,"periodo":2.4,"modo":0,"capa":"micro","fase":0},{"nombre":"ojo 2","x":0.38,"y":0.22,"r":0.03,"color":"#3a8cff","intens":0.85,"periodo":2.4,"modo":0,"capa":"micro","fase":0.3},{"nombre":"ojo 3","x":0.58,"y":0.53,"r":0.03,"color":"#3a8cff","intens":0.85,"periodo":2.4,"modo":0,"capa":"micro","fase":0.6},{"nombre":"ojo 4","x":0.25,"y":0.66,"r":0.03,"color":"#3a8cff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0.8}],"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0}}},"serpenta":{"variante":"A","nombre":"Ondular","efectos":{"respiracion":{"amp":0.01,"periodo":3,"capa":"micro"},"balanceo":{"grados":2.5,"periodo":3.4,"capa":"micro","desplaza":0.006,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"maricobra":{"variante":"A","nombre":"Alas lentas","efectos":{"respiracion":{"amp":0.01,"periodo":3.6,"capa":"micro"},"partes":[{"nombre":"ala izq.","x0":0,"y0":0,"x1":0.47,"y1":0.68,"px":0.47,"py":0.42,"giro":5,"dx":0,"dy":0,"periodo":2.2,"fase":0,"capa":"gesto"},{"nombre":"ala der.","x0":0.53,"y0":0,"x1":1,"y1":0.68,"px":0.53,"py":0.42,"giro":-5,"dx":0,"dy":0,"periodo":2.2,"fase":0,"capa":"gesto"}],"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"zarpatauro":{"variante":"A","nombre":"Jadeo","efectos":{"respiracion":{"amp":0.018,"periodo":2.6,"capa":"micro"},"balanceo":{"grados":1,"periodo":3,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"aracnoso":{"variante":"A","nombre":"Acechar","efectos":{"respiracion":{"amp":0.014,"periodo":3.4,"capa":"micro"},"balanceo":{"grados":1,"periodo":4,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"cocodactilo":{"variante":"A","nombre":"Alas","efectos":{"respiracion":{"amp":0.01,"periodo":3.4,"capa":"micro"},"partes":[{"nombre":"ala izq.","x0":0.08,"y0":0.05,"x1":0.46,"y1":0.52,"px":0.46,"py":0.42,"giro":5,"dx":0,"dy":0,"periodo":2.4,"fase":0,"capa":"gesto"},{"nombre":"ala der.","x0":0.7,"y0":0.1,"x1":0.92,"y1":0.55,"px":0.68,"py":0.42,"giro":-4,"dx":0,"dy":0,"periodo":2.4,"fase":0,"capa":"gesto"}],"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"flotar":{"altura":0.02,"periodo":2.6,"deriva":0,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"devastador":{"variante":"A","nombre":"Respirar","efectos":{"respiracion":{"amp":0.012,"periodo":4,"capa":"micro"},"balanceo":{"grados":1,"periodo":4.5,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"rinotortuga":{"variante":"A","nombre":"Caparazón","efectos":{"respiracion":{"amp":0.012,"periodo":4.5,"capa":"micro"},"balanceo":{"grados":0.7,"periodo":5,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"vibracion":{"px":0.002,"hz":18,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}],"vapor":[{"nombre":"salida","x":0.5,"y":0.2,"cantidad":2,"tamano":0.05,"subida":0.12,"color":"#cfd6d8","capa":"gesto","periodo":3,"opacidad":0.35}]}},"ultimo_aliento":{"variante":"A","nombre":"Alas","efectos":{"respiracion":{"amp":0.01,"periodo":4,"capa":"micro"},"partes":[{"nombre":"ala izq.","x0":0,"y0":0.15,"x1":0.42,"y1":0.62,"px":0.42,"py":0.42,"giro":4,"dx":0,"dy":0,"periodo":2.4,"fase":0,"capa":"gesto"},{"nombre":"ala der.","x0":0.62,"y0":0.15,"x1":1,"y1":0.6,"px":0.62,"py":0.42,"giro":-4,"dx":0,"dy":0,"periodo":2.4,"fase":0,"capa":"gesto"}],"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"flotar":{"altura":0.02,"periodo":2.6,"deriva":0,"capa":"micro"},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"bamber":{"variante":"A","nombre":"Pastar","efectos":{"respiracion":{"amp":0.01,"periodo":3.6,"capa":"micro"},"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"tuki":{"variante":"A","nombre":"Respirar","efectos":{"respiracion":{"amp":0.016,"periodo":3.2,"capa":"micro"},"balanceo":{"grados":1,"periodo":4,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"sapino":{"variante":"A","nombre":"Croar","efectos":{"respiracion":{"amp":0.02,"periodo":2.4,"capa":"micro"},"balanceo":{"grados":0.8,"periodo":3.4,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"terima":{"variante":"A","nombre":"Flotar","efectos":{"flotar":{"altura":0.025,"periodo":3.2,"deriva":0.004,"capa":"micro"},"respiracion":{"amp":0.008,"periodo":3.6,"capa":"micro"},"balanceo":{"grados":1.5,"periodo":4.5,"capa":"gesto","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}},"kronta":{"variante":"A","nombre":"Respirar","efectos":{"respiracion":{"amp":0.014,"periodo":3.8,"capa":"micro"},"balanceo":{"grados":0.8,"periodo":4.5,"capa":"micro","desplaza":0,"pie":0.95},"cabeceo":{"y0":0,"y1":0.2,"cuello":0.2,"giro":5,"baja":0.006,"periodo":3.4,"capa":"gesto","x0":0,"x1":1,"fase":0},"brillos":[{"nombre":"luz","x":0.5,"y":0.3,"r":0.06,"color":"#5ec8ff","intens":0.8,"periodo":2.4,"modo":0,"capa":"micro","fase":0}]}}};
  Object.keys(CFGC).forEach(function (k) { CFG.unidades[k] = CFGC[k].efectos; }); /* el JSON de criaturas trae {variante, nombre, efectos} */
  var BASE = { militar: 0.95, trabajador: 0.95, cientifico: 0.96, constructor: 0.95, droide: 0.9, explorador: 0.95, meca: 0.96, transporte_apc: 0.97, raptor: 0.9, aquadeso: 0.97, obidicto: 0.97, aratico: 0.93, pescualido: 0.97, serpenta: 0.95, maricobra: 0.92, zarpatauro: 0.95, aracnoso: 0.95, cocodactilo: 0.93, devastador: 0.87, rinotortuga: 0.95, ultimo_aliento: 0.83, bamber: 0.97, tuki: 0.96, sapino: 0.8, terima: 0.97, kronta: 0.8 };
  /* Cuadro del arte original dentro de cada webp: [x, y, ancho, alto] en fracciones de la imagen (negativas = el recorte lo deja fuera). */
  function hasFrame(t) { return Object.prototype.hasOwnProperty.call(FRAME, t); } /* «constructor» es también una tropa: nada de FRAME[t] a pelo */
  var FRAME = {"aquadeso":[-0.2259,-0.1752,1.2995,1.1963],"aracnoso":[-0.1695,0.0042,1.339,0.997],"aratico":[-0.0433,-0.0844,1.0072,1.1591],"bamber":[-0.0014,-0.2927,1.0012,1.2921],"cocodactilo":[-0.1667,0.0,1.3333,1.0],"devastador":[-0.0017,-0.1682,1.0017,1.3366],"kronta":[-0.0024,-0.2559,1.0122,1.5202],"maricobra":[0.0,-0.0984,1.0,1.1991],"obidicto":[-0.2135,0.0,1.3838,1.0179],"pescualido":[-0.1542,0.0011,1.253,0.9989],"rinotortuga":[-0.1667,0.0,1.3333,1.0],"sapino":[-0.0007,-0.2496,1.0078,1.5005],"serpenta":[-0.301,-0.0123,1.5947,1.0513],"terima":[-0.1353,0.0028,1.2451,0.9992],"tuki":[-0.0019,-0.0438,1.0034,1.0907],"ultimo_aliento":[0.0,-0.2507,1.0,1.5015],"zarpatauro":[-0.1632,0.0,1.3264,1.0302]};
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


  /* Pose de este fotograma, en píxeles del lienzo. W×H es el cuadro del arte
     original (para las tropas, el sprite entero); las amplitudes son
     fracciones de su ancho o de su alto. */
  function pose(type, fx, e, W, H) {
    var p = { dx: 0, dy: 0, ang: 0, sc: 1, pie: BASE[type] || 0.95, head: null }, v;
    if ((v = fx.respiracion)) p.sc += v.amp * raw(e, v.capa, v.periodo, v.fase);
    if ((v = fx.balanceo)) { var w = raw(e, v.capa, v.periodo, v.fase); p.ang = Math.tan(v.grados * Math.PI / 180) * w; p.dx += (v.desplaza || 0) * W * w; if (v.pie > 0) p.pie = v.pie; }
    if ((v = fx.flotar)) { p.dy -= v.altura * H * (0.5 + 0.5 * raw(e, v.capa, v.periodo, v.fase)); p.dx += (v.deriva || 0) * W * raw(e, v.capa, v.periodo * 2.3, 0.3); }
    if ((v = fx.vibracion)) { var k = light(e, v.capa), ph = e.t * v.hz; p.dx += v.px * W * Math.sin(ph * TAU * 0.93) * k; p.dy += v.px * H * Math.sin(ph * TAU * 1.07 + 1) * k; }
    if ((v = fx.cabeceo)) { var wv = raw(e, v.capa, v.periodo, v.fase); if (wv) p.head = { y0: v.y0, y1: v.y1, cuello: v.cuello, rot: v.giro * Math.PI / 180 * wv, baja: v.baja * Math.abs(wv) }; }
    p.W = W; p.H = H;
    return p;
  }
  /* Desplazamiento en píxeles del punto del cuadro a la altura f (fracción). */
  function disp(p, f) {
    var H = p.H, mx = p.dx + p.ang * (p.pie - f) * H, my = p.dy - (p.pie - f) * H * (p.sc - 1), h = p.head;
    if (h && f >= h.y0) { var w = smooth((h.y1 - f) / 0.05), k = h.cuello - f; mx += w * Math.sin(h.rot) * k * H; my += w * (h.baja * H + (Math.cos(h.rot) - 1) * k * H * 0.2); }
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
    var c = this.ctx, cw = this.c.width, ch = this.c.height, fx = this.fx, i, v;
    var fr = hasFrame(this.type) ? FRAME[this.type] : [0, 0, 1, 1], W = fr[2] * cw, H = fr[3] * ch, X0 = fr[0] * cw, Y0 = fr[1] * ch;
    var p = pose(this.type, fx, e, W, H);
    c.clearRect(0, 0, cw, ch);
    c.globalCompositeOperation = 'source-over';
    var ih = this.img.naturalHeight, iw = this.img.naturalWidth, bh = ih / BANDS;
    for (i = 0; i < BANDS; i++) {
      var d = disp(p, (Y0 + (i + 0.5) / BANDS * ch) / H);
      c.drawImage(this.img, 0, i * bh, iw, bh + 0.6, d[0], i * ch / BANDS + d[1], cw, ch / BANDS + 1.2);
    }
    /* partes: un recorte del sprite que gira sobre su pivote, encima del cuerpo */
    (fx.partes || []).forEach(function (q) {
      var wv = raw(e, q.capa, q.periodo, q.fase); if (Math.abs(wv) < 1e-4) return;
      var sx = Math.max(0, X0 + q.x0 * W), sy = Math.max(0, Y0 + q.y0 * H), ex = Math.min(cw, X0 + q.x1 * W), ey = Math.min(ch, Y0 + q.y1 * H);
      if (ex <= sx || ey <= sy) return;
      var px = X0 + q.px * W, py = Y0 + q.py * H, m = disp(p, q.py);
      c.save(); c.translate(px + m[0], py + m[1]); c.rotate(q.giro * Math.PI / 180 * wv); c.translate((q.dx || 0) * W * wv, (q.dy || 0) * H * wv);
      c.drawImage(this.img, sx * iw / cw, sy * ih / ch, (ex - sx) * iw / cw, (ey - sy) * ih / ch, sx - px, sy - py, ex - sx, ey - sy);
      c.restore();
    }, this);
    (fx.brillos || []).forEach(function (g) {
      var k = light(e, g.capa); if (k <= 0.001) return;
      var ph = e.t / Math.max(g.periodo, 0.1) + (g.fase || 0), s = g.modo === 1 ? (Math.sin(TAU * ph) > 0.45 ? 1 : 0.12) : 0.5 + 0.5 * Math.sin(TAU * ph);
      var m = disp(p, g.y);
      disc(c, X0 + g.x * W + m[0], Y0 + g.y * H + m[1], g.r * W * 1.6, rgb(g.color), Math.min(1, g.intens * s * k), true);
    });
    /* vapor: cada fuente «gesto» suelta cantidad bocanadas al abrirse el gesto */
    var self = this;
    if (e.newG) (fx.vapor || []).forEach(function (vp) { if (vp.capa === 'gesto') for (var k = 0; k < vp.cantidad; k++) self.due.push({ at: e.t + k * 0.22, v: vp }); });
    for (i = this.due.length - 1; i >= 0; i--) if (e.t >= this.due[i].at) { v = this.due.splice(i, 1)[0].v; this.puffs.push({ fx: v.x + (this.r() - 0.5) * 0.03, fy: v.y, v: v, age: 0, life: 1.8 + this.r() * 0.8, dxs: (this.r() - 0.3) * 0.05 }); }
    for (i = this.puffs.length - 1; i >= 0; i--) {
      var q = this.puffs[i]; q.age += e.dt;
      if (q.age >= q.life) { this.puffs.splice(i, 1); continue; }
      var u = q.age / q.life, m = disp(p, q.fy);
      disc(c, X0 + (q.fx + q.dxs * u) * W + m[0], Y0 + (q.fy - q.v.subida * u) * H + m[1], q.v.tamano * W * (0.7 + 1.6 * u), rgb(q.v.color), q.v.opacidad * Math.sin(Math.PI * Math.min(1, u * 1.2)) * (1 - u * 0.5), false);
    }
    c.globalCompositeOperation = 'source-over';
  };


  var units = [], io = null, running = false, lastT = 0, acc = 0;
  function loop(ts) {
    var dt = Math.min(0.1, (ts - lastT) / 1000); lastT = ts; acc += dt;
    if (document.hidden) { running = false; return; }
    if (acc >= 1 / FPS - 0.002) {
      units.forEach(function (u) { if (u.visible) { try { u.draw(u.step(acc)); } catch (err) { u.visible = false; if (window.console) console.error(err); } } });
      acc = 0;
    }
    if (units.some(function (u) { return u.visible; })) requestAnimationFrame(loop); else running = false;
  }
  function kick() { if (!running && !document.hidden) { running = true; lastT = performance.now(); requestAnimationFrame(loop); } }

  function setup(img, type) {
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = SIDE; canvas.id = 'reposo-' + type; canvas.className = img.className;
    var hd = img.parentNode.querySelector('h3');
    canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', img.alt || (hd && hd.textContent) || type);
    var probe = new Image();
    probe.onload = function () {
      if (hasFrame(type)) { canvas.width = probe.naturalWidth; canvas.height = probe.naturalHeight; }
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
  document.querySelectorAll('#criaturas .unit img').forEach(function (img) {
    var m = /\/creatures\/([a-z_]+)\.webp/.exec(img.getAttribute('src') || '');
    if (m && CFG.unidades[m[1]] && hasFrame(m[1])) setup(img, m[1]);
  });
})();
