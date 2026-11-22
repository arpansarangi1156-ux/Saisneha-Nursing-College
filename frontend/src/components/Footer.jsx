import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
  const [settings, setSettings] = useState({
    address: '',
    mainPhone: '',
    admissionsEmail: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('/api/settings');
        if (data) {
          setSettings(data);
        }
      } catch {
        // Silently fail and use fallbacks
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-[var(--color-medical-blue)] text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-blue-50 rounded-xl flex items-center justify-center text-[var(--color-medical-blue)] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-heartbeat"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 9.2a2 2 0 0 0-.28 1.41l.6 1.93"/></svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">
                  SAISNEHA
                </span>
                <span className="text-[9px] font-bold text-blue-200 uppercase tracking-[0.15em] mt-0.5 leading-none">
                  College of Nursing & Health Sciences
                </span>
              </div>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed mb-5">
              Preparing compassionate healthcare professionals for tomorrow with state-of-the-art facilities and experienced faculty.
            </p>
            {settings.facebookUrl && settings.facebookUrl !== '#' || settings.twitterUrl && settings.twitterUrl !== '#' || settings.instagramUrl && settings.instagramUrl !== '#' || settings.linkedinUrl && settings.linkedinUrl !== '#' ? (
              <div className="flex space-x-4">
                {settings.facebookUrl && settings.facebookUrl !== '#' && (
                  <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                )}
                {settings.twitterUrl && settings.twitterUrl !== '#' && (
                  <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                )}
                {settings.instagramUrl && settings.instagramUrl !== '#' && (
                  <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                )}
                {settings.linkedinUrl && settings.linkedinUrl !== '#' && (
                  <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                )}
              </div>
            ) : null}
          </div>
          <div>
            <h4 className="text-lg font-bold mb-3 font-outfit">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><RouterLink to="/about" className="hover:text-white transition-colors">About Us</RouterLink></li>
              <li><RouterLink to="/courses" className="hover:text-white transition-colors">Courses</RouterLink></li>
              <li><RouterLink to="/admissions" className="hover:text-white transition-colors">Admissions</RouterLink></li>
              <li><RouterLink to="/contact" className="hover:text-white transition-colors">Contact</RouterLink></li>
            </ul>
          </div>
          {settings.address && settings.address !== 'Not provided' || settings.mainPhone && settings.mainPhone !== 'Not provided' || settings.admissionsEmail && settings.admissionsEmail !== 'Not provided' ? (
            <div>
              <h4 className="text-lg font-bold mb-3 font-outfit">Contact Info</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                {settings.address && settings.address !== 'Not provided' && (
                  <li className="flex items-start">
                    <span className="mr-2 opacity-50 mt-1">📍</span> 
                    {settings.address}
                  </li>
                )}
                {settings.mainPhone && settings.mainPhone !== 'Not provided' && (
                  <li className="flex items-center">
                    <span className="mr-2 opacity-50">📞</span> 
                    {settings.mainPhone}
                  </li>
                )}
                {settings.admissionsEmail && settings.admissionsEmail !== 'Not provided' && (
                  <li className="flex items-center">
                    <span className="mr-2 opacity-50">✉️</span> 
                    {settings.admissionsEmail}
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div className="hidden md:block"></div>
          )}
          <div>
            <h4 className="text-lg font-bold mb-3 font-outfit">Admissions</h4>
            <p className="text-sm text-blue-100 mb-4">
              Admissions are now open for the upcoming academic year. Start your journey today.
            </p>
            <RouterLink
              to="/admissions"
              className="inline-block bg-[var(--color-soft-green)] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[var(--color-soft-green-light)] transition-colors shadow-lg hover:shadow-xl"
            >
              Apply Today
            </RouterLink>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-blue-200">
          <p>&copy; {new Date().getFullYear()} Saisneha College of Nursing and Health Sciences. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
