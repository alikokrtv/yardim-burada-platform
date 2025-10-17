# 🧩 YardımBurada+ 

> Topluluk Temelli Yardımlaşma ve Sosyal Sorumluluk Platformu

## 🌟 Özellikler

### 🎯 Temel Özellikler
- **Yardım İsteği Sistemi**: Konum tabanlı anlık yardım paylaşımı
- **Grup Yönetimi**: Topluluk grupları oluşturma ve yönetme
- **Etkinlik Sistemi**: Gönüllü etkinlikler düzenleme
- **Mesajlaşma**: Kullanıcılar arası mesajlaşma ve yorumlar
- **Gamification**: XP puanları ve rozet sistemi

### 🎨 Kullanıcı Deneyimi
- **Sosyal Medya Tarzı Feed**: Instagram/Facebook benzeri arayüz
- **Infinite Scroll**: Sonsuz kaydırma ile içerik yükleme
- **Real-time Updates**: Anlık bildirimler (hazır)
- **Responsive Design**: Mobil ve desktop uyumlu
- **Location-based**: GPS ile yakındaki yardımları gösterme

## 🛠️ Teknolojiler

### Backend
- **Laravel 11** - PHP Framework
- **Laravel Sanctum** - API Authentication
- **SQLite** - Database
- **Eloquent ORM** - Database işlemleri

### Frontend
- **React 18** - UI Library
- **Inertia.js** - SPA Framework
- **TailwindCSS** - Styling
- **Vite** - Build Tool

## 🚀 Kurulum

### Gereksinimler
- PHP 8.2+
- Composer
- Node.js 18+
- NPM

### Adımlar

```bash
# Repository'yi klonla
git clone https://github.com/alikokrtv/yardim-burada-platform.git
cd yardim-burada-platform

# Backend kurulumu
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed --class=MedalSeeder

# Frontend kurulumu
npm install
npm run build

# Serverleri başlat (development)
php artisan serve --port=3000  # Terminal 1
npm run dev                     # Terminal 2
```

Uygulama şu adreste çalışacak: `http://localhost:3000`

## 📊 Database Yapısı

- **users** - Kullanıcı profilleri (XP, level, konum)
- **help_requests** - Yardım istekleri
- **groups** - Topluluk grupları
- **events** - Etkinlikler
- **messages** - Mesajlar ve yorumlar
- **medals** - Başarı rozetleri
- **user_stats** - Kullanıcı istatistikleri

## 🔑 Test Kullanıcısı

```
Email: demo@example.com
Password: password
```

## 🎯 API Endpoints

### Public Endpoints
- `GET /api/help-requests` - Yardım istekleri listesi
- `GET /api/help-requests/nearby` - Yakındaki yardım istekleri

### Authenticated Endpoints
- `POST /api/help-requests` - Yardım isteği oluştur
- `POST /api/help-requests/{id}/help` - Yardım teklif et
- `POST /api/groups` - Grup oluştur
- `POST /api/groups/{id}/join` - Gruba katıl
- `POST /api/events` - Etkinlik oluştur
- `POST /api/messages` - Mesaj gönder

## 🌍 Production Deployment (Railway)

### Environment Variables

Railway'de şu değişkenleri ayarla:

```env
APP_NAME=YardımBurada+
APP_ENV=production
APP_KEY=base64:BURAYA_KEY_GELECEK
APP_DEBUG=false
APP_URL=https://your-app.up.railway.app

DB_CONNECTION=sqlite

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
```

### Deployment Adımları

1. Railway.app'e giriş yap
2. GitHub repository'sini bağla
3. Environment variables ekle
4. Deploy et!

Railway otomatik olarak:
- ✅ Dependencies yükler
- ✅ Database migration yapar
- ✅ Medal seeder çalıştırır
- ✅ Uygulamayı başlatır

## 📱 Özellikler

### Kullanıcılar
- ✅ Kayıt/Giriş (Laravel Breeze)
- ✅ Profil yönetimi
- ✅ XP ve level sistemi
- ✅ Rozet kazanma
- ✅ Konum paylaşımı

### Yardım İstekleri
- ✅ Yardım isteği oluşturma
- ✅ Kategorilere göre filtreleme
- ✅ Konum bazlı arama (10km radius)
- ✅ Öncelik seviyeleri (Normal, Acil, Acil Durum)
- ✅ Yorumlama ve mesajlaşma

### Gruplar
- ✅ Grup oluşturma
- ✅ Gruba katılma/ayrılma
- ✅ Şehir ve kategori filtreleme
- ✅ Üye yönetimi
- ✅ Grup sohbeti

### Etkinlikler
- ✅ Etkinlik oluşturma
- ✅ Katılımcı yönetimi
- ✅ Tarih ve konum bilgisi
- ✅ Maksimum katılımcı limiti

## 🎮 Gamification

### XP Kazanma
- Yardım isteği oluşturma: +5 XP
- Yardım etme: +3 XP
- Grup oluşturma: +10 XP
- Etkinlik oluşturma: +8 XP
- Mesaj gönderme: +1 XP

### Rozetler
26 farklı rozet mevcut:
- 🥉 Bronz rozetler
- 🥈 Gümüş rozetler
- 🥇 Altın rozetler
- 💎 Elmas rozetler
- ⭐ Özel rozetler

## 📄 Lisans

MIT License

## 👥 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır!

## 🙏 Teşekkürler

Laravel, React ve topluluk temelli yardımlaşma ruhunu destekleyen herkese teşekkürler!

---

**Yapım:** Laravel 11 + React + Inertia.js + TailwindCSS  
**Geliştirici:** @alikokrtv  
**Versiyon:** 1.0.0
