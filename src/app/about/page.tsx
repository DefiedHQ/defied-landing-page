'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const darkRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const advRef = useRef<HTMLDivElement>(null);
  const [darkExpanded, setDarkExpanded] = useState(false);
  const [blueExpanded, setBlueExpanded] = useState(false);
  const [advExpanded, setAdvExpanded] = useState(false);

  useEffect(() => {
    const darkObserver = new IntersectionObserver(
      ([entry]) => { setDarkExpanded(entry.isIntersecting); },
      { threshold: 0.3 }
    );
    const blueObserver = new IntersectionObserver(
      ([entry]) => { setBlueExpanded(entry.isIntersecting); },
      { threshold: 0.3 }
    );
    const advObserver = new IntersectionObserver(
      ([entry]) => { setAdvExpanded(entry.isIntersecting); },
      { threshold: 0.3 }
    );

    if (darkRef.current) darkObserver.observe(darkRef.current);
    if (blueRef.current) blueObserver.observe(blueRef.current);
    if (advRef.current) advObserver.observe(advRef.current);
    return () => {
      darkObserver.disconnect();
      blueObserver.disconnect();
      advObserver.disconnect();
    };
  }, []);

  const expandSectionStyle = (expanded: boolean, bg: string) => ({
    background: bg,
    width: expanded ? '100%' : '90%',
    minHeight: 'calc(100vh - 72px)',
    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden' as const,
  });

  const sectionContentStyle = {
    position: 'relative' as const,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignContent: 'start' as const,
    justifyContent: 'center' as const,
    textAlign: 'start' as const,
    alignItems: 'start' as const,
    maxWidth: '1600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const fullBleedWrapper = {
    width: '100vw',
    marginLeft: 'calc(-50vw + 50%)',
    display: 'flex',
    justifyContent: 'center',
  };

  const lightTextStyle = {
    fontWeight: 500,
    lineHeight: '1.5',
    color: 'rgb(20, 20, 23)',
    marginBottom: '24px',
  };

  return (
    <div className="w-full">

      {/* Hero Section - centered */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 sm:pt-[120px] pb-16 sm:pb-20" style={{ minHeight: '80vh' }}>
        <p style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '24px' }}>
          За Defied
        </p>
        <h1 className="text-[32px] sm:text-[52px] md:text-[72px]" style={{ fontWeight: 700, lineHeight: 1.05, color: '#000', maxWidth: '900px' }}>
          Създадохме първият крипто спестовен продукт в България
        </h1>
        <div className="flex items-center gap-4" style={{ marginTop: '48px' }}>
          <a
            href="https://app.defied.bg"
            className="inline-block hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ background: '#000', borderRadius: '28px', color: '#fff', fontSize: '16px', lineHeight: '24px', fontWeight: 700, padding: '14px 32px', textDecoration: 'none' }}
          >
            Започни сега
          </a>
          <a
            href="mailto:hello@defied.bg"
            className="inline-block hover:opacity-80 transition-opacity"
            style={{ background: '#0F0F660D', borderRadius: '28px', color: '#000', fontSize: '16px', lineHeight: '24px', fontWeight: 700, padding: '14px 32px' }}
          >
            Контакт
          </a>
        </div>
      </section>

      {/* Dark mission section */}
      <div style={fullBleedWrapper}>
      <section ref={darkRef} style={expandSectionStyle(darkExpanded, '#141417')}>
        <div style={sectionContentStyle} className="py-20 sm:py-40 lg:py-[320px] px-6 sm:px-10 lg:px-16">
          <h2 className="text-[28px] sm:text-[40px] md:text-[56px]" style={{ fontWeight: 700, lineHeight: 1.15, color: '#fff', maxWidth: '800px' }}>
            Defied предоставя не-попечителска инфраструктура за лесен достъп до децентрализираните финанси.
          </h2>
        </div>
      </section>
      </div>

      {/* Logo + identity section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 sm:py-[120px]" style={{ minHeight: '100vh' }}>
        <img src="/defied_squared_logo.svg" width={80} height={80} alt="Defied" style={{ marginBottom: '32px' }} />
        <h2 className="text-[28px] sm:text-[44px] md:text-[60px]" style={{ fontWeight: 700, lineHeight: 1.1, color: '#000', maxWidth: '1200px' }}>
          Нашата мисия е да улесним достъпа до децентрализираните финанси.
        </h2>
      </section>

      {/* Blue company section */}
      <div style={fullBleedWrapper}>
      <section ref={blueRef} style={expandSectionStyle(blueExpanded, '#1E1EE8')}>
        <div style={sectionContentStyle} className="py-20 sm:py-40 lg:py-[320px] px-6 sm:px-10 lg:px-16">
          <h2 className="text-[28px] sm:text-[40px] md:text-[56px]" style={{ fontWeight: 700, lineHeight: 1.15, color: '#fff', maxWidth: '800px' }}>
            Defied дава възможност на потребителя да създаде акаунт в платформата, без да е необходимо да разбира какво са дигитален портфейл и частен ключ в контекста на блокчейн.
          </h2>
        </div>
      </section>
      </div>

      {/* Details section - solution details */}
      <section className="px-6 py-16 sm:py-[120px]">
        <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <p className="text-base sm:text-lg md:text-2xl" style={lightTextStyle}>
            Defied предоставя децентрализирана инфраструктура от смарт договори за генериране на доходност чрез водещи DeFi протоколи. Смарт договорите са не-попечителски — Defied няма достъп до средствата на потребителите, съхранявани в тях.
          </p>
          <p className="text-base sm:text-lg md:text-2xl" style={lightTextStyle}>
            Defied предоставя интуитивен потребителски интерфейс, чрез който потребителите могат да депозират средствата си под формата на стейбълкойни в подбрани децентрализирани протоколи. Defied поема транзакционните разходи на потребителите (газ такси).
          </p>
          <p className="text-base sm:text-lg md:text-2xl" style={{ ...lightTextStyle, marginBottom: 0 }}>
            Потребителите могат лесно да закупят крипто или стейбълкойни с дебитна/кредитна карта, Apple Pay, Google Pay или банков превод чрез SEPA.
          </p>
        </div>
      </section>

      {/* Advantages section */}
      <div style={fullBleedWrapper}>
      <section ref={advRef} style={expandSectionStyle(advExpanded, '#141417')}>
        <div style={sectionContentStyle} className="py-20 sm:py-40 lg:py-[320px] px-6 sm:px-10 lg:px-16">
          <h2 className="text-[28px] sm:text-[40px] md:text-[56px]" style={{ fontWeight: 700, lineHeight: 1.15, color: '#fff', maxWidth: '800px' }}>
            Без технически познания. Бързо закупуване на крипто. Подбрани протоколи с висока доходност. Пълен контрол върху активите.
          </h2>
        </div>
      </section>
      </div>

      {/* Advantages details */}
      <section className="px-6 py-16 sm:py-[120px]">
        <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <p className="text-base sm:text-lg md:text-2xl" style={lightTextStyle}>
            Не е нужно да разбираш как работят дигиталните портфейли и частните ключове. Предлагаме лесен за използване интерфейс и регистрация само с имейл адрес.
          </p>
          <p className="text-base sm:text-lg md:text-2xl" style={lightTextStyle}>
            Ние нямаме достъп до средствата ти. Ти си единственият, който контролира портфейла си. Всички правила на взаимодействие с DeFi протоколите са закодирани в смарт договори — публични, проверяеми и неизменяеми.
          </p>
          <p className="text-base sm:text-lg md:text-2xl" style={{ ...lightTextStyle, marginBottom: 0 }}>
            Поддържаме подробна база данни от материали, статии и обучения в света на децентрализираните финанси.
          </p>
        </div>
      </section>

    </div>
  );
}
