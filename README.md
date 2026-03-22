# Batarelle J2 — Guide de déploiement sur Google Play Store

## Étapes pour publier sur Google Play

---

### ÉTAPE 1 — Héberger l'application (GitHub Pages, gratuit)

1. Créez un compte sur **github.com**
2. Créez un nouveau dépôt public nommé `batarelle-j2`
3. Uploadez **tous les fichiers** de ce dossier :
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - dossier `icons/` (avec tous les PNG)
4. Dans Settings → Pages → Source : sélectionnez `main` branch
5. Votre app sera disponible sur : `https://VOTRE_NOM.github.io/batarelle-j2/`

> ⚠️ L'URL doit être en **HTTPS** — GitHub Pages le fait automatiquement.

---

### ÉTAPE 2 — Créer un compte développeur Google Play

1. Allez sur **play.google.com/console**
2. Payez les frais uniques : **25 USD**
3. Complétez votre profil développeur

---

### ÉTAPE 3 — Générer l'APK avec Bubblewrap (outil Google)

Installez Node.js puis exécutez ces commandes :

```bash
npm install -g @bubblewrap/cli

bubblewrap init --manifest https://VOTRE_NOM.github.io/batarelle-j2/manifest.json

bubblewrap build
```

Cela génère : `app-release-signed.apk`

---

### ÉTAPE 4 — Ajouter le fichier assetlinks.json

Sur votre GitHub, créez le fichier `.well-known/assetlinks.json` :

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.batarelle.j2",
    "sha256_cert_fingerprints": ["VOTRE_FINGERPRINT_ICI"]
  }
}]
```

> Le fingerprint est généré lors du `bubblewrap build`.

---

### ÉTAPE 5 — Soumettre sur Google Play

1. Dans la console Play → Créer une application
2. Type : Application / Français
3. Uploadez l'APK dans "Production" ou "Test interne"
4. Complétez les informations :
   - Nom : **Batarelle J2**
   - Description : Gestion de copropriété
   - Captures d'écran : prenez des screenshots sur votre téléphone
5. Soumettez pour révision (1-3 jours)

---

### ALTERNATIVE RAPIDE — Installer directement sans Play Store

Si vous voulez juste l'app sur votre téléphone **sans passer par le Play Store** :

1. Hébergez sur GitHub Pages (Étape 1)
2. Ouvrez l'URL dans **Chrome Android**
3. Chrome affiche automatiquement "Ajouter à l'écran d'accueil"
4. L'app s'installe comme une vraie app native ✓

C'est la méthode la plus rapide — **recommandée** pour usage personnel.

---

### Structure des fichiers

```
batarelle-j2/
├── index.html          ← Application principale
├── manifest.json       ← Configuration PWA
├── sw.js               ← Service Worker (offline)
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```
