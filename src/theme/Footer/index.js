import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
import IconExternalLink from '@theme/Icon/ExternalLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faDiscourse } from '@fortawesome/free-brands-svg-icons/faDiscourse';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram';
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';

function FooterLink({to, href, label, prependBaseUrlToHref, ...props}) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {
    forcePrependBaseUrl: true,
  });
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {href && !isInternalUrl(href) ? (
        <span>
          {label}
          <IconExternalLink />
        </span>
      ) : (
        label
      )}
    </Link>
  );
}

function FooterLogo({sources, alt, width, height}) {
  return (
    <ThemedImage
      className="footer__logo"
      alt={alt}
      sources={sources}
      width={width}
      height={height}
    />
  );
}

function CustomFooterLinks() {
  return (
    <div className="col footer__col">
      <ul className="footer__items is-custom-links">
        <li className="footer__item">
          <Link
            className="footer__link-item"
            href="https://github.com/infinity-swap"
            target="_blank"
            rel="nofollow noopener noreferrer"
            title="Bitfinity on GitHub"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </Link>
        </li>
        <li className="footer__item">
          <Link
            className="footer__link-item"
            href="https://discord.bitfinity.network"
            target="_blank"
            rel="nofollow noopener noreferrer"
            title="Bitfinity on Discord"
          >
            <FontAwesomeIcon icon={faDiscord} size="lg" />
          </Link>
        </li>
        <li className="footer__item">
          <Link
            className="footer__link-item"
            href="https://t.me/infinityswapofficial"
            target="_blank"
            rel="nofollow noopener noreferrer"
            title="Bitfinity on Telegram"
          >
            <FontAwesomeIcon icon={faTelegram} size="lg" />
          </Link>
        </li>
        <li className="footer__item">
          <Link
            className="footer__link-item"
            href="https://twitter.com/infinity_swap"
            target="_blank"
            rel="nofollow noopener noreferrer"
            title="Bitfinity on Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </Link>
        </li>
      </ul>
    </div>
  )
}

function MultiColumnLinks({links}) {
  return (
    <>
      {links.map((linkItem, i) => (
        <div key={i} className="col footer__col">
          <div className="footer__title">{linkItem.title}</div>
          <ul className='footer__items'>
            {linkItem.items.map((item, key) =>
              item.html ? (
                <li
                  key={key}
                  className="footer__item" // Developer provided the HTML, so assume it's safe.
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: item.html,
                  }}
                />
              ) : (
                <li key={item.href || item.to} className="footer__item">
                  <FooterLink {...item} />
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </>
  );
}

function SimpleLinks({links}) {
  return (
    <div className="footer__links">
      {links.map((item, key) => (
        <>
          {item.html ? (
            <span
              key={key}
              className="footer__link-item" // Developer provided the HTML, so assume it's safe.
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: item.html,
              }}
            />
          ) : (
            <FooterLink {...item} />
          )}
          {links.length !== key + 1 && (
            <span className="footer__link-separator">·</span>
          )}
        </>
      ))}
    </div>
  );
}

function isMultiColumnFooterLinks(links) {
  return 'title' in links[0];
}

function Footer() {
  const {footer} = useThemeConfig();
  const {copyright, links = [], logo = {}} = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark',
      })}>
      <div className="container container-fluid">
        <CustomFooterLinks />
        {links &&
          links.length > 0 &&
          (isMultiColumnFooterLinks(links) ? (
            <div className="row footer__links">
              <MultiColumnLinks links={links} />
            </div>
          ) : (
            <div className="footer__links text--center">
              <SimpleLinks links={links} />
            </div>
          ))}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && (logo.src || logo.srcDark) && (
              <div className="margin-bottom--sm">
                {logo.href ? (
                  <Link href={logo.href} className={styles.footerLogoLink}>
                    <FooterLogo
                      alt={logo.alt}
                      sources={sources}
                      width={logo.width}
                      height={logo.height}
                    />
                  </Link>
                ) : (
                  <FooterLogo alt={logo.alt} sources={sources} />
                )}
              </div>
            )}
            {copyright ? (
              <div
                className="footer__copyright" // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: copyright,
                }}
              />
            ) : null}
          </div>
        )}
      </div>
    </footer>
  );
}

export default React.memo(Footer);
