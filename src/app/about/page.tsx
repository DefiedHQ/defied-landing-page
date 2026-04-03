'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const sectionStyle = (bg: string) => ({
    background: bg,
    width: '100%',
    minHeight: 'calc(100vh - 72px)',
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
    color: '#0A0B0D',
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
            href="https://app.defied.bg" target="_blank" rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ background: '#0052FF', borderRadius: '100px', color: '#fff', fontSize: '16px', lineHeight: '24px', fontWeight: 500, padding: '14px 32px', textDecoration: 'none' }}
          >
            Започни сега
          </a>
          <a
            href="mailto:hello@defied.bg"
            className="inline-block hover:opacity-80 transition-opacity"
            style={{ background: '#F5F8FF', borderRadius: '100px', color: '#0A0B0D', fontSize: '16px', lineHeight: '24px', fontWeight: 500, padding: '14px 32px' }}
          >
            Контакт
          </a>
        </div>
      </section>

      {/* Dark mission section */}
      <div style={fullBleedWrapper}>
      <section style={sectionStyle('#0A0B0D')}>
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
      <section style={sectionStyle('#0052FF')}>
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
      <section style={sectionStyle('#0A0B0D')}>
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
