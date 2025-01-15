export type Locations = {
  name: string
  coords: number[]
  info: string
  country: string
}

export type LocationsData = {
  [locale: string]: Locations[]
}

const locationsData = {
  fr: [
    {
      "name": "Palais Al Wajba (Doha, Qatar)",
      "coords": [25.2798, 51.5074],
      "info": "Revêtement de la coupole et des colonnes en mosaïque de marbre et travertin. 350 m2. Revêtement sol de la place d'accueil en mosaïque de 10/20 mm. 3200 m2. Alberto PINTO (intérieur design).",
      "country": "Qatar"
    },
    {
      "name": "Palais du Prince Khaled bin Sultan (Riyadh, Arabie Saoudite)",
      "coords": [24.6333, 46.7167],
      "info": "Réalisation d’une mosaique murale d’éclats de marbre et galets naturels de Grenade. 1200 pièces, 120m2. Alberto PINTO (intérieur design).",
      "country": "Arabie Saoudite"
    },
    {
      "name": "Place de l'hôtel de ville de Chambery, France",
      "coords": [45.5643, 5.9115],
      "info": "5200 m2, Pavés 8/10 et Dalles porphyre.",
      "country": "France"
    },
    {
      "name": "Centre culturel André Malraux, Chambery, France",
      "coords": [45.5648, 5.9181],
      "info": "3000 m2, Pavés 6/8 et Dalles porphyre. Architecte Mario Botta.",
      "country": "France"
    },
    {
      "name": "Centre international d'art contemporain et du paysage de Vassivière (France)",
      "coords": [45.7032, 1.8006],
      "info": "150 m2, Pavés sciés en Granite rouge du Limousin. Architecte Aldo Rossi.",
      "country": "France"
    },
    {
      "name": "Dar Noujoum, Marrakech, Maroc",
      "coords": [31.6348, -7.9986],
      "info": "Mosaïque de galets et tesselles. Mosaïque du patio en galets de Sidi Kaouki. Bill Willis designer.",
      "country": "Maroc"
    },
    {
      "name": "Al Khaldia / Fahd ben Abdelaziz Al Saoud (Marbella, Espagne)",
      "coords": [36.5025, -4.8928],
      "info": "Frises en mosaïque de galets naturels d'Essaouira (cinq couleurs). 350 ML. Alberto PINTO (intérieur design).",
      "country": "Espagne"
    },
    {
      "name": "Le Parc Cimetière Paysager du Grand Lyon (France)",
      "coords": [45.7772, 4.8182],
      "info": "Pavés porphyre 6/8. 5200 m2.",
      "country": "France"
    },
    {
      "name": "Rose Pourpre (Marrakech, Maroc)",
      "coords": [31.6295, -7.9997],
      "info": "Mosaïque de tesselles de marbre (Venus au bain) 30m2, mosaïque de tesselles et galets naturels 17 m2, mosaïque de tesselle de marbre blanc et rouge de Veronne, 70 m2. Places, chaussées et allées de jardin en pavé de pierre de l’Ourika 700 m2. Dg Design.",
      "country": "Maroc"
    },
    {
      "name": "Villefranche-de-Rouergue, Occitanie (France)",
      "coords": [44.4611, 2.5058],
      "info": "Rue de la cathédrale, pavé 6x8 granite et Leptinite du Limousin. 2500 m2.",
      "country": "France"
    },
    {
      "name": "Casa Mabara (Marbella, Espagne)",
      "coords": [36.5085, -4.8775],
      "info": "Chaussées, place et allées de jardin en mosaïque de galets noirs et blancs de Grenade (Empedrado Granadino fino). 2500 m2. Réalisation de jeux d’eau, séguias, et de 12 fontaines (copies de l'Alhambra).",
      "country": "Espagne"
    },
    {
      "name": "Santa Lucia (Cassis, France)",
      "coords": [43.2194, 5.5436],
      "info": "Réalisation de la chaussée et des terrasses en porphyre 6/8 et dalles de 40 cms en pierre de Bourgogne 800 m². Création et réalisation de 4 mosaïques de tesselles de marbre et galets noirs de Grenade (Mosaïque de Bacchus, mosaïque d’Italica, mosaïque d’Adrien et mosaïque de Santa Lucia SL). Dg Design.",
      "country": "France"
    },
    {
      "name": "Village médiéval d'Oberbronn (Alsace, France)",
      "coords": [48.8872, 7.3756],
      "info": "Pavé 4x6, 6x8, 8x10 en grès rose des Vosges, 6000 m2.",
      "country": "France"
    },
    {
      "name": "Beach House (Athènes, Grèce)",
      "coords": [37.9539, 23.698],
      "info": "Frises de mosaïques de galets noirs de Grenade. Alberto PINTO (intérieur design).",
      "country": "Grèce"
    },
    {
      "name": "Casa Tania (Marbella, Espagne)",
      "coords": [36.5201, -4.8886],
      "info": "Réalisation de places et chaussées en granite éclaté 6/8. 700 m². Or design.",
      "country": "Espagne"
    },
    {
      "name": "Villa Camara (St Tropez, France)",
      "coords": [43.2671, 6.6408],
      "info": "Mosaïque de galets bruns beiges (modules 35 cm / queues de paons avec frises en épis de galet verts, blancs, et lie de vin du Maroc). 80 m². Dg Design.",
      "country": "France"
    },
    {
      "name": "Place de La Fontaine du Chevrier de Neuvic (Corrèze, France)",
      "coords": [45.4379, 1.1144],
      "info": "Pavé Granite 6x8, 350 m2.",
      "country": "France"
    },
    {
      "name": "Château Marravenne (Var, France)",
      "coords": [43.2255, 6.1168],
      "info": "Réalisation du blason de Marravenne (12 m²) en galets naturels d'Essaouira (cinq couleurs). Dg Design.",
      "country": "France"
    },
    {
      "name": "Château de Ronzière (Beaujolais, France)",
      "coords": [45.9678, 4.7304],
      "info": "Réalisation des revêtements extérieurs (places, allées, terrasses) en galets de Saône et granite jaune du Vietnam 10/15 flammé. 450 m².",
      "country": "France"
    },
    {
      "name": "Château de Brantes (Avignon, France)",
      "coords": [43.9043, 4.8357],
      "info": "Réalisation d'une mosaïque en hommage aux frères Montgolfier. 25 m².",
      "country": "France"
    },
    {
      "name": "Villa Cologny (Genève, Suisse)",
      "coords": [46.1943, 6.2248],
      "info": "Réalisation de la chaussée et des terrasses en porphyre 6/8 et dalles de 25 cms.",
      "country": "Suisse"
    },
    {
      "name": "Château de Quélus (Minervois, France)",
      "coords": [43.2273, 2.7088],
      "info": "Mosaïque de galets (blason de Quélus). Galets naturels de Minerve (5 m²).",
      "country": "France"
    },
    {
      "name": "Maison de Matisse (La Roche de Glun, France)",
      "coords": [45.0986, 4.8114],
      "info": "Mosaïque de galets bruns beiges (damier de 75 cm, calade provençale). 95 m².",
      "country": "France"
    },
    {
      "name": "La Bastide de Sanary s/mer (Var, France)",
      "coords": [43.1042, 5.1308],
      "info": "Mosaïque de galets bruns beiges (motif circulaire et losange, calade provençale). 230 m².",
      "country": "France"
    },
    {
      "name": "Villa Ondine St Paul de Vence (France)",
      "coords": [43.7023, 7.1145],
      "info": "Mosaïque de galets gris-bleus, blancs, lie de vin, noirs, et bruns beiges (blason de St Paul de Vence). Chaussée et place d'accueil en pavés porphyre 6/8, 4200 m². Dg Design.",
      "country": "France"
    },
    {
      "name": "Abbatiale de Rabastens (France)",
      "coords": [43.9454, 1.6561],
      "info": "Mosaïque de galets toutes couleurs en motifs circulaires avec structurantes de Leptinite rouge-feu. 230 m².",
      "country": "France"
    },
    {
      "name": "École Nouvelle de Marne la Vallée (France)",
      "coords": [48.8056, 2.6299],
      "info": "Torrent de galets gris bleus (Jardin japonais), architecte M. JANNEL (Gimko conseil).",
      "country": "France"
    },
    {
      "name": "Château de Seyssel (XIIème siècle, France)",
      "coords": [45.9519, 5.8997],
      "info": "Pavés 8/10 et dalles de 40 cm en granit jaune du Vietnam. 1200 m².",
      "country": "France"
    },
    {
      "name": "Hotel des Milles et une Nuits (Marrakech, Maroc)",
      "coords": [31.6258, -7.9899],
      "info": "Mosaique de galets dans hammam (galets blancs, lie de vin, verts, noirs). Etoiles et arabesques. 30 m².",
      "country": "Maroc"
    },
    {
      "name": "L'Art du Jardin 95 (Parc de St Cloud, Paris)",
      "coords": [48.857, 2.187],
      "info": "Création de mosaiques pour les revues CÔTE SUD & DETOUR EN FRANCE. 25 m².",
      "country": "France"
    },
    {
      "name": "Château de Sainte Croix (Dombes, France)",
      "coords": [46.0393, 5.1369],
      "info": "Plage de piscine en galets blancs de Bresse. 220 m².",
      "country": "France"
    },
    {
      "name": "Villa Ledoux (Annemasse, France)",
      "coords": [46.2001, 6.2437],
      "info": "Mosaique de galets blancs et bruns avec motifs (Arabesques). 28 m².",
      "country": "France"
    },
    {
      "name": "Villa Ambassadeur (Palmeraie de Marrakech, Maroc)",
      "coords": [31.6639, -7.9819],
      "info": "Mosaique de galets blancs, lie de vin et noirs d'Essaouira avec motifs (Moucharabies). 50 m².",
      "country": "Maroc"
    },
    {
      "name": "Villa Wrobel (St Tropez, France)",
      "coords": [43.2682, 6.6424],
      "info": "Mosaique de galets blancs et bruns avec motifs (Arabesques). 75 m².",
      "country": "France"
    },
    {
      "name": "Villa Neptune (Perpignan, France)",
      "coords": [42.6987, 2.8955],
      "info": "Le trident de Neptune, mosaique de galets grecques blancs et noirs.",
      "country": "France"
    },
    {
      "name": "Villa aux Lions (Marbella, Espagne)",
      "coords": [36.5123, -4.88],
      "info": "Mosaique de galets blancs et noirs de Grenade (Arabesques). 580 m².",
      "country": "Espagne"
    },
    {
      "name": "Fountain House (Marbella, Espagne)",
      "coords": [36.5135, -4.885],
      "info": "Projet et réalisation des extérieurs. Marbre, mosaïques, fontaines Romaines, bassins. 500 m².",
      "country": "Espagne"
    },
    {
      "name": "Gadalmina Beach (Marbella, Espagne)",
      "coords": [36.5195, -5.025],
      "info": "Projet et réalisation des extérieurs (Mosaïques de Porphyre). 250 m².",
      "country": "Espagne"
    },
    {
      "name": "Vasary Office (Puerto Bañus, Espagne)",
      "coords": [36.4967, -4.9469],
      "info": "Réalisation du Logo Vasary en mosaïque de tesselles de marbre brun et galets noirs de Grenade. 4 m².",
      "country": "Espagne"
    },
    {
      "name": "Villa Sierra Blanca (Marbella, Espagne)",
      "coords": [36.4983, -4.9252],
      "info": "Mosaique d'éclats de marbre blanc et rouge d'Almeria (Arabesques). 50 m². Tadelakt 700 m².",
      "country": "Espagne"
    },
    {
      "name": "Villa Gomez (Marbella, Espagne)",
      "coords": [36.5074, -4.886],
      "info": "Mosaique d'éclats de marbre blanc et rouge d'Almeria (Arabesques). 120 m².",
      "country": "Espagne"
    },
    {
      "name": "Villa Garavan (Menton, France)",
      "coords": [43.7805, 7.5103],
      "info": "Mosaique de marbre blancs, rouge et galets noirs polis de Grenade (Empedrado Granadino fino): 375 m². Calades provençales 160 m².",
      "country": "France"
    },
    {
      "name": "Villa Oasis (Marrakech, Maroc)",
      "coords": [31.6655, -8.0],
      "info": "Série de gueridons pour Yves St Laurent & Mosaiques de tesselle de marbre.",
      "country": "Maroc"
    },
    {
      "name": "Villa 'Augusta' (St Paul Trois Châteaux, France)",
      "coords": [44.2401, 4.7323],
      "info": "Mosaïque de tesselles de marbre (frises et bassin), 80 ml, 12 m².",
      "country": "France"
    },
    {
      "name": "Villa Privat (Narbonne, France)",
      "coords": [43.1821, 3.0031],
      "info": "Mosaïques Marocaine (Zelliges Beldi de Fez). Piscine, plage, allées de jardin et fontaine murale. 220 m².",
      "country": "France"
    },
    {
      "name": "Riad Khemis (Marrakech, Maroc)",
      "coords": [31.6235, -7.9995],
      "info": "Mosaïque 'des soleils', mosaique de tesselles de marbre et galets naturels (Bill Willis designer). 25 m².",
      "country": "Maroc"
    },
    {
      "name": "Résidence Princière: Palmeraie de Marrakech (Maroc)",
      "coords": [31.662, -8.0007],
      "info": "Route d'accès en galets calibrés 8/10 roses et blancs avec insertion de motifs & frises en galets 6/8 noirs. Tapis de galets 2/4 noirs et blancs d'Essaouira. 500 m².",
      "country": "Maroc"
    },
    {
      "name": "Compas Stone International (U.S.A)",
      "coords": [40.7485, -73.9857],
      "info": "Emblémas (frises & guéridons).",
      "country": "U.S.A"
    },
    {
      "name": "Hôtel Restaurant le 'Koudou' Marrakech (Maroc)",
      "coords": [31.6301, -7.9875],
      "info": "Revêtements muraux et sols en marbre marocain & réalisation des revêtements extérieurs en pierres et galets. Mosaïque du pont aux flamands: Petits galets de marbre rose et noir. 800 m².",
      "country": "Maroc"
    },
    {
      "name": "Riad Dar Alif (Marrakech, Maroc)",
      "coords": [31.6275, -8.0045],
      "info": "Aménagement et décoration du grand patio piscine. Décoration végétale, bassin, Tadelakt, zellige, mobilier, éclairage, voilage et tissus.",
      "country": "Maroc"
    },
  ],
  en: [
    {
      "name": "Al Wajba Palace (Doha, Qatar)",
      "coords": [25.2798, 51.5074],
      "info": "Dome and column cladding with marble and travertine mosaic. 350 m². Reception square floor cladding with 10/20 mm mosaic. 3200 m². Alberto PINTO (interior design).",
      "country": "Qatar"
    },
    {
      "name": "Prince Khaled bin Sultan Palace (Riyadh, Saudi Arabia)",
      "coords": [24.6333, 46.7167],
      "info": "Wall mosaic of marble shards and natural pebbles from Granada. 1200 pieces, 120 m². Alberto PINTO (interior design).",
      "country": "Saudi Arabia"
    },
    {
      "name": "City Hall Square of Chambery, France",
      "coords": [45.5643, 5.9115],
      "info": "5200 m², 8/10 paving stones and porphyry slabs.",
      "country": "France"
    },
    {
      "name": "André Malraux Cultural Center, Chambery, France",
      "coords": [45.5648, 5.9181],
      "info": "3000 m², 6/8 paving stones and porphyry slabs. Architect Mario Botta.",
      "country": "France"
    },
    {
      "name": "International Center for Contemporary Art and Landscape of Vassivière (France)",
      "coords": [45.7032, 1.8006],
      "info": "150 m², sawed paving stones in red granite from Limousin. Architect Aldo Rossi.",
      "country": "France"
    },
    {
      "name": "Dar Noujoum, Marrakech, Morocco",
      "coords": [31.6348, -7.9986],
      "info": "Pebble and tesserae mosaic. Patio mosaic made with Sidi Kaouki pebbles. Bill Willis designer.",
      "country": "Morocco"
    },
    {
      "name": "Al Khaldia / Fahd bin Abdulaziz Al Saud (Marbella, Spain)",
      "coords": [36.5025, -4.8928],
      "info": "Natural pebble friezes from Essaouira (five colors). 350 linear meters. Alberto PINTO (interior design).",
      "country": "Spain"
    },
    {
      "name": "Grand Lyon Landscaped Cemetery Park (France)",
      "coords": [45.7772, 4.8182],
      "info": "Porphyry paving stones 6/8. 5200 m².",
      "country": "France"
    },
    {
      "name": "Purple Rose (Marrakech, Morocco)",
      "coords": [31.6295, -7.9997],
      "info": "Marble tesserae mosaic (Venus at her bath) 30 m², mosaic of tesserae and natural pebbles 17 m², white and red marble tesserae mosaic from Verona, 70 m². Squares, roads, and garden paths in Ourika stone paving 700 m². DG Design.",
      "country": "Morocco"
    },
    {
      "name": "Villefranche-de-Rouergue, Occitanie (France)",
      "coords": [44.4611, 2.5058],
      "info": "Cathedral street, 6x8 granite and Limousin leptynite paving. 2500 m².",
      "country": "France"
    },
    {
      "name": "Casa Mabara (Marbella, Spain)",
      "coords": [36.5085, -4.8775],
      "info": "Roads, squares, and garden paths with black and white pebble mosaic from Granada (fine Empedrado Granadino). 2500 m². Creation of water features, seguias, and 12 fountains (copies of Alhambra).",
      "country": "Spain"
    },
    {
      "name": "Santa Lucia (Cassis, France)",
      "coords": [43.2194, 5.5436],
      "info": "Roads and terraces made with porphyry 6/8 paving stones and 40 cm Burgundy stone slabs, 800 m². Creation of 4 tesserae and black pebble mosaics from Granada (Bacchus mosaic, Italica mosaic, Adrian mosaic, and Santa Lucia mosaic SL). DG Design.",
      "country": "France"
    },
    {
      "name": "Medieval Village of Oberbronn (Alsace, France)",
      "coords": [48.8872, 7.3756],
      "info": "4x6, 6x8, 8x10 paving stones in pink Vosges sandstone, 6000 m².",
      "country": "France"
    },
    {
      "name": "Beach House (Athens, Greece)",
      "coords": [37.9539, 23.698],
      "info": "Friezes of black pebble mosaics from Granada. Alberto PINTO (interior design).",
      "country": "Greece"
    },
    {
      "name": "Casa Tania (Marbella, Spain)",
      "coords": [36.5201, -4.8886],
      "info": "Squares and roads paved with 6/8 split granite. 700 m². Or design.",
      "country": "Spain"
    },
    {
      "name": "Villa Camara (St Tropez, France)",
      "coords": [43.2671, 6.6408],
      "info": "Brown-beige pebble mosaics (35 cm modules / peacock tails with friezes of green, white, and wine-colored Moroccan pebbles). 80 m². DG Design.",
      "country": "France"
    },
    {
      "name": "Fontaine du Chevrier Square in Neuvic (Corrèze, France)",
      "coords": [45.4379, 1.1144],
      "info": "Granite paving 6x8, 350 m².",
      "country": "France"
    },
    {
      "name": "Marravenne Castle (Var, France)",
      "coords": [43.2255, 6.1168],
      "info": "Creation of Marravenne crest (12 m²) in natural Essaouira pebbles (five colors). DG Design.",
      "country": "France"
    },
    {
      "name": "Villa Cologny (Geneva, Switzerland)",
      "coords": [46.1943, 6.2248],
      "info": "Construction of pavement and terraces using porphyry 6/8 and 25 cm slabs.",
      "country": "Switzerland"
    },
    {
      "name": "Château de Quélus (Minervois, France)",
      "coords": [43.2273, 2.7088],
      "info": "Pebble mosaic featuring the Quélus coat of arms. Natural pebbles from Minerve (5 m²).",
      "country": "France"
    },
    {
      "name": "Matisse's House (La Roche de Glun, France)",
      "coords": [45.0986, 4.8114],
      "info": "Brown and beige pebble mosaic (75 cm checkerboard, Provençal calade). 95 m².",
      "country": "France"
    },
    {
      "name": "Bastide of Sanary-sur-Mer (Var, France)",
      "coords": [43.1042, 5.1308],
      "info": "Brown and beige pebble mosaic (circular and diamond patterns, Provençal calade). 230 m².",
      "country": "France"
    },
    {
      "name": "Villa Ondine (Saint-Paul-de-Vence, France)",
      "coords": [43.7023, 7.1145],
      "info": "Gray-blue, white, burgundy, black, and beige pebble mosaic featuring the Saint-Paul-de-Vence coat of arms. Pavement and reception area in 6/8 porphyry cobblestones, 4,200 m². Design by DG Design.",
      "country": "France"
    },
    {
      "name": "Rabastens Abbey (France)",
      "coords": [43.9454, 1.6561],
      "info": "Multi-colored pebble mosaic with circular patterns highlighted by red-flame Leptinite structures. 230 m².",
      "country": "France"
    },
    {
      "name": "New School of Marne-la-Vallée (France)",
      "coords": [48.8056, 2.6299],
      "info": "Gray-blue pebble torrent (Japanese garden). Architect: M. Jannel (Gimko Conseil).",
      "country": "France"
    },
    {
      "name": "Château de Seyssel (12th Century, France)",
      "coords": [45.9519, 5.8997],
      "info": "8/10 cobblestones and 40 cm slabs in yellow granite from Vietnam. 1,200 m².",
      "country": "France"
    },
    {
      "name": "Hotel 'Mille et Une Nuits' (Marrakech, Morocco)",
      "coords": [31.6258, -7.9899],
      "info": "Pebble mosaics in the hammam (white, burgundy, green, and black pebbles). Stars and arabesques. 30 m².",
      "country": "Morocco"
    },
    {
      "name": "Art du Jardin 95 (Saint-Cloud Park, Paris)",
      "coords": [48.857, 2.187],
      "info": "Creation of mosaics for the magazines *CÔTE SUD* and *DETOUR EN FRANCE*. 25 m².",
      "country": "France"
    },
    {
      "name": "Château de Sainte Croix (Dombes, France)",
      "coords": [46.0393, 5.1369],
      "info": "White pebble beach from Bresse. 220 m².",
      "country": "France"
    },
    {
      "name": "Villa Ledoux (Annemasse, France)",
      "coords": [46.2001, 6.2437],
      "info": "Mosaic of white and brown pebbles with patterns (Arabesques). 28 m².",
      "country": "France"
    },
    {
      "name": "Villa Ambassadeur (Palmeraie de Marrakech, Morocco)",
      "coords": [31.6639, -7.9819],
      "info": "Mosaic of white, wine-red, and black Essaouira pebbles with patterns (Moucharabies). 50 m².",
      "country": "Morocco"
    },
    {
      "name": "Villa Wrobel (St Tropez, France)",
      "coords": [43.2682, 6.6424],
      "info": "Mosaic of white and brown pebbles with patterns (Arabesques). 75 m².",
      "country": "France"
    },
    {
      "name": "Villa Neptune (Perpignan, France)",
      "coords": [42.6987, 2.8955],
      "info": "Neptune's trident, mosaic of white and black Greek pebbles.",
      "country": "France"
    },
    {
      "name": "Villa aux Lions (Marbella, Spain)",
      "coords": [36.5123, -4.88],
      "info": "Mosaic of white and black Granada pebbles (Arabesques). 580 m².",
      "country": "Spain"
    },
    {
      "name": "Fountain House (Marbella, Spain)",
      "coords": [36.5135, -4.885],
      "info": "Exterior project and execution. Marble, mosaics, Roman fountains, ponds. 500 m².",
      "country": "Spain"
    },
    {
      "name": "Gadalmina Beach (Marbella, Spain)",
      "coords": [36.5195, -5.025],
      "info": "Exterior project and execution (Porphyry mosaics). 250 m².",
      "country": "Spain"
    },
    {
      "name": "Vasary Office (Puerto Bañus, Spain)",
      "coords": [36.4967, -4.9469],
      "info": "Realization of the Vasary logo in mosaic with brown marble tiles and black Granada pebbles. 4 m².",
      "country": "Spain"
    },
    {
      "name": "Villa Sierra Blanca (Marbella, Spain)",
      "coords": [36.4983, -4.9252],
      "info": "Mosaic of white and red Almeria marble shards (Arabesques). 50 m². Tadelakt 700 m².",
      "country": "Spain"
    },
    {
      "name": "Villa Gomez (Marbella, Spain)",
      "coords": [36.5074, -4.886],
      "info": "Mosaic of white and red Almeria marble shards (Arabesques). 120 m².",
      "country": "Spain"
    },
    {
      "name": "Villa Garavan (Menton, France)",
      "coords": [43.7805, 7.5103],
      "info": "Mosaic of white, red marble, and polished black Granada pebbles (Empedrado Granadino fino): 375 m². Provençal pebbling 160 m².",
      "country": "France"
    },
    {
      "name": "Villa Oasis (Marrakech, Morocco)",
      "coords": [31.6655, -8.0],
      "info": "Series of side tables for Yves St Laurent & mosaic marble tiles.",
      "country": "Morocco"
    },
    {
      "name": "Villa 'Augusta' (St Paul Trois Châteaux, France)",
      "coords": [44.2401, 4.7323],
      "info": "Mosaic of marble tiles (friezes and pool), 80 linear meters, 12 m².",
      "country": "France"
    },
    {
      "name": "Villa Privat (Narbonne, France)",
      "coords": [43.1821, 3.0031],
      "info": "Moroccan mosaics (Zelliges Beldi from Fez). Pool, beach, garden paths, and wall fountain. 220 m².",
      "country": "France"
    },
    {
      "name": "Riad Khemis (Marrakech, Morocco)",
      "coords": [31.6235, -7.9995],
      "info": "'Sun' mosaic, mosaic of marble tiles and natural pebbles (Bill Willis designer). 25 m².",
      "country": "Morocco"
    },
    {
      "name": "Princely Residence: Palmeraie of Marrakech (Morocco)",
      "coords": [31.662, -8.0007],
      "info": "Access road with calibrated 8/10 pink and white pebbles featuring motifs & friezes in 6/8 black pebbles. Pebble carpet 2/4 black and white Essaouira pebbles. 500 m².",
      "country": "Morocco"
    },
    {
      "name": "Compas Stone International (USA)",
      "coords": [40.7485, -73.9857],
      "info": "Emblems (friezes & side tables).",
      "country": "USA"
    },
    {
      "name": "Hotel Restaurant 'Koudou' Marrakech (Morocco)",
      "coords": [31.6301, -7.9875],
      "info": "Wall and floor coverings in Moroccan marble & realization of outdoor coverings in stones and pebbles. Flamingo Bridge mosaic: Small pink and black marble pebbles. 800 m².",
      "country": "Morocco"
    },
    {
      "name": "Riad Dar Alif (Marrakech, Morocco)",
      "coords": [31.6275, -8.0045],
      "info": "Arrangement and decoration of the grand patio pool. Vegetation decoration, basin, Tadelakt, zellige, furniture, lighting, curtains, and fabrics.",
      "country": "Morocco"
    },
  ],
}

export { locationsData }