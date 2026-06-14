"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail } from "lucide-react";
import Footer from "../Footer/Footer";
import { FaMapMarkerAlt, FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
type Crumb = { name: string; href?: string };
const ADDRESS = "Adarsh Plaza, 403 & 404, 150 Feet Ring Rd, opp. GSPC Gas, nr. Raiya Telephone Exchage, Raval Nagar, Rajkot, Gujarat 360005";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS
)}`;

const ContactUs = () => {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Contact Us" }];
  const [jobTyperRef, jobTyperSeen] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <>
      {/* ===== banner ===== */}
      <section className="fixed inset-x-0 top-0 h-screen w-full z-0">
        <div className="h-full w-full bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255, 255, 240, 0.1) 0%, rgba(255, 255, 240, 0.4) 65%, rgba(255, 255, 0, 0.1) 85%, rgba(255, 255, 0, 0.3) 100%)"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl fontAL font-semibold capitalize mt-5">
              Contact Us
            </h1>
            <p className="fontPOP text-sm md:text-base text-slate-700 mb-6 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-700">
              <ol className="flex items-center justify-center gap-2">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 1;
                  return (
                    <li key={c.name} className="flex items-center gap-2">
                      {i > 0 && (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-slate-400"
                          aria-hidden="true"
                        >
                          <path d="M7.05 4.55a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4L9.88 10 7.05 7.15a1 1 0 0 1 0-1.4z" />
                        </svg>
                      )}
                      {isLast || !c.href ? (
                        <span className=" fontPOP text-xs sm:text-sm">
                          {c.name}
                        </span>
                      ) : (
                        <a
                          href={c.href}
                          className="hover:text-slate-900 fontPOP text-xs sm:text-sm"
                        >
                          {c.name}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling */}
      <div className="h-screen pointer-events-none" />

      {/* Wrapper to scroll over the fixed hero section */}
      <div className="relative z-10 bg-[#FFFFF0] shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">

      {/* ===== Main ===== */}
      <section className="relative">
        <div className="section-container px-4 sm:px-6 lg:px-[5%] 2xl:px-[15%] py-10 lg:py-[5%]">
          {/* light  mock */}
          <div className="mx-auto grid max-w-7xl items-start gap-15 lg:gap-20 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px]">
            {/* LEFT — form */}
            <div className="m-0 md:m-5 md:pl-6">
              <p
                className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5 max-w-[500px] min-h-24"
                style={{
                  letterSpacing: "1px",
                  wordSpacing: "2px",
                  lineHeight: 1.2,
                }}
                ref={jobTyperRef}
              >
                {jobTyperSeen && (
                  <Typewriter
                    words={["Send Us a Message"]}
                    typeSpeed={90}
                    deleteSpeed={0}
                    delaySpeed={800}
                    cursor={false}
                    loop={1}
                  />
                )}
              </p>

              <p
                className="fontPOP text-gray-500 text-xs sm:text-sm mt-2"
                style={{
                  letterSpacing: "1px",
                  lineHeight: 1.3,
                }}
              >
                Feel free to contact us and we will get back to you as soon as
                we can.
              </p>

              <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    autoComplete="name"
                    className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                    className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    autoComplete="tel"
                    className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                </div>

                <div className="mt-3">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    rows={4}
                    className="w-full p-2 rounded bg-white   text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                </div>

                <div className="mt-8 flex justify-center sm:justify-start">
                  <button
                    type="submit"
                    className="relative px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
                  >
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                    <span className="relative flex gap-2 items-center text-sm font-semibold">
                      Submit Now
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT — info card with right-anchored blue strip */}
            <aside className="relative md:pl-6">
              <div className="relative w-full max-w-[440px] lg:ml-auto">
                <div
                  aria-hidden
                  className="hidden lg:block absolute right-0 top-[-56px] bottom-[-72px] w-[84%] rounded-md bg-[#EAF3FF]"
                />

                {/* Info card (slightly left over the strip) */}
                <div className="relative mr-6 rounded-xl bg-white p-6 sm:p-8 ring-1 ring-blue-100/70 shadow-[0_22px_48px_-10px_rgba(29,78,216,0.15)]">
                  {/* block 1 */}
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-[#00c9ff] ring-1 ring-blue-100">
                      <MapPin size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Our Office
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-gray-900 font-medium">
                        Adarsh Plaza, 403 & 404, 150 Feet Ring Rd, opp. GSPC Gas, nr. Raiya Telephone Exchage, Raval Nagar,
                        <br />
                        Rajkot, Gujarat 360005
                      </p>
                    </div>
                  </div>

                  <hr className="my-6 border-slate-100" />

                  {/* block 2 */}
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-[#00c9ff] ring-1 ring-blue-100">
                      <Phone size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Feel free to contact us
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-gray-900 font-medium flex flex-col gap-1">
                        <Link href="tel:+917201080009" target="_blank" rel="noopener noreferrer" className="hover:text-[#00c9ff] transition-colors">+91 72010 80009</Link>
                        <Link href="tel:+919428506592" target="_blank" rel="noopener noreferrer" className="hover:text-[#00c9ff] transition-colors">+91 94285 06592</Link>
                      </p>
                    </div>
                  </div>

                  <hr className="my-6 border-slate-100" />

                  {/* block 3 */}
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-50 text-[#00c9ff] ring-1 ring-blue-100">
                      <Mail size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Support</h3>
                      <p className="mt-1 text-xs leading-5 text-gray-900 font-medium flex flex-col gap-1">
                        <Link href="mailto:jobs@rojgariindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00c9ff] transition-colors">jobs@rojgariindia.com</Link>
                        <Link href="mailto:hr@rojgariindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00c9ff] transition-colors">hr@rojgariindia.com</Link>
                      </p>
                    </div>
                  </div>

                  {/* angled “paper” shadow under card */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-4 left-10 h-4 w-[80%] -skew-x-6 rounded-[2px] bg-slate-300/25 blur-[1px]"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      {/* Social Media CTA Section */}
      <section className="relative w-full py-16 mb-16 bg-gradient-to-r from-[#2dbcf0] to-[#195b87] overflow-hidden">
        {/* Background Map Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: "url('/images/map-img.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        {/* Overlay gradient to match the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d9bd2] to-[#113a5a] mix-blend-multiply opacity-30 z-0"></div>

        <div className="relative z-10 section-container px-4 sm:px-6 lg:px-[5%] 2xl:px-[15%] text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Connect With Us
          </h2>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Follow Rojgari India on social media for the latest job openings, career tips, and industry news. Join our growing community of professionals!
          </p>
          
          <div className="flex items-center justify-center gap-6">
            <a href="https://wa.me/917201080009?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
              <FaWhatsapp size={22} />
            </a>
            <a href="https://www.linkedin.com/company/rojgariindia/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#007bb5] hover:bg-[#007bb5] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
              <FaLinkedinIn size={22} />
            </a>
            <a href="https://www.instagram.com/rojgariindia/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
              <FaInstagram size={22} />
            </a>
            <a href="https://www.facebook.com/share/1ACWMEKGH8/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition-all transform hover:-translate-y-1 shadow-lg">
              <FaFacebookF size={22} />
            </a>
          </div>
        </div>
      </section>

      {/* map  */}
      <section className="relative w-full">
        <div className="section-container px-4 sm:px-6 lg:px-[5%] 2xl:px-[15%] pb-12">
          {/* Address + directions (overlay on top of the map) */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 bg-white/90 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm text-neutral-700">
            <FaMapMarkerAlt className="text-gray-500" />
            {ADDRESS}
            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-sky-600 hover:underline"
            >
              Directions
            </a>
          </div>

          {/* Map with equal spacing */}
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px] md:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* <Footer /> */}
      </div>
    </>
  );
};

export default ContactUs;
