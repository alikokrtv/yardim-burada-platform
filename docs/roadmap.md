# YardımBurada+ – Yol Haritası ve Kullanıcı Hikâyeleri

## 1. Sprint Bazlı Yol Haritası

### Aşama 1 – MVP (2 Hafta)
- **Auth & Profil Temeli**: E-posta/Google/telefon kaydı, konum seçimi, profil düzenleme.
- **Yardım İstekleri**: İstek oluşturma, konum bazlı liste/harita görünümü, kategori filtreleri.
- **Yardım Et Akışı**: WhatsApp veya uygulama içi mesajlaşmaya yönlendirme.
- **Gerçek Zamanlı Bildirimler**: Yeni istek ve yardım yanıtı için push/broadcast.
- **XP Temeli**: Yardım sonrası XP artışı ve basit madalyon koşulları.
- **Teknik Temel**: Queue (Redis), Pusher entegrasyonu, test altyapısı, temel deployment pipeline.

### Aşama 2 – Sosyal Katman (3 Hafta)
- **Gruplar**: Oluşturma, keşfetme, üyelik yönetimi, rol bazlı yetki.
- **Grup Paylaşımları**: Grup içi yardım ve duyuru akışı.
- **Etkinlik Modülü**: Etkinlik oluşturma, takvim listesi, katılım işlemleri, fotoğraf yükleme.
- **Profil Genişletme**: Rozetler, istatistik sekmesi, şehir sıralamaları.
- **Topluluk Bildirimleri**: Grup yeni etkinlik/duyuru push’ları.
- **Moderasyon**: İçerik raporlama, admin onay iş akışları (temel).

### Aşama 3 – Oyunlaştırma (3–4 Hafta)
- **XP ve Seviye Sistemi**: Seviye çarpanları, günlük/haftalık görevler.
- **Madalyon Koleksiyonu**: Özel rozetler, madalyon marketi (kozmetik).
- **Yardım Hikâyeleri**: Fotoğraflı hikâye akışı, teşekkür mesajları, yorumlar.
- **Gelişmiş Analitik**: Kullanıcı istatistikleri, şehir tablosu, topluluk skorları.
- **Premium Üyelik**: Paketler, ödeme entegrasyonu (iyzico/Stripe), ilan öne çıkarma.

### Aşama 4 – Gelişmiş Özellikler (6–8 Hafta)
- **AI Asistanı**: İstek metni önerisi, kategori tahmini.
- **Sesli Yardım**: Speech-to-text ile istek oluşturma.
- **Yardım Zinciri**: Yardım sonrası zincir görevleri, paylaşılabilir davetler.
- **Zaman Çizelgesi Haritası**: Tarih filtreli geçmiş yardım görselleştirmesi.
- **Mobil Uygulama**: React Native/Flutter tabanlı istemci.
- **Sponsorluk Modülleri**: Banner reklam, sponsorlu grup yönetimi.

## 2. Kullanıcı Hikâyeleri (Örnekler)

### Bireysel Kullanıcı
- “Afyon’da matkap lazım” diyerek konum ve kategori seçerek yardım talebi açmak istiyorum ki yakınlardaki kişiler yardımcı olsun.
- Yakınımdaki yardım ilanlarını harita ve listede görmek istiyorum ki anında aksiyon alayım.
- Yardım ettikten sonra otomatik teşekkür mesajı almak ve XP kazanmak istiyorum ki katkım görünür olsun.
- Profilimde kazandığım rozetleri ve istatistiklerimi göstermek istiyorum ki güvenilirliğim artsın.

### Grup Kurucusu / Üyesi
- Mahalle gönüllüleri için grup oluşturmak ve üyeleri rol bazlı yönetmek istiyorum ki etkinliklerimizi organize edelim.
- Grup içi duyuru ve yardım isteklerini ayrı akışta görmek istiyorum ki topluluk içi koordinasyon kolaylaşsın.
- Cumartesi barınak temizliği etkinliği planlayıp katılımı takip etmek istiyorum ki gereken desteği toplayayım.
- Grup etkinliği sonrası fotoğraf ve hikâyeleri paylaşmak istiyorum ki motivasyon artsın.

### Yardımcı (Gönüllü)
- Yardıma ihtiyacı olan kişiye tek tuşla WhatsApp üzerinden ulaşmak istiyorum ki hızlıca iletişim kurayım.
- Katıldığım etkinliklerden rozeti ve XP’yi hemen kazanmak istiyorum ki ilerlememi takip edeyim.
- Yakınımda yeni bir yardım açıldığında anlık bildirim almak istiyorum ki fırsatı kaçırmayayım.

### Premium Kullanıcı / Sponsor
- Yardım ilanımı öne çıkararak daha fazla kişiye ulaşmak istiyorum.
- Topluluk lideri olarak sponsorlu grup açıp markamı pozitif içeriklerle ilişkilendirmek istiyorum.

### Admin / Moderatör
- Bildirilen içerikleri hızlıca gözden geçirip aksiyon almak istiyorum.
- Topluluk istatistiklerini ve platform sağlığını dashboard üzerinden takip etmek istiyorum.
- Gelir akışlarını (premium, sponsorluk) izlemek ve raporlamak istiyorum.

## 3. Sürüm Stratejisi
- **Pilot Şehir**: MVP’yi sınırlı şehir/muhtar bölgelerinde test ederek veri toplama.
- **Geri Bildirim Döngüsü**: Yardımcı/yardım alan kullanıcılarla periyodik görüşmeler, hızlı iterasyon.
- **A/B Testleri**: Oyunlaştırma unsurları için farklı motivasyon mekanizmalarını test etme.
- **Ölçekleme Planı**: Kullanıcı artışı ile birlikte Redis/Horizon tuning, sharding senaryoları, CDN kullanımı.

