'use client';

import Link from 'next/link';
import { LogoMark } from '@/components/LogoMark';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full mt-auto" style={{ background: '#000000' }}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 py-6 sm:py-8" style={{ paddingTop: 'calc(1.5rem + 20px)' }}>
        {/* Top section: logo left, links right */}
        <div className="flex flex-col sm:flex-row gap-10 sm:justify-between items-start mb-6">
          {/* Logo */}
          <div className="flex flex-col self-start">
            <Link href="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/defied_squared_logo_light.svg" width={36} height={36} alt="" aria-hidden="true" />
              <span className="text-white tracking-tight" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '36px' }}>defied</span>
            </Link>
            <div style={{ marginTop: '50px', fontSize: '14px', color: '#fff', lineHeight: 1.7 }}>
              <p>hello@defied.bg</p>
              <p>+359 884 627 762</p>
              <p>{t('footer.address')}</p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3" style={{ marginTop: '16px' }}>
              <a href="https://x.com/defiedbg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" style={{ background: 'rgb(20, 20, 23)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com/company/defiedbg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" style={{ background: 'rgb(20, 20, 23)' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://instagram.com/defiedbg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" style={{ background: 'rgb(20, 20, 23)' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns floated right */}
          <div className="flex flex-wrap gap-10 sm:gap-16 md:gap-20">
            <div>
              <h4 className="text-white font-semibold mb-4" style={{ fontSize: '18px' }}>{t('footer.useful')}</h4>
              <ul className="space-y-2.5" style={{ fontSize: '14px' }}>
                <li><Link href="/resources" className="text-[#999] hover:text-white transition-colors">{t('footer.resources')}</Link></li>
                <li><Link href="/risks" className="text-[#999] hover:text-white transition-colors">{t('footer.risks')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4" style={{ fontSize: '18px' }}>{t('footer.company')}</h4>
              <ul className="space-y-2.5" style={{ fontSize: '14px' }}>
                <li><Link href="/about" className="text-[#999] hover:text-white transition-colors">{t('footer.about')}</Link></li>
                <li><Link href="/terms" className="text-[#999] hover:text-white transition-colors">{t('footer.terms')}</Link></li>
                <li><Link href="/privacy" className="text-[#999] hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ fontSize: '12px', color: '#999', lineHeight: 1.6, marginBottom: '16px' }}>
          Този сайт се управлява от Fusion Software LLC („Defied"). Defied не предоставя инвестиционни, правни или данъчни консултации и информацията на този сайт не следва да се приема като проучване, инвестиционен съвет или препоръка от какъвто и да е вид. Материалите на този сайт са предоставени само с информационна и образователна цел. Отзивите, изявленията и мненията, представени тук, се отнасят до изобразените лица. Индивидуалният опит и миналите резултати не гарантират бъдещи такива. Инвестирането в дигитални активи включва значителен риск и може да доведе до пълна загуба. Потребителите трябва да извършат собствена проверка и анализ (due diligence). Нищо на този сайт не представлява и не следва да се тълкува като предложение или покана за отправяне на предложение за инвестиция в дигитални активи. Услугите са достъпни само там, където са разрешени, и могат да бъдат ограничени в някои юрисдикции. С достъпа до този сайт вие се съгласявате с нашите Общи условия и Политика за поверителност.
        </p>

        {/* Copyright */}
        <p style={{ fontSize: '12px', color: '#999', textAlign: 'left', marginTop: '16px' }}>
          © Fusion Software LLC. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}
