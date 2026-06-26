import Hero from '@/components/Hero'
import AboutSection from '@/components/About'
import ServicesSection from '@/components/ServicesSection'
import TestimonialCard from '@/components/TestimonialCard'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import MethodologySection from '@/components/MethodologySection'
import { fetchSanityData } from '@/lib/sanity'
import {
  HERO_QUERY,
  ABOUT_QUERY,
  SERVICES_SECTION_QUERY,
  SERVICES_QUERY,
  PRICING_QUERY,
  TESTIMONIALS_SECTION_QUERY,
  TESTIMONIALS_QUERY,
  BLOG_SECTION_QUERY,
  CONTACT_SECTION_QUERY
} from '@/lib/queries'
import { METHODOLOGY_SECTION_QUERY } from '@/lib/methodologyQueries'

export default async function Home() {
  const results = await Promise.allSettled([
    fetchSanityData(HERO_QUERY),
    fetchSanityData(METHODOLOGY_SECTION_QUERY),
    fetchSanityData(SERVICES_SECTION_QUERY),
    fetchSanityData(SERVICES_QUERY),
    fetchSanityData(PRICING_QUERY),
    fetchSanityData(ABOUT_QUERY),
    fetchSanityData(TESTIMONIALS_SECTION_QUERY),
    fetchSanityData(TESTIMONIALS_QUERY),
    fetchSanityData(BLOG_SECTION_QUERY),
    fetchSanityData(CONTACT_SECTION_QUERY)
  ])

  const [
    heroSection,
    methodologySection,
    servicesSection,
    services,
    pricingPlans,
    aboutSection,
    testimonialsSection,
    testimonials,
    blogSection,
    contactSection
  ] = results.map((result) => (result.status === 'fulfilled' ? result.value : null))

  return (
    <>
      {/* Home Content */}
      <Hero section={heroSection} />

      {/* Mentoria Journey */}
      {methodologySection ? <MethodologySection section={methodologySection} /> : null}

      {/* Services Section */}
      {servicesSection ? <ServicesSection section={servicesSection} services={services} packages={pricingPlans} /> : null}

      {/* Meet the Mentor */}
      {aboutSection ? <AboutSection section={aboutSection} /> : null}

      {/* Testimonials */}
      <section
        id="testimonials"
        style={{ backgroundColor: testimonialsSection?.backgroundColor || '#ffffff' }}
        className="px-6 py-16"
      >
        <div className="mx-auto max-w-7xl">
          {testimonialsSection ? (
            <>
              <div className="mb-12 text-center">
                {testimonialsSection.sectionTitle && (
                  <h2
                    style={{ color: testimonialsSection.headingColor || '#111827' }}
                    className="mb-4 text-4xl font-bold md:text-5xl"
                  >
                    {testimonialsSection.sectionTitle}
                  </h2>
                )}
                {testimonialsSection.sectionSubtitle && (
                  <p
                    style={{ color: testimonialsSection.textColor || '#374151' }}
                    className="mx-auto max-w-2xl text-lg leading-relaxed"
                  >
                    {testimonialsSection.sectionSubtitle}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials && testimonials.length > 0 ? (
                  testimonials.map((testimonial: any) => (
                    <TestimonialCard
                      key={testimonial._id}
                      testimonial={testimonial}
                      sectionHeadingColor={testimonialsSection.headingColor}
                      sectionTextColor={testimonialsSection.textColor}
                    />
                  ))
                ) : (
                  <p
                    style={{ color: testimonialsSection.textColor || '#374151' }}
                    className="col-span-full text-center"
                  >
                    No testimonials available.
                  </p>
                )}
              </div>
            </>
          ) : null}
        </div>
      </section>

      {/* Courses & Blog */}
      <BlogSection section={blogSection} />

      {/* Contact Section */}
      {contactSection && <ContactSection section={contactSection} />}

      {/* CareerCompass™ AI Assessment Module CTA */}
      <section style={{
        background: "#0D1025",
        padding: "48px 24px",
        textAlign: "center",
        borderTop: "1px solid #2D3478"
      }}>
        <p style={{
          color: "#D4A24E",
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginBottom: "12px"
        }}>
          NEW — Powered by Claude AI (Anthropic)
        </p>
        <h2 style={{
          color: "#FFFFFF",
          fontSize: "28px",
          fontWeight: 800,
          marginBottom: "16px",
          lineHeight: 1.3
        }}>
          Discover Your Ideal Career with AI
        </h2>
        <p style={{
          color: "#8A8FAF",
          fontSize: "15px",
          maxWidth: "520px",
          margin: "0 auto 28px",
          lineHeight: 1.6
        }}>
          Take our comprehensive 261-question psychometric assessment — covering IQ, EQ, MBTI, RIASEC, Big Five, Grit, Ethics and more — and receive your personalised AI-generated career report instantly.
        </p>
        <a href="/tna" style={{
          display: "inline-block",
          background: "#D4A24E",
          color: "#0D1025",
          fontWeight: 800,
          fontSize: "17px",
          padding: "16px 40px",
          borderRadius: "12px",
          textDecoration: "none",
          letterSpacing: "0.3px"
        }}>
          🧭 AI Based Training Need Analysis
        </a>
        <p style={{
          color: "#5A5F7F",
          fontSize: "11px",
          marginTop: "16px"
        }}>
          Free to use · Results in 60 minutes · 100% private · No data stored
        </p>
      </section>
    </>
  )
}
