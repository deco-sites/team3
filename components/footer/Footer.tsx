import BackToTop from "../../components/footer/BackToTop.tsx";
import Divider from "../../components/footer/Divider.tsx";
import ExtraLinks from "../../components/footer/ExtraLinks.tsx";
import FooterItems from "../../components/footer/FooterItems.tsx";
import Logo from "../../components/footer/Logo.tsx";
import MobileApps from "../../components/footer/MobileApps.tsx";
import PaymentMethods from "../../components/footer/PaymentMethods.tsx";
import RegionSelector from "../../components/footer/RegionSelector.tsx";
import Social from "../../components/footer/Social.tsx";
import Newsletter from "../../islands/Newsletter.tsx";
import { clx } from "../../sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Icon from "../ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

const LAYOUT = {
  "Primary": "bg-primary text-primary-content",
  "Secondary": "bg-secondary text-secondary-content",
  "Accent": "bg-accent text-accent-content",
  "Base 100": "bg-base-100 text-base-content",
  "Base 100 inverted": "bg-base-content text-base-100",
};

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Institucional",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Trocas e Devoluções",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Prazos e entrega",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Envio de encomenda",
      },
    ],
  }, {
    "label": "Contato",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Whatsapp: (11) 99999-9999",
      },
      {
        "href": "/whatsapp",
        "label": "E-mail: sac@fashion.com.br",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );

  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;

  return (
    <footer
      class={clx(
        "w-full flex flex-col pt-10 pb-2 md:pb-10 gap-10",
        LAYOUT[layout?.backgroundColor ?? "Primary"],
      )}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
            {sections.length > 0 && (
              <>
                {/* Tablet and Desktop view */}
                <ul
                  class={`hidden md:flex flex-row gap-6 lg:gap-10 h-70`}
                >
                  <div class="flex w-75 flex-wrap justify-end content-start">
                    {sections.map((section) => (
                      <li class="h-52">
                        <div class="flex flex-col gap-2 w-80 h-52">
                          <span class="font-medium text-lg">
                            {section.label}
                          </span>
                          <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                            {section.items?.map((item) => (
                              <li>
                                <a
                                  href={item.href}
                                  class="block py-1 link link-hover"
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                    {_social}
                  </div>
                  <div class="flex">
                    {_payments}
                    {_newsletter}
                  </div>
                </ul>

                {/* Mobile view */}
                <ul class="flex flex-col md:hidden gap-4">
                  {sections.map((section) => (
                    <li>
                      <div class="collapse collapse-arrow ">
                        <input
                          id={section.label}
                          type="checkbox"
                          class="min-h-[0]"
                        />
                        <label
                          htmlFor={section.label}
                          class="collapse-title min-h-[0] !p-0 flex gap-2"
                        >
                          <span>{section.label}</span>
                        </label>
                        <div class="collapse-content">
                          <ul
                            class={`flex flex-col gap-1 pl-5 pt-2`}
                          >
                            {section.items?.map((item) => (
                              <li>
                                <a
                                  href={item.href}
                                  class="block py-1 link link-hover"
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                  {_social}
                  {_payments}
                  {_newsletter}
                </ul>
              </>
            )}
          </div>
          <Divider />
          <div class="flex justify-between">
            <span>
              © 2022 - Fashion - CNPJ: 00.000.000/0001-00 - Todos os Direitos
              Reservados
            </span>
            <div class="flex gap-5">
              <Icon
                id="Econverselogo"
                size={72}
                fill="currentColor"
              />

              <Icon
                id="Vtexlogo"
                size={72}
                fill="currentColor"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
