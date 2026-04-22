import AboutSection from '../components/AboutSection.jsx'
import ContactSection from '../components/ContactSection.jsx'
import EventsSection from '../components/EventsSection.jsx'
import Footer from '../components/Footer.jsx'
import HeroSection from '../components/HeroSection.jsx'

export default function HomePage({ setActiveEvent, siteData, statusNote }) {
  return (
    <>
      <main>
        <HeroSection
          businessName={siteData.businessName}
          hero={siteData.hero}
          location={siteData.location}
        />
        <EventsSection events={siteData.events} setActiveEvent={setActiveEvent} />
        <AboutSection about={siteData.about} />
        <ContactSection contact={siteData.contact} />
      </main>

      <Footer
        businessName={siteData.businessName}
        contact={siteData.contact}
        location={siteData.location}
        statusNote={statusNote}
      />
    </>
  )
}
