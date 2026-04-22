import { useState } from 'react'
import {
  createWhatsAppBookingLink,
  createWhatsAppLink,
} from '../utils/siteHelpers.js'
import {
  fieldClass,
  panelClass,
  pillButtonClass,
  primaryButtonClass,
  shellClass,
} from '../styles/ui.js'

const contactItems = [
  { key: 'phone', label: 'Phone', makeHref: (value) => `tel:${value}` },
  { key: 'whatsapp', label: 'WhatsApp', makeHref: createWhatsAppLink, external: true },
  { key: 'email', label: 'Email', makeHref: (value) => `mailto:${value}` },
  { key: 'instagram', label: 'Instagram', makeHref: (value) => value, external: true },
]

const initialBookingForm = {
  customerName: '',
  customerPhone: '',
  eventType: '',
  eventDate: '',
  eventLocation: '',
  message: '',
}

export default function ContactSection({ contact }) {
  const [bookingForm, setBookingForm] = useState(initialBookingForm)

  function updateField(fieldName, value) {
    setBookingForm((currentValue) => ({
      ...currentValue,
      [fieldName]: value,
    }))
  }

  function handleBookingSubmit(event) {
    event.preventDefault()

    if (
      !bookingForm.customerName.trim() ||
      !bookingForm.customerPhone.trim() ||
      !bookingForm.eventType.trim()
    ) {
      window.alert('Please add name, phone number, and event type.')
      return
    }

    const bookingLink = createWhatsAppBookingLink(contact.whatsapp, {
      customerName: bookingForm.customerName.trim(),
      customerPhone: bookingForm.customerPhone.trim(),
      eventType: bookingForm.eventType.trim(),
      eventDate: bookingForm.eventDate,
      eventLocation: bookingForm.eventLocation.trim(),
      message: bookingForm.message.trim(),
    })

    window.open(bookingLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className={`${shellClass} py-8 pb-22 md:py-16 md:pb-24`} id="contact">
      <div className="mb-10 max-w-4xl">
        <p className="inline-flex items-center gap-3 rounded-full border border-[rgba(255,196,112,0.16)] bg-[rgba(255,179,81,0.08)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[color:var(--accent-soft)]">
          Contact
        </p>
        <h2 className="mt-6 font-['Arial_Black','Segoe_UI',sans-serif] text-[clamp(2.6rem,5vw,4.7rem)] leading-[0.95] font-black tracking-[-0.06em] text-[color:var(--text-strong)]">
          Initiate <span className="text-[color:var(--accent)]">Booking</span>
        </h2>
        <p className="mt-6 text-lg leading-8 text-[color:var(--text-soft)]">
          Customer details bharo aur booking message seedha WhatsApp par founder ko
          chala jayega.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <article className={`${panelClass} p-8`}>
          <h3 className="font-['Baskerville','Times_New_Roman',serif] text-[2.6rem] leading-[1] font-medium text-[color:var(--text-strong)]">
            WhatsApp Booking Form
          </h3>

          <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleBookingSubmit}>
            <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
              Full Name
              <input
                className={fieldClass}
                type="text"
                value={bookingForm.customerName}
                onChange={(event) => updateField('customerName', event.target.value)}
                placeholder="Enter customer name"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
              Phone Number
              <input
                className={fieldClass}
                type="text"
                value={bookingForm.customerPhone}
                onChange={(event) => updateField('customerPhone', event.target.value)}
                placeholder="Enter phone number"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
              Event Type
              <input
                className={fieldClass}
                type="text"
                value={bookingForm.eventType}
                onChange={(event) => updateField('eventType', event.target.value)}
                placeholder="Birthday / Anniversary / Baby Shower"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)]">
              Event Date
              <input
                className={fieldClass}
                type="date"
                value={bookingForm.eventDate}
                onChange={(event) => updateField('eventDate', event.target.value)}
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)] md:col-span-2">
              Venue / Location
              <input
                className={fieldClass}
                type="text"
                value={bookingForm.eventLocation}
                onChange={(event) => updateField('eventLocation', event.target.value)}
                placeholder="Event venue or city"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-[color:var(--text-strong)] md:col-span-2">
              Message
              <textarea
                className={fieldClass}
                rows="5"
                value={bookingForm.message}
                onChange={(event) => updateField('message', event.target.value)}
                placeholder="Decoration theme, guest count, or any extra details"
              />
            </label>

            <div className="flex flex-wrap gap-4 md:col-span-2">
              <button className={primaryButtonClass} type="submit">
                Send To WhatsApp
              </button>
              <a className={pillButtonClass} href={`tel:${contact.phone}`}>
                Call Now
              </a>
            </div>
          </form>
        </article>

        <div className="grid gap-4">
          <div className={`${panelClass} p-6`}>
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
              Founder
            </span>
            <strong className="mt-4 block text-2xl text-[color:var(--text-strong)]">
              {contact.founderName}
            </strong>
            <p className="mt-3 text-base text-[color:var(--text-soft)]">
              {contact.address}
            </p>
          </div>

          {contactItems.map((item) => (
            <a
              className={`${panelClass} block p-6 no-underline`}
              href={item.makeHref(contact[item.key])}
              key={item.key}
              rel={item.external ? 'noreferrer' : undefined}
              target={item.external ? '_blank' : undefined}
            >
              <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                {item.label}
              </span>
              <strong className="mt-4 block text-2xl text-[color:var(--text-strong)]">
                {item.key === 'instagram' ? '@manishevents2' : contact[item.key]}
              </strong>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
