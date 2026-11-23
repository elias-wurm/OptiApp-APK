# Mein Optiker – Kunden-App (Prototyp, OptiApp)

Android-Hülle via [Capacitor](https://capacitorjs.com) 7 (minSdk 23 → läuft ab Android 6) für die
HTML-Kunden-App aus dem Repo `OptiApp` (Glas-Look). Nur Demo-Daten.

## App aktualisieren
Die App wird **nicht hier** bearbeitet, sondern im Nachbarordner `../OptiApp` (`index.html`).
```
./app-aktualisieren.sh        # kopiert index.html, bg.jpg, fonts/ nach www/, setzt Namen + Polyfills, erzeugt Icons aus Logo 5
git add -A && git commit -m "App vX.Y" && git push
```
Benötigt lokal: `rsvg-convert`, `magick` (ImageMagick).

## APK über GitHub bauen
1. Push auf `main` startet „Android APK bauen“ (oder manuell über *Run workflow*).
2. Nach ca. 5 Minuten: Release **apk-latest** → `mein-optiker.apk` direkt am Handy herunterladen
   (oder bei **Artifacts** → `mein-optiker-apk`).
3. Installieren („Installation aus unbekannten Quellen“ erlauben). Unsignierter Debug-Build, nur zum Testen.

## Lokal bauen (Android SDK + JDK 21 nötig)
```
npm install
npx cap add android
npm run android:icons
npx cap sync android
npm run android:build
```
APK: `android/app/build/outputs/apk/debug/app-debug.apk`
