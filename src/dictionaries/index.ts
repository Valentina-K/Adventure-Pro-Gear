import en from './en.json';
import uk from './uk.json';

const translations = { en, uk };

function getNestedTranslation(obj: any, path: string): string | object {
  return path.split('.').reduce((acc, key) => (acc && acc[key] ? acc[key] : null), obj);
}

export function t(key: string, locale: 'en' | 'uk' = 'uk'): string {
  return (getNestedTranslation(translations[locale], key) as string) || key;
}
