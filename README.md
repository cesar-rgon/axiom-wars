<p align="center">
  <img src="assets/img/logo.webp" alt="Axiom Wars" width="520">
</p>

<p align="center"><b>English</b> · <a href="README.es.md">Español</a></p>

<p align="center">
  <b>Sci-fi strategy with simultaneous rounds.</b><br>
  Everyone gives orders at once; nobody waits for their turn.
</p>

<p align="center">
  <a href="https://cesar-rgon.github.io/axiom-wars/">Website</a> ·
  <a href="https://discord.gg/2EZAtyqtzW">Discord</a> ·
  <a href="https://github.com/cesar-rgon/axiom-wars/releases/latest">Download</a> ·
  <a href="#units-of-the-terran-faction">Units</a> ·
  <a href="#balance">Balance</a>
</p>

> [!NOTE]
> Axiom Wars is in development. Test matches are organized on the [Discord](https://discord.gg/2EZAtyqtzW).

## What is Axiom Wars

Build your base around the Government, keep your people fed and send your troops through the fog of war. Once every player confirms their orders, the server resolves the round all at once and you watch everyone's plans collide.

Up to 8 players, free-for-all or in teams (up to 4 versus 4). Empty seats are filled by bots.

### How a round works

| Phase | What you do |
|---|---|
| **1. Plan** | Queue orders with your Action Points (AP): build, move troops, hire, trade at the Bank. You see what each order costs before you give it. |
| **2. Confirm** | Mark the round as ready. You can reorder, pause or cancel orders while the others decide. |
| **3. Resolve** | The server runs everyone's orders at once and you watch it as a replay: marches, clashes, buildings going up and whatever the fog lets you see. |

### What's at stake

- **Six resources:** Energy, Wood, Steel, Food, Water and Fuel. Forests, pastures, lagoons, oil wells and mines run dry, and every extractor needs workers and energy coverage.
- **People who eat and complain:** every individual consumes food and water. Ration them and their satisfaction drops; let it bottom out and they desert.
- **Fog of war:** you only see what your units and buildings can reach. You can order buildings blind on unexplored ground.
- **Three-level Government:** upgrading gives more AP and troop cap, and unlocks factories, launch pads and defenses. If it falls, you're out.
- **Bank:** resource bartering and loans paid back over a few in-game weeks.
- **Victory:** destroy the enemy Government. The last one standing wins.

## Gallery

Screenshots from the current build. Click one to see it full size.

<p align="center">
  <a href="assets/img/galeria-11.webp"><img src="assets/img/galeria-11.webp" alt="Round 11 with the side panel by unit and the pending orders queue" width="100%"></a>
  <br><sub>Round 11: the new side panel shows each unit's weapons, abilities and passives next to the pending orders queue.</sub>
</p>

<table>
  <tr>
    <td width="50%"><a href="assets/img/galeria-10.webp"><img src="assets/img/galeria-10.webp" alt="Numbered order queue and overlapping areas of effect"></a></td>
    <td width="50%"><a href="assets/img/galeria-09.webp"><img src="assets/img/galeria-09.webp" alt="Round resolution with two magnifiers"></a></td>
  </tr>
  <tr>
    <td><sub>Numbered order queue, overlapping areas of effect and an Explorer heading to its destination.</sub></td>
    <td><sub>Round 2 resolution: the magnifiers follow two actions happening at the same time.</sub></td>
  </tr>
</table>

## Museum

Axiom Wars started out as a terminal client. These are the versions it has gone through, from oldest to newest.

| Stage | Screenshot | What changed |
|---|---|---|
| **1** | <a href="assets/img/museo/01.webp"><img src="assets/img/museo/01.webp" width="260" alt="Terminal client"></a> | **Terminal client.** The map in ASCII characters and orders typed by hand: `build`, `move`, `end`. |
| **2** | <a href="assets/img/museo/02.webp"><img src="assets/img/museo/02.webp" width="260" alt="First window"></a> | **First window.** Flat-colored tiles, buildings shown as letters and buttons to build. |
| **3** | <a href="assets/img/museo/03.webp"><img src="assets/img/museo/03.webp" width="260" alt="First textures"></a> | **First textures.** Drawn water, forest and earth, a minimap and the first illustrated building. |
| **4** | <a href="assets/img/museo/04.webp"><img src="assets/img/museo/04.webp" width="260" alt="Illustrated buildings"></a> | **Illustrated buildings.** The Government, the Bank and the icon-based build panel arrive. |
| **5** | <a href="assets/img/museo/05.webp"><img src="assets/img/museo/05.webp" width="260" alt="Workers on display"></a> | **Workers on display.** Each extractor shows below it how many of its four slots are filled. |
| **6** | <a href="assets/img/museo/06.webp"><img src="assets/img/museo/06.webp" width="260" alt="New terrain"></a> | **New terrain.** Redesigned grass, lakes and forests, with buildings outlined in the player's color. |
| **7** | <a href="assets/img/museo/07.webp"><img src="assets/img/museo/07.webp" width="260" alt="Simultaneous rounds"></a> | **Simultaneous rounds.** Order queue, side build panel and the energy area shown when placing a building. |
| **8** | <a href="assets/img/museo/08.webp"><img src="assets/img/museo/08.webp" width="260" alt="Planning on the map"></a> | **Planning on the map.** The Constructor chains move-and-build orders, arrows mark its route and the grid shows the Government's energy area. |

## Units of the Terran Faction

Nine units, from the mine to the sky. Each sheet covers production, upkeep, defense, movement and what every Government level unlocks.

| | Unit | Class | Health | Shield | Vision |
|---|---|---|---:|---:|---:|
| <img src="assets/img/units/trabajador.png" width="48" alt=""> | [Worker](docs/units/trabajador.md) | Civilian, inside its building | 50 | — | — |
| <img src="assets/img/units/constructor.png" width="48" alt=""> | [Constructor](docs/units/constructor.md) | Light · civilian | 50 | 50 | 4 |
| <img src="assets/img/units/explorador.png" width="48" alt=""> | [Explorer](docs/units/explorador.md) | Light · melee | 60 | 30 | 10 |
| <img src="assets/img/units/militar.png" width="48" alt=""> | [Military](docs/units/militar.md) | Light · ranged | 50 | 30 | 7 |
| <img src="assets/img/units/cientifico.png" width="48" alt=""> | [Scientist](docs/units/cientifico.md) | Light · support | 40 | 40 | 5 |
| <img src="assets/img/units/transporte_apc.png" width="48" alt=""> | [APC Transport](docs/units/transporte_apc.md) | Medium · transport | 150 | 100 | 6 |
| <img src="assets/img/units/meca.png" width="48" alt=""> | [Mech](docs/units/meca.md) | Heavy · area | 250 | 150 | 6 |
| <img src="assets/img/units/raptor.png" width="48" alt=""> | [Raptor](docs/units/raptor.md) | Medium · air | 180 | 120 | 9 |
| <img src="assets/img/units/droide.png" width="48" alt=""> | [Droid](docs/units/droide.md) | Light · air | 60 | 120 | 8 |

Index with each unit's role: [docs/units](docs/units/README.md) · All nine sheets, print-ready: [Unit-Sheets-Terran.pdf](docs/units/Unit-Sheets-Terran.pdf)

## Balance

The Terran Faction balance report (proposal v12) looks at all nine unit sheets together and proposes numbers for every weapon and ability. Its core idea: each armor class has weapons that deal full damage to it and weapons that barely scratch it, so the right unit against its target is 2–3 times more efficient per AP than the wrong one.

It covers the weapon-versus-unit damage matrix, the AP economy, energy and purchases, range and vision, combat checks, building health and a unit-by-unit review.

- **Read it in the browser:** [cesar-rgon.github.io/axiom-wars/docs/balance/](https://cesar-rgon.github.io/axiom-wars/docs/balance/)
- **PDF:** [Balance-Terran-v12.pdf](docs/balance/Balance-Terran-v12.pdf)

## Download and play

| System | Download |
|---|---|
| Windows 64-bit | [AxiomWars-Windows-x64.zip](https://github.com/cesar-rgon/axiom-wars/releases/latest/download/AxiomWars-Windows-x64.zip) |
| Linux x86-64 | [AxiomWars-Linux-x64.zip](https://github.com/cesar-rgon/axiom-wars/releases/latest/download/AxiomWars-Linux-x64.zip) |
| macOS (Apple Silicon) | Coming soon |

1. Unzip the file and open **AxiomWars.exe** (Windows) or **AxiomWars** (Linux) inside the `AxiomWars` folder. Keep the `assets` folder next to it.
2. In the **Host (IP or DNS:port)** field, type the server address.
3. The Host IP is posted on the [Discord channel](https://discord.gg/2EZAtyqtzW).

## Credits

<table>
  <tr>
    <td align="center" width="25%" valign="top"><img src="assets/img/credits/rasec.webp" width="80" height="80" alt="RaseC logo"><br><sub>Creator and analyst</sub><br><b>RaseC</b></td>
    <td align="center" width="25%" valign="top"><img src="assets/img/credits/claude-pad.svg" width="80" height="80" alt="Claude logo"><br><sub>Programmer</sub><br><b>Claude AI</b></td>
    <td align="center" width="25%" valign="top"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/img/credits/chatgpt-pad.svg"><img src="assets/img/credits/chatgpt-black-pad.svg" width="80" height="80" alt="ChatGPT logo"></picture><br><sub>Designer</sub><br><b>ChatGPT</b></td>
    <td align="center" width="25%" valign="top"><picture><source media="(prefers-color-scheme: dark)" srcset="assets/img/credits/suno-pad.svg"><img src="assets/img/credits/suno-black-pad.svg" width="80" height="80" alt="Suno logo"></picture><br><sub>Composer</sub><br><b>Suno AI</b></td>
  </tr>
</table>

**Contributing analysts:** Kiwi · Gameover · Nightlane · Calheb · Miky · Fr4nk50

## About this repository

This repository hosts the game's website (GitHub Pages) and the client downloads (Releases). The game's code is developed separately.

```
index.html          website published at https://cesar-rgon.github.io/axiom-wars/
assets/img/         logo, units, gallery, museum and credits
assets/js/i18n.js   Spanish translation of the website (English is the default)
docs/units/         Terran unit sheets (Markdown and PDF)
docs/balance/       balance report (HTML and PDF)
docs/unidades/      the same unit sheets in Spanish
docs/balanceo/      the same balance report in Spanish
tools/make_logo.py  cuts the original logo out to a transparent PNG
```

Each release contains only the client binaries for Windows and Linux; the server is not distributed.
