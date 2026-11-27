# Console Sindora

Kit de personnalisation du frontend databk (AGPL-3.0). Base épinglée : [9bca1f3](https://github.com/databk/rustdesk-console-web/tree/9bca1f31f6430d78def615536eae58fa6ecb7e36).

## Construction

Prérequis : Git, Node.js compatible upstream, npm, Docker. Fournir le SVG officiel autonome dans branding/logo.svg et la couleur officielle hexadécimale.

```sh
git clone https://github.com/databk/rustdesk-console-web.git upstream-web
git -C upstream-web checkout --detach 9bca1f31f6430d78def615536eae58fa6ecb7e36
SINDORA_COLOR='#RRGGBB' node scripts/brand.mjs upstream-web branding/logo.svg
cd upstream-web
npm ci
npm run build
docker build -t sindora-console-web:local .
```

Remplacer #RRGGBB par la couleur officielle. Le script refuse une base modifiée. Il conserve le footer, les notices et les fonctions d'authentification. Avant distribution ou usage réseau, mettre à disposition le code source correspondant complet, modifications et scripts inclus conformément à l'AGPL, et configurer WEB_CLIENT_SOURCE_URL vers ce code. Ne pas utiliser l'updater upstream sur cette variante.

## Filigrane
Paramètres > Général > Filigrane du nom d'utilisateur : désactiver et enregistrer. Conserver les journaux d'audit.

## Validation
Tester build, connexion, thème, droits, audit, PWA et retour arrière sur backend compatible de test. Ne pas modifier hbbs/hbbr. Aucun secret dans Git.

## État
Kit de modification, pas un fork intégral ni une image compilée. Logo officiel indisponible (fichier retrouvé : page HTML SharePoint). Build et compatibilité serveur non testés.
