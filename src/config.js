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
    { key: 'verkostungsdatum', db: 'verkostungsdatum', label: 'Datum der Verkostung', type: 'date', group: 'Basisdaten' },
    { key: 'bewertung', db: 'bewertung', label: 'Bewertung (0–100 Punkte)', type: 'number', min: 0, max: 100, group: 'Bewertung' },
    { key: 'koerper', db: 'koerper', label: 'Körper', type: 'select', options: ['', 'leicht', 'mittel', 'voll'], group: 'Sensorik' },
    { key: 'intensitaet', db: 'intensitaet', label: 'Intensität', type: 'select', options: ['', 'niedrig', 'mittel', 'hoch'], group: 'Sensorik' },
    { key: 'mundgefuehl', db: 'mundgefuehl', label: 'Mundgefühl', type: 'textarea', group: 'Sensorik' },
    { key: 'farbe', db: 'farbe', label: 'Farbe', type: 'text', group: 'Aussehen' },
    { key: 'aromen_nase', db: 'aromen_nase', label: 'Aromen Nase', type: 'textarea', group: 'Aromen' },
    { key: 'aromen_mund', db: 'aromen_mund', label: 'Aromen Mund', type: 'textarea', group: 'Aromen' },
    { key: 'spiel', db: 'spiel', label: 'Spiel', type: 'textarea', group: 'Struktur' },
    { key: 'alkohol', db: 'alkohol', label: 'Alkohol', type: 'select', options: ['', 'niedrig', 'mittel', 'hoch'], group: 'Struktur' },
    { key: 'gerbstoffe_bitterstoffe', db: 'gerbstoffe_bitterstoffe', label: 'Gerbstoffe und Bitterstoffe', type: 'textarea', group: 'Struktur' },
    { key: 'abgang', db: 'abgang', label: 'Abgang', type: 'textarea', group: 'Abschluss' }
  ]
};
