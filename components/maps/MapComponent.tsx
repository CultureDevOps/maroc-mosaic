"use client"
import { MapContainer, TileLayer, Polyline, Popup, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet-defaulticon-compatibility"

const MapComponent = () => {
  // Définir les hubs et les tracés (par exemple, les points de départ des voyages)
  const locations = [
    {
      name: "Palais Al Wajba (Doha, Qatar)",
      coords: [25.2798, 51.5074],
      info: "Revêtement de la coupole et des colonnes en mosaïque de marbre et travertin. 350 m2. Revêtement sol de la place d'accueil en mosaïque de 10/20 mm. 3200 m2. Alberto PINTO (intérieur design).",
    },
    {
      name: "Palais du Prince Khaled bin Sultan (Riyadh, Arabie Saoudite)",
      coords: [24.6333, 46.7167],
      info: "Réalisation d’une mosaique murale d’éclats de marbre et galets naturels de Grenade. 1200 pièces, 120m2. Alberto PINTO (intérieur design).",
    },
    {
      name: "Place de l'hôtel de ville de Chambery, France",
      coords: [45.5643, 5.9115],
      info: "5200 m2, Pavés 8/10 et Dalles porphyre.",
    },
    {
      name: "Centre culturel André Malraux, Chambery, France",
      coords: [45.5648, 5.9181],
      info: "3000 m2, Pavés 6/8 et Dalles porphyre. Architecte Mario Botta.",
    },
    {
      name: "Centre international d'art contemporain et du paysage de Vassivière (France)",
      coords: [45.7032, 1.8006],
      info: "150 m2, Pavés sciés en Granite rouge du Limousin. Architecte Aldo Rossi.",
    },
    {
      name: "Dar Noujoum, Marrakech, Maroc",
      coords: [31.6348, -7.9986],
      info: "Mosaïque de galets et tesselles. Mosaïque du patio en galets de Sidi Kaouki. Bill Willis designer.",
    },
    {
      name: "Al Khaldia / Fahd ben Abdelaziz Al Saoud (Marbella, Espagne)",
      coords: [36.5025, -4.8928],
      info: "Frises en mosaïque de galets naturels d'Essaouira (cinq couleurs). 350 ML. Alberto PINTO (intérieur design).",
    },
    {
      name: "Le Parc Cimetière Paysager du Grand Lyon (France)",
      coords: [45.7772, 4.8182],
      info: "Pavés porphyre 6/8. 5200 m2.",
    },
    {
      name: "Rose Pourpre (Marrakech, Maroc)",
      coords: [31.6295, -7.9997],
      info: "Mosaïque de tesselles de marbre (Venus au bain) 30m2, mosaïque de tesselles et galets naturels 17 m2, mosaïque de tesselle de marbre blanc et rouge de Veronne, 70 m2. Places, chaussées et allées de jardin en pavé de pierre de l’Ourika 700 m2. Dg Design.",
    },
    {
      name: "Villefranche-de-Rouergue, Occitanie (France)",
      coords: [44.4611, 2.5058],
      info: "Rue de la cathédrale, pavé 6x8 granite et Leptinite du Limousin. 2500 m2.",
    },
    {
      name: "Casa Mabara (Marbella, Espagne)",
      coords: [36.5085, -4.8775],
      info: "Chaussées, place et allées de jardin en mosaïque de galets noirs et blancs de Grenade (Empedrado Granadino fino). 2500 m2. Réalisation de jeux d’eau, séguias, et de 12 fontaines (copies de l'Alhambra).",
    },
    {
      name: "Santa Lucia (Cassis, France)",
      coords: [43.2194, 5.5436],
      info: "Réalisation de la chaussée et des terrasses en porphyre 6/8 et dalles de 40 cms en pierre de Bourgogne 800 m². Création et réalisation de 4 mosaïques de tesselles de marbre et galets noirs de Grenade (Mosaïque de Bacchus, mosaïque d’Italica, mosaïque d’Adrien et mosaïque de Santa Lucia SL). Dg Design.",
    },
    {
      name: "Village médiéval d'Oberbronn (Alsace, France)",
      coords: [48.8872, 7.3756],
      info: "Pavé 4x6, 6x8, 8x10 en grès rose des Vosges, 6000 m2.",
    },
    {
      name: "Beach House (Athènes, Grèce)",
      coords: [37.9539, 23.698],
      info: "Frises de mosaïques de galets noirs de Grenade. Alberto PINTO (intérieur design).",
    },
    {
      name: "Casa Tania (Marbella, Espagne)",
      coords: [36.5201, -4.8886],
      info: "Réalisation de places et chaussées en granite éclaté 6/8. 700 m². Or design.",
    },
    {
      name: "Villa Camara (St Tropez, France)",
      coords: [43.2671, 6.6408],
      info: "Mosaïque de galets bruns beiges (modules 35 cm / queues de paons avec frises en épis de galet verts, blancs, et lie de vin du Maroc). 80 m². Dg Design.",
    },
    {
      name: "Place de La Fontaine du Chevrier de Neuvic (Corrèze, France)",
      coords: [45.4379, 1.1144],
      info: "Pavé Granite 6x8, 350 m2.",
    },
    {
      name: "Château Marravenne (Var, France)",
      coords: [43.2255, 6.1168],
      info: "Réalisation du blason de Marravenne (12 m²) en galets naturels d'Essaouira (cinq couleurs). Dg Design.",
    },
    {
      name: "Château de Ronzière (Beaujolais, France)",
      coords: [45.9678, 4.7304],
      info: "Réalisation des revêtements extérieurs (places, allées, terrasses) en galets de Saône et granite jaune du Vietnam 10/15 flammé. 450 m².",
    },
    {
      name: "Château de Brantes (Avignon, France)",
      coords: [43.9043, 4.8357],
      info: "Réalisation d'une mosaïque en hommage aux frères Montgolfier. 25 m².",
    },
    {
      name: "Villa Cologny (Genève, Suisse)",
      coords: [46.1943, 6.2248],
      info: "Réalisation de la chaussée et des terrasses en porphyre 6/8 et dalles de 25 cms.",
    },
    {
      name: "Château de Quélus (Minervois, France)",
      coords: [43.2273, 2.7088],
      info: "Mosaïque de galets (blason de Quélus). Galets naturels de Minerve (5 m²).",
    },
    {
      name: "Maison de Matisse (La Roche de Glun, France)",
      coords: [45.0986, 4.8114],
      info: "Mosaïque de galets bruns beiges (damier de 75 cm, calade provençale). 95 m².",
    },
    {
      name: "La Bastide de Sanary s/mer (Var, France)",
      coords: [43.1042, 5.1308],
      info: "Mosaïque de galets bruns beiges (motif circulaire et losange, calade provençale). 230 m².",
    },
    {
      name: "Villa Ondine St Paul de Vence (France)",
      coords: [43.7023, 7.1145],
      info: "Mosaïque de galets gris-bleus, blancs, lie de vin, noirs, et bruns beiges (blason de St Paul de Vence). Chaussée et place d'accueil en pavés porphyre 6/8, 4200 m2. Dg Design.",
    },
    {
      name: "Abbatiale de Rabastens (France)",
      coords: [43.9454, 1.6561],
      info: "Mosaïque de galets toutes couleurs en motifs circulaires avec structurantes de Leptinite rouge-feu. 230 m².",
    },
    {
      name: "École Nouvelle de Marne la Vallée (France)",
      coords: [48.8056, 2.6299],
      info: "Torrent de galets gris bleus (Jardin japonais), architecte M. JANNEL (Gimko conseil).",
    },
    {
      name: "Château de Seyssel (XIIème siècle, France)",
      coords: [45.9519, 5.8997],
      info: "Pavés 8/10 et dalles de 40 cm en granit jaune du Vietnam. 1200 m².",
    },
    {
      name: "Hotel des Milles et une Nuits (Marrakech, Maroc)",
      coords: [31.6258, -7.9899],
      info: "Mosaique de galets dans hammam (galets blancs, lie de vin, verts, noirs). Etoiles et arabesques. 30 m².",
    },
    {
      name: "L'Art du Jardin 95 (Parc de St Cloud, Paris)",
      coords: [48.857, 2.187],
      info: "Création de mosaiques pour les revues CÔTE SUD & DETOUR EN FRANCE. 25 m².",
    },
    {
      name: "Château de Sainte Croix (Dombes, France)",
      coords: [46.0393, 5.1369],
      info: "Plage de piscine en galets blancs de Bresse. 220 m².",
    },
    {
      name: "Villa Ledoux (Annemasse, France)",
      coords: [46.2001, 6.2437],
      info: "Mosaique de galets blancs et bruns avec motifs (Arabesques). 28 m².",
    },
    {
      name: "Villa Ambassadeur (Palmeraie de Marrakech, Maroc)",
      coords: [31.6639, -7.9819],
      info: "Mosaique de galets blancs, lie de vin et noirs d'Essaouira avec motifs (Moucharabies). 50 m².",
    },
    {
      name: "Villa Wrobel (St Tropez, France)",
      coords: [43.2682, 6.6424],
      info: "Mosaique de galets blancs et bruns avec motifs (Arabesques). 75 m².",
    },
    {
      name: "Villa Neptune (Perpignan, France)",
      coords: [42.6987, 2.8955],
      info: "Le trident de Neptune, mosaique de galets grecques blancs et noirs.",
    },
    {
      name: "Villa aux Lions (Marbella, Espagne)",
      coords: [36.5123, -4.88],
      info: "Mosaique de galets blancs et noirs de Grenade (Arabesques). 580 m².",
    },
    {
      name: "Fountain House (Marbella, Espagne)",
      coords: [36.5135, -4.885],
      info: "Projet et réalisation des extérieurs. Marbre, mosaïques, fontaines Romaines, bassins. 500 m².",
    },
    {
      name: "Gadalmina Beach (Marbella, Espagne)",
      coords: [36.5195, -5.025],
      info: "Projet et réalisation des extérieurs (Mosaïques de Porphyre). 250 m².",
    },
    {
      name: "Vasary Office (Puerto Bañus, Espagne)",
      coords: [36.4967, -4.9469],
      info: "Réalisation du Logo Vasary en mosaïque de tesselles de marbre brun et galets noirs de Grenade. 4 m².",
    },
    {
      name: "Villa Sierra Blanca (Marbella, Espagne)",
      coords: [36.4983, -4.9252],
      info: "Mosaique d'éclats de marbre blanc et rouge d'Almeria (Arabesques). 50 m². Tadelakt 700 m².",
    },
    {
      name: "Villa Gomez (Marbella, Espagne)",
      coords: [36.5074, -4.886],
      info: "Mosaique d'éclats de marbre blanc et rouge d'Almeria (Arabesques). 120 m².",
    },
    {
      name: "Villa Garavan (Menton, France)",
      coords: [43.7805, 7.5103],
      info: "Mosaique de marbre blancs, rouge et galets noirs polis de Grenade (Empedrado Granadino fino): 375 m². Calades provençales 160 m².",
    },
    {
      name: "Villa Oasis (Marrakech, Maroc)",
      coords: [31.6655, -8.0],
      info: "Série de gueridons pour Yves St Laurent & Mosaiques de tesselle de marbre.",
    },
    {
      name: "Villa 'Augusta' (St Paul Trois Châteaux, France)",
      coords: [44.2401, 4.7323],
      info: "Mosaïque de tesselles de marbre (frises et bassin), 80 ml, 12 m².",
    },
    {
      name: "Villa Privat (Narbonne, France)",
      coords: [43.1821, 3.0031],
      info: "Mosaïques Marocaine (Zelliges Beldi de Fez). Piscine, plage, allées de jardin et fontaine murale. 220 m².",
    },
    {
      name: "Riad Khemis (Marrakech, Maroc)",
      coords: [31.6235, -7.9995],
      info: "Mosaïque 'des soleils', mosaique de tesselles de marbre et galets naturels (Bill Willis designer). 25 m².",
    },
    {
      name: "Résidence Princière: Palmeraie de Marrakech (Maroc)",
      coords: [31.662, -8.0007],
      info: "Route d'accès en galets calibrés 8/10 roses et blancs avec insertion de motifs & frises en galets 6/8 noirs. Tapis de galets 2/4 noirs et blancs d'Essaouira. 500 m².",
    },
    {
      name: "Compas Stone International (U.S.A)",
      coords: [40.7485, -73.9857],
      info: "Emblémas (frises & guéridons).",
    },
    {
      name: "Hôtel Restaurant le 'Koudou' Marrakech (Maroc)",
      coords: [31.6301, -7.9875],
      info: "Revêtements muraux et sols en marbre marocain & réalisation des revêtements extérieurs en pierres et galets. Mosaïque du pont aux flamands: Petits galets de marbre rose et noir. 800 m².",
    },
    {
      name: "Riad Dar Alif (Marrakech, Maroc)",
      coords: [31.6275, -8.0045],
      info: "Aménagement et décoration du grand patio piscine. Décoration végétale, bassin, Tadelakt, zellige, mobilier, éclairage, voilage et tissus.",
    },
  ]

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[31.791702, -7.09262]} // Centre par défaut sur le Maroc
        zoom={4}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {locations.map((location, index) => (
          <Marker
            key={index}
            position={L.latLng(location.coords[0], location.coords[1])}
            icon={L.icon({
              iconUrl: "/static/images/leaflet/marker-icon.png",
              iconSize: [25, 41], // Taille par défaut de l'icône
              iconAnchor: [12, 41], // Position de l'ancrage pour que le marqueur soit bien positionné
              popupAnchor: [1, -34], // Position du popup par rapport au marqueur
              shadowUrl: "/static/images/leaflet/marker-shadow.png",
              shadowSize: [41, 41],
              shadowAnchor: [12, 41],
            })}
          >
            <Popup>
              {location.name}
              <br />
              {location.info}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

const MapPage = () => {
  return <MapComponent />
}

export default MapPage
