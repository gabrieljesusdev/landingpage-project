import StoryblokClient from "storyblok-js-client";
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

const localSiteContent = siteRaw as SiteContent;

const storyblokPreviewToken = import.meta.env.STORYBLOK_PREVIEW_TOKEN;
const storyblokContentSlug = import.meta.env.STORYBLOK_CONTENT_SLUG ?? "site";
const storyblokRegion = import.meta.env.STORYBLOK_REGION;
const storyblokVersion = import.meta.env.DEV ? "draft" : "published";

const storyblokClient = storyblokPreviewToken
  ? new StoryblokClient({
      accessToken: storyblokPreviewToken,
      ...(storyblokRegion ? { region: storyblokRegion } : {}),
    })
  : null;

const isSiteContent = (value: unknown): value is SiteContent => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return "seo" in record && "theme" in record && "home" in record;
};

const readString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return typeof value === "string" ? value : "";
};

const readBoolean = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return typeof value === "boolean" ? value : false;
};

const readBlocks = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return Array.isArray(value) ? value : [];
};

const normalizeStructuredSiteContent = (
  value: Record<string, unknown>,
): SiteContent | null => {
  if (!("seo_defaultTitle" in value) && !("seoDefaultTitle" in value)) {
    return null;
  }

  const seo = {
    defaultTitle:
      readString(value, "seo_defaultTitle") ||
      readString(value, "seoDefaultTitle"),
    defaultDescription:
      readString(value, "seo_defaultDescription") ||
      readString(value, "seoDefaultDescription"),
    keywords:
      readString(value, "seo_keywords") || readString(value, "seoKeywords"),
  };

  const theme = {
    primary:
      readString(value, "theme_primary") || readString(value, "themePrimary"),
    secondary:
      readString(value, "theme_secondary") ||
      readString(value, "themeSecondary"),
    bgPage:
      readString(value, "theme_bgPage") || readString(value, "themeBgPage"),
    bgSurface:
      readString(value, "theme_bgSurface") ||
      readString(value, "themeBgSurface"),
    textStrong:
      readString(value, "theme_textStrong") ||
      readString(value, "themeTextStrong"),
    textBody:
      readString(value, "theme_textBody") || readString(value, "themeTextBody"),
    textSoft:
      readString(value, "theme_textSoft") || readString(value, "themeTextSoft"),
    footer:
      readString(value, "theme_footer") || readString(value, "themeFooter"),
    danger:
      readString(value, "theme_danger") || readString(value, "themeDanger"),
    success:
      readString(value, "theme_success") || readString(value, "themeSuccess"),
    star: readString(value, "theme_star") || readString(value, "themeStar"),
    borderSoft:
      readString(value, "theme_borderSoft") ||
      readString(value, "themeBorderSoft"),
    fontSans:
      readString(value, "theme_fontSans") || readString(value, "themeFontSans"),
    fontDisplay:
      readString(value, "theme_fontDisplay") ||
      readString(value, "themeFontDisplay"),
  };

  const brand = {
    name: readString(value, "brand_name") || readString(value, "brandName"),
    whatsappNumber:
      readString(value, "brand_whatsappNumber") ||
      readString(value, "brandWhatsappNumber"),
  };

  const navbarLinks = readBlocks(value, "navbar_links").map((entry) => {
    const record = entry as Record<string, unknown>;
    return {
      label: readString(record, "label"),
      href: readString(record, "href"),
    };
  });

  const heroSlides = readBlocks(value, "home_hero_slides").map((entry) => {
    const record = entry as Record<string, unknown>;
    return {
      image: readString(record, "image"),
      alt: readString(record, "alt"),
    };
  });

  const heroStats = readBlocks(value, "home_hero_stats")
    .map((entry) => {
      const record = entry as Record<string, unknown>;
      return readString(record, "text");
    })
    .filter(Boolean);

  const servicesShowcaseCards = readBlocks(
    value,
    "home_servicesShowcase_cards",
  ).map((entry) => {
    const record = entry as Record<string, unknown>;
    return {
      title: readString(record, "title"),
      description: readString(record, "description"),
      image: readString(record, "image"),
      alt: readString(record, "alt"),
      href: readString(record, "href"),
    };
  });

  const iconServiceCards = readBlocks(value, "home_iconServices_cards").map(
    (entry) => {
      const record = entry as Record<string, unknown>;
      return {
        title: readString(record, "title"),
        desc: readString(record, "desc"),
        icon: readString(record, "icon"),
        href: readString(record, "href"),
      };
    },
  );

  const testimonialItems = readBlocks(value, "home_testimonials_items").map(
    (entry) => {
      const record = entry as Record<string, unknown>;
      return {
        name: readString(record, "name"),
        text: readString(record, "text"),
        avatar: readString(record, "avatar"),
      };
    },
  );

  const cities = readBlocks(value, "home_map_cities").map((entry) => {
    const record = entry as Record<string, unknown>;
    return {
      name: readString(record, "name"),
      markerClass: readString(record, "markerClass"),
    };
  });

  const servicesPageCards = readBlocks(value, "servicesPage_cards").map(
    (entry) => {
      const record = entry as Record<string, unknown>;
      return {
        title: readString(record, "title"),
        description: readString(record, "description"),
        image: readString(record, "image"),
        alt: readString(record, "alt"),
        href: readString(record, "href"),
      };
    },
  );

  const serviceDetails = readBlocks(value, "serviceDetails").map((entry) => {
    const record = entry as Record<string, unknown>;
    const topics = readBlocks(record, "topics")
      .map((topicEntry) => {
        const topicRecord = topicEntry as Record<string, unknown>;
        return readString(topicRecord, "topic");
      })
      .filter(Boolean);

    const gallery = readBlocks(record, "gallery").map((galleryEntry) => {
      const galleryRecord = galleryEntry as Record<string, unknown>;
      return {
        title: readString(galleryRecord, "title"),
        description: readString(galleryRecord, "description"),
        category: readString(galleryRecord, "category"),
        image: readString(galleryRecord, "image"),
        alt: readString(galleryRecord, "alt"),
      };
    });

    return {
      slug: readString(record, "slug"),
      title: readString(record, "title"),
      description: readString(record, "description"),
      image: readString(record, "image"),
      alt: readString(record, "alt"),
      topics,
      ctaText: readString(record, "ctaText"),
      gallery,
    };
  });

  const structuredSiteContent: SiteContent = {
    seo,
    theme,
    brand,
    navbar: {
      enabled:
        readBoolean(value, "navbar_enabled") ||
        readBoolean(value, "navbarEnabled"),
      links: navbarLinks,
      ctaText:
        readString(value, "navbar_ctaText") ||
        readString(value, "navbarCtaText"),
      ctaMessage:
        readString(value, "navbar_ctaMessage") ||
        readString(value, "navbarCtaMessage"),
    },
    home: {
      hero: {
        enabled:
          readBoolean(value, "home_hero_enabled") ||
          readBoolean(value, "homeHeroEnabled"),
        slides: heroSlides,
        title:
          readString(value, "home_hero_title") ||
          readString(value, "homeHeroTitle"),
        subtitle:
          readString(value, "home_hero_subtitle") ||
          readString(value, "homeHeroSubtitle"),
        ctaText:
          readString(value, "home_hero_ctaText") ||
          readString(value, "homeHeroCtaText"),
        ctaMessage:
          readString(value, "home_hero_ctaMessage") ||
          readString(value, "homeHeroCtaMessage"),
        stats: heroStats,
      },
      servicesShowcase: {
        enabled:
          readBoolean(value, "home_servicesShowcase_enabled") ||
          readBoolean(value, "homeServicesShowcaseEnabled"),
        label:
          readString(value, "home_servicesShowcase_label") ||
          readString(value, "homeServicesShowcaseLabel"),
        title:
          readString(value, "home_servicesShowcase_title") ||
          readString(value, "homeServicesShowcaseTitle"),
        cards: servicesShowcaseCards,
      },
      iconServices: {
        enabled:
          readBoolean(value, "home_iconServices_enabled") ||
          readBoolean(value, "homeIconServicesEnabled"),
        title:
          readString(value, "home_iconServices_title") ||
          readString(value, "homeIconServicesTitle"),
        cards: iconServiceCards,
      },
      testimonials: {
        enabled:
          readBoolean(value, "home_testimonials_enabled") ||
          readBoolean(value, "homeTestimonialsEnabled"),
        title:
          readString(value, "home_testimonials_title") ||
          readString(value, "homeTestimonialsTitle"),
        highlight:
          readString(value, "home_testimonials_highlight") ||
          readString(value, "homeTestimonialsHighlight"),
        ratingText:
          readString(value, "home_testimonials_ratingText") ||
          readString(value, "homeTestimonialsRatingText"),
        preCtaText:
          readString(value, "home_testimonials_preCtaText") ||
          readString(value, "homeTestimonialsPreCtaText"),
        ctaText:
          readString(value, "home_testimonials_ctaText") ||
          readString(value, "homeTestimonialsCtaText"),
        ctaMessage:
          readString(value, "home_testimonials_ctaMessage") ||
          readString(value, "homeTestimonialsCtaMessage"),
        bottomText:
          readString(value, "home_testimonials_bottomText") ||
          readString(value, "homeTestimonialsBottomText"),
        items: testimonialItems,
      },
      map: {
        enabled:
          readBoolean(value, "home_map_enabled") ||
          readBoolean(value, "homeMapEnabled"),
        title:
          readString(value, "home_map_title") ||
          readString(value, "homeMapTitle"),
        whatsappLabel:
          readString(value, "home_map_whatsappLabel") ||
          readString(value, "homeMapWhatsappLabel"),
        phoneText:
          readString(value, "home_map_phoneText") ||
          readString(value, "homeMapPhoneText"),
        mapsQuery:
          readString(value, "home_map_mapsQuery") ||
          readString(value, "homeMapMapsQuery"),
        mapEmbedUrl:
          readString(value, "home_map_mapEmbedUrl") ||
          readString(value, "homeMapMapEmbedUrl"),
        cities,
      },
    },
    footer: {
      enabled:
        readBoolean(value, "footer_enabled") ||
        readBoolean(value, "footerEnabled"),
      copyright:
        readString(value, "footer_copyright") ||
        readString(value, "footerCopyright"),
      locationLabel:
        readString(value, "footer_locationLabel") ||
        readString(value, "footerLocationLabel"),
      locationText:
        readString(value, "footer_locationText") ||
        readString(value, "footerLocationText"),
      hoursLabel:
        readString(value, "footer_hoursLabel") ||
        readString(value, "footerHoursLabel"),
      hoursText:
        readString(value, "footer_hoursText") ||
        readString(value, "footerHoursText"),
      phoneLabel:
        readString(value, "footer_phoneLabel") ||
        readString(value, "footerPhoneLabel"),
      phoneText:
        readString(value, "footer_phoneText") ||
        readString(value, "footerPhoneText"),
    },
    servicesPage: {
      title:
        readString(value, "servicesPage_title") ||
        readString(value, "servicesPageTitle"),
      description:
        readString(value, "servicesPage_description") ||
        readString(value, "servicesPageDescription"),
      badge:
        readString(value, "servicesPage_badge") ||
        readString(value, "servicesPageBadge"),
      heading:
        readString(value, "servicesPage_heading") ||
        readString(value, "servicesPageHeading"),
      intro:
        readString(value, "servicesPage_intro") ||
        readString(value, "servicesPageIntro"),
      backText:
        readString(value, "servicesPage_backText") ||
        readString(value, "servicesPageBackText"),
      cards: servicesPageCards,
    },
    serviceDetails,
  };

  return isSiteContent(structuredSiteContent) ? structuredSiteContent : null;
};

const parseSiteJson = (value: string): SiteContent | null => {
  const candidates = [value, value.replace('}}},"footer"', '}},"footer"')];
  const firstBrace = value.indexOf("{");
  const lastBrace = value.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    candidates.push(value.slice(firstBrace, lastBrace + 1));
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as unknown;
      return isSiteContent(parsed) ? parsed : null;
    } catch {
      continue;
    }
  }

  return null;
};

const pickStoryData = (
  content: Record<string, unknown>,
): SiteContent | null => {
  const structuredSiteContent = normalizeStructuredSiteContent(content);

  if (structuredSiteContent) {
    return structuredSiteContent;
  }

  if (typeof content.site_json === "string") {
    const parsed = parseSiteJson(content.site_json);

    if (!parsed) {
      console.warn('Storyblok field "site_json" is not valid JSON.');
    }

    return parsed;
  }

  if (typeof content.data === "object" && content.data !== null) {
    return isSiteContent(content.data) ? content.data : null;
  }

  if (typeof content.site === "object" && content.site !== null) {
    return isSiteContent(content.site) ? content.site : null;
  }

  if (isSiteContent(content)) {
    return content;
  }

  return null;
};

const loadSiteContent = async (): Promise<SiteContent> => {
  if (!storyblokClient) {
    return localSiteContent;
  }

  try {
    const response = await storyblokClient.get(
      `cdn/stories/${storyblokContentSlug}`,
      {
        version: storyblokVersion,
        cv: Date.now(),
      },
    );

    const storyContent = response?.data?.story?.content;

    if (!storyContent || typeof storyContent !== "object") {
      console.warn(
        "Storyblok story content is missing. Falling back to local JSON.",
      );
      return localSiteContent;
    }

    const picked = pickStoryData(storyContent as Record<string, unknown>);

    if (!picked) {
      console.warn(
        "Storyblok story content does not match expected shape. Falling back to local JSON.",
      );
      return localSiteContent;
    }

    return isSiteContent(picked) ? picked : localSiteContent;
  } catch (error) {
    console.warn(
      "Storyblok request failed. Falling back to local JSON.",
      error,
    );
    return localSiteContent;
  }
};

export const siteContent = await loadSiteContent();

export const whatsappHref = (message: string) => {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteContent.brand.whatsappNumber}?text=${text}`;
};

export const getServiceBySlug = (slug: string) =>
  siteContent.serviceDetails.find((service) => service.slug === slug);
