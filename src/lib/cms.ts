import siteRaw from "../data/site.json";

export type SimpleCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  topics: string[];
  ctaText: string;
  gallery: Array<{
    title: string;
    description: string;
    category: string;
    image: string;
    alt: string;
  }>;
};

export type SiteContent = {
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string;
  };
  theme: {
    primary: string;
    secondary: string;
    bgPage: string;
    bgSurface: string;
    textStrong: string;
    textBody: string;
    textSoft: string;
    footer: string;
    danger: string;
    success: string;
    star: string;
    borderSoft: string;
    fontSans: string;
    fontDisplay: string;
  };
  brand: {
    name: string;
    whatsappNumber: string;
  };
  navbar: {
    enabled: boolean;
    links: Array<{ label: string; href: string }>;
    ctaText: string;
    ctaMessage: string;
  };
  home: {
    hero: {
      enabled: boolean;
      slides: Array<{ image: string; alt: string }>;
      title: string;
      subtitle: string;
      ctaText: string;
      ctaMessage: string;
      stats: string[];
    };
    servicesShowcase: {
      enabled: boolean;
      label: string;
      title: string;
      cards: SimpleCard[];
    };
    iconServices: {
      enabled: boolean;
      title: string;
      cards: Array<{
        title: string;
        desc: string;
        icon: string;
        href: string;
      }>;
    };
    testimonials: {
      enabled: boolean;
      title: string;
      highlight: string;
      ratingText: string;
      preCtaText: string;
      ctaText: string;
      ctaMessage: string;
      bottomText: string;
      items: Array<{
        name: string;
        text: string;
        avatar: string;
      }>;
    };
    map: {
      enabled: boolean;
      title: string;
      whatsappLabel: string;
      phoneText: string;
      mapsQuery: string;
      mapEmbedUrl: string;
      cities: Array<{ name: string; markerClass: string }>;
    };
  };
  footer: {
    enabled: boolean;
    copyright: string;
    locationLabel: string;
    locationText: string;
    hoursLabel: string;
    hoursText: string;
    phoneLabel: string;
    phoneText: string;
  };
  servicesPage: {
    title: string;
    description: string;
    badge: string;
    heading: string;
    intro: string;
    backText: string;
    cards: SimpleCard[];
  };
  serviceDetails: ServiceDetail[];
};

export const siteContent = siteRaw as SiteContent;

export const whatsappHref = (message: string) => {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteContent.brand.whatsappNumber}?text=${text}`;
};

export const getServiceBySlug = (slug: string) =>
  siteContent.serviceDetails.find((service) => service.slug === slug);
