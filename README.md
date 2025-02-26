# Objednavkovy\_system

Aplikace pro správu objednávek jídla mezi kolegy.

## 🚀 Funkce

- Přidávání a správa objednávek
- Možnost filtrování podle data, položek a kolegů
- Přehledná tabulka s celkovými náklady
- Správa seznamu kolegů
- Ukládání dat do localStorage

## 🛠️ Instalace a spuštění

### 1️⃣ Klonování projektu

Pokud máte přístup k repozitáři, můžete ho naklonovat:

```sh
git clone <repo-url>
cd objednavkovy_system
```

Nebo si stáhněte ZIP soubor a rozbalte ho.

### 2️⃣ Instalace závislostí

Než aplikaci spustíte, nainstalujte potřebné balíčky:

```sh
npm install
```

### 3️⃣ Spuštění aplikace v režimu vývoje

Pro spuštění aplikace lokálně použijte příkaz:

```sh
npm run dev
```

Aplikace poběží na `http://localhost:5173/`.

## 🌍 Nasazení (volitelné)

Pokud chcete aplikaci spustit v produkčním režimu:

### 1️⃣ Vytvoření produkčního buildu

```sh
npm run build
```

Tím se vygeneruje složka `dist/` obsahující optimalizovanou verzi aplikace.

### 2️⃣ Spuštění buildu lokálně

```sh
npm install -g serve
serve -s dist
```

Aplikace bude dostupná na `http://localhost:3000/`.

## 📂 Struktura projektu

```
objednavkovy_system/
│── src/                # Zdrojové kódy aplikace
│   ├── components/     # Komponenty Vue
│   ├── views/          # Stránky aplikace
│   ├── router/         # Nastavení routingu
│   ├── assets/         # Stylové soubory, obrázky
│   └── main.js         # Vstupní bod aplikace
│── public/             # Veřejné soubory (favicon, index.html)
│── package.json        # Konfigurace projektu a závislosti
│── vite.config.js      # Nastavení Vite.js
│── README.md           # Tento soubor
```

## 💡 Technologie

- Vue.js 3 + Vite
- Pinia (správa stavu)
- Tailwind CSS (stylizace)

## 📌 Poznámky

- Data se ukládají do `localStorage`, takže při zavření prohlížeče zůstávají zachována.