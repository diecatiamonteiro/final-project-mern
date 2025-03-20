export const venues = [
  {
    firstName: "Maria", // fictional
    lastName: "Weber", // fictional
    email: "so36@example.com", // fictional
    role: "venue",
    name: "SO36",
    profilePicture: "https://picsum.photos/500",
    images: [
      "https://picsum.photos/900",
      "https://picsum.photos/901",
      "https://picsum.photos/902",
      "https://picsum.photos/903",
    ],
    description:
      "Legendary Berlin venue with rich punk history, now hosting diverse indie and alternative acts. Known for supporting underground and emerging artists.",
    type: ["Concert Hall", "Club", "Cultural Center"],
    additionalInfo: {
      address: {
        streetName: "Oranienstraße",
        number: "190",
        zipCode: "10999",
        city: "Berlin",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-04:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/user/SO36Berlin",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/so36berlin",
      "https://www.facebook.com/SO36.Berlin",
      "https://www.so36.com",
    ],
    availability: [new Date("2024-04-01"), new Date("2024-04-15")],
  },
  {
    firstName: "Stefan", // fictional
    lastName: "Müller", // fictional
    email: "lido@example.com", // fictional
    role: "venue",
    name: "Lido",
    profilePicture: "https://picsum.photos/501",
    images: [
      "https://picsum.photos/904",
      "https://picsum.photos/905",
      "https://picsum.photos/906",
      "https://picsum.photos/907",
      "https://picsum.photos/908",
    ],
    description:
      "Historic cinema turned music venue, known for its intimate atmosphere and excellent acoustics. Regular host to indie rock, alternative, and electronic music acts.",
    type: ["Concert Hall", "Club"],
    additionalInfo: {
      address: {
        streetName: "Cuvrystraße",
        number: "7",
        zipCode: "10997",
        city: "Berlin",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-04:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/user/LidoBerlin",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/lidoberlin",
      "https://www.facebook.com/lidoberlin",
      "https://lido-berlin.de",
    ],
    availability: [new Date("2024-04-02"), new Date("2024-04-16")],
  },
  {
    firstName: "Hannah", // fictional
    lastName: "Fischer", // fictional
    email: "molotow@example.com", // fictional
    role: "venue",
    name: "Molotow",
    profilePicture: "https://picsum.photos/502",
    images: [
      "https://picsum.photos/909",
      "https://picsum.photos/910",
      "https://picsum.photos/911",
    ],
    description:
      "Iconic Hamburg music club with multiple floors, featuring indie rock, punk, and alternative acts. Known for early shows of now-famous bands and supporting the local scene.",
    type: ["Club", "Music Venue"],
    additionalInfo: {
      address: {
        streetName: "Nobistor",
        number: "14",
        zipCode: "22767",
        city: "Hamburg",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-late"],
      performingTimes: ["20:30-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/MolotowClub",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/molotow.club",
      "https://www.facebook.com/Molotow.Hamburg",
      "https://www.molotowclub.com",
    ],
    availability: [new Date("2024-04-03"), new Date("2024-04-17")],
  },
  {
    firstName: "Lukas", // fictional
    lastName: "Bauer", // fictional
    email: "utconnewitz@example.com", // fictional
    role: "venue",
    name: "UT Connewitz",
    profilePicture: "https://picsum.photos/503",
    images: [
      "https://picsum.photos/912",
      "https://picsum.photos/913",
      "https://picsum.photos/914",
      "https://picsum.photos/915",
    ],
    description:
      "Historic 1912 cinema turned atmospheric concert venue. Known for experimental music, indie rock, and avant-garde performances in a stunning heritage setting.",
    type: ["Concert Hall", "Cultural Center"],
    additionalInfo: {
      address: {
        streetName: "Wolfgang-Heinze-Straße",
        number: "12a",
        zipCode: "04277",
        city: "Leipzig",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-01:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/UTConnewitz",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/utconnewitz",
      "https://www.facebook.com/utconnewitz",
      "https://www.utconnewitz.de",
    ],
    availability: [new Date("2024-04-04"), new Date("2024-04-18")],
  },
  {
    firstName: "Julia", // fictional
    lastName: "Koch", // fictional
    email: "gebaeude9@example.com", // fictional
    role: "venue",
    name: "Gebäude 9",
    profilePicture: "https://picsum.photos/504",
    images: [
      "https://picsum.photos/916",
      "https://picsum.photos/917",
      "https://picsum.photos/918",
      "https://picsum.photos/919",
      "https://picsum.photos/920",
    ],
    description:
      "Industrial charm meets underground culture. Former factory turned vibrant music venue, hosting everything from indie rock to electronic music in Cologne's creative Mülheim district.",
    type: ["Club", "Concert Hall", "Cultural Center"],
    additionalInfo: {
      address: {
        streetName: "Deutz-Mülheimer Straße",
        number: "127-129",
        zipCode: "51063",
        city: "Köln",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-03:00"],
      performingTimes: ["20:30-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/user/Gebaeude9",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/gebaeude9",
      "https://www.facebook.com/gebaeude9",
      "https://www.gebaeude9.de",
    ],
    availability: [new Date("2024-04-05"), new Date("2024-04-19")],
  },
  {
    firstName: "Anna", // fictional
    lastName: "Hoffmann", // fictional
    email: "nochbesserleben@example.com", // fictional
    role: "venue",
    name: "Noch Besser Leben",
    profilePicture: "https://picsum.photos/505",
    images: [
      "https://picsum.photos/921",
      "https://picsum.photos/922",
      "https://picsum.photos/923",
      "https://picsum.photos/924",
    ],
    description:
      "Cozy indie venue in the heart of Leipzig's Plagwitz district. Known for intimate live music shows, poetry readings, and its welcoming atmosphere. A favorite spot for up-and-coming indie artists and local bands.",
    type: ["Bar", "Music Venue", "Cultural Space"],
    additionalInfo: {
      address: {
        streetName: "Merseburger Straße",
        number: "25",
        zipCode: "04229",
        city: "Leipzig",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-03:00"],
      performingTimes: ["21:00-00:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/channel/NochBesserLeben", // might need verification
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/nochbesserleben",
      "https://www.facebook.com/NochBesserLeben",
      "http://www.nochbesserleben.com",
    ],
    availability: [new Date("2024-04-06"), new Date("2024-04-20")],
  },
  {
    firstName: "Martin", // fictional
    lastName: "Wagner", // fictional
    email: "werk2@example.com", // fictional
    role: "venue",
    name: "Werk 2",
    profilePicture: "https://picsum.photos/506",
    images: [
      "https://picsum.photos/925",
      "https://picsum.photos/926",
      "https://picsum.photos/927",
      "https://picsum.photos/928",
      "https://picsum.photos/929",
    ],
    description:
      "Cultural powerhouse in a former factory building, featuring multiple venues and event spaces. A vital hub for Leipzig's music scene, hosting everything from indie rock concerts to cultural festivals and art exhibitions.",
    type: ["Concert Hall", "Cultural Center", "Music Venue"],
    additionalInfo: {
      address: {
        streetName: "Kochstraße",
        number: "132",
        zipCode: "04277",
        city: "Leipzig",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["18:00-01:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/Werk2Leipzig",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/werk2leipzig",
      "https://www.facebook.com/werk2",
      "https://www.werk-2.de",
    ],
    availability: [new Date("2024-04-07"), new Date("2024-04-21")],
  },
  {
    firstName: "David", // fictional
    lastName: "Klein", // fictional
    email: "binuu@example.com", // fictional
    role: "venue",
    name: "Bi Nuu",
    profilePicture: "https://picsum.photos/507",
    images: [
      "https://picsum.photos/930",
      "https://picsum.photos/931",
      "https://picsum.photos/932",
      "https://picsum.photos/933",
    ],
    description:
      "Underground club beneath the U1 line at Schlesisches Tor, known for indie rock, electronic, and alternative music. A staple of Berlin's independent music scene.",
    type: ["Club", "Concert Venue"],
    additionalInfo: {
      address: {
        streetName: "U-Bhf. Schlesisches Tor",
        number: "1",
        zipCode: "10997",
        city: "Berlin",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["20:00-04:00"],
      performingTimes: ["21:00-00:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/BiNuu",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/binuu_berlin",
      "https://www.facebook.com/binuu.berlin",
      "https://binuu.de",
    ],
    availability: [new Date("2024-04-08"), new Date("2024-04-22")],
  },
  {
    firstName: "Lisa", // fictional
    lastName: "Huber", // fictional
    email: "strom@example.com", // fictional
    role: "venue",
    name: "Strom",
    profilePicture: "https://picsum.photos/508",
    images: [
      "https://picsum.photos/934",
      "https://picsum.photos/935",
      "https://picsum.photos/936",
      "https://picsum.photos/937",
      "https://picsum.photos/938",
    ],
    description:
      "Modern live music club in Munich's vibrant Schlachthofviertel. Known for its excellent sound system and diverse programming from indie rock to electronic music.",
    type: ["Club", "Concert Venue"],
    additionalInfo: {
      address: {
        streetName: "Lindwurmstraße",
        number: "88",
        zipCode: "80337",
        city: "München",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["20:00-04:00"],
      performingTimes: ["21:00-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/StromMunich",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/strom_muenchen",
      "https://www.facebook.com/STROM.Munich",
      "https://strom-muc.de",
    ],
    availability: [new Date("2024-04-09"), new Date("2024-04-23")],
  },
  {
    firstName: "Sarah", // fictional
    lastName: "Meyer", // fictional
    email: "cassiopeia@example.com", // fictional
    role: "venue",
    name: "Cassiopeia",
    profilePicture: "https://picsum.photos/509",
    images: [
      "https://picsum.photos/939",
      "https://picsum.photos/940",
      "https://picsum.photos/941",
      "https://picsum.photos/942",
      "https://picsum.photos/943",
    ],
    description:
      "Alternative music venue in the RAW-Gelände cultural complex. Features an outdoor area and multiple floors, hosting indie rock, electronic, and hip-hop shows in a former industrial setting.",
    type: ["Club", "Concert Venue", "Cultural Space"],
    additionalInfo: {
      address: {
        streetName: "Revaler Straße",
        number: "99",
        zipCode: "10245",
        city: "Berlin",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-05:00"],
      performingTimes: ["20:00-00:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/CassiopeiaBerlin",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/cassiopeia_berlin",
      "https://www.facebook.com/cassiopeia.berlin",
      "https://www.cassiopeia-berlin.de",
    ],
    availability: [new Date("2024-04-10"), new Date("2024-04-24")],
  },
  {
    firstName: "Michael", // fictional
    lastName: "Schulz", // fictional
    email: "knust@example.com", // fictional
    role: "venue",
    name: "Knust",
    profilePicture: "https://picsum.photos/510",
    images: [
      "https://picsum.photos/944",
      "https://picsum.photos/945",
      "https://picsum.photos/946",
      "https://picsum.photos/947",
    ],
    description:
      "Beloved Hamburg music venue in a former restaurant building. Known for its diverse program of indie rock, punk, and alternative music, plus its support of the local music scene.",
    type: ["Concert Hall", "Club", "Music Venue"],
    additionalInfo: {
      address: {
        streetName: "Neuer Kamp",
        number: "30",
        zipCode: "20357",
        city: "Hamburg",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-02:00"],
      performingTimes: ["20:30-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/KnustHamburg",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/knust_hamburg",
      "https://www.facebook.com/Knust.Hamburg",
      "https://www.knusthamburg.de",
    ],
    availability: [new Date("2024-04-11"), new Date("2024-04-25")],
  },
  {
    firstName: "Felix", // fictional
    lastName: "Schmidt", // fictional
    email: "privatclub@example.com", // fictional
    role: "venue",
    name: "Privatclub",
    profilePicture: "https://picsum.photos/511",
    images: [
      "https://picsum.photos/948",
      "https://picsum.photos/949",
      "https://picsum.photos/950",
      "https://picsum.photos/951",
    ],
    description:
      "Intimate underground venue in Kreuzberg known for showcasing emerging indie bands and established alternative acts. Perfect spot for discovering new music in Berlin's vibrant scene.",
    type: ["Club", "Concert Venue"],
    additionalInfo: {
      address: {
        streetName: "Skalitzer Straße",
        number: "85-86",
        zipCode: "10997",
        city: "Berlin",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["20:00-04:00"],
      performingTimes: ["21:00-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/PrivatclubBerlin",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/privatclub_berlin",
      "https://www.facebook.com/Privatclub.Berlin",
      "https://www.privatclub.berlin",
    ],
    availability: [new Date("2024-04-12"), new Date("2024-04-26")],
  },
  {
    firstName: "Sophie", // fictional
    lastName: "Wagner", // fictional
    email: "milla@example.com", // fictional
    role: "venue",
    name: "Milla",
    profilePicture: "https://picsum.photos/512",
    images: [
      "https://picsum.photos/952",
      "https://picsum.photos/953",
      "https://picsum.photos/954",
      "https://picsum.photos/955",
      "https://picsum.photos/956",
    ],
    description:
      "Cozy club venue in Munich's university district, focusing on indie music and singer-songwriters. Known for its intimate atmosphere and excellent acoustics.",
    type: ["Club", "Concert Venue", "Bar"],
    additionalInfo: {
      address: {
        streetName: "Holzstraße",
        number: "28",
        zipCode: "80469",
        city: "München",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-02:00"],
      performingTimes: ["20:30-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/MillaMunich",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/milla_club",
      "https://www.facebook.com/milla.club",
      "https://www.milla-club.de",
    ],
    availability: [new Date("2024-04-13"), new Date("2024-04-27")],
  },
  {
    firstName: "Markus", // fictional
    lastName: "Becker", // fictional
    email: "taeubchenthal@example.com", // fictional
    role: "venue",
    name: "Täubchenthal",
    profilePicture: "https://picsum.photos/513",
    images: [
      "https://picsum.photos/957",
      "https://picsum.photos/958",
      "https://picsum.photos/959",
      "https://picsum.photos/960",
      "https://picsum.photos/961",
    ],
    description:
      "Modern concert venue in a historic industrial building, featuring high ceilings and excellent acoustics. Popular spot for indie rock, electronic, and alternative music shows in Leipzig's western district.",
    type: ["Concert Hall", "Event Space", "Cultural Center"],
    additionalInfo: {
      address: {
        streetName: "Wachsmuthstraße",
        number: "1",
        zipCode: "04229",
        city: "Leipzig",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-02:00"],
      performingTimes: ["20:00-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/Taeubchenthal",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/taeubchenthal",
      "https://www.facebook.com/taeubchenthal",
      "https://www.taeubchenthal.com",
    ],
    availability: [new Date("2024-04-14"), new Date("2024-04-28")],
  },
  {
    firstName: "Laura", // fictional
    lastName: "Krause", // fictional
    email: "moritzbastei@example.com", // fictional
    role: "venue",
    name: "Moritzbastei",
    profilePicture: "https://picsum.photos/514",
    images: [
      "https://picsum.photos/962",
      "https://picsum.photos/963",
      "https://picsum.photos/964",
      "https://picsum.photos/965",
    ],
    description:
      "Historic cultural center in former fortification tunnels beneath Leipzig University. Multiple venues hosting live music, theater, and cultural events in a unique underground setting.",
    type: ["Cultural Center", "Concert Venue", "Club"],
    additionalInfo: {
      address: {
        streetName: "Universitätsstraße",
        number: "9",
        zipCode: "04109",
        city: "Leipzig",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["11:00-03:00"],
      performingTimes: ["20:30-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/MoritzbasteiLeipzig",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/moritzbastei",
      "https://www.facebook.com/moritzbastei",
      "https://www.moritzbastei.de",
    ],
    availability: [new Date("2024-04-15"), new Date("2024-04-29")],
  },
  {
    firstName: "Tobias", // fictional
    lastName: "Werner", // fictional
    email: "hafenklang@example.com", // fictional
    role: "venue",
    name: "Hafenklang",
    profilePicture: "https://picsum.photos/515",
    images: [
      "https://picsum.photos/966",
      "https://picsum.photos/967",
      "https://picsum.photos/968",
      "https://picsum.photos/969",
    ],
    description:
      "Authentic Hamburg music venue near the harbor, known for punk, indie, and alternative shows. Features multiple rooms and a cozy bar area, perfect for intimate gigs and underground culture.",
    type: ["Club", "Concert Venue", "Bar"],
    additionalInfo: {
      address: {
        streetName: "Große Elbstraße",
        number: "84",
        zipCode: "22767",
        city: "Hamburg",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-03:00"],
      performingTimes: ["21:00-00:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/HafenklangHamburg",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/hafenklang",
      "https://www.facebook.com/hafenklang",
      "https://www.hafenklang.org",
    ],
    availability: [new Date("2024-04-16"), new Date("2024-04-30")],
  },
  {
    firstName: "Andreas", // fictional
    lastName: "Baumann", // fictional
    email: "backstage@example.com", // fictional
    role: "venue",
    name: "Backstage",
    profilePicture: "https://picsum.photos/516",
    images: [
      "https://picsum.photos/970",
      "https://picsum.photos/971",
      "https://picsum.photos/972",
      "https://picsum.photos/973",
      "https://picsum.photos/974",
    ],
    description:
      "Multi-room music complex featuring indoor and outdoor stages. Hosts everything from intimate club shows to larger concerts, focusing on rock, indie, and alternative music.",
    type: ["Concert Hall", "Club", "Cultural Center"],
    additionalInfo: {
      address: {
        streetName: "Reitknechtstraße",
        number: "6",
        zipCode: "80639",
        city: "München",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-04:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/BackstageMunich",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/backstagemuenchen",
      "https://www.facebook.com/backstageconcerts",
      "https://www.backstage.eu",
    ],
    availability: [new Date("2024-04-17"), new Date("2024-05-01")],
  },
  {
    firstName: "Christian", // fictional
    lastName: "Hoffmann", // fictional
    email: "livemusichall@example.com", // fictional
    role: "venue",
    name: "Live Music Hall",
    profilePicture: "https://picsum.photos/517",
    images: [
      "https://picsum.photos/975",
      "https://picsum.photos/976",
      "https://picsum.photos/977",
      "https://picsum.photos/978",
      "https://picsum.photos/979",
    ],
    description:
      "One of Cologne's premier music venues, hosting a mix of established and emerging artists. Spacious main hall with excellent acoustics, perfect for indie rock, alternative, and electronic shows.",
    type: ["Concert Hall", "Music Venue"],
    additionalInfo: {
      address: {
        streetName: "Lichtstraße",
        number: "30",
        zipCode: "50825",
        city: "Köln",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-02:00"],
      performingTimes: ["20:00-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/LiveMusicHallKoeln",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/livemusichalll",
      "https://www.facebook.com/LiveMusicHallKoeln",
      "https://www.livemusichalll.de",
    ],
    availability: [new Date("2024-04-18"), new Date("2024-05-02")],
  },
  {
    firstName: "Nina", // fictional
    lastName: "Schröder", // fictional
    email: "kulturbrauerei@example.com", // fictional
    role: "venue",
    name: "Kesselhaus in der Kulturbrauerei",
    profilePicture: "https://picsum.photos/518",
    images: [
      "https://picsum.photos/980",
      "https://picsum.photos/981",
      "https://picsum.photos/982",
      "https://picsum.photos/983",
    ],
    description:
      "Historic brewery complex turned cultural center, featuring multiple venues including the famous Kesselhaus. Known for indie rock, alternative, and electronic music in an impressive industrial setting.",
    type: ["Concert Hall", "Cultural Center", "Event Space"],
    additionalInfo: {
      address: {
        streetName: "Knaackstraße",
        number: "97",
        zipCode: "10435",
        city: "Berlin",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-01:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/KulturbrauereiBerlin",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/kesselhaus",
      "https://www.facebook.com/kesselhaus.berlin",
      "https://www.kesselhaus.net",
    ],
    availability: [new Date("2024-04-19"), new Date("2024-05-03")],
  },
  {
    firstName: "Jan", // fictional
    lastName: "Weber", // fictional
    email: "nachtleben@example.com", // fictional
    role: "venue",
    name: "Nachtleben",
    profilePicture: "https://picsum.photos/519",
    images: [
      "https://picsum.photos/984",
      "https://picsum.photos/985",
      "https://picsum.photos/986",
      "https://picsum.photos/987",
    ],
    description:
      "Legendary Frankfurt club known for indie, alternative and electronic music. Underground venue with a rich history in the city's music scene, hosting both local and international acts.",
    type: ["Club", "Concert Venue"],
    additionalInfo: {
      address: {
        streetName: "Kurt-Schumacher-Straße",
        number: "45",
        zipCode: "60313",
        city: "Frankfurt",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["20:00-05:00"],
      performingTimes: ["21:00-00:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/NachtlebenFrankfurt",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/nachtleben_frankfurt",
      "https://www.facebook.com/NachtlebenFrankfurt",
      "https://www.nachtleben-frankfurt.de",
    ],
    availability: [new Date("2024-04-20"), new Date("2024-05-04")],
  },
  {
    firstName: "Katrin", // fictional
    lastName: "Schneider", // fictional
    email: "zoom@example.com", // fictional
    role: "venue",
    name: "Zoom",
    profilePicture: "https://picsum.photos/520",
    images: [
      "https://picsum.photos/988",
      "https://picsum.photos/989",
      "https://picsum.photos/990",
      "https://picsum.photos/991",
      "https://picsum.photos/992",
    ],
    description:
      "Intimate venue in Frankfurt's Ostend district, focusing on indie rock and alternative music. Known for its great sound system and supporting emerging artists.",
    type: ["Club", "Concert Venue", "Bar"],
    additionalInfo: {
      address: {
        streetName: "Brönnerstraße",
        number: "5-9",
        zipCode: "60313",
        city: "Frankfurt",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-02:00"],
      performingTimes: ["20:30-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/ZoomFrankfurt",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/zoomfrankfurt",
      "https://www.facebook.com/zoomfrankfurt",
      "https://www.zoom-frankfurt.de",
    ],
    availability: [new Date("2024-04-21"), new Date("2024-05-05")],
  },
  {
    firstName: "Thomas", // fictional
    lastName: "Becker", // fictional
    email: "luxor@example.com", // fictional
    role: "venue",
    name: "Luxor",
    profilePicture: "https://picsum.photos/521",
    images: [
      "https://picsum.photos/993",
      "https://picsum.photos/994",
      "https://picsum.photos/995",
    ],
    description:
      "Cozy live music club in Cologne's Belgian Quarter. Perfect venue for indie rock, singer-songwriters and alternative acts, known for its intimate atmosphere.",
    type: ["Club", "Concert Venue"],
    additionalInfo: {
      address: {
        streetName: "Luxemburger Straße",
        number: "40",
        zipCode: "50674",
        city: "Köln",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-02:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/LuxorCologne",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/luxor_cologne",
      "https://www.facebook.com/luxor.cologne",
      "https://www.luxor-cologne.de",
    ],
    availability: [new Date("2024-04-22"), new Date("2024-05-06")],
  },
  {
    firstName: "Marc", // fictional
    lastName: "Fischer", // fictional
    email: "gruenspan@example.com", // fictional
    role: "venue",
    name: "Gruenspan",
    profilePicture: "https://picsum.photos/522",
    images: [
      "https://picsum.photos/996",
      "https://picsum.photos/997",
      "https://picsum.photos/998",
      "https://picsum.photos/999",
    ],
    description:
      "Historic music venue in Hamburg's famous Reeperbahn district. A cornerstone of Hamburg's live music scene, hosting everything from indie rock to electronic music.",
    type: ["Concert Hall", "Club", "Cultural Center"],
    additionalInfo: {
      address: {
        streetName: "Große Freiheit",
        number: "58",
        zipCode: "22767",
        city: "Hamburg",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-05:00"],
      performingTimes: ["20:30-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/GruenspanHamburg",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/gruenspan_hamburg",
      "https://www.facebook.com/gruenspan",
      "https://www.gruenspan.de",
    ],
    availability: [new Date("2024-04-23"), new Date("2024-05-07")],
  },
  {
    firstName: "Sandra", // fictional
    lastName: "Müller", // fictional
    email: "feierwerk@example.com", // fictional
    role: "venue",
    name: "Feierwerk",
    profilePicture: "https://picsum.photos/523",
    images: [
      "https://picsum.photos/1000",
      "https://picsum.photos/1001",
      "https://picsum.photos/1002",
      "https://picsum.photos/1003",
      "https://picsum.photos/1004",
    ],
    description:
      "Cultural center and concert venue complex in Munich, featuring multiple performance spaces. Known for supporting youth culture, indie music, and emerging artists.",
    type: ["Cultural Center", "Concert Hall", "Music Venue"],
    additionalInfo: {
      address: {
        streetName: "Hansastraße",
        number: "39-41",
        zipCode: "81373",
        city: "München",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["18:00-02:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/FeierwerkMunich",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/feierwerk",
      "https://www.facebook.com/feierwerk",
      "https://www.feierwerk.de",
    ],
    availability: [new Date("2024-04-24"), new Date("2024-05-08")],
  },
  {
    firstName: "Robert", // fictional
    lastName: "Wagner", // fictional
    email: "beatpol@example.com", // fictional
    role: "venue",
    name: "Beatpol",
    profilePicture: "https://picsum.photos/524",
    images: [
      "https://picsum.photos/1005",
      "https://picsum.photos/1006",
      "https://picsum.photos/1007",
      "https://picsum.photos/1008",
    ],
    description:
      "Former cinema turned indie music venue in Dresden's Altstadt. Known for its excellent acoustics and diverse programming of indie rock, alternative, and experimental music.",
    type: ["Concert Hall", "Cultural Center"],
    additionalInfo: {
      address: {
        streetName: "Altbriesnitz",
        number: "2a",
        zipCode: "01157",
        city: "Dresden",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-01:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/BeatpolDresden",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/beatpol_dresden",
      "https://www.facebook.com/Beatpol",
      "https://www.beatpol.de",
    ],
    availability: [new Date("2024-04-25"), new Date("2024-05-09")],
  },
  {
    firstName: "Petra", // fictional
    lastName: "Schmidt", // fictional
    email: "substage@example.com", // fictional
    role: "venue",
    name: "Substage",
    profilePicture: "https://picsum.photos/525",
    images: [
      "https://picsum.photos/1009",
      "https://picsum.photos/1010",
      "https://picsum.photos/1011",
      "https://picsum.photos/1012",
      "https://picsum.photos/1013",
    ],
    description:
      "Underground music venue in Karlsruhe's creative district. A vital platform for indie and alternative music, known for its intimate atmosphere and support of emerging artists.",
    type: ["Club", "Concert Venue", "Cultural Space"],
    additionalInfo: {
      address: {
        streetName: "Alter Schlachthof",
        number: "19",
        zipCode: "76131",
        city: "Karlsruhe",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-02:00"],
      performingTimes: ["20:30-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/SubstageKarlsruhe",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/substage_karlsruhe",
      "https://www.facebook.com/substage",
      "https://www.substage.de",
    ],
    availability: [new Date("2024-04-26"), new Date("2024-05-10")],
  },
  {
    firstName: "Daniel", // fictional
    lastName: "Koch", // fictional
    email: "fzw@example.com", // fictional
    role: "venue",
    name: "FZW",
    profilePicture: "https://picsum.photos/526",
    images: [
      "https://picsum.photos/1014",
      "https://picsum.photos/1015",
      "https://picsum.photos/1016",
      "https://picsum.photos/1017",
    ],
    description:
      "Legendary venue in Dortmund's Nordstadt, hosting indie, alternative, and punk shows since 1968. Known for its raw energy and dedicated music community.",
    type: ["Concert Hall", "Club", "Cultural Center"],
    additionalInfo: {
      address: {
        streetName: "Ritterstraße",
        number: "20",
        zipCode: "44137",
        city: "Dortmund",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-03:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/FZWDortmund",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/fzw_dortmund",
      "https://www.facebook.com/FZW.Dortmund",
      "https://www.fzw.de",
    ],
    availability: [new Date("2024-04-27"), new Date("2024-05-11")],
  },
  {
    firstName: "Lisa", // fictional
    lastName: "Meyer", // fictional
    email: "zakk@example.com", // fictional
    role: "venue",
    name: "zakk",
    profilePicture: "https://picsum.photos/527",
    images: [
      "https://picsum.photos/1018",
      "https://picsum.photos/1019",
      "https://picsum.photos/1020",
      "https://picsum.photos/1021",
      "https://picsum.photos/1022",
    ],
    description:
      "Cultural center and concert venue in Düsseldorf's Flingern district. A hub for independent music and culture, featuring diverse programming from indie rock to world music.",
    type: ["Cultural Center", "Concert Hall", "Music Venue"],
    additionalInfo: {
      address: {
        streetName: "Fichtenstraße",
        number: "40",
        zipCode: "40233",
        city: "Düsseldorf",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["18:00-02:00"],
      performingTimes: ["20:00-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/zakkduesseldorf",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/zakk_duesseldorf",
      "https://www.facebook.com/zakk",
      "https://www.zakk.de",
    ],
    availability: [new Date("2024-04-28"), new Date("2024-05-12")],
  },
  {
    firstName: "Michael", // fictional
    lastName: "Weber", // fictional
    email: "schlachthof@example.com", // fictional
    role: "venue",
    name: "Schlachthof",
    profilePicture: "https://picsum.photos/528",
    images: [
      "https://picsum.photos/1023",
      "https://picsum.photos/1024",
      "https://picsum.photos/1025",
      "https://picsum.photos/1026",
    ],
    description:
      "Cultural center in a former slaughterhouse, now Bremen's premier indie music venue. Features multiple performance spaces and a strong focus on alternative culture.",
    type: ["Cultural Center", "Concert Hall", "Music Venue"],
    additionalInfo: {
      address: {
        streetName: "Findorffstraße",
        number: "51",
        zipCode: "28215",
        city: "Bremen",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["19:00-03:00"],
      performingTimes: ["20:30-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/SchlachthofBremen",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/schlachthof_bremen",
      "https://www.facebook.com/schlachthof.bremen",
      "https://www.schlachthof-bremen.de",
    ],
    availability: [new Date("2024-04-29"), new Date("2024-05-13")],
  },
  {
    firstName: "Katharina", // fictional
    lastName: "Bauer", // fictional
    email: "gleis22@example.com", // fictional
    role: "venue",
    name: "Gleis 22",
    profilePicture: "https://picsum.photos/529",
    images: [
      "https://picsum.photos/1027",
      "https://picsum.photos/1028",
      "https://picsum.photos/1029",
      "https://picsum.photos/1030",
    ],
    description:
      "Intimate music club in Münster's Hansaviertel, known for its indie and alternative programming. A crucial platform for up-and-coming bands and established underground acts.",
    type: ["Club", "Concert Venue"],
    additionalInfo: {
      address: {
        streetName: "Hafenstraße",
        number: "34",
        zipCode: "48153",
        city: "Münster",
      },
      revenueSplit: "70/30", // fictional
      openingTimes: ["19:00-02:00"],
      performingTimes: ["20:30-23:00"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/Gleis22Muenster",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/gleis22",
      "https://www.facebook.com/Gleis22",
      "https://www.gleis22.de",
    ],
    availability: [new Date("2024-04-30"), new Date("2024-05-14")],
  },
  {
    firstName: "Felix", // fictional
    lastName: "Richter", // fictional
    email: "loftas@example.com", // fictional
    role: "venue",
    name: "Alter Schlachthof",
    profilePicture: "https://picsum.photos/530",
    images: [
      "https://picsum.photos/1031",
      "https://picsum.photos/1032",
      "https://picsum.photos/1033",
      "https://picsum.photos/1034",
      "https://picsum.photos/1035",
    ],
    description:
      "Historic venue in Dresden's industrial heritage site, featuring multiple spaces for concerts and cultural events. Known for its diverse programming and support of independent music.",
    type: ["Concert Hall", "Cultural Center", "Event Space"],
    additionalInfo: {
      address: {
        streetName: "Gothaer Straße",
        number: "11",
        zipCode: "01097",
        city: "Dresden",
      },
      revenueSplit: "75/25", // fictional
      openingTimes: ["18:00-02:00"],
      performingTimes: ["20:00-23:30"],
    },
    media: [
      {
        url: "https://www.youtube.com/c/AlterSchlachthofDresden",
        platform: "YouTube",
      },
    ],
    socialLinks: [
      "https://www.instagram.com/alter_schlachthof_dresden",
      "https://www.facebook.com/alterschlachthof.dresden",
      "https://www.alter-schlachthof.de",
    ],
    availability: [new Date("2024-05-01"), new Date("2024-05-15")],
  },
];
