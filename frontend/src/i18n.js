import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { register } from 'timeago.js';
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
                'Change Display Name': 'Change Display Name',
                Users: 'Users',
                Profile: 'Profile',
                'There are no hoaxes': 'There are no hoaxes',
                'Load old hoaxes': 'Load old Hoaxes',
                'There are new hoaxes': 'There are new hoaxes',
                'Delete': 'Delete',
                'Are you sure to delete hoax?': 'Are you sure to delete hoax?',
                'Delete Hoax': 'Delete Hoax',
                "Delete Account": "Delete Account",
                "Are you sure to delete your account?": "Are you sure to delete your account?"
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
                'Change Display Name': 'Görünür İsminizi Değiştirin',
                Users: 'Kullanıcılar',
                Profile: "Hesap",
                'There are no hoaxes': 'Hiç hoax bulunamadı',
                'Load old hoaxes': 'Geçmiş Hoaxları Getir',
                'There are new hoaxes': 'Yeni Hoaxları Getir',
                'Delete': 'Sil',
                'Are you sure to delete hoax?': 'Hoax\'u silmek istediğinden emin misin?',
                'Delete Hoax': 'Hoax\'u Sil',
                "Delete Account": "Hesabı Sil",
                "Are you sure to delete your account?": "Hesabınızı silmek istediğinizden emin misin?"
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


const timeagoTR = (number, index) => {
    return [
        ["az önce", "şimdi"],
        ["%s saniye önce", "%s saniye içinde"],
        ["1 dakika önce", "1 dakika içinde"],
        ["%s dakika önce", "%s dakika içinde"],
        ["1 saat önce", "1 saat içinde"],
        ["%s saat önce", "%s saat içinde"],
        ["1 gün önce", "1 gün içinde"],
        ["%s gün önce", "%s gün içinde"],
        ["1 hafta önce", "1 hafta içinde"],
        ["%s hafta önce", "%s hafta içinde"],
        ["1 ay önce", "1 ay içinde"],
        ["%s ay önce", "%s ay içinde"],
        ["1 yıl önce", "1 yıl içinde"],
        ["%s yıl önce", "%s yıl içinde"]
    ][index]
};
register('tr', timeagoTR);
export default i18n;