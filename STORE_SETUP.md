# AutoPièces DZ — Documentation Store Shopify

Store : `fjz1m0-je.myshopify.com`  
Marché cible : Algérie (48 wilayas, Cash à la Livraison)  
Modèle : Autodoc-style  
**Catalogue actuel : ~145 produits actifs**

---

## Actions réalisées (mai 2026)

### 1. Nettoyage
- Suppression de 4 produits démo "Example product"
- Suppression de 8 collections doublons/vides
- Correction des vendeurs erronés sur 3 produits TotalEnergies

### 2. Structure des collections (10 actives)

| Collection | Handle | Produits |
|---|---|---|
| Filtration | `filtration` | 9 |
| Freinage | `freinage` | 9 |
| Huiles & Lubrifiants | `huiles-amp-lubrifiants` | 8 |
| Suspension & Direction | `suspension-amp-direction` | 7 |
| Électrique & Allumage | `electrique` | 6 |
| Distribution & Courroie | `distribution` | 6 |
| Carrosserie & Éclairage | `carrosserie` | 4 |
| Moteur & Transmission | `moteur-amp-transmission` | 2 |
| Refroidissement | `refroidissement` | 1 |
| 🔥 Promotions en cours | smart collection (`compare_at_price > 0`) | dynamique |

### 3. Correction des prix (→ DZD)
- 31 produits Lot 1 convertis EUR → DZD (taux ~145 DZD/EUR)
- 2 produits TotalEnergies convertis (40.49€ → 5 870 DZD, 43.49€ → 6 305 DZD)
- Lot 2 : valeurs DZD déjà correctes (labels seulement à corriger)

### 4. Descriptions standardisées (format Autodoc)
Tous les ~50 produits ont le format :
```
Référence : [REF] | Marque : [MARQUE] | Délai : X–Y jours
Véhicules compatibles : [liste]
Caractéristiques : [specs]
Garantie X an(s). Livraison Cash à la Livraison — 48 wilayas.
```

### 5. Ajout de 35 nouveaux produits (mai 2026 — Lot 3)

| Catégorie | Nouveaux produits |
|---|---|
| Filtration | Purflux LS269A (Renault/Dacia), A1242 (Clio/Megane), AHC212 (Logan/Dacia), Mann W7008 (VW/Seat/Skoda), C27006 (Golf/Polo), Bosch Hyundai/Kia, Mann Toyota, Kit 4 filtres Logan, Mann BMW Série 3/5, Mann Nissan |
| Freinage | Bosch Renault Clio/Megane, Zimmermann 307/308/C4, Ferodo Dacia Logan, TRW VW Golf, Lucas Renault Clio, ATE Mercedes C/E |
| Distribution | Dayco KTB483 Renault Clio, Gates VW Golf 1.4/1.6, Dayco KTB574 Peugeot 207/308 HDI |
| Suspension | Sachs Renault Clio III, Bilstein Dacia Logan/Sandero, Moog VW Golf/Polo, SNR Renault/Dacia, Lemförder Peugeot 206/207, Sachs Peugeot 206/207 |
| Électrique | NGK BKR5E x4 (universel), NGK Iridium (Peugeot/Renault), Delphi Renault Clio, Bosch lambda VW/Seat |
| Moteur | LuK embrayage Renault/Dacia, Elring joint culasse Renault, Calorstat thermostat PSA |
| Huiles | Motul 8100 5W-40 5L, Total Quartz 7000 10W-40 5L |
| Refroidissement | Motul Inugel Optimal –37°C 5L |

**Tags de compatibilité ajoutés (Lot 3)** : Renault Clio/Megane/Scenic/Laguna/Kangoo/Duster, Dacia Sandero/MCV/Duster, Toyota Yaris/Corolla/Hilux, Hyundai i20/i30/Accent/Tucson/ix35/Santa Fe, Kia Rio/Picanto/Sportage/Ceed, BMW Série 3/5, Mercedes Classe C/E, Nissan Micra/Note/Qashqai, Ford Focus/Fiesta, Opel Astra/Corsa/Vectra/Zafira

### Lot 4 — 60 nouveaux produits (couverture par motorisation)

Couverture complète par famille moteur :

| Famille moteur | Pièces ajoutées |
|---|---|
| Renault K9K 1.5 dCi | Filtre huile, filtre air, filtre carburant, kit distribution Gates, kit distrib+pompe Dayco, thermostat, pompe à eau, capteur vilebrequin |
| PSA TU3/TU5 (1.4/1.6 ess) | Kit 4 filtres 206, courroie accessoires, amortisseur AR, kit embrayage Valeo, rotule 207/307/308 |
| VW 1.9/2.0 TDI | Kit 4 filtres TDI, kit distribution 1.9 TDI, kit distribution 2.0 TDI, kit embrayage 1.4/1.6 |
| Renault/Dacia essence 1.4/1.6 | Courroie accessoires, alternateur Valeo 75A, démarreur Valeo |
| Ford 1.4/1.6 TDCi | Filtre huile, plaquettes Focus II/C-Max |
| Opel 1.4/1.6/1.8 | Filtre huile, plaquettes Astra/Corsa |
| Hyundai/Kia | Filtre Tucson/ix35, amortisseur i30/Ceed, bougies i10/i20 Iridium |
| Toyota | Plaquettes Yaris/Corolla, amortisseur Yaris/Corolla |
| BMW diesel M47/M57/N47 | Filtre huile cartouche, disques E90, plaquettes Mercedes |

---

### 6. Système de recherche par véhicule
**Page** : `/pages/recherche-pieces`

- Sélecteurs cascadants : Marque → Modèle → Année → Motorisation
- Décodeur VIN (17 caractères → identification marque + année)
- Base de données : 16 marques × ~50 modèles (Peugeot, Renault, Citroën, Dacia, VW, Hyundai, Kia, Toyota, Ford, Opel, BMW, Mercedes, Skoda, Seat, Nissan)
- Filtrage client-side via tags `compat-*` sur les produits
- Affichage grille des pièces compatibles avec prix DZD

**Tags de compatibilité** (format `compat-[marque]-[modele]`) :
```
compat-peugeot-206    compat-peugeot-207    compat-peugeot-307
compat-peugeot-308    compat-citroen-c3     compat-citroen-c4
compat-renault-logan  compat-renault-clio   compat-renault-megane
compat-dacia-logan    compat-dacia-sandero  compat-volkswagen-golf
compat-volkswagen-polo compat-seat-leon     compat-seat-ibiza
compat-hyundai-i30    compat-hyundai-i20    compat-kia-rio
compat-bmw-serie-3    compat-mercedes-classe-c  compat-universel
... (120+ tags au total)
```

### 6. Navigation
**Menu Principal** (`main-menu-1`) :
1. Rechercher par véhicule → `/pages/recherche-pieces`
2. Filtration
3. Freinage
4. Distribution et Courroie
5. Suspension et Direction
6. Electrique et Allumage
7. Huiles et Lubrifiants
8. Moteur et Transmission
9. Carrosserie et Eclairage
10. Promotions en cours

### 7. Page d'accueil (Home page collection)
9 produits mis en avant :
- Plaquettes Brembo P61040N
- Filtre Mann W712/93 + W811/80
- Kit distribution Gates K015574XS
- Disques Zimmermann Logan
- Amortisseur Bilstein B4
- Kit freinage Bosch
- Démarreur Valeo 438162
- Castrol EDGE 5W-40

### 8. Promotions actives (compareAtPrice)
| Produit | Prix | Prix barré |
|---|---|---|
| Kit freinage Bosch 307/308 | 8 480 DZD | 9 800 DZD |
| Kit distribution Gates K015574XS | 7 830 DZD | 8 900 DZD |
| Kit distribution + pompe Gates | 10 440 DZD | 12 500 DZD |
| Kit 3 filtres PSA | 1 670 DZD | 2 100 DZD |

### 9. Pages du site (6 pages actives)

| Page | Handle | Statut |
|---|---|---|
| Contactez-nous | `contact` | ✅ Contenu complet (horaires, WhatsApp, livraison, retours) |
| Livraison & Délais | `livraison` | ✅ Contenu complet |
| FAQ — Questions fréquentes | `faq` | ✅ Contenu complet |
| Politique de retour | `politique-de-retour` | ✅ Contenu complet |
| À propos d'AutoPièces DZ | `a-propos` | ✅ Contenu complet |
| Rechercher des pièces par véhicule | `recherche-pieces` | ✅ Système de recherche complet |

---

## Actions manuelles restantes

### Obligatoires (API Trial ne permet pas)
1. **Renommer le store** → Admin > Paramètres > Général > "AutoPièces DZ"
2. **Changer la devise EUR → DZD** → Admin > Paramètres > Général > Standards et formats
   - ⚠️ Tous les prix sont déjà en valeurs DZD — le changement de label suffit

### Pour vendre
3. **Upgrader le plan Trial** → Admin > Paramètres > Plan
4. **Double affichage DZD + EUR** → installer "BEST Currency Converter" depuis l'App Store

### Pour améliorer le catalogue
5. **Ajouter des images** aux produits Lot 1 (actuellement sans photo)
6. **Ajouter de nouveaux produits** avec les tags `compat-*` appropriés

---

## Ajouter un nouveau produit compatible

Lors de la création d'un produit, ajouter les tags de compatibilité :
```
compat-peugeot-206, compat-peugeot-207, compat-citroen-c3
```
Le produit apparaîtra automatiquement dans les résultats de recherche.

Pour un produit universel (huiles, liquides) :
```
compat-universel
```

---

## Décodeur VIN — Codes WMI supportés

| Préfixe | Marque |
|---|---|
| VF3 | Peugeot |
| VF7 | Citroën |
| VF1/VF2/VF6 | Renault |
| UU1/UU2 | Dacia |
| WVW/WV1 | Volkswagen |
| WBA/WBX | BMW |
| WDB/WDD | Mercedes |
| TMB | Skoda |
| VSS/VSF | Seat |
| KMH/KMF | Hyundai |
| KNA/KND | Kia |
| JT2/JT3/JTN | Toyota |
| WF0/WF1 | Ford |
| W0L/W0V | Opel |
