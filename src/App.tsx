import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HazardsSection } from './components/HazardsSection';
import { GuidelinesSection } from './components/GuidelinesSection';
import { StatisticsAndSignsSection } from './components/StatisticsAndSignsSection';
import { BlogSection } from './components/BlogSection';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { AISafetyAssistantModal } from './components/AISafetyAssistantModal';
import { SearchModal } from './components/SearchModal';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [aiInitialTopic, setAiInitialTopic] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const handleOpenAIModalWithTopic = (topic?: string) => {
    if (topic) setAiInitialTopic(topic);
    setIsAIModalOpen(true);
  };

  const handleExploreHazards = () => {
    setActiveSection('hazards');
    const el = document.getElementById('hazards');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreGuidelines = () => {
    setActiveSection('guidelines');
    const el = document.getElementById('guidelines');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 font-['Cairo',sans-serif] selection:bg-blue-600 selection:text-white dir-rtl" dir="rtl">
      
      {/* Top Navbar */}
      <Navbar
        onOpenAIModal={() => handleOpenAIModalWithTopic()}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreHazards={handleExploreHazards}
          onExploreGuidelines={handleExploreGuidelines}
          onOpenAIModal={() => handleOpenAIModalWithTopic()}
        />

        {/* Categorized Hazards Section */}
        <HazardsSection
          onConsultAI={(hazardName) => handleOpenAIModalWithTopic(hazardName)}
        />

        {/* Interactive Guidelines & Checklists & Step Guides Section */}
        <GuidelinesSection />

        {/* Recharts Infographics & Safety Signs Catalog */}
        <StatisticsAndSignsSection />

        {/* Blog & Case Studies Section */}
        <BlogSection />

        {/* Engineering Consultation Request Form */}
        <ConsultationForm />
      </main>

      {/* Footer */}
      <Footer
        onOpenAIModal={() => handleOpenAIModalWithTopic()}
        setActiveSection={setActiveSection}
      />

      {/* AI Safety Assistant Slide-Over Drawer */}
      <AISafetyAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => {
          setIsAIModalOpen(false);
          setAiInitialTopic('');
        }}
        initialTopic={aiInitialTopic}
      />

      {/* Universal Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

    </div>
  );
}

export default App;
