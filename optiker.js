/* OptiApp – Optiker-Profile (26.11.2026)
   Eine Codebasis für Kunden-App (index.html) und Optiker-Dashboard (dashboard/index.html).
   Welches Profil gilt, bestimmt window.OPTIKER_ID: die Unterseiten falkner/ und dashboard/falkner/
   setzen 'falkner', die Hauptadressen zeigen die erfundene „Muster Optik“.
   Filial-Kennungen (perg/dimbach) sind intern für beide Profile gleich, damit die Demo-Daten passen. */
(function(){
var FALKNER_STORES={
  perg:{id:'perg',name:'Perg',full:'Sehzentrum Falkner Perg',street:'Herrenstraße 4',zip:'4320 Perg',
    tel:'07262 53309',telLink:'+43726253309',mail:'office@optik-falkner.at',
    lat:48.2497664,lng:14.6347744,review:'https://search.google.com/local/writereview?placeid=ChIJ-13VdPSxc0cResxHmvSltyE',
    hours:[[['08:30','12:00'],['14:00','18:00']],[['08:30','12:00'],['14:00','18:00']],[['08:30','12:00'],['14:00','18:00']],[['08:30','12:00'],['14:00','18:00']],[['08:30','12:00'],['14:00','18:00']],[['08:30','12:00']],[]],
    note:'',
    services:['Augenkontrolle','3D-Sehstärkenmessung','Augenmuskelkontrolle','Augendruckmessung','Gleitsicht','Kontaktlinsenanpassung','Nachtlinsen (Ortho-K)','Myopie-Management','Hauseigene Werkstatt','Brillen-Kaskoversicherung']},
  dimbach:{id:'dimbach',name:'Dimbach',full:'Optik Falkner Dimbach',street:'Dimbach 16',zip:'4371 Dimbach',
    tel:'07262 533095',telLink:'+437262533095',mail:'dimbach@optik-falkner.at',
    lat:48.3059444,lng:14.9079167,review:'https://www.google.com/maps/search/?api=1&query=Optik+Falkner+Dimbach+16+4371+Dimbach',
    hours:[[['07:30','12:00'],['14:30','17:00'],['17:00','18:00',1]],[['07:30','12:00']],[['07:30','12:00'],['14:30','17:00'],['17:00','18:00',1]],[['07:30','12:00'],['14:30','17:00'],['17:00','18:00',1]],[['07:30','12:00'],['14:30','17:00'],['17:00','18:00',1]],[['09:00','12:00',1]],[]],
    note:'17–18 Uhr und Samstag nur nach Terminvereinbarung',
    services:['Augenkontrolle','Brillenberatung','Kontaktlinsen','Reparaturservice']}
};

function copy(o){return JSON.parse(JSON.stringify(o))}
var MUSTER_STORES={
  perg:{id:'perg',name:'Musterstadt',full:'Muster Optik Musterstadt',street:'Musterplatz 1',zip:'1234 Musterstadt',
    tel:'01234 5678',telLink:'+4312345678',mail:'musterstadt@example.at',
    lat:48.2085,lng:16.3721,review:'https://www.google.com/maps/search/?api=1&query=Optiker',
    hours:copy(FALKNER_STORES.perg.hours),note:'',
    services:['Augenkontrolle','Sehstärkenmessung','Gleitsicht','Kontaktlinsenanpassung','Hauseigene Werkstatt','Brillen-Kaskoversicherung']},
  dimbach:{id:'dimbach',name:'Nordstadt',full:'Muster Optik Nordstadt',street:'Nordweg 2',zip:'1235 Nordstadt',
    tel:'01234 5679',telLink:'+4312345679',mail:'nordstadt@example.at',
    lat:48.2440,lng:16.3640,review:'https://www.google.com/maps/search/?api=1&query=Optiker',
    hours:copy(FALKNER_STORES.dimbach.hours),note:'Samstag nur nach Terminvereinbarung',
    services:['Augenkontrolle','Brillenberatung','Kontaktlinsen','Reparaturservice']}
};

var P={
  muster:{id:'muster',name:'Muster Optik',wmTop:'MUSTER',wmSub:'OPTIK · AUGENOPTIK',accent:'#1F6A87',
    logo:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzFGN0E5OSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI3Ij48Y2lyY2xlIGN4PSIzNCIgY3k9IjUyIiByPSIxMiIvPjxjaXJjbGUgY3g9IjY2IiBjeT0iNTIiIHI9IjEyIi8+PHBhdGggZD0iTTQ2IDUyaDgiLz48L2c+PC9zdmc+',
    appDir:'',pdfTop:'MUSTER',pdfSub:'Optik · Augenoptik',mailDomain:'muster-optik.example',
    behoerde:'Bezirkshauptmannschaft Musterstadt',stores:MUSTER_STORES},
  falkner:{id:'falkner',name:'Optik Falkner',wmTop:'FALKNER',wmSub:'OPTIK · SEHZENTRUM',accent:null,
    logo:null,
    appDir:'falkner/',pdfTop:'FALKNER',pdfSub:'Optik · Sehzentrum',mailDomain:'optik-falkner.at',
    behoerde:'Bezirkshauptmannschaft Perg',stores:FALKNER_STORES}
};

/* Welcher Optiker? 1. Unterseite (falkner/) setzt OPTIKER_ID, 2. in der Prototyp-APK die gespeicherte
   Demo-Auswahl (optiapp-optiker), 3. sonst Muster Optik (auch beim ersten Start der APK). */
var saved=null;
if(window.OPTIAPP_APK){try{saved=localStorage.getItem('optiapp-optiker')}catch(e){}}
var id=P[window.OPTIKER_ID]?window.OPTIKER_ID:(P[saved]?saved:'muster');
var O=P[id];
/* Liste für „Demo: Optiker wechseln“ */
window.OPTIKER_LIST=Object.keys(P).map(function(k){return {id:k,name:P[k].name,logo:P[k].logo,sub:P[k].stores.perg.name+' und '+P[k].stores.dimbach.name}});
/* Wechsel: in der APK Auswahl speichern und neu laden; im Browser zur Adresse des Optikers (…/ bzw. …/falkner/) */
O.switchTo=function(nid){
  if(!P[nid])return;
  if(window.OPTIAPP_APK){try{localStorage.setItem('optiapp-optiker',nid)}catch(e){}location.reload();return}
  location.href=new URL(P[nid].appDir||'./',document.baseURI).href;
};
/* Speicherschlüssel je Optiker, z. B. optiapp-falkner-app, optiapp-muster-dash */
O.key=function(k){return 'optiapp-'+id+'-'+k};
window.OPTIKER=O;

/* Alte Speicherstände aus der Zeit mit zwei Designs (Präfix glass-) einmalig entfernen –
   nur diese bekannten Schlüssel, damit andere Seiten unter derselben Adresse unberührt bleiben. */
try{
  ['glass-falkner-v10','glass-falkner-v11','glass-falkner-dash-v1','glass-falkner-dash-v2','glass-falkner-dash-alive',
   'glass-optiapp-billing-v1','glass-optiapp-support-v1','glass-theme-admin','glass-theme-dashboard','glass-theme-web']
   .forEach(function(k){localStorage.removeItem(k)});
  ['glass-falkner-dash-user','glass-optiapp-admin','glass-optiapp-web'].forEach(function(k){sessionStorage.removeItem(k)});
}catch(e){}
})();
