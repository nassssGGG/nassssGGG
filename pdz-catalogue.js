/* AutoPièces DZ — Catalogue JS — depends on window.PDZ from pdz-tecdoc.js */
(function(){
'use strict';
var VDB=(window.PDZ&&window.PDZ.VDB)||{};
var getV=(window.PDZ&&window.PDZ.getVehicle)||function(){return null;};
var setV=(window.PDZ&&window.PDZ.setVehicle)||function(){};

/* === VEHICLE SELECTOR FUNCTIONS (defined first for onclick use) === */
window.vsTab=function(t,btn){
  document.querySelectorAll('.vs-tab').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  document.getElementById('vs-m').style.display=t==='m'?'':'none';
  document.getElementById('vs-i').style.display=t==='i'?'':'none';
};
window.vsModels=function(){
  var mk=document.getElementById('vsMake').value;
  var mEl=document.getElementById('vsMod'),eEl=document.getElementById('vsEng');
  mEl.innerHTML='<option value="">Choisissez un modele</option>';
  eEl.innerHTML='<option value="">Choisissez une motorisation</option>';
  mEl.disabled=!mk;eEl.disabled=true;
  if(!mk)return;
  Object.keys(VDB[mk]||{}).sort().forEach(function(m){mEl.innerHTML+='<option value="'+m+'">'+m+'</option>';});
};
window.vsEngines=function(){
  var mk=document.getElementById('vsMake').value,md=document.getElementById('vsMod').value;
  var eEl=document.getElementById('vsEng');
  eEl.innerHTML='<option value="">Choisissez une motorisation</option>';
  eEl.disabled=!md;
  if(!mk||!md||!VDB[mk]||!VDB[mk][md])return;
  VDB[mk][md].forEach(function(e){eEl.innerHTML+='<option value="'+e+'">'+e+'</option>';});
};
window.vsGo=function(){
  var mk=document.getElementById('vsMake').value;
  var md=document.getElementById('vsMod').value;
  var eg=document.getElementById('vsEng').value;
  if(!mk){alert('Veuillez selectionner une marque');return;}
  var label=mk+(md?' '+md:'')+(eg?' — '+eg:'');
  setV({make:mk,model:md,engine:eg,label:label});
  window.location='/pages/recherche-pieces?marque='+encodeURIComponent(mk)+'&modele='+encodeURIComponent(md)+'&motorisation='+encodeURIComponent(eg);
};
window.immatGo=function(){
  var v=document.getElementById('immatIn').value.trim();
  if(!v){alert("Entrez un numero d'immatriculation");return;}
  window.location='/pages/recherche-pieces?immat='+encodeURIComponent(v);
};
window.sbFilter=function(q){
  q=q.toLowerCase().trim();
  document.querySelectorAll('.sbg').forEach(function(g){
    var v=false;
    g.querySelectorAll('li').forEach(function(li){var m=!q||li.textContent.toLowerCase().includes(q);li.classList.toggle('sbih',!m);if(m)v=true;});
    g.style.display=v?'':'none';
  });
  document.querySelectorAll('.sb-ltrs button').forEach(function(b){b.classList.remove('sba');});
  document.querySelector('.sb-ltrs button').classList.add('sba');
};
window.sbL=function(l,btn){
  document.querySelectorAll('.sb-ltrs button').forEach(function(b){b.classList.remove('sba');});
  btn.classList.add('sba');
  document.getElementById('sbIn').value='';
  document.querySelectorAll('.sbg').forEach(function(g){
    var s=!l||g.dataset.l===l;
    g.style.display=s?'':'none';
    g.querySelectorAll('li').forEach(function(li){li.classList.remove('sbih');});
  });
};

/* === POPULATE VEHICLE MAKES === */
var makeEl=document.getElementById('vsMake');
if(makeEl){
  Object.keys(VDB).sort().forEach(function(m){
    makeEl.innerHTML+='<option value="'+m+'">'+m+'</option>';
  });
  /* Pre-select remembered vehicle */
  var sv=getV();
  if(sv){
    makeEl.value=sv.make||'';
    if(sv.make&&VDB[sv.make]){
      window.vsModels();
      var mEl=document.getElementById('vsMod');
      if(mEl){
        mEl.value=sv.model||'';
        if(sv.model&&VDB[sv.make]&&VDB[sv.make][sv.model]){
          window.vsEngines();
          var eEl=document.getElementById('vsEng');
          if(eEl)eEl.value=sv.engine||'';
        }
      }
    }
  }
}

/* === POPULAR STRIP (24 items with SVG icons) === */
var PS=[
  {q:'disque+frein',n:'Disque de frein',svg:'<circle cx="20" cy="20" r="13" stroke="#cc0000" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="5" stroke="#cc0000" stroke-width="2" fill="none"/><path d="M20 7L20 10M20 30L20 33M7 20L10 20M30 20L33 20" stroke="#cc0000" stroke-width="2" stroke-linecap="round"/>',bg:'#ffebee'},
  {q:'kit+embrayage',n:"Kit d'embrayage",svg:'<circle cx="20" cy="20" r="12" stroke="#555" stroke-width="2" fill="none"/><circle cx="20" cy="20" r="4" stroke="#555" stroke-width="2" fill="none"/><circle cx="20" cy="11" r="2" fill="#555"/><circle cx="27" cy="24" r="2" fill="#555"/><circle cx="13" cy="24" r="2" fill="#555"/>',bg:'#f5f5f5'},
  {q:'amortisseur',n:'Amortisseur',svg:'<rect x="17" y="5" width="6" height="18" rx="3" stroke="#1565c0" stroke-width="2" fill="none"/><path d="M15 23Q20 28 25 23" stroke="#1565c0" stroke-width="2" fill="none"/><line x1="20" y1="28" x2="20" y2="35" stroke="#1565c0" stroke-width="3" stroke-linecap="round"/>',bg:'#e3f2fd'},
  {q:'plaquettes+frein',n:'Plaquette de frein',svg:'<rect x="10" y="12" width="20" height="16" rx="2" stroke="#b71c1c" stroke-width="2" fill="none"/><rect x="13" y="15" width="14" height="10" rx="1" fill="#ffcdd2"/>',bg:'#ffebee'},
  {q:'kit+distribution',n:'Kit distribution',svg:'<circle cx="14" cy="14" r="6" stroke="#e65100" stroke-width="2" fill="none"/><circle cx="26" cy="26" r="6" stroke="#e65100" stroke-width="2" fill="none"/><circle cx="14" cy="14" r="2" fill="#e65100"/><circle cx="26" cy="26" r="2" fill="#e65100"/>',bg:'#fff3e0'},
  {q:'huile+moteur',n:'Huile moteur',svg:'<path d="M14 8L14 28Q14 32 20 32Q26 32 26 28L26 14L20 8Z" stroke="#f57f17" stroke-width="2" fill="none"/><path d="M26 14L30 14Q32 14 32 18Q32 22 28 22L26 22" stroke="#f57f17" stroke-width="2" fill="none"/>',bg:'#fff8e1'},
  {q:'bras+suspension',n:'Bras de suspension',svg:'<path d="M8 28L30 14" stroke="#37474f" stroke-width="3" stroke-linecap="round"/><circle cx="8" cy="28" r="4" stroke="#37474f" stroke-width="2" fill="none"/><circle cx="30" cy="14" r="3" stroke="#37474f" stroke-width="2" fill="none"/>',bg:'#eceff1'},
  {q:'kit+distribution+pompe+eau',n:'Kit distrib.+pompe',svg:'<circle cx="14" cy="20" r="7" stroke="#1b5e20" stroke-width="2" fill="none"/><path d="M21 20L30 20" stroke="#1b5e20" stroke-width="2"/><path d="M26 16L30 20L26 24" stroke="#1b5e20" stroke-width="2" fill="none"/>',bg:'#e8f5e9'},
  {q:'phare+avant',n:'Phare avant',svg:'<path d="M8 14Q8 8 20 8L30 14L30 26L20 32Q8 32 8 26Z" stroke="#f9a825" stroke-width="2" fill="none"/><circle cx="18" cy="20" r="5" stroke="#f9a825" stroke-width="1.5" fill="none"/>',bg:'#fffde7'},
  {q:'batterie+voiture',n:'Batterie',svg:'<rect x="8" y="14" width="24" height="16" rx="2" stroke="#1a237e" stroke-width="2" fill="none"/><line x1="12" y1="10" x2="12" y2="14" stroke="#1a237e" stroke-width="3" stroke-linecap="round"/><line x1="28" y1="10" x2="28" y2="14" stroke="#1a237e" stroke-width="3" stroke-linecap="round"/>',bg:'#e8eaf6'},
  {q:'filtre+carburant',n:'Filtre carburant',svg:'<rect x="14" y="8" width="12" height="24" rx="4" stroke="#6a1b9a" stroke-width="2" fill="none"/><line x1="14" y1="16" x2="26" y2="16" stroke="#6a1b9a" stroke-width="1.5"/><line x1="14" y1="20" x2="26" y2="20" stroke="#6a1b9a" stroke-width="1.5"/>',bg:'#f3e5f5'},
  {q:'courroie+alternateur',n:'Courroie alternateur',svg:'<path d="M10 14Q10 8 16 8Q22 8 22 14L22 26Q22 32 16 32Q10 32 10 26Z" stroke="#bf360c" stroke-width="2" fill="none"/>',bg:'#fbe9e7'},
  {q:'retroviseur',n:'Retroviseur',svg:'<path d="M10 14Q10 8 20 8Q30 8 30 14L30 24Q30 28 20 28L10 28Z" stroke="#00695c" stroke-width="2" fill="none"/><line x1="20" y1="28" x2="20" y2="34" stroke="#00695c" stroke-width="2.5" stroke-linecap="round"/>',bg:'#e0f2f1'},
  {q:'alternateur',n:'Alternateur',svg:'<circle cx="20" cy="20" r="12" stroke="#283593" stroke-width="2" fill="none"/><circle cx="20" cy="20" r="4" stroke="#283593" stroke-width="2" fill="none"/>',bg:'#e8eaf6'},
  {q:'filtre+air',n:'Filtre a air',svg:'<rect x="8" y="12" width="24" height="16" rx="8" stroke="#1565c0" stroke-width="2" fill="none"/><path d="M12 20L28 20" stroke="#1565c0" stroke-width="1.5" stroke-linecap="round"/>',bg:'#e3f2fd'},
  {q:'filtre+huile',n:'Filtre a huile',svg:'<path d="M14 8L14 32Q14 35 20 35Q26 35 26 32L26 8Z" stroke="#2e7d32" stroke-width="2" fill="none"/><line x1="14" y1="20" x2="26" y2="20" stroke="#2e7d32" stroke-width="1.5"/>',bg:'#e8f5e9'},
  {q:'sonde+lambda',n:'Sonde lambda',svg:'<line x1="20" y1="6" x2="20" y2="22" stroke="#0277bd" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="26" r="5" stroke="#0277bd" stroke-width="2" fill="none"/>',bg:'#e1f5fe'},
  {q:'roulement+roue',n:'Roulement de roue',svg:'<circle cx="20" cy="20" r="12" stroke="#4e342e" stroke-width="2" fill="none"/><circle cx="20" cy="20" r="5" stroke="#4e342e" stroke-width="3" fill="none"/>',bg:'#efebe9'},
  {q:'injecteur',n:'Injecteur',svg:'<rect x="16" y="6" width="8" height="18" rx="2" stroke="#00838f" stroke-width="2" fill="none"/><path d="M20 24L20 32" stroke="#00838f" stroke-width="2.5" stroke-linecap="round"/>',bg:'#e0f7fa'},
  {q:'pompe+eau',n:'Pompe a eau',svg:'<circle cx="20" cy="20" r="10" stroke="#1565c0" stroke-width="2" fill="none"/><path d="M15 16L20 20L15 24" stroke="#1565c0" stroke-width="2" fill="none"/>',bg:'#e3f2fd'},
  {q:'feu+arriere',n:'Feu arriere',svg:'<path d="M10 12L30 12L30 28L10 28Z" stroke="#c62828" stroke-width="2" fill="none"/><line x1="20" y1="12" x2="20" y2="28" stroke="#c62828" stroke-width="1.5"/>',bg:'#ffebee'},
  {q:'coupelle+amortisseur',n:'Coupelle amortisseur',svg:'<ellipse cx="20" cy="16" rx="10" ry="6" stroke="#f9a825" stroke-width="2" fill="none"/><line x1="20" y1="16" x2="20" y2="32" stroke="#f9a825" stroke-width="3" stroke-linecap="round"/>',bg:'#fff8e1'},
  {q:'cardan',n:'Cardan',svg:'<line x1="6" y1="20" x2="16" y2="20" stroke="#37474f" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="20" r="5" stroke="#37474f" stroke-width="2" fill="none"/><line x1="24" y1="20" x2="34" y2="20" stroke="#37474f" stroke-width="3" stroke-linecap="round"/>',bg:'#eceff1'},
  {q:'moyeu+roue',n:'Moyeu de roue',svg:'<circle cx="20" cy="20" r="13" stroke="#4a148c" stroke-width="2" fill="none"/><circle cx="20" cy="20" r="4" stroke="#4a148c" stroke-width="2.5" fill="none"/>',bg:'#f3e5f5'}
];
var psEl=document.getElementById('ps-scroll');
if(psEl)PS.forEach(function(it){psEl.innerHTML+='<a class="ps-item" href="/search?type=product&q='+it.q+'"><div class="ps-icon" style="background:'+it.bg+'"><svg width="28" height="28" viewBox="0 0 40 40" fill="none">'+it.svg+'</svg></div><div class="ps-name">'+it.n+'</div></a>';});

/* === 38 CATEGORY TILES ===
   Tous les liens pointent vers une vraie collection Shopify (ou /collections/all
   en fallback). Aucun /search?q=... pour la navigation par catégorie : ça évite
   que les apps Shopify (EasySearch, etc.) interceptent l'URL et affichent une
   page de filtres à la place de la collection. */
var C={
  pneus:'/collections/pneus-et-jantes',huiles:'/collections/huiles-amp-lubrifiants',
  frein:'/collections/freinage',filtre:'/collections/filtration',
  moteur:'/collections/moteur-amp-transmission',essuie:'/collections/essuie-glaces-balais',
  allumage:'/collections/batterie-allumage',suspension:'/collections/suspension-amp-direction',
  echappement:'/collections/echappement',distribution:'/collections/distribution-courroie',
  turbo:'/collections/turbo-admission',refroid:'/collections/refroidissement',
  carrosserie:'/collections/carrosserie',clim:'/collections/climatisation',
  carburant:'/collections/carburant-injection',direction:'/collections/direction',
  embrayage:'/collections/embrayage-transmission',demarrage:'/collections/demarrage-alternateur',
  outillage:'/collections/outillage',nettoyage:'/collections/entretien-nettoyage',
  accessoires:'/collections/frontpage',entretien:'/collections/entretien-accessoires',
  eclairage:'/collections/eclairage',all:'/collections/all'
};
var CAT=[
  {n:'Pneus, jantes et accessoires',href:C.pneus,bg:'#e3f2fd',svg:'<circle cx="20" cy="20" r="13" stroke="#1565c0" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="5" stroke="#1565c0" stroke-width="2" fill="none"/><path d="M20 7L20 15M20 25L20 33M7 20L15 20M25 20L33 20" stroke="#1565c0" stroke-width="2" stroke-linecap="round"/>'},
  {n:'Huiles et fluides',href:C.huiles,bg:'#fff8e1',svg:'<path d="M14 8L14 28Q14 34 20 34Q26 34 26 28L26 14L20 8Z" stroke="#f57f17" stroke-width="2.2" fill="none"/><path d="M26 14L30 14Q33 14 33 18Q33 22 29 22L26 22" stroke="#f57f17" stroke-width="2" fill="none"/>'},
  {n:'Frein',href:C.frein,bg:'#ffebee',svg:'<circle cx="20" cy="20" r="12" stroke="#c62828" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="5" stroke="#c62828" stroke-width="2" fill="none"/><path d="M20 8L20 12M20 28L20 32M8 20L12 20M28 20L32 20" stroke="#c62828" stroke-width="2" stroke-linecap="round"/>'},
  {n:'Filtre',href:C.filtre,bg:'#e8f5e9',svg:'<rect x="10" y="8" width="20" height="24" rx="4" stroke="#2e7d32" stroke-width="2.2" fill="none"/><line x1="10" y1="14" x2="30" y2="14" stroke="#2e7d32" stroke-width="1.8"/><line x1="10" y1="20" x2="30" y2="20" stroke="#2e7d32" stroke-width="1.8"/><line x1="10" y1="26" x2="30" y2="26" stroke="#2e7d32" stroke-width="1.8"/>'},
  {n:'Moteur',href:C.moteur,bg:'#f3e5f5',svg:'<rect x="8" y="14" width="24" height="16" rx="2" stroke="#6a1b9a" stroke-width="2" fill="none"/><path d="M14 14L14 9M20 14L20 9M26 14L26 9" stroke="#6a1b9a" stroke-width="2.5" stroke-linecap="round"/>'},
  {n:"Systeme d'essuie-glaces",href:C.essuie,bg:'#e0f7fa',svg:'<path d="M8 30Q20 10 32 30" stroke="#00838f" stroke-width="2.5" fill="none"/><line x1="8" y1="30" x2="8" y2="34" stroke="#00838f" stroke-width="2.5" stroke-linecap="round"/>'},
  {n:'Allumage et prechauffage',href:C.allumage,bg:'#fffde7',svg:'<rect x="16" y="6" width="8" height="14" rx="3" stroke="#f9a825" stroke-width="2" fill="none"/><path d="M22 13L18 17L21 17L17 23" stroke="#f9a825" stroke-width="1.8" stroke-linecap="round"/>'},
  {n:'Suspension',href:C.suspension,bg:'#fff3e0',svg:'<path d="M16 8L16 14L24 18L24 24L16 28L16 32" stroke="#e65100" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'},
  {n:'Electricite',href:C.allumage,bg:'#e8eaf6',svg:'<path d="M24 8L16 20L22 20L16 32" stroke="#283593" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'},
  {n:'Amortissement',href:C.suspension,bg:'#e0f2f1',svg:'<rect x="17" y="5" width="6" height="14" rx="3" stroke="#00695c" stroke-width="2" fill="none"/><path d="M13 19L27 19L27 25L13 25Z" stroke="#00695c" stroke-width="2" fill="none"/><line x1="20" y1="25" x2="20" y2="35" stroke="#00695c" stroke-width="3" stroke-linecap="round"/>'},
  {n:"Recirculation des gaz d'echappement",href:C.echappement,bg:'#e8f5e9',svg:'<path d="M10 20Q10 10 20 10Q30 10 30 20" stroke="#1b5e20" stroke-width="2" fill="none"/><path d="M28 14L32 10L32 18" stroke="#1b5e20" stroke-width="2" fill="none"/>'},
  {n:'Courroies, chaines, galets',href:C.distribution,bg:'#fbe9e7',svg:'<path d="M10 14L30 14L30 26L10 26Z" stroke="#bf360c" stroke-width="2" fill="none"/><circle cx="14" cy="20" r="3" stroke="#bf360c" stroke-width="1.8" fill="none"/><circle cx="26" cy="20" r="3" stroke="#bf360c" stroke-width="1.8" fill="none"/>'},
  {n:'Composants pour la suralimentation',href:C.turbo,bg:'#e3f2fd',svg:'<circle cx="20" cy="20" r="10" stroke="#1565c0" stroke-width="2" fill="none"/><circle cx="20" cy="20" r="4" stroke="#1565c0" stroke-width="2" fill="none"/>'},
  {n:'Refroidissement moteur',href:C.refroid,bg:'#e0f7fa',svg:'<rect x="8" y="10" width="24" height="20" rx="2" stroke="#006064" stroke-width="2" fill="none"/><path d="M14 10L14 6M20 10L20 6M26 10L26 6" stroke="#006064" stroke-width="2" stroke-linecap="round"/>'},
  {n:'Carrosserie',href:C.carrosserie,bg:'#fce4ec',svg:'<path d="M6 22L10 14Q14 8 20 8Q26 8 30 14L34 22L34 28L6 28Z" stroke="#880e4f" stroke-width="2" fill="none"/><circle cx="11" cy="28" r="3" stroke="#880e4f" stroke-width="1.8" fill="none"/><circle cx="29" cy="28" r="3" stroke="#880e4f" stroke-width="1.8" fill="none"/>'},
  {n:'Chauffage et ventilation',href:C.clim,bg:'#fff3e0',svg:'<circle cx="20" cy="20" r="8" stroke="#e65100" stroke-width="2" fill="none"/><path d="M20 12L20 8M20 28L20 32M12 20L8 20M28 20L32 20" stroke="#e65100" stroke-width="2" stroke-linecap="round"/>'},
  {n:"Joints et bagues d'etancheite",href:C.moteur,bg:'#f3e5f5',svg:'<circle cx="20" cy="20" r="12" stroke="#4a148c" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="7" stroke="#4a148c" stroke-width="1.5" fill="none" stroke-dasharray="3,2"/>'},
  {n:'Echappement',href:C.echappement,bg:'#e8eaf6',svg:'<path d="M6 22Q12 18 20 20Q28 22 34 18" stroke="#37474f" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="34" cy="18" r="4" stroke="#37474f" stroke-width="2" fill="none"/>'},
  {n:'Interieur',href:C.accessoires,bg:'#fbe9e7',svg:'<path d="M8 28L8 18Q8 14 12 14L16 14Q18 10 20 10Q22 10 24 14L28 14Q32 14 32 18L32 28" stroke="#bf360c" stroke-width="2" fill="none"/>'},
  {n:"Systeme d'alimentation",href:C.carburant,bg:'#fffde7',svg:'<rect x="12" y="8" width="16" height="22" rx="3" stroke="#f9a825" stroke-width="2" fill="none"/><path d="M28 14L32 14L32 22L28 22" stroke="#f9a825" stroke-width="2" fill="none"/>'},
  {n:'Direction',href:C.direction,bg:'#e8f5e9',svg:'<circle cx="20" cy="18" r="10" stroke="#1b5e20" stroke-width="2.5" fill="none"/><line x1="20" y1="28" x2="20" y2="34" stroke="#1b5e20" stroke-width="3" stroke-linecap="round"/>'},
  {n:'Embrayage',href:C.embrayage,bg:'#ffebee',svg:'<circle cx="20" cy="20" r="11" stroke="#c62828" stroke-width="2.2" fill="none"/><circle cx="20" cy="20" r="4" stroke="#c62828" stroke-width="2" fill="none"/><circle cx="20" cy="9" r="2" fill="#c62828"/><circle cx="28" cy="25" r="2" fill="#c62828"/><circle cx="12" cy="25" r="2" fill="#c62828"/>'},
  {n:'Cardan de transmission et joint homocinetique',href:C.embrayage,bg:'#e0f2f1',svg:'<line x1="6" y1="20" x2="16" y2="20" stroke="#004d40" stroke-width="3" stroke-linecap="round"/><circle cx="20" cy="20" r="5" stroke="#004d40" stroke-width="2.2" fill="none"/><line x1="24" y1="20" x2="34" y2="20" stroke="#004d40" stroke-width="3" stroke-linecap="round"/>'},
  {n:'Suspension pneumatique',href:C.suspension,bg:'#e3f2fd',svg:'<rect x="14" y="10" width="12" height="20" rx="6" stroke="#1565c0" stroke-width="2.2" fill="none"/>'},
  {n:"Dispositif d'attelage / accessoires",href:C.entretien,bg:'#fff8e1',svg:'<path d="M6 22L28 22" stroke="#f57f17" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="22" r="4" stroke="#f57f17" stroke-width="2" fill="none"/>'},
  {n:'Boite de vitesse',href:C.embrayage,bg:'#f3e5f5',svg:'<rect x="8" y="12" width="24" height="16" rx="3" stroke="#6a1b9a" stroke-width="2" fill="none"/><circle cx="14" cy="20" r="3" stroke="#6a1b9a" stroke-width="1.8" fill="none"/><circle cx="20" cy="20" r="3" stroke="#6a1b9a" stroke-width="1.8" fill="none"/><circle cx="26" cy="20" r="3" stroke="#6a1b9a" stroke-width="1.8" fill="none"/>'},
  {n:'Climatisation',href:C.clim,bg:'#e0f7fa',svg:'<rect x="8" y="12" width="24" height="16" rx="2" stroke="#006064" stroke-width="2" fill="none"/><path d="M14 15L26 25M14 25L26 15" stroke="#006064" stroke-width="1.5" stroke-linecap="round"/>'},
  {n:'Roulements',href:C.suspension,bg:'#e8eaf6',svg:'<circle cx="20" cy="20" r="12" stroke="#283593" stroke-width="2.2" fill="none"/><circle cx="20" cy="20" r="5" stroke="#283593" stroke-width="3" fill="none"/><circle cx="20" cy="8" r="2.5" fill="#283593"/><circle cx="20" cy="32" r="2.5" fill="#283593"/>'},
  {n:'Arbres de transmission et differentiels',href:C.embrayage,bg:'#fbe9e7',svg:'<line x1="6" y1="20" x2="34" y2="20" stroke="#bf360c" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="20" r="5" stroke="#bf360c" stroke-width="2" fill="none"/><circle cx="28" cy="20" r="5" stroke="#bf360c" stroke-width="2" fill="none"/>'},
  {n:'Capteurs, relais, unites de commande',href:C.allumage,bg:'#e8f5e9',svg:'<rect x="10" y="12" width="20" height="16" rx="2" stroke="#1b5e20" stroke-width="2" fill="none"/><circle cx="16" cy="20" r="2" fill="#1b5e20"/><circle cx="24" cy="20" r="2" fill="#1b5e20"/>'},
  {n:'Accessoires voiture',href:C.accessoires,bg:'#fff3e0',svg:'<path d="M6 24L10 16Q14 10 20 10Q26 10 30 16L34 24L34 28L6 28Z" stroke="#e65100" stroke-width="2" fill="none"/>'},
  {n:'Kits de reparation',href:C.entretien,bg:'#e3f2fd',svg:'<rect x="8" y="16" width="24" height="18" rx="2" stroke="#1565c0" stroke-width="2" fill="none"/><path d="M14 16L14 12Q14 8 20 8Q26 8 26 12L26 16" stroke="#1565c0" stroke-width="2" fill="none"/>'},
  {n:'Outillage et equipement',href:C.outillage,bg:'#ffebee',svg:'<path d="M10 30L24 16" stroke="#b71c1c" stroke-width="3" stroke-linecap="round"/><path d="M24 16Q28 10 32 10Q32 14 26 18" stroke="#b71c1c" stroke-width="2" fill="none" stroke-linecap="round"/>'},
  {n:'Tuyaux et conduites',href:C.moteur,bg:'#e0f2f1',svg:'<path d="M8 26Q8 14 16 14L24 14Q32 14 32 22" stroke="#004d40" stroke-width="3" fill="none" stroke-linecap="round"/>'},
  {n:"Produits de nettoyage et d'entretien",href:C.nettoyage,bg:'#e8eaf6',svg:'<path d="M16 8L16 22Q16 28 20 28Q24 28 24 22L24 8Z" stroke="#283593" stroke-width="2" fill="none"/><path d="M18 8L22 8" stroke="#283593" stroke-width="2.5" stroke-linecap="round"/>'},
  {n:'Eclairage',href:C.eclairage,bg:'#fffde7',svg:'<circle cx="20" cy="18" r="8" stroke="#f9a825" stroke-width="2" fill="none"/><path d="M20 6L20 4M20 30L20 32M8 18L6 18M32 18L34 18" stroke="#f9a825" stroke-width="2" stroke-linecap="round"/>'},
  {n:'Tuning',href:C.accessoires,bg:'#fce4ec',svg:'<path d="M6 28L10 20Q14 12 22 10Q30 8 34 14Q32 22 26 24Q20 26 16 22Q12 26 6 28Z" stroke="#ad1457" stroke-width="2" fill="none"/>'},
  {n:'Fixations',href:C.outillage,bg:'#f3e5f5',svg:'<line x1="20" y1="8" x2="20" y2="28" stroke="#4a148c" stroke-width="3" stroke-linecap="round"/><path d="M14 12L26 12" stroke="#4a148c" stroke-width="2.5" stroke-linecap="round"/>'}
];
var cg=document.getElementById('cg38');
if(cg)CAT.forEach(function(c){cg.innerHTML+='<a class="cg38-tile" href="'+c.href+'"><div class="cg38-img" style="background:'+c.bg+'"><svg width="52" height="52" viewBox="0 0 40 40" fill="none">'+c.svg+'</svg></div><div class="cg38-name">'+c.n+'</div></a>';});

/* === A-Z SIDEBAR === */
var AZ={A:["Actuateur turbo","Additif carburant","Aile","Allumeur","Alternateur","Amortisseur","Amortisseur pneumatique","Arbre a cames","Arbre de transmission","Axe de piston"],B:["Balai d'essuie-glace","Barre stabilisatrice","Batterie","Biellette de barre stabilisatrice","Bobine d'allumage","Boite de vitesse","Bougie d'allumage","Bougie de prechauffage","Butee de suspension","Butee d'embrayage"],C:["Cable d'embrayage","Calculateur moteur ECU","Capteur ABS","Capteur d'arbre a cames","Capteur de temperature","Capteur de vilebrequin","Capteur sonde lambda","Carter d'huile","Catalyseur","Chaine de distribution","Climatiseur compresseur","Courroie de distribution","Cremaillere de direction","Culasse","Cylindre de frein"],D:["Debitmetre d'air MAF","Demarreur","Differentiel","Disque de frein avant","Disque de frein arriere","Durite de radiateur"],E:["Embrayage kit complet","Etrier de frein"],F:["Filtre a air","Filtre a carburant","Filtre a huile","Filtre d'habitacle","Flexible de frein"],G:["Galet enrouleur","Galet tendeur","Garniture de tambour","Groupe moto-ventilateur"],H:["Huile de boite","Huile moteur","Liquide de frein DOT4","Liquide de refroidissement"],I:["Injecteur de carburant","Intercooler"],J:["Joint de cardan","Joint de culasse","Joint spi"],K:["Kit courroie de distribution","Kit d'embrayage","Kit de distribution pompe a eau","Kit filtres entretien"],L:["Leve-vitre moteur","Liquide de refroidissement antigel"],M:["Maitre-cylindre de frein","Moteur d'essuie-glace","Moyeu de roue"],N:["Noix de cardan"],O:["Optique de phare avant","Optique de phare arriere"],P:["Pare-chocs avant","Pare-chocs arriere","Phare projecteur","Plaquettes de frein avant","Plaquettes de frein arriere","Pompe a carburant","Pompe a eau","Pompe a huile","Pot catalytique","Pot d'echappement"],R:["Radiateur","Radiateur de chauffage","Relais","Ressort de suspension avant","Ressort de suspension arriere","Retroviseur exterieur gauche","Retroviseur exterieur droit","Rotule de direction","Roulement de roue avant","Roulement de roue arriere"],S:["Servofrein","Silencieux","Silent-bloc","Sonde lambda","Soufflet de cardan","Stabilisateur"],T:["Tambour de frein","Tendeur de courroie","Thermostat","Triangle de suspension avant","Triangle de suspension arriere","Turbocompresseur","Tuyau d'echappement"],V:["Vanne EGR","Vase d'expansion","Ventilateur de radiateur","Volant bimasse"]};
function buildSb(){var h='';for(var l in AZ){h+='<div class="sbg" data-l="'+l+'"><h4>'+l+'</h4><ul>';AZ[l].forEach(function(x){h+='<li><a href="/search?type=product&q='+encodeURIComponent(x)+'">'+x+'</a></li>';});h+='</ul></div>';}document.getElementById('sb-list').innerHTML=h;}
buildSb();

/* === PRODUCTS FETCH === */
fetch('/products.json?limit=12&sort_by=created-descending').then(function(r){return r.json();}).then(function(d){
  var ps=d.products||[];var h='';
  ps.slice(0,12).forEach(function(p){
    var img=p.images&&p.images.length?'<img src="'+p.images[0].src+'" alt="">':'<svg width="48" height="48" viewBox="0 0 40 40" fill="none"><path d="M5 28L9 28Q11 20 18 18L22 18Q29 20 31 28L35 28L35 32L5 32Z" stroke="#ccc" stroke-width="2" fill="none"/></svg>';
    var price=p.variants&&p.variants.length?parseInt(p.variants[0].price||0).toLocaleString('fr-DZ')+' DZD':'&mdash;';
    h+='<a class="pc" href="/products/'+p.handle+'"><div class="pc-img">'+img+'</div><div class="pc-body"><div class="pc-title">'+p.title+'</div><div class="pc-price">'+price+'</div><div class="pc-btn">Voir le produit</div></div></a>';
  });
  document.getElementById('prods-grid').innerHTML=h||'<p style="color:#999">Aucun produit disponible</p>';
}).catch(function(){document.getElementById('prods-grid').innerHTML='';});
})();
