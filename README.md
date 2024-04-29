# FUN4FAMILY - Gyerekbarát helykereső, utazási ötleteket megosztó applikáció


## A projekt célja


A Fun4Family egy utazási applikáció, ami segít megosztani és megtalálni olyan helyeket amik családok számára megfelelőek.

## 1. Helyek megosztásának menete a felhasználókkal

A regisztrált felhasználók dupla kattintással meg tudnak jelölni új helyeket egy térképen és információkat oszthatnak meg róla, 
mint például leírás a helyről és annak értékelése. Továbbá hozzászólni is tudnak egy-egy helyhez ahol megoszthatják a saját 
véleményüket. Saját adataikat láthatják egy privát oldalon az általuk megjelölt helyekkel együtt.
A látogatók (nem regisztrált felhasználók) láthatják a már megjelölt helyeket és keresni tudnak közülük legújabban megjelölt,
legkedveltebb és hozzájuk legközelebb lévő helyek alapján. Meglátogathatják a megjelölt helyek hozzászólás üzenőfalait is
ahol elolvashatják a regisztrált felhasználók megjegyzéseit, értékeléseit az adott helyről. Bármelyik felhasználó küldhet
üzenetet vagy visszajelzést az ügyfélszolgálatnak. A felhasználók visszajelzései megjelennek a főoldalon.

## 2. Szerepek

**Látogató**
- Láthatja a jelöléseket, kommenteket és kereshet a jelölések között
- Küldhet üzenetet az ügyfélszolgálatnak


**Regisztrált felhasználó**
- Új jelöléseket hozhat létre
- Megjegyzést írhat mások jelöléseihez, illetve saját megjegyzéseit szerkesztheti és törölheti
- Saját jelöléseit különböző színben láthatja
- Saját profilját megnézheti az általa jelölt helyekkel együtt
- Mindent csinálhat amit a látogató is csinálhat


## 3. Fő tevékenységek

- Regisztráció felhasználónév, email és jelszó segítségével
- Bejelentkezés felhasználónév és jelszó segítségével
- Új helyek megjelölése
- Keresés a megjelölt helyek között
- Kommentek írása, szerkesztése és törlése
- Üzenet küldése az ügyfélszolgálatnak
- Saját profil megtekintése

## Technikai követelmények


**Backend**
- Node.js
- Express.js
- MongoDB
- JSON Web Token
- Docker

**Frontend**
- React

**API dokumentáció**
- [OpenAPI/Swagger](https://github.com/green-fox-academy/hajmaedina_masterwork/tree/master/open-api-doc)


## Alkalmazás telepítése, konfigurálása
1. Kulcsok beszerzése:
- [Mapbox API key](https://www.mapbox.com/)
- [EmailJS API key](https://www.emailjs.com/)
- [Geocoding API key](https://developers.google.com/maps/documentation/geocoding/overview)
2. `.env.dev` létrehozása a [`.env.dev.example`](https://github.com/green-fox-academy/hajmaedina_masterwork/blob/master/.env.dev.example) alapján
3. `docker-compose build` parancs futtatása az applikáció gyökérkönyvtárában, majd
4. `docker-compose --env-file ./.env.dev up` paranccsal indítható el az applikáció
5. Fun4Family-app: [http://localhost:3000/](http://localhost:3000/)
6. Open API dokumentáció [http://localhost:5500/api-docs/#/](http://localhost:5500/api-docs/#/)
