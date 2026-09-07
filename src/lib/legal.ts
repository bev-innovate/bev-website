/**
 * Privacy Policy and Terms of Use.
 *
 * Client-supplied and reproduced verbatim, including the em dashes the rest of the site
 * avoids: this is a dated legal document rather than marketing copy, and house punctuation
 * is not worth a silent edit to it. The only thing changed is the contact line, where the
 * envelope emoji is replaced by a real `mailto:` link, since an emoji read aloud as
 * "envelope with arrow" tells a screen reader user nothing.
 *
 * Both documents name **Earthtech Ventures Pte Ltd** as the operating company. The footer
 * credits Better Earth Ventures, which is the brand. Worth confirming those are the same
 * legal entity before launch.
 */

export interface LegalDocument {
  title: string;
  /** Rendered under the title and repeated in the page metadata. */
  updated: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
  contact: { lead: string; email: string };
}

const EMAIL = "innovate@betterearthventures.com";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  updated: "2 April 2025",
  intro:
    "How Earthtech Ventures Pte Ltd collects, uses and discloses personal information when you use this website.",
  sections: [
    {
      title: "Introduction",
      paragraphs: [
        "This Privacy Policy explains how Earthtech Ventures Pte Ltd (“we”, “our”, or “us”) collects, uses, and discloses personal information when you visit or interact with our website https://www.betterearthventures.com (the “Site”) or otherwise engage with our services. By accessing or using our Site, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of the Site.",
      ],
    },
    {
      title: "Updates to This Policy",
      paragraphs: [
        "We may occasionally update this Privacy Policy to reflect changes in our practices, technology, or legal requirements. Any updates will be posted on this page with a revised “Last updated” date.",
      ],
    },
    {
      title: "What We Collect",
      paragraphs: [
        "We collect limited personal information, such as your name and email address, only when you voluntarily provide it—typically when subscribing to our updates, downloading resources, or joining our initiatives.",
        "We may also collect non-identifying information automatically through cookies and similar technologies. This may include your IP address, browser type, device information, pages visited, time spent, and referring links.",
      ],
    },
    {
      title: "How We Use Your Information",
      paragraphs: [
        "We use this information to operate and improve our Site, understand user behavior, and communicate updates or content you’ve requested. If you’ve opted into communications, we may occasionally email you about new initiatives, events, or projects. You can unsubscribe at any time.",
      ],
    },
    {
      title: "Sharing Your Information",
      paragraphs: [
        "We may share your information with service providers who support our operations, such as website hosting, email platforms, or analytics tools. These partners are required to handle your data responsibly and in accordance with applicable laws. We do not sell your personal information.",
      ],
    },
    {
      title: "Cookies and Tracking",
      paragraphs: [
        "Cookies help us enhance your browsing experience and better understand usage patterns. You can control cookie settings through your browser preferences, though disabling them may affect certain features of the Site.",
      ],
    },
    {
      title: "Third-Party Links",
      paragraphs: [
        "This Site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites and encourage you to review their respective privacy policies.",
      ],
    },
    {
      title: "Data Security",
      paragraphs: [
        "We take reasonable steps to secure your data but cannot guarantee complete security. Please avoid sharing sensitive information via unencrypted channels.",
      ],
    },
    {
      title: "Your Rights",
      paragraphs: [
        `Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict the use of your personal information. To exercise any of these rights or to ask questions about this policy, you may contact us at ${EMAIL}.`,
      ],
    },
  ],
  contact: { lead: "For any privacy-related inquiries, you can reach us at:", email: EMAIL },
};

export const termsOfUse: LegalDocument = {
  title: "Terms of Use",
  updated: "2 April 2025",
  intro:
    "The terms you agree to by using this website, operated by Earthtech Ventures Pte Ltd.",
  sections: [
    {
      title: "Acceptance of Terms",
      paragraphs: [
        "By accessing or using this website (the “Site”), operated by Earthtech Ventures Pte Ltd (“we”, “us”, or “our”), you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, please do not use this Site.",
      ],
    },
    {
      title: "Changes to These Terms",
      paragraphs: [
        "We may update these Terms from time to time to reflect changes in our services or for legal or operational reasons. Your continued use of the Site after changes are posted will mean you accept those updates.",
      ],
    },
    {
      title: "Use of the Site",
      paragraphs: [
        "You agree to use the Site only for lawful purposes and in a way that does not infringe on the rights of others or restrict or inhibit anyone else’s use of the Site. You agree not to attempt to access or disrupt our systems, servers, or networks connected to the Site.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        "All content on this Site—including but not limited to text, visuals, graphics, videos, brand elements, and layout—is owned by Earthtech Ventures or its content partners and is protected by copyright, trademark, and other applicable laws. You may not reproduce, redistribute, modify, or publicly display any content without prior written consent.",
      ],
    },
    {
      title: "User Submissions",
      paragraphs: [
        "If you voluntarily submit feedback, suggestions, or other content to us (for example, through a form, email, or community space), you grant us a non-exclusive, royalty-free right to use, display, or publish that content. We reserve the right to remove any material we deem inappropriate.",
      ],
    },
    {
      title: "Third-Party Links",
      paragraphs: [
        "This Site may contain links to third-party websites or tools that are not operated or controlled by us. We are not responsible for the content, policies, or practices of any third-party websites.",
      ],
    },
    {
      title: "Disclaimers",
      paragraphs: [
        "All content and materials on the Site are provided “as is” for general informational purposes only. We make no guarantees regarding the accuracy, completeness, or reliability of the content. Your use of the Site is at your own risk.",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by law, Earthtech Ventures and its team shall not be liable for any indirect, incidental, or consequential damages arising from your use or inability to use the Site or its content.",
      ],
    },
    {
      title: "Governing Law",
      paragraphs: [
        "These Terms are governed by and interpreted in accordance with the laws of Singapore. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Singapore.",
      ],
    },
  ],
  contact: { lead: "If you have any questions about these Terms, you can reach us at:", email: EMAIL },
};
