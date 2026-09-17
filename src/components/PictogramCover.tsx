import { LocalPictogram, type LocalPictogramName } from '@/components/LocalPictogram';

type Props = {
  name: LocalPictogramName;
  /** Background tint from the site token family (same pair the blog covers use) */
  tint?: 'mist' | 'stone';
  className?: string;
};

/**
 * Landing-page counterpart of the blog cover template (src/lib/og/coverConfig.ts):
 * one flat tint + one large pictogram, no photo. Fills its positioned parent.
 * The pictogram is decorative - the surrounding heading carries the meaning.
 */
export function PictogramCover({ name, tint = 'mist', className }: Props) {
  return (
    <div className={`picto-cover picto-cover--${tint}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <LocalPictogram name={name} dimension="48x48" />
    </div>
  );
}
