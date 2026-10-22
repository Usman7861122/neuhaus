/* ---------------------------------------------------------------
 * Photos: use the local copy in /public/images when it exists
 * (run `npm run images` once to download them), otherwise fall
 * back to the online link. So the site never shows a broken photo.
 * ------------------------------------------------------------- */
import fs from "node:fs";
const hasLocal = (publicPath: string) => {
  try { return fs.existsSync(`public${publicPath}`); } catch { return false; }
};

export const unsplash = (id: string, w = 1600, h?: number) => {
  const local = `/images/photos/${id}-${w <= 700 ? "sm" : "lg"}.jpg`;
  if (hasLocal(local)) return local;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=75`;
};

export const remoteImage = (url: string) => {
  if (!url) return url;
  const local = `/images/remote/${url.split("/").pop()}`;
  return hasLocal(local) ? local : url;
};

export const site = {
  careers: "https://neuhausfootandankle.applytojob.com/",
  name: "Neuhaus Foot & Ankle",
  short: "Neuhaus",
  tagline: "Podiatrists in Nashville and across Middle Tennessee",
  phone: "615-857-5428",
  phoneHref: "tel:+16158575428",
  generalPhone: "615-220-8788",
  fax: "615-220-8688",
  payOnline: "https://www.epayitonline.com/PayItOnline/iFrameLogin.aspx",
  patientPortal: "https://mycw52.eclinicalweb.com/portal6061/jsp/100mp/login_otp.jsp",
};

export const nav = [
  { label: "Our Practice", href: "/#about", menu: "practice" },
  { label: "Conditions We Treat", href: "/services", menu: "conditions" },
  { label: "Locations", href: "/#locations", menu: "locations" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Careers", href: "https://neuhausfootandankle.applytojob.com/", external: true },
  { label: "Contact", href: "/#contact" },
];

export const practiceLinks = [
  { label: "Why Choose Us", href: "/#why", desc: "How a visit with us works, step by step" },
  { label: "Our Doctors", href: "/doctors", desc: "16 podiatrists and foot & ankle surgeons" },
  { label: "Testimonials", href: "/#testimonials", desc: "Reviews from Google, Yelp & Facebook" },
  { label: "Insurance", href: "/#insurance", desc: "Medicare, TennCare and most major plans" },
  { label: "Blog", href: "/blog", desc: "Foot health advice in plain words" },
  { label: "Careers", href: "https://neuhausfootandankle.applytojob.com/", desc: "Join our growing team", external: true },
];

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Coordinates are approximate (street level). Check before launch. */
export const locations = [
  { city: "Nashville", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=6jGZQ0k17NAyWnLO", address: "300 20th Avenue North, Suite 103", zip: "Nashville, TN 37203", phone: "615-805-6859", lat: 36.1523, lng: -86.8006 },
  { city: "Brentwood", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=mJ615ek74gv0B7D4", address: "10644 Concord Road", zip: "Brentwood, TN 37027", phone: "615-857-5649", lat: 35.9876, lng: -86.7717 },
  { city: "Clarksville", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=xaqPX3Aq0bvQGJ46", address: "1762 Memorial Dr", zip: "Clarksville, TN 37043", phone: "615-857-5132", lat: 36.5530, lng: -87.3240 },
  { city: "Columbia", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=ab2n5zVEe1VYZq8N", address: "1215 Hatcher Lane", zip: "Columbia, TN 38401", phone: "931-213-3861", lat: 35.6268, lng: -87.0620 },
  { city: "Cookeville", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=8gZXrVgZ1nARmWYl", address: "120 Walnut Commons Lane, Suite A", zip: "Cookeville, TN 38501", phone: "931-651-9285", lat: 36.1520, lng: -85.5100 },
  { city: "Gallatin", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=Qd1p2JAR2nADozmN", address: "179 Hancock St, Suite 300", zip: "Gallatin, TN 37066", phone: "615-802-5465", lat: 36.3700, lng: -86.4730 },
  { city: "Goodlettsville", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=5Mz7wAW0pJVZoqQD", address: "824 Wren Rd", zip: "Goodlettsville, TN 37072", phone: "615-551-4394", lat: 36.3190, lng: -86.7050 },
  { city: "Hermitage", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=oWmOyeV6yoAEdg2q", address: "3901 Central Pike, Suite 353", zip: "Hermitage, TN 37076", phone: "615-805-6472", lat: 36.1880, lng: -86.6130 },
  { city: "Lebanon", book: "", address: "430 West Main Street", zip: "Lebanon, TN 37087", phone: "615-805-6633", lat: 36.2080, lng: -86.3010 },
  { city: "Mount Juliet", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=qn8mDjV4RyvOwQJ0", address: "2628 North Mount Juliet Road", zip: "Mount Juliet, TN 37122", phone: "615-857-5383", lat: 36.2240, lng: -86.5140 },
  { city: "Murfreesboro", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=b2n5zVEgL1vYZq8N", address: "536 N Thompson Ln, Suite F", zip: "Murfreesboro, TN 37129", phone: "629-219-4002", lat: 35.8570, lng: -86.4110 },
  { city: "Pulaski", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=51M9b2k88gk08zKn", address: "306 South 7th Street", zip: "Pulaski, TN 38478", phone: "931-271-4474", lat: 35.1970, lng: -87.0340 },
  { city: "Shelbyville", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=xaqPX3AqoDkQGJ46", address: "120 Frank Martin Rd, Suite 200", zip: "Shelbyville, TN 37160", phone: "615-437-3906", lat: 35.4970, lng: -86.4470 },
  { city: "Smyrna", book: "https://healow.com/apps/practice/advanced-health-23486?v=2&t=1&f=B8gZXrVg4nkRmWYl", address: "693 President Pl, Suite 103", zip: "Smyrna, TN 37167", phone: "615-857-5428", lat: 35.9700, lng: -86.5230 },
  { city: "Waverly", book: "", address: "110 Hillwood Drive", zip: "Waverly, TN 37185", phone: "615-802-5673", lat: 36.0880, lng: -87.7780 },
];

const PP = "https://sa1s3optim.patientpop.com/assets/production/practices/1aec7b487ea1bb3824e36f325e6542ee4d6e0680/images/";

const providersRaw = [
  { name: "Matthew Neuhaus", creds: "DPM, FACFAS", role: "Founder, foot & ankle surgeon", photo: remoteImage(PP + "2724466.jpg") },
  { name: "Peninnah Kumar", creds: "DPM, CWSP, FACFAS", role: "Foot & ankle surgeon, wound care", photo: remoteImage(PP + "2724463.jpg") },
  { name: "Christopher Benac", creds: "DPM, MS", role: "Podiatrist", photo: remoteImage(PP + "2724459.jpg") },
  { name: "John Boyd", creds: "DPM, FACFAS", role: "Foot & ankle surgeon", photo: remoteImage(PP + "2505077.jpg") },
  { name: "Emily Keeter", creds: "DPM, FACFAS", role: "Foot & ankle surgeon", photo: remoteImage(PP + "2724474.jpg") },
  { name: "Lucy Barrow", creds: "DPM, FACFAS", role: "Foot & ankle surgeon", photo: remoteImage(PP + "2724470.jpg") },
  { name: "Brian Jackson", creds: "DPM", role: "Podiatrist", photo: remoteImage(PP + "2724472.jpg") },
  { name: "Sheela Chockalingam", creds: "DPM, AACFAS", role: "Podiatrist", photo: remoteImage(PP + "2473068.jpg") },
  { name: "Douglas Holder", creds: "DPM, AACFAS", role: "Podiatrist", photo: remoteImage(PP + "2724476.jpg") },
  { name: "Jeffrey Hurless", creds: "DPM, FACFAS", role: "Foot & ankle surgeon", photo: remoteImage(PP + "2779925.jpg") },
  { name: "Aaron Allred", creds: "DPM", role: "Podiatrist", photo: remoteImage(PP + "2715476.jpg") },
  { name: "Ryan Thurston", creds: "DPM", role: "Podiatrist", photo: remoteImage(PP + "2747062.jpg") },
  { name: "Jimmie Watkins", creds: "DPM", role: "Podiatrist", photo: remoteImage(PP + "2747064.jpg") },
  { name: "Harpreet Khalsa", creds: "DPM", role: "Podiatrist", photo: remoteImage(PP + "2772366.jpeg") },
  { name: "Alec Wroblewski", creds: "DPM", role: "Podiatrist", photo: remoteImage(PP + "2839194.jpg") },
  { name: "Richard Lavigna", creds: "DPM", role: "Podiatrist", photo: remoteImage(PP + "2839196.png") },
];

export const providers = providersRaw.map((p) => ({ ...p, slug: slugify(p.name) }));

export const insurances = [
  "Aetna", "Align Network", "Amerigroup", "Anthem", "Blue Cross Blue Shield", "Bright Health",
  "Cigna", "Clover Health", "Corvel", "HealthSCOPE Benefits", "Humana", "Medicaid of Kentucky",
  "Medicare", "MedRisk", "NovaNet", "Prime Health Services", "Sedgwick", "TennCare", "Tricare",
  "UnitedHealthcare", "WellCare",
];

export const testimonials = [
  { quote: "Dr. Neuhaus is great. He can diagnose the problem quickly and recommend treatment immediately. I'm so glad to get some relief.", name: "Cathy D.", source: "Google" },
  { quote: "Dr. Kumar and her assistant are both reason enough to continue treatment.", name: "Karen C.", source: "Google" },
  { quote: "Great staff, very friendly. Wonderful doctor, explains in detail, and had great results!", name: "Keli R.", source: "Facebook" },
  { quote: "Dr. Neuhaus is my favorite doctor in the world! Always able to get me taken care of properly.", name: "Trey V.", source: "Yelp" },
];
