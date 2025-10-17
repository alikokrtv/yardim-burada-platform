# Yerel Geliştirme Kurulumu

## 1. Ön Koşullar
- PHP 8.2+
- Composer 2.7+
- Node.js 20+ ve npm
- Redis (queue ve cache için)
- Pusher hesabı veya Laravel Echo Server alternatifi

## 2. Projenin Kurulumu
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
```

## 3. Geliştirme Komutları
- `php artisan serve`: API ve Inertia endpoint’lerini çalıştırır.
- `php artisan queue:listen --tries=1`: XP, bildirim gibi kuyruk işlerini tüketir.
- `npm run dev`: Vite geliştirme sunucusu (SSR dahil).
- `php artisan websockets:serve` veya Pusher: Gerçek zamanlı olaylar için.
- `npm run build`: Üretim build’i ve SSR çıktısı.

> Paket.json’daki `npm run dev` komutu Vite’ı, `composer run dev` ise PHP server, queue ve log takibini aynı anda başlatmak için `concurrently` kullanır.

## 4. Çevre Değişkenleri (örn. .env)
- `APP_URL`, `FRONTEND_URL`: Inertia yönlendirmeleri için.
- `DB_CONNECTION`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`: MySQL/PostgreSQL.
- `PUSHER_APP_ID`, `PUSHER_APP_KEY`, `PUSHER_APP_SECRET`, `PUSHER_HOST`: Broadcast yapılandırması.
- `SANCTUM_STATEFUL_DOMAINS`: SPA oturumları için.
- `QUEUE_CONNECTION=redis`: Kuyruk tüketimi.
- `FILESYSTEM_DISK=s3`: Kullanıcı yüklemeleri için (geliştirme sırasında `local` kullanılabilir).

## 5. Test ve Kalite
- `php artisan test`: Backend testleri (Pest/PHPUnit).
- `npm run lint` (manuel eklenmesi planlanıyor): Frontend linting.
- `./vendor/bin/pint`: PHP kod formatlayıcı.
- `php artisan pint`: Laravel Pint kısa yolu.

## 6. Notlar
- `backend/` dizini, Laravel iskeletini yedek olarak tutar; ana uygulama kök dizindedir (`artisan`, `app/`, `resources/`).
- Redis ve Pusher dev ortamında isteğe bağlı olsa da bildirim ve queue davranışlarını test etmek için önerilir.
- SSR için `vite build --ssr` çıktısı `bootstrap/ssr/ssr.mjs` dosyasını günceller; deployment pipeline’ında bu adım unutulmamalı.
