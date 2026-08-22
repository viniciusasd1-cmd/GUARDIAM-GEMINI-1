import React, { useState } from 'react';
import { 
  Building2, 
  Cross, 
  ShieldAlert, 
  MapPin, 
  Phone, 
  Navigation, 
  Search, 
  Hotel, 
  Info,
  Clock
} from 'lucide-react';
import { Header } from '../../../components/layout/Header';
import { Card } from '../../../components/ui/Card';
import { MapRadar } from '../../../components/layout/MapRadar';

interface SafePlace {
  id: string;
  name: string;
  category: 'police' | 'hospital' | 'hotel' | 'safe_point';
  address: string;
  distance: string;
  phone?: string;
  isOpen24h: boolean;
}

const safePlacesData: SafePlace[] = [
  {
    id: '1',
    name: '1ª Delegacia de Defesa da Mulher (DDM 24h)',
    category: 'police',
    address: 'Rua Dr. Bittencourt Rodrigues, 200 - Centro',
    distance: '850m',
    phone: '(11) 3241-3314',
    isOpen24h: true,
  },
  {
    id: '2',
    name: 'Hospital e Pronto Socorro Central',
    category: 'hospital',
    address: 'Av. Brigadeiro Luís Antônio, 450 - Bela Vista',
    distance: '1.2 km',
    phone: '(11) 3155-0000',
    isOpen24h: true,
  },
  {
    id: '3',
    name: '78º Distrito Policial - Jardins',
    category: 'police',
    address: 'Rua Estados Unidos, 1608 - Jardins',
    distance: '2.1 km',
    phone: '(11) 3088-7555',
    isOpen24h: true,
  },
  {
    id: '4',
    name: 'Hotel Fasano (Ponto Seguro de Apoio)',
    category: 'hotel',
    address: 'Rua Vittorio Fasano, 88 - Cerqueira César',
    distance: '2.4 km',
    phone: '(11) 3896-4000',
    isOpen24h: true,
  },
];

const cityFacts = [
  'São Paulo · Alerta noturno: prefira vias principais e iluminadas entre 22h e 05h.',
  'Postos de apoio 24h ativos em raio de 3km da sua posição.',
];

export const PlacesScreen: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'police' | 'hospital' | 'hotel'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaces = safePlacesData.filter(place => {
    const matchesCat = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          place.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div
      id="screen-places"
      className="w-full h-full flex flex-col justify-between bg-[#F8FAFC] text-slate-900 overflow-y-auto"
    >
      {/* Header */}
      <Header
        showBack={Boolean(onBack)}
        onBack={onBack}
        id="places-header"
      />

      <div className="flex-1 px-5 py-2 space-y-4 max-w-md mx-auto w-full">
        {/* Title */}
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Guia Urbano &<br />Locais Seguros
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pontos de apoio, delegacias 24h e hospitais próximos
          </p>
        </div>

        {/* City Fact / Tip Card */}
        <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-2.5 text-left">
          <Info className="w-4 h-4 text-[#1565C0] shrink-0 mt-0.5" />
          <div className="text-xs text-[#0D47A1] font-medium leading-snug">
            {cityFacts[0]}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar delegacia, hospital ou local..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-3.5 text-xs text-slate-800 outline-none focus:border-[#1565C0]"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'police', label: 'Delegacias 24h' },
            { key: 'hospital', label: 'Hospitais' },
            { key: 'hotel', label: 'Hotéis e Apoio' },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#1565C0] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mini Radar Map */}
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <MapRadar height="h-32" id="places-mini-map" />
        </div>

        {/* List of Safe Places */}
        <div className="space-y-2.5 text-left pb-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Locais de Apoio ({filteredPlaces.length})
          </div>

          {filteredPlaces.map((place) => (
            <Card
              key={place.id}
              className="p-3.5 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    place.category === 'police'
                      ? 'bg-blue-50 text-[#1565C0]'
                      : place.category === 'hospital'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {place.category === 'police' && <ShieldAlert className="w-4 h-4" />}
                    {place.category === 'hospital' && <Cross className="w-4 h-4" />}
                    {place.category === 'hotel' && <Hotel className="w-4 h-4" />}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-800 leading-snug">
                      {place.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      {place.address}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      {place.isOpen24h && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> Aberto 24h
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-slate-500">
                        {place.distance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  {place.phone && (
                    <a
                      href={`tel:${place.phone}`}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Ligar"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesScreen;
