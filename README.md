# Axiom Wars — web

Página estática para GitHub Pages. Sin build: `index.html` + `assets/`.

## Descargas
Los botones de descarga apuntan a `releases/latest/download/AxiomWars-Windows-x64.zip` y
`AxiomWars-Linux-x64.zip`, así que siempre se descarga la última release publicada.
Sólo se publican binarios del cliente; se suben con `scripts/github-release.sh`
(en el repo del servidor, no en esta web).

## Publicar en GitHub Pages
1. Sube el contenido de esta carpeta a la raíz de `cesar-rgon/axiom-wars` (rama `main`).
2. Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)`.
3. En un minuto estará en `https://cesar-rgon.github.io/axiom-wars/`.

`tools/make_logo.py` regenera `assets/img/logo.webp` (vía PNG) a partir de `design/logo.png` si cambia el logo.
