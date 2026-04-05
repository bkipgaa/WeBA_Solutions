
import { Link } from 'react-router-dom';
import { Sun, CheckCircle } from 'lucide-react';

const SolarPower = () => {
  const services = [
    'Residential solar system installation',
    'Commercial solar power solutions',
    'Solar water heating systems',
    'Solar street lighting',
    'Solar pump installation',
    'Grid-tied and off-grid systems',
    'Solar system maintenance',
    'Government approval assistance'
  ];

  const packages = [
    { 
      name: 'Home Basic', 
      capacity: '3kW System',
      features: ['4 Solar panels', 'Inverter & battery', 'LED lighting', 'TV & phone charging'],
      price: '149,999',
      icon: '🏠'
    },
    { 
      name: 'Home Premium', 
      capacity: '5kW System',
      features: ['8 Solar panels', 'Hybrid inverter', 'Refrigeration', 'Washing machine'],
      price: '249,999',
      icon: '🏡'
    },
    { 
      name: 'Business Standard', 
      capacity: '10kW System',
      features: ['16 Solar panels', '3-phase inverter', 'Office equipment', 'Security system'],
      price: '499,999',
      icon: '🏢'
    },
    { 
      name: 'Industrial', 
      capacity: 'Custom Solution',
      features: ['Custom design', 'Grid integration', 'Energy monitoring', 'Maintenance package'],
      price: 'Quote Based',
      icon: '🏭'
    }
  ];

  const benefits = [
    { title: 'Cost Savings', desc: 'Reduce electricity bills by up to 90% with solar power', icon: '💰' },
    { title: 'Energy Independence', desc: 'Generate your own power and reduce grid dependency', icon: '⚡' },
    { title: 'Environmentally Friendly', desc: 'Clean, renewable energy with zero emissions', icon: '🌿' },
    { title: 'Government Incentives', desc: 'Take advantage of tax benefits and rebates', icon: '📋' }
  ];

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
                <Sun size={36} />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Solar Power Solutions
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
              Clean, reliable energy for homes and businesses
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 transition-all duration-300 hover:border-red-300 hover:shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            Harness the power of the sun with our professional solar installation services. 
            We provide complete solar energy solutions that reduce electricity costs, 
            increase energy independence, and contribute to environmental sustainability.
          </p>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Our Solar Services
            </h2>
            <p className="text-gray-500">Comprehensive solar solutions for every need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:border-red-300 hover:shadow-md group"
              >
                <Sun size={18} className="text-gray-400 group-hover:text-red-600 transition-colors flex-shrink-0" />
                <span className="text-gray-700 text-sm group-hover:text-gray-900">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Solar Packages
            </h2>
            <p className="text-gray-500">Choose the perfect solar solution for your needs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="p-5 text-center border-b border-gray-100">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {pkg.icon}
                  </div>
                  <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs mb-2">
                    {pkg.name}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{pkg.capacity}</div>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-4">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mb-4">
                    <div className="text-xl font-bold text-gray-900">
                      {pkg.price === 'Quote Based' ? 'Custom Quote' : `KSh ${pkg.price}`}
                    </div>
                  </div>
                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors duration-300">
                    {pkg.price === 'Quote Based' ? 'Request Quote' : 'Select Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Why Choose Solar?
            </h2>
            <p className="text-gray-500">The smart choice for your energy needs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:border-red-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Go Solar with Confidence
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Get a free energy assessment and discover how much you can save with solar.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300">
              Calculate Savings
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarPower;