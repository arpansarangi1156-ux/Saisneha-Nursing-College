import SEO from '../components/SEO';
import { Activity, BookOpen, MonitorPlay, Bus, Building, Microscope } from 'lucide-react';

const Facilities = () => {
  const facilities = [
    {
      id: 1,
      title: 'Nursing Laboratory',
      description: 'Equipped with advanced adult, pediatric, and maternal simulators to practice core nursing skills in a risk-free environment before engaging with real patients.',
      icon: <Microscope size={40} className="text-white" />,
      color: 'bg-[var(--color-medical-blue)]'
    },
    {
      id: 2,
      title: 'Central Library',
      description: 'A vast repository of the latest medical literature, nursing journals, and digital databases to support extensive research and daily academic needs.',
      icon: <BookOpen size={40} className="text-white" />,
      color: 'bg-[var(--color-soft-green)]'
    },
    {
      id: 3,
      title: 'Computer Laboratory',
      description: 'Modern IT infrastructure providing access to digital learning platforms, hospital management systems software, and internet connectivity for research.',
      icon: <MonitorPlay size={40} className="text-white" />,
      color: 'bg-indigo-500'
    },
    {
      id: 4,
      title: 'Patient Demonstration Rooms',
      description: 'Authentically replicated hospital ward environments allowing students to experience realistic clinical scenarios and ward management.',
      icon: <Activity size={40} className="text-white" />,
      color: 'bg-teal-500'
    },
    {
      id: 5,
      title: 'Transportation',
      description: 'A dedicated fleet of college buses ensuring safe, timely, and comfortable transit for students commuting from various parts of the city and to clinical sites.',
      icon: <Bus size={40} className="text-white" />,
      color: 'bg-orange-500'
    },
    {
      id: 6,
      title: 'Campus Infrastructure',
      description: 'A secure, serene, and Wi-Fi-enabled campus featuring smart classrooms, hygienic cafeterias, and recreational areas designed for student well-being.',
      icon: <Building size={40} className="text-white" />,
      color: 'bg-[var(--color-medical-blue-light)]'
    }
  ];

  return (
    <>
      <SEO 
        title="Facilities" 
        description="Explore our state-of-the-art campus facilities and infrastructure." 
      />

      {/* Page Header */}
      <div className="bg-[var(--color-medical-blue)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Campus Facilities</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            State-of-the-art infrastructure designed to foster a conducive learning environment.
          </p>
        </div>
      </div>

      {/* Facilities Grid */}
      <section className="py-20 bg-[var(--color-light-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
              <div key={facility.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className={`${facility.color} h-32 flex items-center justify-center`}>
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {facility.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{facility.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Facilities;
