import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Login': 'Login',
                Logout: "Logout",
                'Sign Up': 'Sign Up',
                'Password missmatch': 'Password missmatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Next': 'Next >',
                'Back': '< Back',
                "Load Failure": "Load Failure",
                "User not found": "User not found",
                Edit: 'Edit',
                Save: 'Save',
                Cancel: 'Cancel',
                'Change Display Name': 'Change Display Name'
            }
        },
        tr: {
            translations: {
                'Login': 'Giriş Yap',
                Logout: "Çıkış Yap",
                'Sign Up': 'Kayıt Ol',
                'Password missmatch': 'Şifre aynı değil',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Takma Ad',
                'Password': 'Şifre',
                'Password Repeat': 'Şifre Tekrar',
                Next: 'İleri >',
                Back: '< Geri',
                "Load Failure": "Liste alınamadı",
                "User not found": "Kullanıcı bulunamadı",
                Edit: 'Düzenle',
                Save: 'Kaydet',
                Cancel: 'İptal Et',
                'Change Display Name': 'Görünür İsminizi Değiştirin'
            }
        }
    },
    fallbackLng: 'en', // hata durumunda hangi dil kullanılacak
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