import { Head, Link } from '@inertiajs/react';

export default function NearbyIndex({ auth }) {
    return (
        <>
            <Head title="Yakınımdakiler - YardımBurada+" />
            <div className="bg-gray-50 min-h-screen">
                {/* Header */}
                <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-4">
                                <Link href="/" className="text-2xl font-bold text-blue-600">
                                    🧩 YardımBurada+
                                </Link>
                                <div className="hidden md:flex items-center space-x-6">
                                    <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Ana Sayfa</Link>
                                    <Link href="/help-requests" className="text-gray-700 hover:text-blue-600 font-medium">Yardım İstekleri</Link>
                                    <Link href="/groups" className="text-gray-700 hover:text-blue-600 font-medium">Gruplar</Link>
                                    <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium">Etkinlikler</Link>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href="/help-requests/create"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            + Yardım İste
                                        </Link>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold text-sm">
                                                    {auth.user.name?.charAt(0) || 'U'}
                                                </span>
                                            </div>
                                            <Link
                                                href="/dashboard"
                                                className="text-gray-700 hover:text-blue-600 font-medium"
                                            >
                                                {auth.user.name}
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md font-medium transition-colors"
                                        >
                                            Giriş Yap
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Kayıt Ol
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Ana İçerik */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sol Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Konum Ayarları</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Arama Yarıçapı</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                            <option>1 km</option>
                                            <option>3 km</option>
                                            <option>5 km</option>
                                            <option>10 km</option>
                                            <option>25 km</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                            <option>Tüm Kategoriler</option>
                                            <option>🏠 Ev & Bahçe</option>
                                            <option>🐕 Hayvan Bakımı</option>
                                            <option>🚗 Taşıma</option>
                                            <option>🍎 Gıda</option>
                                            <option>🚌 Ulaşım</option>
                                            <option>🌱 Çevre</option>
                                            <option>🏥 Sağlık</option>
                                            <option>📚 Eğitim</option>
                                        </select>
                                    </div>
                                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                                        Konumu Güncelle
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Yakınımdaki İstatistikler</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Aktif Yardım İstekleri</span>
                                        <span className="font-semibold text-green-600">12</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Yaklaşan Etkinlikler</span>
                                        <span className="font-semibold text-blue-600">5</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Aktif Gruplar</span>
                                        <span className="font-semibold text-purple-600">8</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Yardımseverler</span>
                                        <span className="font-semibold text-orange-600">47</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ana Feed */}
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Yakınımdakiler</h1>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        Tümü
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Yardım İstekleri
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Etkinlikler
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Gruplar
                                    </button>
                                </div>
                            </div>

                            {/* Harita ve Liste */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Konum Haritası</h3>
                                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <span className="text-4xl mb-2 block">🗺️</span>
                                        <p>Harita yükleniyor...</p>
                                        <p className="text-sm">Konumunuz: Kadıköy, İstanbul</p>
                                    </div>
                                </div>
                            </div>

                            {/* Yakınımdaki İçerikler */}
                            <div className="space-y-6">
                                {/* Yardım İsteği */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 font-semibold">A</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h4 className="font-semibold text-gray-900">Ahmet Y.</h4>
                                                <span className="text-gray-500 text-sm">2 saat önce</span>
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">🏠 Ev & Bahçe</span>
                                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">0.8 km</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Duvar boyama yardımı</h3>
                                            <p className="text-gray-700 mb-3">
                                                Merhaba! Evimdeki duvarı boyamak için yardıma ihtiyacım var. 
                                2-3 saat sürecek, malzemeler hazır. Yakınınızda boya konusunda deneyimli 
                                birisi var mı? 🎨
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center space-x-1">
                                                        <span>💬</span>
                                                        <span>3 yanıt</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>❤️</span>
                                                        <span>12 beğeni</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>📍</span>
                                                        <span>Kadıköy, İstanbul</span>
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Yardım Et
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                        Detaylar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Etkinlik */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 font-semibold">E</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h4 className="font-semibold text-gray-900">Elif K.</h4>
                                                <span className="text-gray-500 text-sm">4 saat önce</span>
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">🌱 Çevre</span>
                                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">1.2 km</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Mahalle Temizlik Kampanyası</h3>
                                            <p className="text-gray-700 mb-3">
                                                Mahallemizi temiz tutmak için birlikte çalışalım! Sahil temizliği yapacağız, 
                                                çevre bilinci oluşturacağız ve güzel vakit geçireceğiz. Tüm komşularımız davetli!
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center space-x-1">
                                                        <span>📅</span>
                                                        <span>23 Ekim, 10:00</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>👥</span>
                                                        <span>15/50 katılımcı</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>❤️</span>
                                                        <span>23 beğeni</span>
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Katıl
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                        Detaylar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Grup */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-orange-600 font-semibold">M</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h4 className="font-semibold text-gray-900">Mehmet S.</h4>
                                                <span className="text-gray-500 text-sm">6 saat önce</span>
                                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">👥 Grup</span>
                                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">0.5 km</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Kadıköy Mahalle Gönüllüleri</h3>
                                            <p className="text-gray-700 mb-3">
                                                Kadıköy'de yaşayan komşularımızla yardımlaşma ve dayanışma. 
                                                Mahalle etkinlikleri, temizlik kampanyaları ve daha fazlası.
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center space-x-1">
                                                        <span>👥</span>
                                                        <span>456 üye</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>📍</span>
                                                        <span>Kadıköy</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>❤️</span>
                                                        <span>89 beğeni</span>
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Katıl
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                        Detaylar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Daha Fazla Göster */}
                            <div className="text-center mt-8">
                                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                                    Daha Fazla Yükle
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
