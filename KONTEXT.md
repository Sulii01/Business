# Kontext projektu: web služeb (repozitář Business)

Tento soubor shrnuje předchozí session, aby na ni mohla nová session plynule navázat.
Na začátku nové session ho přečti a pokračuj odsud.

## Kdo a co

- **Majitel:** Jan Šulák (GitHub `Sulii01`), Bystřice nad Olší, Moravskoslezský kraj.
- **Cíl:** webová stránka pro prezentaci a nabídku služeb. Do budoucna chce dělat
  **tvorbu webů, provoz hostingu a správu serverů** (k tomu sítě a IT podporu).
- **Komunikace:** česky. Uživatel chce postupovat **pomalu, krok po kroku**, a před
  většími akcemi (push, mazání, zakládání věcí) se nejdřív zeptat.

## Pravidla od uživatele

- Pracovat **jen v repozitáři `Sulii01/Business`**.
- Do repozitáře **`Sulii01/portfolio` už nezasahovat** (ani číst, ani zapisovat).
- Název `Business` je dočasný, uživatel repozitář později přejmenuje.

## Co uživatel umí (z jeho portfolia https://sulii01.github.io/portfolio/)

- **Aktuálně:** IT End User Support v Euromedia Group, a.s. (od září 2026): helpdesk,
  Windows 10/11, Microsoft 365, Active Directory, vzdálená podpora, hardware.
- **Dříve:** správce sítě ve VEJNET.CZ s.r.o., Karviná (10/2025 – 5/2026): MikroTik,
  GPON, Zabbix, TCP/IP, optické a bezdrátové sítě, podpora ISP služeb.
- **Dříve:** programování PLC (Siemens, LOGO!, HMI), PROSPECT spol. s r.o. (2024–2025).
- **Servery a virtualizace:** Proxmox, VMware, Hyper-V, VirtualBox, správa serveru, PBX.
- **Programování:** Python, Bash, HTML & CSS, PHP, C, Git. **WordPress** (certifikát Coursera).
- **Vzdělání:** Bc. Telekomunikační technika, VŠB-TUO (2021–2025). Nyní Ing.
  Komunikační a informační technologie, VŠB-TUO.
- **Certifikáty:** Cisco Networking Basics, Cisco Packet Tracer, MW technologie a další.
- **Kontakt:** sulakhonza@gmail.com, +420 730 809 795.

## Co je hotové: web služeb (verze 1)

Statický web (HTML + CSS + JS, bez build kroku), jeden soubor `index.html` a složky
`css/style.css` a `js/main.js`.

- **Pracovní značka:** „Šulák IT“ (logo jsou dva limetkové proužky jako serverový rack).
- **Barvy:** antracit `#0b0d12`, krémová `#f4f3ee`, limetková `#c6f432` (tokeny v `:root`).
- **Písma:** Space Grotesk (nadpisy), Inter (text), JetBrains Mono (detaily).
- **Sekce:**
  1. **Hero** s rotujícím slovem „Postarám se o váš web / server / hosting / síť“ a
     interaktivním panelem monitoringu serveru (živé sloupce CPU, odezva, log,
     natočení podle myši).
  2. **Pás technologií** (nekonečně běžící).
  3. **Služby:** tvorba webů, webhosting a domény (štítek „Připravuji“), správa serverů,
     sítě a Wi-Fi, IT podpora a karta „Nevíte, co potřebujete?“.
  4. **Jak pracuji:** 4 kroky.
  5. **Ceník** s přepínačem měsíčně/ročně: Web Start od 6 900 Kč, Web + péče od 490 Kč
     měsíčně, Správa serveru od 1 490 Kč měsíčně, IT podpora od 500 Kč/hod.
  6. **O mně** s počítadly a odkazem na portfolio.
  7. **FAQ** (rozbalovací).
  8. **Kontakt:** formulář s výběrem služeb. Poptávky odesílá do Gmailu
     přes Web3Forms (viz README), záložně `mailto:`. Kliknutí na balíček v ceníku
     předvyplní formulář.
- Funguje na mobilu a respektuje `prefers-reduced-motion`. Otestováno v Chromiu
  (Playwright): žádné chyby v konzoli ani vodorovné přetečení na 1440 px a 390 px.

## K ověření s uživatelem

- **Ceny jsou jen orientační návrh.** Uživatel je musí potvrdit nebo upravit.
- **Sliby k ověření:** odpověď do 24 h, monitoring 24/7, „2+ roky praxe“, působnost MSK.
- **Plátce DPH:** neznámo, na webu to zatím není.
- **Název značky:** zatím nevybrán. Návrhy z minula: Šulák IT, Šulák Digital, Olše IT,
  BeskydNet, Beskyd Hosting, Rackovna, Serverna, Hostovna, Uzel, Kořen, Bajtovna,
  Stackovna, Nodeo. Před výběrem ověřit volnou doménu `.cz` a ochrannou známku.

## Stav repozitářů a souborů

- **`Sulii01/Business`:** založil ho uživatel. Claude nemůže zakládat repozitáře,
  GitHub vrací 403. Když se tento soubor vytvářel, byl repozitář **prázdný**.
- **Kde je kód webu:** pokud v repozitáři Business ještě nejsou `index.html`, `css/`
  a `js/`, má je uživatel v souboru `Business.zip`, který dostal v minulé session.
  Stačí ho rozbalit a nahrát do kořene repozitáře.
- **GitHub Pages:** po nahrání zapnout Settings → Pages → Deploy from a branch →
  `main` / root. Web pak poběží na `https://sulii01.github.io/Business/`.
  U bezplatného účtu musí být repozitář veřejný.

## Možné další kroky (až je uživatel potvrdí)

1. Ověřit, že je web v repozitáři Business, a zapnout GitHub Pages.
2. Doladit texty, ceny a barvy podle připomínek uživatele.
3. Vybrat název značky, upravit logo a titulek, případně koupit doménu.
4. Formulář je napojený na Web3Forms. Dokud v `js/main.js` chybí `WEB3FORMS_KEY`, funguje jen
   záloha `mailto:`. (FormSubmit.co jsme opustili, v prostředí Claude byl navíc blokovaný.)
5. Později: reference a ukázky prací, stránka hostingu s tarify, GDPR a obchodní
   podmínky, favicony a OG obrázek.
