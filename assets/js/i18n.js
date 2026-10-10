// Idioma de la web. El HTML está escrito en inglés (idioma por defecto); aquí
// sólo va el español. Cada elemento traducible lleva data-i18n="clave" (su
// contenido HTML), data-i18n-alt (texto alternativo de una imagen),
// data-i18n-aria (aria-label), data-i18n-phase (atributo data-phase que usa
// el CSS para "Fase N") o data-i18n-href (enlace a la versión de cada idioma).
// El inglés se toma del propio HTML al cargar.
(function () {
  var ES = {
    'nav.aria': 'Secciones',
    'nav.play': 'Cómo se juega',
    'nav.faction': 'Facción',
    'nav.shots': 'Capturas',
    'nav.museum': 'Museo',
    'nav.lang': 'Idioma',
    'nav.music': 'Música',
    'cr.bamber': 'Bamber',
    'cr.bamber.tags': 'Dócil · pradera',
    'cr.bamber.d': 'Herbívoro veloz de vetas luminosas. Recorre las praderas.',
    'cr.tuki': 'Tuki',
    'cr.tuki.tags': 'Dócil · pradera',
    'cr.tuki.d': 'Grande, peludo y lento: la caza que más comida da en las praderas.',
    'cr.sapino': 'Sapino',
    'cr.sapino.tags': 'Dócil · orilla de agua',
    'cr.sapino.d': 'Anfibio que salta por las orillas de los lagos.',
    'cr.terima': 'Terima',
    'cr.terima.tags': 'Dócil · orilla de petróleo',
    'cr.terima.d': 'Flota por las orillas de los lagos de petróleo.',
    'cr.kronta': 'Kronta',
    'cr.kronta.tags': 'Dócil · llanura',
    'cr.kronta.d': 'Excavador acorazado de la llanura.',
    'cr.aquadeso': 'Aquadeso',
    'cr.aquadeso.tags': 'Nivel 1 · Cuerpo a cuerpo',
    'cr.aquadeso.d': 'Embosca con sus garras cerca del agua.',
    'cr.obidicto': 'Obidicto',
    'cr.obidicto.tags': 'Nivel 1 · Láser (4)',
    'cr.obidicto.d': 'Soldado alienígena que dispara pulsos láser a 4 casillas.',
    'cr.aratico': 'Aratico',
    'cr.aratico.tags': 'Nivel 2 · Telaraña (3)',
    'cr.aratico.d': 'Araña mecánica: su tela ralentiza a la presa 2 rondas.',
    'cr.pescualido': 'Pescualido',
    'cr.pescualido.tags': 'Nivel 2 · Bola de ácido (4)',
    'cr.pescualido.d': 'Escupe ácido: la mitad del daño atraviesa el escudo.',
    'cr.serpenta': 'Serpenta',
    'cr.serpenta.tags': 'Nivel 2 · Cuerpo a cuerpo',
    'cr.serpenta.d': 'Serpiente veloz de mordisco feroz.',
    'cr.maricobra': 'Maricobra',
    'cr.maricobra.tags': 'Nivel 3 · Área venenosa (4)',
    'cr.maricobra.d': 'Sus alas esparcen una nube venenosa sobre un área de 3×3.',
    'cr.zarpatauro': 'Zarpatauro',
    'cr.zarpatauro.tags': 'Nivel 3 · Cuerpo a cuerpo',
    'cr.zarpatauro.d': 'Bruto con garras hechas para romper blindaje pesado.',
    'cr.aracnoso': 'Aracnoso',
    'cr.aracnoso.tags': 'Nivel 4 · Golpe aturdidor',
    'cr.aracnoso.d': 'Su golpe aturde al objetivo una ronda entera.',
    'cr.cocodactilo': 'Cocodáctilo',
    'cr.cocodactilo.tags': 'Nivel 4 · Área de llamas (3)',
    'cr.cocodactilo.d': 'Escupe fuego sobre un área de 3×3 que sigue quemando.',
    'cr.devastador': 'Devastador',
    'cr.devastador.tags': 'Nivel 4 · Rayo perseguidor (6)',
    'cr.devastador.d': 'Su rayo salta en arco por hasta 3 objetivos cercanos, más débil en cada salto.',
    'cr.rinotortuga': 'Rinotortuga',
    'cr.rinotortuga.tags': 'Nivel 5 · Cornada + misiles (5)',
    'cr.rinotortuga.d': 'Mecánica. Su cuerno empuja a las tropas y sus baterías lanzan ráfagas de misiles sobre un área de 3×3.',
    'cr.ultimo_aliento': 'Último Aliento',
    'cr.ultimo_aliento.tags': 'Nivel 5 · Zarpazo en área + llama azul (4)',
    'cr.ultimo_aliento.d': 'El gran depredador: zarpazo en área que ralentiza y una llama azul que rompe todos los escudos que toca.',
    'nav.creatures': 'Criaturas',
    'cre.eyebrow': 'Criaturas de mapa',
    'cre.title': 'La fauna del mapa',
    'cre.intro': 'Criaturas neutrales que no pertenecen a ningún jugador. Las dóciles deambulan por su hábitat y dan comida a quien las caza. Las agresivas custodian los contenedores con premio y los pools de recursos: atacan a cualquier tropa o edificio que vean, lo persiguen y vuelven a su puesto a curarse. Su nivel (1–5) fija el rango del que salen su vida, su escudo y su daño.',
    'cre.docile': 'Dóciles',
    'cre.aggressive': 'Agresivas',
    'st.food': 'Comida',
    'st.level': 'Nivel',
    'st.tiles': 'Casillas',

    'hero.status': 'En desarrollo · partidas de prueba abiertas',
    'hero.tagline': 'Estrategia por rondas simultáneas. Todos ordenan a la vez; nadie espera su turno.',
    'hero.lede': 'Construye tu base alrededor del Gobierno, mantén alimentada a tu gente y lanza tus tropas a través de la niebla. Cuando todos confirman, el servidor resuelve la ronda y ves cómo chocan los planes de todos.',
    'hero.discord': 'Únete al Discord',
    'hero.download': 'Descargar',

    'round.eyebrow': 'Así es una ronda',
    'round.title': 'Planificas en paralelo, el combate se resuelve a la vez',
    'round.intro': 'No hay turnos por jugador. Cada ronda tiene tres fases y todos los jugadores, humanos o bots, pasan por ellas al mismo tiempo.',
    'round.phase': 'Fase',
    'round.p1': 'Planificar',
    'round.p1t': 'Encola órdenes con tus Puntos de Acción: construir, mover tropas, contratar, comerciar en el Banco. Ves el coste de cada orden antes de darla.',
    'round.p2': 'Confirmar',
    'round.p2t': 'Cuando terminas, marcas la ronda como lista. Puedes reordenar, pausar o cancelar órdenes mientras los demás deciden.',
    'round.p3': 'Resolver',
    'round.p3t': 'El servidor ejecuta las órdenes de todos a la vez y lo ves como una repetición: marchas, choques, edificios que se levantan y lo que la niebla deja ver.',

    'mech.eyebrow': 'Lo que hay en juego',
    'mech.title': 'Una economía que se defiende sola o se hunde',
    'mech.intro': 'Ganar es simple de explicar: destruye el Gobierno enemigo. Llegar hasta él depende de todo lo demás.',
    'mech.res': 'Seis recursos, un mapa limitado',
    'mech.rest': 'Bosques, pastos, lagunas, pozos de petróleo y minas de acero se agotan. Cada extractor necesita trabajadores y cobertura de energía.',
    'res.energy': 'Energía', 'res.wood': 'Madera', 'res.steel': 'Acero',
    'res.food': 'Comida', 'res.water': 'Agua', 'res.fuel': 'Combustible',
    'mech.people': 'Gente que come y protesta',
    'mech.peoplet': 'Cada individuo consume comida y agua. Si racionas, baja su satisfacción; si cae del todo, desertan.',
    'mech.fog': 'Niebla de guerra',
    'mech.fogt': 'Solo ves lo que tus unidades y edificios alcanzan a ver. Puedes ordenar construir a ciegas en terreno sin explorar, con el riesgo que eso supone.',
    'mech.gov': 'Gobierno en tres niveles',
    'mech.govt': 'Subir de nivel da más Puntos de Acción, más cupo de tropas y desbloquea fábricas, lanzaderas y defensas. Si cae, quedas eliminado.',
    'mech.bank': 'Banco',
    'mech.bankt': 'Trueque de recursos y préstamos a devolver en unas semanas de juego. Útil para salir de un apuro; peligroso si encadenas deudas.',
    'mech.players': 'Hasta 8 jugadores',
    'mech.playerst': 'Todos contra todos o por equipos, hasta 4 contra 4. Los huecos se rellenan con bots que planifican con búsqueda evolutiva.',

    'fac.eyebrow': 'Facción Terránea',
    'fac.title': 'Nueve unidades, de la mina al cielo',
    'fac.intro': 'Las unidades civiles sostienen la economía; las militares se reclutan en edificios que exigen un Gobierno de nivel más alto. Valores provisionales: el balanceo sigue abierto.',
    'st.hp': 'Vida', 'st.shield': 'Escudo', 'st.vision': 'Visión',
    'u.constructor': 'Constructor', 'u.constructor.tags': 'Ligera · civil',
    'u.constructor.d': 'Levanta los edificios de la base. Sin él no hay producción de unidades ni crecimiento.',
    'u.worker': 'Trabajador', 'u.worker.tags': 'Civil · en edificio',
    'u.worker.d': 'Opera extractores y generadores, hasta cuatro por edificio. Muere si cae su edificio.',
    'u.explorer': 'Explorador', 'u.explorer.tags': 'Ligera · cuerpo a cuerpo',
    'u.explorer.d': 'Recorre el mapa a gran velocidad, excava el subsuelo y detecta unidades invisibles.',
    'u.military': 'Militar', 'u.military.tags': 'Ligera · a distancia',
    'u.military.d': 'Infantería básica y versátil. Según el arma, ataca a ligeras o pesadas, solo tierra o tierra-aire.',
    'u.scientist': 'Científico', 'u.scientist.tags': 'Ligera · apoyo',
    'u.scientist.d': 'No ataca. Sus habilidades refuerzan a los aliados y debilitan al enemigo.',
    'u.apc': 'Transporte APC', 'u.apc.tags': 'Media · transporte',
    'u.apc.d': 'Lleva tropas ligeras. Se defiende con una torreta y siembra minas de contacto.',
    'u.mech': 'Meca', 'u.mech.tags': 'Pesada · área',
    'u.mech.d': 'Asalto a media distancia con daño en área contra ligeras y fuego antiaéreo.',
    'u.raptor.tags': 'Media · aérea',
    'u.raptor.d': 'Bombardeo terrestre y ataque tierra-aire. Puede transportar unidades ligeras.',
    'u.droid': 'Droide', 'u.droid.tags': 'Ligera · aérea',
    'u.droid.d': 'Sin ataque. Abre portales dimensionales que teletransportan tropas.',
    'fac.sheets': 'Fichas completas de las unidades',
    'fac.sheets.href': 'https://github.com/cesar-rgon/axiom-wars/blob/main/docs/unidades/README.md',
    'fac.balance': 'Informe de balanceo',
    'fac.balance.href': 'docs/balanceo/',

    'shots.eyebrow': 'Capturas',
    'shots.title': 'Así se ve hoy',
    'shots.intro': 'Capturas de la versión actual en desarrollo. Pulsa en una para verla a tamaño completo.',
    'shots.a11': 'Base en la ronda 11 con el Centro de Entrenamiento seleccionado, el panel lateral por unidad con armas, habilidades y pasivas, y la cola de órdenes pendientes',
    'shots.c11': 'Ronda 11: el nuevo panel lateral muestra las armas, habilidades y pasivas de cada unidad junto a la cola de órdenes pendientes.',
    'shots.a10': 'Base con la cola de órdenes numerada, áreas de efecto superpuestas y un Explorador en marcha',
    'shots.c10': 'Cola de órdenes numerada, áreas de efecto superpuestas y un Explorador camino de su destino.',
    'shots.a09': 'Resolución de ronda con dos lupas siguiendo acciones simultáneas',
    'shots.c09': 'Resolución de la ronda 2: las lupas siguen dos acciones que ocurren a la vez.',

    'mus.eyebrow': 'Museo',
    'mus.title': 'Desde los comienzos',
    'mus.intro': 'Axiom Wars empezó como un cliente de terminal. Estas son las versiones por las que ha pasado, de la más antigua a la más reciente.',
    'mus.s1': 'Etapa 1', 'mus.s2': 'Etapa 2', 'mus.s3': 'Etapa 3', 'mus.s4': 'Etapa 4',
    'mus.s5': 'Etapa 5', 'mus.s6': 'Etapa 6', 'mus.s7': 'Etapa 7', 'mus.s8': 'Etapa 8',
    'mus.a1': 'Cliente de terminal con el mapa dibujado en caracteres',
    'mus.t1': '<strong>Cliente de terminal.</strong> El mapa en caracteres ASCII y las órdenes escritas a mano: <code>build</code>, <code>move</code>, <code>end</code>.',
    'mus.a2': 'Primera interfaz gráfica con casillas planas y edificios como letras',
    'mus.t2': '<strong>Primera ventana.</strong> Casillas de colores planos, edificios representados por letras y botones para construir.',
    'mus.a3': 'Primeras texturas de terreno: agua, bosque y tierra',
    'mus.t3': '<strong>Primeras texturas.</strong> Agua, bosque y tierra dibujados, minimapa y el primer edificio ilustrado.',
    'mus.a4': 'Base con edificios ilustrados y panel de construcción con iconos',
    'mus.t4': '<strong>Edificios ilustrados.</strong> Llegan el Gobierno, el Banco y el panel de construcción con iconos.',
    'mus.a5': 'Base densa con trabajadores indicados bajo cada edificio',
    'mus.t5': '<strong>Trabajadores a la vista.</strong> Cada extractor muestra bajo él cuántos de sus cuatro puestos están ocupados.',
    'mus.a6': 'Terreno de hierba nuevo con Gobierno, Banco y Vivienda',
    'mus.t6': '<strong>Terreno nuevo.</strong> Hierba, lagos y bosques rediseñados, con los edificios marcados en el color del jugador.',
    'mus.a7': 'Interfaz con cola de órdenes, panel lateral y área de energía del Gobierno',
    'mus.t7': '<strong>Rondas simultáneas.</strong> Cola de órdenes, panel lateral de construcción y el área de energía al colocar un edificio.',
    'mus.a8': 'Ronda 1 planificando con un Constructor, flechas de movimiento y el área del Gobierno',
    'mus.t8': '<strong>Planificación sobre el mapa.</strong> El Constructor encadena órdenes de mover y construir, las flechas marcan su ruta y la cuadrícula muestra el área de energía del Gobierno.',
    'mus.hint': 'Desliza para recorrer la línea temporal →',

    'join.eyebrow': 'Comunidad',
    'join.title': 'Juega con nosotros',
    'join.text': 'En el Discord organizamos las partidas de prueba, publicamos cada versión nueva y recogemos fallos e ideas de balanceo.',
    'join.btn': 'Abrir Discord',
    'dl.eyebrow': 'Descargas',
    'dl.get': 'Descargar',
    'dl.soon': 'Próximamente',
    'dl.connect': 'Para conectarte',
    'dl.c1': 'Descomprime el zip y abre <strong>AxiomWars.exe</strong> (Windows) o <strong>AxiomWars</strong> (Linux) dentro de la carpeta AxiomWars. Deja la carpeta <code>assets</code> a su lado.',
    'dl.c2': 'En el campo <strong>Host (IP o DNS:puerto)</strong> escribe la dirección del servidor.',
    'dl.c3': 'La IP del Host se publica en el <a href="https://discord.gg/3rsTp3DdGh" target="_blank" rel="noopener">canal de Discord</a>.',
    'cred.eyebrow': 'Créditos',
    'cred.title': 'Quién hace Axiom Wars',
    'cred.creator': 'Creador y analista',
    'cred.programmer': 'Programador',
    'cred.designers': 'Diseñadores',
    'cred.composer': 'Compositor',
    'cred.helpers': 'Analistas colaboradores',
    'cred.a.rasec': 'Logo de RaseC', 'cred.a.claude': 'Logo de Claude',
    'cred.a.chatgpt': 'Logo de ChatGPT', 'cred.a.suno': 'Logo de Suno',
    'cred.a.chara': 'Logo de Chara', 'cred.a.niji': 'Logo de Niji·Journey',
    'foot.text': 'Axiom Wars · juego en desarrollo',
    // Cada idioma tiene su propia invitación al Discord.
    'discord.href': 'https://discord.gg/3rsTp3DdGh'
  };
  var META_ES = 'Axiom Wars: estrategia por rondas simultáneas de ciencia ficción. Planifica, confirma y mira cómo chocan las órdenes de todos a la vez. Hasta 8 jugadores.';

  // [atributo del elemento, cómo leer/escribir el texto]
  var KINDS = [
    ['data-i18n', function (el) { return el.innerHTML; }, function (el, v) { el.innerHTML = v; }],
    ['data-i18n-alt', function (el) { return el.alt; }, function (el, v) { el.alt = v; }],
    ['data-i18n-aria', function (el) { return el.getAttribute('aria-label'); }, function (el, v) { el.setAttribute('aria-label', v); }],
    ['data-i18n-phase', function (el) { return el.getAttribute('data-phase'); }, function (el, v) { el.setAttribute('data-phase', v); }],
    ['data-i18n-title', function (el) { return el.title; }, function (el, v) { el.title = v; }],
    ['data-i18n-href', function (el) { return el.getAttribute('href'); }, function (el, v) { el.setAttribute('href', v); }]
  ];
  var EN = {};
  var meta = document.querySelector('meta[name="description"]');
  var META_EN = meta ? meta.content : '';
  KINDS.forEach(function (k) {
    document.querySelectorAll('[' + k[0] + ']').forEach(function (el) {
      var key = el.getAttribute(k[0]);
      if (!(key in EN)) EN[key] = k[1](el);
    });
  });

  function apply(lang) {
    var dict = lang === 'es' ? ES : EN;
    KINDS.forEach(function (k) {
      document.querySelectorAll('[' + k[0] + ']').forEach(function (el) {
        var v = dict[el.getAttribute(k[0])];
        if (v != null) k[2](el, v);
      });
    });
    document.documentElement.lang = lang;
    if (meta) meta.content = lang === 'es' ? META_ES : META_EN;
    var sel = document.getElementById('lang');
    if (sel) sel.value = lang;
  }

  // Prioridad: ?lang=es|en en la URL (para compartir enlaces), luego la última
  // elección guardada, y si no, inglés.
  var q = null, saved = null;
  try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  try { saved = localStorage.getItem('axiomwars-lang'); } catch (e) {}
  var pick = q === 'es' || q === 'en' ? q : saved;
  var lang = pick === 'es' ? 'es' : 'en';
  apply(lang);

  var sel = document.getElementById('lang');
  if (sel) sel.addEventListener('change', function () {
    apply(sel.value);
    try { localStorage.setItem('axiomwars-lang', sel.value); } catch (e) {}
  });
})();
