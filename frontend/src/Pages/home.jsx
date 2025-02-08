import { useEffect } from 'react';
import { motion } from 'framer-motion';

import Landing from '../Component/landing';
import FeaturesSection from '../Component/Feature';
import HowItWorks from '../Component/How';
import CTASection from '../Component/CTA';



const Home = () => {
  useEffect(() => {
    document.body.classList.add('bg-void-black');
    return () => document.body.classList.remove('bg-void-black');
  }, []);

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Navigation */}
     
      
      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 flex items-center justify-center">
        <div className="absolute inset-0  z-10" />
        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
           <Landing/>
          </motion.div>
        </div>
       
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="animate-float absolute w-24 h-24 bg-void-blue/20 rounded-full top-1/4 left-1/4" />
          <div className="animate-float-delayed absolute w-32 h-32 bg-nexus-purple/20 rounded-full top-1/3 right-1/4" />
        </div>
      </section>
     
     <section id='protocol'>
      <HowItWorks/>
      </section>

      <section id='features'>
      < FeaturesSection/>
      </section>
      
      {/* Features Section */}
     
<CTASection/>
      {/* CTA Section */}
    
    </div>
  );
};

export default Home;