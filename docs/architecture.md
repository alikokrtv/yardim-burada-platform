# YardımBurada+ – Sistem Mimari Özeti

## 1. Genel Bakış
YardımBurada+, bireysel ve topluluk temelli yardımlaşma süreçlerini tek bir platformda toplayan, harita odaklı ve oyunlaştırılmış bir web uygulamasıdır. Kullanıcılar anlık ihtiyaçlarını paylaşabilir, yardım isteğine yanıt verebilir, topluluklar oluşturabilir ve etkinlikler düzenleyebilir. Sistem, gerçek zamanlı bildirimler ve puan/rozet mekanikleri ile etkileşimi artırmayı hedefler.

## 2. Yüksek Seviye Bileşenler
- **İstemci (React + Inertia.js + TailwindCSS)**: SPA deneyimi, harita ve listeler, grup/etkinlik ekranları, profil yönetimi.
- **Sunucu (Laravel 11)**: REST API, kimlik doğrulama, yetkilendirme, iş kuralları, kuyruk işleyicileri, WebSocket olay yayınları.
- **Veritabanı (MySQL/PostgreSQL)**: İlişkisel veri modeli, ACID garantileri, coğrafi sorgular için extension desteği.
- **Gerçek Zamanlı Katman (Pusher/Laravel Echo)**: Yardım istekleri, mesajlaşma, bildirimler için websocket altyapısı.
- **Arka Plan İşleri (Redis Queue)**: XP/rozet hesaplama, e-posta gönderimi, bildirim fan-out.
- **Harita Servisleri (Leaflet.js + harita sağlayıcısı)**: Konum bazlı yardım görüntüleme; mobilde konum paylaşımı.
- **Depolama (S3 uyumlu)**: Profil/resim yüklemeleri, etkinlik fotoğrafları, hikâye içerikleri.
- **Bildirim Servisleri (Firebase Cloud Messaging / e-posta)**: Push ve opsiyonel e-posta uyarıları.

## 3. Backend Modülleri (Laravel)
- **Auth & Kullanıcı Yönetimi**: Laravel Sanctum tabanlı oturum ve API tokenları; sosyal giriş (Google) adaptörü; telefon doğrulama (SMS sağlayıcı).
- **Yardım İstekleri**: CRUD, konum ve süre yönetimi, durum güncellemeleri, yakınlık sıralaması için coğrafi sorgular.
- **Gruplar & Üyelik**: Grup oluşturma, davet akışı, rol bazlı yetkilendirme (kurucu, yönetici, üye).
- **Etkinlikler**: Grup veya bireysel etkinlik planlama, katılımcı yönetimi, XP kazandırma.
- **Mesajlaşma & Bildirim**: Yardım isteği eşleştirme sonrası birebir sohbet; gerçek zamanlı ve push bildirimleri.
- **Gamification**: XP, seviye, rozet/madalyon kazanımı ve şart kontrolü; kullanıcı istatistiklerinin güncellenmesi.
- **Yardım Hikâyeleri**: İçerik moderasyonu (queue), medya yönetimi.
- **Ödeme & Premium**: Premium üyelik planları, iyzico/Stripe entegrasyonu, faturalama hook’ları.
- **Admin Paneli (ileride)**: Moderasyon, raporlama, gelir yönetimi, içerik onay süreçleri.

## 4. Frontend Yapısı (React/Inertia)
- **Layout Katmanı**: Auth içeren/dahil olmayan layout’lar, global navigation, bildirim menüsü, harita konteyneri.
- **Sayfa Modülleri**:
  - Giriş/Kayıt: Çok adımlı form, konum seçici, ilgi alanları.
  - Yardım Akışı: Harita + filtrelenebilir kart listesi, kategori/konum filtreleri, “Yardım Et” iş akışı.
  - Grup Yönetimi: Grup keşfet, grup detay, üyelik yönetimi, paylaşım ve etkinlik sekmeleri.
  - Etkinlik Takvimi: Yaklaşan etkinlikler, katılım butonu, fotoğraf galerisi.
  - Profil & İstatistik: Seviye göstergesi, rozet koleksiyonu, şehir sıralaması.
  - Bildirim Merkezi: Anlık olay listesi, okundu/okunmadı durumu.
  - Premium Mağaza: Paketler, madalyon marketi, ödeme CTA.
- **UI Bileşenleri**: Form kontrolleri, harita markerları, rozet/madalyon bileşenleri, XP progress bar, modal akışları.

## 5. Veri Modeli (Özet)
- `users`: Kimlik, iletişim, konum, XP/level, premium durumu, güven puanı.
- `requests`: Yardım başlığı, açıklama, kategori, konum (lat/lng), bitiş zamanı, durum.
- `groups` & `group_members`: Topluluk bilgileri, şehir/kategori, rol bazlı üyelikler.
- `events`: Grup veya bireysel etkinlikler, tarih/saat, konum, açıklama, fotoğraf.
- `messages`: İstek bazlı özel mesajlaşma, içerik, gönderici/alıcı referansı.
- `medals`, `user_medals`: Madalyon tanımları ve kullanıcı kazanımları.
- `user_stats`: Yardım sayıları, XP, seviye, şehir sıralaması metrikleri.
- Ek tablolar: `request_helpers`, `event_participants`, `stories`, `notifications`, `subscriptions`, `transactions`.

## 6. Gerçek Zamanlı & Bildirim Akışları
- Laravel olayları → Broadcast (Pusher) → İstemci tarafında Echo ile dinleme.
- Yardım isteği: Yakın kullanıcılar için `NewRequestBroadcast`.
- Yardım yanıtı: İstek sahibine push + in-app notifikasyon.
- Grup etkinliği: Grup üyeleri için broadcast + isteğe bağlı e-posta.
- Kuyruklar: XP güncellemesi, rozet kontrolü, toplu bildirimler.

## 7. Güvenlik, Performans, DevOps
- **Güvenlik**: Rate limiting, CSRF koruması, konum doğrulama (kaba koordinat filtreleme), içerik moderasyonu.
- **Performans**: Cache (Redis), lazy loading, sayfalama, harita için tile gerekiyorsa CDN.
- **CI/CD**: Otomatik testler (PHPUnit, Pest, Jest), kod kalite (PHPStan, ESLint), staging → production deploy pipeline.
- **Monitoring**: Uygulama logları (Laravel Telescope/Sentry), performans metrikleri (Laravel Horizon, NewRelic).

## 8. MVP Kapsamı
1. Auth + profil temel alanları.
2. Yardım isteği oluşturma, liste/harita görünümü, yardım etme akışı (WhatsApp yönlendirmesi).
3. Gerçek zamanlı bildirimler (yardım isteği ve yanıt).
4. Basit XP artışı ve madalyon gösterimi.

## 9. Gelecek Aşamalar
- Grup ve etkinlik modülü, gelişmiş profil & istatistikler.
- Oyunlaştırma genişletmeleri (özel rozetler, görevler).
- AI destekli açıklama oluşturma, sesli giriş, yardım zinciri.
- Mobil uygulama (React Native/Flutter) ve ileri seviye sponsorluk entegrasyonları.

