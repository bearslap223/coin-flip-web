// Internationalization (i18n) support

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'de' | 'fr';

export interface Translations {
  appTitle: string;
  settings: string;
  headsText: string;
  tailsText: string;
  recentTosses: string;
  noHistory: string;
  flip: string;
  heads: string;
  tails: string;
}

const translations: Record<Language, Translations> = {
  ko: {
    appTitle: 'Coin Master',
    settings: '설정',
    headsText: '앞면 텍스트',
    tailsText: '뒷면 텍스트',
    recentTosses: '최근 결과',
    noHistory: '기록 없음',
    flip: '던지기',
    heads: '앞면',
    tails: '뒷면',
  },
  en: {
    appTitle: 'Coin Master',
    settings: 'Settings',
    headsText: 'Heads Text',
    tailsText: 'Tails Text',
    recentTosses: 'Recent Tosses',
    noHistory: 'No History',
    flip: 'Flip',
    heads: 'Heads',
    tails: 'Tails',
  },
  ja: {
    appTitle: 'Coin Master',
    settings: '設定',
    headsText: '表のテキスト',
    tailsText: '裏のテキスト',
    recentTosses: '最近の結果',
    noHistory: '履歴なし',
    flip: '投げる',
    heads: '表',
    tails: '裏',
  },
  zh: {
    appTitle: 'Coin Master',
    settings: '设置',
    headsText: '正面文字',
    tailsText: '反面文字',
    recentTosses: '最近结果',
    noHistory: '无记录',
    flip: '抛硬币',
    heads: '正面',
    tails: '反面',
  },
  es: {
    appTitle: 'Coin Master',
    settings: 'Ajustes',
    headsText: 'Texto Cara',
    tailsText: 'Texto Cruz',
    recentTosses: 'Resultados Recientes',
    noHistory: 'Sin Historial',
    flip: 'Lanzar',
    heads: 'Cara',
    tails: 'Cruz',
  },
  de: {
    appTitle: 'Coin Master',
    settings: 'Einstellungen',
    headsText: 'Kopf Text',
    tailsText: 'Zahl Text',
    recentTosses: 'Letzte Würfe',
    noHistory: 'Kein Verlauf',
    flip: 'Werfen',
    heads: 'Kopf',
    tails: 'Zahl',
  },
  fr: {
    appTitle: 'Coin Master',
    settings: 'Paramètres',
    headsText: 'Texte Pile',
    tailsText: 'Texte Face',
    recentTosses: 'Résultats Récents',
    noHistory: 'Aucun Historique',
    flip: 'Lancer',
    heads: 'Pile',
    tails: 'Face',
  },
};

// Default labels for each language
export const defaultLabels: Record<Language, { heads: string; tails: string }> = {
  ko: { heads: '앞면', tails: '뒷면' },
  en: { heads: 'HEADS', tails: 'TAILS' },
  ja: { heads: '表', tails: '裏' },
  zh: { heads: '正面', tails: '反面' },
  es: { heads: 'CARA', tails: 'CRUZ' },
  de: { heads: 'KOPF', tails: 'ZAHL' },
  fr: { heads: 'PILE', tails: 'FACE' },
};

// Detect browser language and return supported language code
export function detectLanguage(): Language {
  const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  if (langCode in translations) {
    return langCode as Language;
  }
  
  return 'en'; // Default to English
}

// Get translations for a specific language
export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

// Language display names for selector
export const languageNames: Record<Language, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
};

// Flag emojis for each language
export const languageFlags: Record<Language, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  ja: '🇯🇵',
  zh: '🇨🇳',
  es: '🇪🇸',
  de: '🇩🇪',
  fr: '🇫🇷',
};
