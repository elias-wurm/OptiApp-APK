#!/usr/bin/env bash
# Holt die aktuelle Kunden-App aus dem Nachbarordner ../OptiApp nach www/
# und erzeugt die Icon-/Splash-Vorlagen in assets/ aus Logo 5.
# Benötigt: rsvg-convert, magick (ImageMagick). Danach committen + pushen → GitHub baut die APK.
set -euo pipefail
cd "$(dirname "$0")"
SRC="${1:-../OptiApp}"
APPNAME="Mein Optiker"

# --- App kopieren -------------------------------------------------------
rm -rf www && mkdir -p www/fonts
cp "$SRC/index.html" "$SRC/bg.jpg" www/
cp "$SRC"/fonts/* www/fonts/

# Name, Titel und Polyfills für ältere WebViews (Android 6) nur in der APK-Kopie
sed -i \
  -e "s|<title>[^<]*</title>|<title>$APPNAME</title>|" \
  -e "s|name=\"apple-mobile-web-app-title\" content=\"[^\"]*\"|name=\"apple-mobile-web-app-title\" content=\"$APPNAME\"|" \
  www/index.html
POLY='<script>/* APK: Polyfills für ältere Android-WebViews */if(!Array.prototype.flat)Object.defineProperty(Array.prototype,"flat",{configurable:true,writable:true,value:function(d){d=d===undefined?1:d;return this.reduce(function(a,v){return a.concat(Array.isArray(v)\&\&d>0?v.flat(d-1):v)},[])}});if(!Array.prototype.flatMap)Object.defineProperty(Array.prototype,"flatMap",{configurable:true,writable:true,value:function(f,t){return this.map(f,t).flat()}});</script>'
sed -i "0,/<meta charset=\"UTF-8\">/s|<meta charset=\"UTF-8\">|<meta charset=\"UTF-8\">\n$POLY|" www/index.html
rm -rf fonts && cp -r www/index.html www/bg.jpg www/fonts .   # Root-Kopie für GitHub Pages (wie bisher)

# --- Icons aus Logo 5 ---------------------------------------------------
LOGO=assets/logo5.svg
cp "$SRC/website/img/icon.svg" "$LOGO"
ORANGE='#F0643C'
TMP=$(mktemp -d)

# Vordergrund (adaptives Icon): nur Sprechblase + Brille, mittig im sicheren Bereich
sed -e 's|<rect width="512" height="512" rx="112" fill="#F0643C"/>||' \
    -e 's|viewBox="0 0 512 512" width="512" height="512"|viewBox="-64 -85 660 660" width="1024" height="1024"|' \
    "$LOGO" > "$TMP/fg.svg"
rsvg-convert -w 1024 -h 1024 "$TMP/fg.svg" -o assets/icon-foreground.png
magick -size 1024x1024 "xc:$ORANGE" assets/icon-background.png
# Klassisches Icon (Android 6/7): ganzes Logo mit runden Ecken
rsvg-convert -w 1024 -h 1024 "$LOGO" -o assets/icon-only.png
# Splash hell/dunkel (Glas-Look-Hintergrundfarben der App)
rsvg-convert -w 640 -h 640 "$LOGO" -o "$TMP/l.png"
magick -size 2732x2732 xc:'#ECEFF3' "$TMP/l.png" -gravity center -composite assets/splash.png
magick -size 2732x2732 xc:'#12151B' "$TMP/l.png" -gravity center -composite assets/splash-dark.png
rm -rf "$TMP"
echo "Fertig: www/ und assets/ aktualisiert."
