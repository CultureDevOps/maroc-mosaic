type Landing = {
  title: string
  description: string
  imgSrc: string
  href: string
}

type LandingData = {
  [locale: string]: Landing[]
}

const landingData: LandingData = {
  en: [
    {
      title: 'Stone and Marble Mosaic Floors',
      description: `This is a mosaic found in the Generalife of the Alhambra, throughout the Iberian Peninsula, and in Morocco since the centuries of Al Andaluz. 
      It is a mosaic made of stone, schist, and marble in all colors, broken or rolled. It is used in gardens and patios. Schist is used as black ink on a light background, 
      made of stones and marbles. The silver-black schist from the Jbilets on a white or colorful background, and the contrasting shapes of the materials (Opus for the backgrounds and elongated for the schist tongues) 
      offer infinite graphic possibilities to the mosaicists.`,
      imgSrc: '/static/images/pages/demo/porte-01.png',
      href: '/en/blog/demo',
    },
    {
      title: 'Cobblestones',
      description: `Laid on sand mixed with lime or cement, broken or sawed cobblestones have been used for millennia in roads and driveways. 
      The sections of 4/6 cm, 6/8 cm, and 10/10 cm, along with different stone colors, provide the possibility of creating unique and graphic pavements.`,
      imgSrc: '/static/images/pages/demo/village-01.png',
      href: '/en/blog/demo',
    },
    {
      title: 'Marble Chip Tapestries',
      description: `This is a mosaic of marble, travertine, or stone chips in various colors and small sections (5 to 10 mm). It is suitable for domes, walls, fountains, 
      interior and exterior floors, gardens, and patios. It is a true tapestry made in the workshop of Marrakech and sent to international sites.`,
      imgSrc: '/static/images/pages/demo/piscine-01.png',
      href: '/en/blog/demo',
    },    
    {
      title: 'Fountains',
      description: `Fountains, true works of art, often combine utility and aesthetics. Carved from stone, marble, or adorned with mosaics, they have decorated gardens, squares, 
      and courtyards since antiquity. Symbols of life and freshness, they were at the heart of Roman cities, irrigating baths and prestigious villas. 
      In the East, they embody elegance and serenity, especially in riads and palaces where water murmurs at the center of patios. From monumental basins to wall fountains, 
      they are a timeless testament to the union of art and engineering, telling the story of civilizations through their shapes and decorations.`,
      imgSrc: '/static/images/pages/demo/fontaine-01.png',
      href: '/en/blog/demo',
    },    
    {
      title: 'Fez Zelliges',
      description: `The art of zellige is probably derived from Byzantine mosaic made of colored stones and smalts. But zellige is a more specifically artisanal coating due to its modest origins 
      and the skill required to work it. It consists of 10x10 cm terracotta tiles covered with enamel. These tiles are manually cut using heavy hammers (menqach) that contrast 
      with the delicacy of the pieces produced. These pieces, through a clever puzzle game, form a pattern that follows the traditional rules of regulatory tracings, 
      a discipline of all Islamic arts. (Cf. André PACCARD)`,
      imgSrc: '/static/images/pages/demo/zelliges-01.png',
      href: '/en/blog/demo',
    },         
    {
      title: 'Roman Mosaics',
      description: `This is a mosaic made of small cubes (tesserae) of marble, stone, or travertine in different sections (5 mm to 20 mm). It can decorate floors, walls, and domes. 
      Mosaic artists of the Roman Empire laid impressive surfaces around the Mediterranean in baths, atriums, and prestigious rooms of Patrician villas. 
      Some beautiful examples can be found in the ancient city of Volubilis in Morocco.`,
      imgSrc: '/static/images/pages/demo/mosaique-01.png',
      href: '/en/blog/demo',
    },          
  ],

  fr: [
    {
      title: 'Les sols de mosaïques de pierre et de marbre',
      description: `C'est une mosaïque que l'on retrouve dans le Generalife de l'Alhambra, 
      dans toute la péninsule Ibérique et au Maroc depuis les siècles d'Al Andaluz.
      C'est une mosaïque de pierre, de schiste et de marbre de toutes les couleurs éclatée ou roullée. 
      On l'utilise dans les jardins et les patios. Le schiste est utilisé comme une encre noire sur le fond clair, 
      fait de pierres et marbres. Le  schiste noir argenté des Jbilets sur fond blanc ou 
      de couleurs et les deux formes opposées des matériaux (Opus pour les fonds et allongées pour les langues de schiste) 
      offrent aux mosaïstes des possibilités graphiques infinies.`,
      imgSrc: '/static/images/pages/demo/porte-01.png',
      href: '/blog/demo',
    },
    {
      title: 'Les pavés',
      description: `Posés sur sable mélangé avec de la chaux ou du ciment, les pavés éclatés ou 
      sciés sont utilisés depuis des millénaires pour les chaussées et places carrossables. 
      Les sections de 4/6 cm, 6/8cm, 10/10cm et les couleurs de pierres différentes donnent 
      la possibilité d'élaborer des pavements graphiques et uniques.`,
      imgSrc: '/static/images/pages/demo/village-01.png',
      href: '/blog/demo',
    },
    {
      title: 'Les tapisseries d\'éclats de marbre',
      description: `C'est une mosaïque d'éclats de marbre, de travertin ou de pierre de différentes couleurs et de 
      petites sections (5 à 10 mm). Elle convient pour les coupoles, les murs, les bassins, les sols intérieurs et extérieurs, 
      les jardins et les patios. C'est une véritable tapisserie réalisée à l'atelier de Marrakech et envoyée 
      sur les chantiers à l'international.`,
      imgSrc: '/static/images/pages/demo/piscine-01.png',
      href: '/blog/demo',
    },    
    {
      title: 'Les fontaines',
      description: `Les fontaines, véritables œuvres d'art, mêlent souvent utilité et esthétique. Sculptées dans la pierre, 
      le marbre, ou encore ornées de mosaïques, elles embellissent jardins, places et cours intérieures depuis l'Antiquité. 
      Symboles de vie et de fraîcheur, elles étaient au cœur des villes romaines, irriguant thermes et villas prestigieuses. 
      En Orient, elles incarnent l'élégance et la sérénité, notamment dans les riads et palais où l'eau murmure au centre des 
      patios. Du bassin monumental à la fontaine murale, elles sont un témoignage intemporel de l'alliance entre art et ingénierie, 
      racontant l'histoire des civilisations à travers leurs formes et ornements.`,
      imgSrc: '/static/images/pages/demo/fontaine-01.png',
      href: '/blog/demo',
    },    
    {
      title: 'Les zelliges de Fez',
      description: `L'art du zellige est un art probablement dérivé de la mosaïque Bysantine faite de pierres colorées 
      et de smalts. Mais le zellige est un revêtement plus spécifiquement artisanal de part la modestie de ses origines et 
      l'habileté dont il faut faire preuve pour le travailler. Il sagit en fait de carreaux de terre cuite de 10 x10 centimètres 
      recouverts d'émail. Ces carreaux sont taillés manuellement à l'aide de lourds marteaux (menqach) qui contrastent 
      avec la délicatesse des pièces obtenues. Ces pièces, par un jeu de puzzle savant, composent un motif qui obéit aux 
      règles traditionnelles des tracés régulateurs, discipline de tous les arts Islamiques. (Cf. André PACCARD)`,
      imgSrc: '/static/images/pages/demo/zelliges-01.png',
      href: '/blog/demo',
    },         
    {
      title: 'Les mosaïques romaines',
      description: `C'est une mosaïque de petits cubes (tesselles) de marbre, de pierre ou travertin de sections différentes 
      (5 mm à 20 mm). Elle peut décorer les sols, les murs et les coupoles. Les mosaïstes de l'empire Romain en ont posé des 
      surfaces impressionnantes tout autour de la méditerranée dans les bains, les atriums et les pièces prestigieuses des 
      villas Patriciennes. On en retrouve de très belles dans l'ancienne citée de Volubilis au Maroc.`,
      imgSrc: '/static/images/pages/demo/mosaique-01.png',
      href: '/blog/demo',
    },              
  ],
}

export default landingData
