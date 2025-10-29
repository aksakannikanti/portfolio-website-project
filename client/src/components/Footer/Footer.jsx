import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
  Facebook,
  Instagram,
  Youtube,
  Twitch,
  Globe,
  MessageCircle,
  Send,
  Palette,
  Briefcase,
  Zap,
  Music,
  Camera,
  Video,
  Users,
  Share2,
} from "lucide-react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { Backend_Root_Url } from "../../config/AdminUrl.js";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  // Dynamic icon mapping for Lucide React icons
  const iconMap = {
    // Main social media platforms
    Facebook,
    Twitter,
    Instagram,
    LinkedIn: Linkedin,
    Github,
    Youtube,
    Mail,
    Twitch,
    Globe,

    // Additional social media and platforms
    Discord: MessageCircle,
    Telegram: Send,
    Pinterest: Palette,
    Fiverr: Briefcase,
    Reddit: Share2,
    TikTok: Music,
    Snapchat: Camera,
    Vimeo: Video,
    WhatsApp: MessageCircle,
    Slack: Users,
    Dribbble: Zap,
    Behance: Palette,

    // Generic fallbacks
    Website: Globe,
    Email: Mail,
    Phone: Phone,
  };

  // Fetch data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const API_ENDPOINT = `${Backend_Root_Url}/api/home/main/data`;
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
        setFooterData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Static fallback data
  const staticSocialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@portfolio.com", label: "Email" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "CV", href: "cv" },
    { name: "Contact", href: "contact" },
  ];

  const staticContactInfo = [
    {
      icon: Mail,
      text: "contact@portfolio.com",
      href: "mailto:contact@portfolio.com",
    },
    { icon: Phone, text: "+216 1234567", href: "tel:+21651234567" },
    { icon: MapPin, text: "Tunisia, Tn", href: "#" },
  ];

  // Get dynamic data or fallback to static
  const footerInfo = footerData?.FooterInfo || {
    FooterTitle: "Portfolio",
    FooterDescription:
      "Crafting digital experiences with passion and precision. Let's build something amazing together.",
    OwnerEmail: "contact@portfolio.com",
    OwnerPhone: "+216 1234567",
    OwnerAddress: "Tunisia, Tn",
  };

  const socialLinks =
    footerData?.footersociallinks?.FooterSocialLinks?.map((link) => {
      const IconComponent = iconMap[link.SocialIcon] || Mail;
      return {
        icon: IconComponent,
        href: link.SocialLink,
        label: link.SocialIcon,
      };
    }) || staticSocialLinks;

  const contactInfo = [
    {
      icon: Mail,
      text: footerInfo.OwnerEmail,
      href: `mailto:${footerInfo.OwnerEmail}`,
    },
    {
      icon: Phone,
      text: footerInfo.OwnerPhone,
      href: `tel:${footerInfo.OwnerPhone}`,
    },
    {
      icon: MapPin,
      text: footerInfo.OwnerAddress,
      href: `https://www.google.com/maps/search/${footerInfo.OwnerAddress}`,
    },
  ];

  if (loading) {
    return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div>Loading...</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <span className={styles.logoText}>{footerInfo.FooterTitle}</span>
              <span className={styles.logoDot}>.</span>
            </div>
            <p className={styles.brandDescription}>
              {footerInfo.FooterDescription}
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className={styles.footerLink}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>Get In Touch</h3>
            <div className={styles.contactList}>
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    className={styles.contactItem}
                  >
                    <IconComponent size={18} />
                    <span>{contact.text}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterSection}>
            <h3 className={styles.sectionTitle}>Let’s Work Together</h3>
            <p className={styles.newsletterDescription}>
              I’m always excited to explore new opportunities, collaborations,
              and challenges. Feel free to reach out if you think we could work
              together.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>
              © {currentYear} {footerInfo.FooterTitle}. All rights reserved.
            </p>
          </div>
          <div className={styles.madeWith}>
            <p>
              Made By <Heart size={16} className={styles.heartIcon} />
              <Link to="https://github.com/AzizDevX/dynamic-portfolio">
                AzizDevX
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
