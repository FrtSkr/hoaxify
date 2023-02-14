import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Sign Up': 'Sign Up',
                'Password missmatch': 'Password missmatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat'
            }
        },
        tr: {
            translations: {
                'Sign Up': 'Kayıt Ol',
                'Password missmatch': 'Şifre aynı değil',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Takma Ad',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre Tekrar'
            }
        }
    },
    fallbackLng: 'tr', // hata durumunda hangi dil kullanılacak
    ns: ['translations'], // hangi havuzdan çeviriyi gerçekleştirecek (birden fazla olabilir)
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;