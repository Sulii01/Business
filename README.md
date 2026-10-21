# Business

Web pro nabídku služeb: tvorba webových stránek, webhosting, správa serverů, sítě a IT podpora.

Statický web (HTML, CSS, JS), bez sestavování. Stačí otevřít `index.html` v prohlížeči
nebo zapnout GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

- `index.html` – obsah stránky
- `css/style.css` – vzhled (barvy v `:root` nahoře)
- `js/main.js` – interaktivita (rotující slovo, panel serveru, ceník, formulář)

## Kontaktní formulář

Poptávky se odesílají přes [Web3Forms](https://web3forms.com) (zdarma, 250 zpráv měsíčně)
na e-mail, ke kterému patří access key. Nastavení je v `js/main.js` (`WEB3FORMS_KEY`).

- **Klíč:** na web3forms.com zadat e-mail, access key přijde do schránky. Klíč není tajný,
  patří přímo do stránky.
- Ochrana proti spamu: skryté pole `botcheck`.
- Bez klíče, nebo když služba selže, formulář záložně otevře e-mailového klienta (`mailto:`).
