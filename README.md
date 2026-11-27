# Console Sindora

Kit de personnalisation du frontend databk (AGPL-3.0). Base épinglée : [9bca1f3](https://github.com/databk/rustdesk-console-web/tree/9bca1f31f6430d78def615536eae58fa6ecb7e36).

## Construction

Prérequis : Git, Node.js compatible upstream, npm, Docker. Les deux SVG sont vectorisés à partir des fichiers fournis par Sindora. Vert du logo : #93B06D ; vert d'interface assombri #52723B pour le contraste.

```sh
git clone https://github.com/databk/rustdesk-console-web.git upstream-web
git -C upstream-web checkout --detach 9bca1f31f6430d78def615536eae58fa6ecb7e36
node scripts/brand.mjs upstream-web
cd upstream-web
npm ci
npm run build
docker build -t sindora-console-web:local .
```

Le script refuse une base modifiée. Il conserve le footer, les notices et les fonctions d'authentification. Avant distribution ou usage réseau, mettre à disposition le code source correspondant complet, modifications et scripts inclus conformément à l'AGPL, et configurer WEB_CLIENT_SOURCE_URL vers ce code. Ne pas utiliser l'updater upstream sur cette variante.

## Filigrane
Paramètres > Général > Filigrane du nom d'utilisateur : désactiver et enregistrer. Conserver les journaux d'audit.

## Validation
Tester build, connexion, thème, droits, audit, PWA et retour arrière sur backend compatible de test. Ne pas modifier hbbs/hbbr. Aucun secret dans Git.

## État
Kit de modification, pas un fork intégral ni une image compilée. Logo et icône intégrés sous forme vectorisée. Build et compatibilité serveur non testés.
