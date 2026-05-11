export const APP_CONFIG = {
  appTitle: 'Meine Weinnotizen',
  bucketName: 'wine-images',
  fields: [
    { key: 'name', db: 'name', label: 'Name des Weins', type: 'text', required: true, group: 'Basisdaten' },
    { key: 'weingut', db: 'weingut', label: 'Weingut', type: 'text', group: 'Basisdaten' },
    { key: 'jahrgang', db: 'jahrgang', label: 'Jahrgang', type: 'number', group: 'Basisdaten' },
    { key: 'land', db: 'land', label: 'Land', type: 'text', group: 'Basisdaten' },
    { key: 'region', db: 'region', label: 'Region', type: 'text', group: 'Basisdaten' },
    { key: 'rebsorte', db: 'rebsorte', label: 'Rebsorte', type: 'text', group: 'Basisdaten' },
    { key: 'preis', db: 'preis', label: 'Preis', type: 'number', min: 0, step: '0.01', group: 'Basisdaten' },
    { key: 'verkostungsdatum', db: 'verkostungsdatum', label: 'Datum der Verkostung', type: 'date', group: 'Basisdaten' },

    { key: 'bewertung', db: 'bewertung', label: 'Bewertung (0–100 Punkte)', type: 'number', min: 0, max: 100, group: 'Bewertung' },

    { key: 'koerper', db: 'koerper', label: 'Körper', type: 'combo', options: ['', 'dünn', 'wässrig', 'zu schlank', 'schlank', 'mittleres Volumen', 'vollmundig', 'fett', 'Trinkmarmelade'], group: 'Sensorik' },
    { key: 'intensitaet', db: 'intensitaet', label: 'Intensität', type: 'combo', options: ['', 'zu wenig Druck', 'ohne Bums', 'zart', 'filigran', 'druckvoll', 'sehr druckvoll', 'macht satt'], group: 'Sensorik' },
    { key: 'mundgefuehl', db: 'mundgefuehl', label: 'Mundgefühl', type: 'combo', options: ['', 'rau', 'saftig', 'cremig', 'vielschichtig'], group: 'Sensorik' },

    { key: 'farbe', db: 'farbe', label: 'Farbe', type: 'text', group: 'Aussehen' },

    { key: 'aromen_nase', db: 'aromen_nase', label: 'Aromen Nase', type: 'textarea', group: 'Aromen' },
    { key: 'aromen_mund', db: 'aromen_mund', label: 'Aromen Mund', type: 'textarea', group: 'Aromen' },

    { key: 'saeure', db: 'saeure', label: 'Säure', type: 'combo', options: ['', 'fad', 'lasch', 'schlaff', 'breit', 'milde Säure', 'schöne Säure', 'säurebetont', 'knackige Säure', 'Säuremonster'], group: 'Struktur' },
    { key: 'suesse', db: 'suesse', label: 'Süße', type: 'combo', options: ['', 'angenehm süß(lich)', 'unangenehm süß(lich)', 'etwas zu süß(lich)', 'unpassend süß(lich)', 'pappig', 'staubtrocken', 'knochentrocken'], group: 'Struktur' },
    { key: 'spiel', db: 'spiel', label: 'Spiel', type: 'combo', options: ['', 'wenig Spiel', 'schönes Spiel', 'lebendig', 'vibrierend', 'Nummer 46 (süß/sauer)'], group: 'Struktur' },
    { key: 'alkohol', db: 'alkohol', label: 'Alkohol', type: 'combo', options: ['', 'unauffällig', 'spürbar aber nicht unangenehm', 'gut integriert', 'alkoholisch', 'brandig'], group: 'Struktur' },
    { key: 'gerbstoffe_bitterstoffe', db: 'gerbstoffe_bitterstoffe', label: 'Gerbstoffe und Bitterstoffe', type: 'combo', options: ['', 'fein', 'reif', 'betont', 'herb', 'kantig', 'kratzend', 'pelzig', 'adstringierend'], group: 'Struktur' },

    { key: 'abgang', db: 'abgang', label: 'Abgang', type: 'combo', options: ['', 'kurz', 'mittel', 'lang', 'ewig', 'unendlich', 'harmonisch', 'dominant'], group: 'Abschluss' },
    { key: 'nochmal_kaufen', db: 'nochmal_kaufen', label: 'Nochmal kaufen', type: 'combo', options: ['', 'ja', 'nein', 'vielleicht'], group: 'Abschluss' }
  ]
};
