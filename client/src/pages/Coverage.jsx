import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin,  Target, Phone, Mail } from 'lucide-react';

const Coverage = () => {
  const coverageAreas = [
    { area: 'Mombasa', status: 'Full Coverage', color: 'green' },
    { area: 'Kilifi', status: 'Full Coverage', color: 'green' },
    { area: 'Nairobi', status: 'Expanding', color: 'orange' },
    { area: 'Kisumu', status: 'Coming Soon', color: 'blue' },
    { area: 'Nakuru', status: 'Coming Soon', color: 'blue' },
    { area: 'Eldoret', status: 'Coming Soon', color: 'blue' },
    { area: 'Thika', status: 'Coming Soon', color: 'blue' },
    { area: 'Naivasha', status: 'Coming Soon', color: 'blue' }
  ];

  const counties = [
    { name: 'Mombasa County', status: 'Fully Operational', description: 'Our primary service hub with full coverage', zones: 12 },
    { name: 'Kilifi County', status: 'Expanding', description: 'Growing network with reliable service', zones: 8 }
  ];

  const mombasaZones = ['Nyali', 'Kisauni', 'Likoni', 'Mvita', 'Changamwe', 'Jomvu'];
  const kilifiZones = ['Kilifi North', 'Kilifi South', 'Kaloleni', 'Rabai', 'Ganze', 'Magarini'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Full Coverage': return 'bg-green-100 text-green-700';
      case 'Expanding': return 'bg-orange-100 text-orange-700';
      case 'Coming Soon': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusDot = (color) => {
    switch(color) {
      case 'green': return 'bg-green-500';
      case 'orange': return 'bg-orange-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          {/* Back to Home Link */}
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-red-600 text-sm mb-6 transition-colors">
            ← Back to Home
          </Link>
          
          {/* Header Content */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-900 text-white p-4 rounded-full">
                <MapPin size={36} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Service Coverage Areas
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
              Connecting homes and businesses across Kenya
            </p>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 transition-all duration-300 hover:border-red-300 hover:shadow-md">
          <p className="text-gray-600 leading-relaxed text-center">
            We are currently based in Mombasa and Kilifi counties, providing reliable 
            internet services across the Coastal region. Our network is expanding to 
            serve more areas across Kenya.
          </p>
        </div>

        {/* Primary Service Counties */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our Primary Service Counties
            </h2>
            <p className="text-gray-500">Main operational hubs with full coverage</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {counties.map((county, index) => (
              <div 
                key={index} 
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
                  index === 0 ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className={`p-6 ${index === 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {county.name}
                    </h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      index === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {county.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {county.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Target size={16} className="text-gray-400" />
                    <span>{county.zones} Service Zones</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Zones */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Service Zones
            </h2>
            <p className="text-gray-500">Detailed coverage areas within our primary counties</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-red-300 hover:shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Mombasa Service Zones
              </h3>
              <div className="flex flex-wrap gap-2">
                {mombasaZones.map((zone, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-100 hover:text-red-600 transition-colors">
                    {zone}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-red-300 hover:shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                Kilifi Service Zones
              </h3>
              <div className="flex flex-wrap gap-2">
                {kilifiZones.map((zone, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-100 hover:text-red-600 transition-colors">
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Map Legend */}
        <div className="mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:border-red-300 hover:shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Coverage Status Legend</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Full Coverage (Mombasa & Kilifi)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">Expanding Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Coming Soon</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌟</span>
                  <span>Mombasa County is our main operational base with the most extensive coverage.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  <span>Kilifi County is our expanding area with growing infrastructure.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Areas We Serve Grid */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Areas We Serve & Plan to Serve
            </h2>
            <p className="text-gray-500">Current and future coverage locations</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {coverageAreas.map((area, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {area.area}
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(area.color)}`}></div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(area.status)}`}>
                    {area.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Coverage Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Request Service in Your Area
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Want our services in your location? Fill out our coverage request form 
            and we'll prioritize expansion based on demand. Currently focusing on 
            Coastal region expansion.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300">
              Request Coverage Expansion
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 text-gray-300">
              <Phone size={16} className="text-gray-400" />
              <span className="text-sm">Mombasa Office: 0718831298</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail size={16} className="text-gray-400" />
              <span className="text-sm">webasolutions@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;