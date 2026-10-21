# Business

Web pro nabídku služeb: tvorba webových stránek, webhosting, správa serverů, sítě a IT podpora.

Statický web (HTML, CSS, JS), bez sestavování. Stačí otevřít `index.html` v prohlížeči
nebo zapnout GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

- `index.html` – obsah stránky
- `css/style.css` – vzhled (barvy v `:root` nahoře)
- `js/main.js` – interaktivita (rotující slovo, panel serveru, ceník, formulář)

## Kontaktní formulář

Poptávky se odesílají přes [FormSubmit.co](https://formsubmit.co) (zdarma, bez registrace)
na `sulakhonza@gmail.com`. Nastavení je v `js/main.js` (`CONTACT_EMAIL`).

- **Aktivace:** po prvním odeslání z webu přijde na e-mail žádost o potvrzení, je potřeba
  kliknout na „Activate Form“. Teprve pak začnou poptávky chodit.
- Ochrana proti spamu: skryté pole `_honey`.
- Když služba selže, formulář záložně otevře e-mailového klienta (`mailto:`).
