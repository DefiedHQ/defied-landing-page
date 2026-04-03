'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="w-full" style={{ background: '#FFFFFF' }}>

      {/* Hero Section - matching landing page hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6" style={{ minHeight: '100vh' }}>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center">
          <h1 className="tracking-tight text-center text-[64px] leading-[68px] md:text-[96px] md:leading-[100px]" style={{ display: 'block', fontFamily: 'CoinbaseDisplay, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, color: 'rgb(10, 11, 13)', letterSpacing: '-0.02em' }}>
            Създадохме първият крипто спестовен продукт в България
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-8 sm:mt-10 w-full md:w-auto">
            <a
              href="https://app.defied.bg" target="_blank" rel="noopener noreferrer"
              className="btn hover:opacity-80 transition-opacity w-full md:w-auto"
              style={{ background: '#0A0B0D', border: '1px solid #0A0B0D', borderRadius: '56px', color: '#ffffff', fontSize: '16px', fontWeight: 600, height: '58px', minHeight: '56px', minWidth: '100px', padding: '16px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}
            >
              Започни сега
            </a>
            <a
              href="mailto:hello@defied.bg"
              className="btn hover:opacity-80 transition-opacity w-full md:w-auto"
              style={{ background: 'rgb(247, 248, 249)', border: '1px solid rgb(247, 248, 249)', borderRadius: '56px', color: '#0A0B0D', fontSize: '16px', fontWeight: 600, height: '58px', minHeight: '56px', minWidth: '100px', padding: '16px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}
            >
              Контакт
            </a>
          </div>
        </div>
      </section>

      {/* Dark mission section - card style */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
        <div
          style={{
            background: '#0A0B0D',
            width: '100%',
            maxWidth: '1200px',
            borderRadius: '56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            className="px-8 sm:px-14 lg:px-20 py-14 sm:py-20"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px' }}
          >
            <h2 className="text-[28px] sm:text-[42px] md:text-[56px]" style={{ fontWeight: 500, lineHeight: 1.1, color: '#fff', maxWidth: '800px' }}>
              Defied предоставя не-попечителска инфраструктура за лесен достъп до децентрализираните финанси.
            </h2>
          </div>
        </div>
      </div>

      {/* Logo + identity section */}
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <img src="/defied_squared_logo_blue.svg" width={80} height={80} alt="Defied" style={{ marginBottom: '32px' }} />
        <h2 className="text-[28px] sm:text-[42px] md:text-[56px]" style={{ fontWeight: 500, lineHeight: 1.1, color: '#0A0B0D', maxWidth: '800px' }}>
          Нашата мисия е да улесним достъпа до децентрализираните финанси.
        </h2>
      </section>

      {/* Blue company section - card style */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
        <div
          style={{
            background: '#0052FF',
            width: '100%',
            maxWidth: '1200px',
            borderRadius: '56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            className="px-8 sm:px-14 lg:px-20 py-14 sm:py-20"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px' }}
          >
            <h2 className="text-[28px] sm:text-[42px] md:text-[56px]" style={{ fontWeight: 500, lineHeight: 1.1, color: '#fff', maxWidth: '800px' }}>
              Defied дава възможност на потребителя да създаде акаунт в платформата, без да е необходимо да разбира какво са дигитален портфейл и частен ключ в контекста на блокчейн.
            </h2>
          </div>
        </div>
      </div>

      {/* Details section */}
      <section className="px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#0A0B0D', marginBottom: '24px' }}>
            Defied предоставя децентрализирана инфраструктура от смарт договори за генериране на доходност чрез водещи DeFi протоколи. Смарт договорите са не-попечителски — Defied няма достъп до средствата на потребителите, съхранявани в тях.
          </p>
          <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#0A0B0D', marginBottom: '24px' }}>
            Defied предоставя интуитивен потребителски интерфейс, чрез който потребителите могат да депозират средствата си под формата на стейбълкойни в подбрани децентрализирани протоколи. Defied поема транзакционните разходи на потребителите (газ такси).
          </p>
          <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#0A0B0D', marginBottom: 0 }}>
            Потребителите могат лесно да закупят крипто или стейбълкойни с дебитна/кредитна карта, Apple Pay, Google Pay или банков превод чрез SEPA.
          </p>
        </div>
      </section>

      {/* Advantages section - card style */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 1rem' }}>
        <div
          style={{
            background: '#0A0B0D',
            width: '100%',
            maxWidth: '1200px',
            borderRadius: '56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            className="px-8 sm:px-14 lg:px-20 py-14 sm:py-20"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px' }}
          >
            <h2 className="text-[28px] sm:text-[42px] md:text-[56px]" style={{ fontWeight: 500, lineHeight: 1.1, color: '#fff', maxWidth: '800px' }}>
              Без технически познания. Бързо закупуване на крипто. Подбрани протоколи с висока доходност. Пълен контрол върху активите.
            </h2>
          </div>
        </div>
      </div>

      {/* Advantages details */}
      <section className="px-4 sm:px-6" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#0A0B0D', marginBottom: '24px' }}>
            Не е нужно да разбираш как работят дигиталните портфейли и частните ключове. Предлагаме лесен за използване интерфейс и регистрация само с имейл адрес.
          </p>
          <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#0A0B0D', marginBottom: '24px' }}>
            Ние нямаме достъп до средствата ти. Ти си единственият, който контролира портфейла си. Всички правила на взаимодействие с DeFi протоколите са закодирани в смарт договори — публични, проверяеми и неизменяеми.
          </p>
          <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '28px', color: '#0A0B0D', marginBottom: 0 }}>
            Поддържаме подробна база данни от материали, статии и обучения в света на децентрализираните финанси.
          </p>
        </div>
      </section>

    </div>
  );
}
