import { Head, Link } from '@inertiajs/react';

export default function EventsIndex({ auth, events = [] }) {
    return (
        <>
            <Head title="Etkinlikler - YardımBurada+" />
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
                                    <Link href="/events" className="text-blue-600 font-medium">Etkinlikler</Link>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href="/events/create"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            + Etkinlik Oluştur
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
                                <h3 className="font-semibold text-gray-900 mb-4">Filtreler</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tarih</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                            <option>Bu Hafta</option>
                                            <option>Bu Ay</option>
                                            <option>Gelecek Ay</option>
                                            <option>Tümü</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                            <option>Tüm Kategoriler</option>
                                            <option>🎉 Sosyal</option>
                                            <option>🌱 Çevre</option>
                                            <option>🐕 Hayvan</option>
                                            <option>🏃‍♂️ Spor</option>
                                            <option>🎨 Sanat</option>
                                            <option>📚 Eğitim</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mesafe</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                            <option>5 km</option>
                                            <option>10 km</option>
                                            <option>25 km</option>
                                            <option>50 km</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Yaklaşan Etkinlikler</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <span className="text-blue-600 text-sm">📅</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Mahalle Temizliği</p>
                                            <p className="text-xs text-gray-500">Yarın 10:00</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <span className="text-green-600 text-sm">🐕</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Hayvan Barınağı Ziyareti</p>
                                            <p className="text-xs text-gray-500">Cumartesi 14:00</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <span className="text-purple-600 text-sm">🎨</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Sanat Atölyesi</p>
                                            <p className="text-xs text-gray-500">Pazar 16:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ana Feed */}
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Etkinlikler</h1>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        Tümü
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Katıldıklarım
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Yakınımdakiler
                                    </button>
                                </div>
                            </div>

                            {/* Etkinlik Kartları */}
                            <div className="space-y-6">
                                {/* Etkinlik 1 */}
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative">
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                🌱 Çevre
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-bold">Mahalle Temizlik Kampanyası</h3>
                                            <p className="text-sm opacity-90">Kadıköy Sahil Temizliği</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">📅</span>
                                                <span className="text-sm text-gray-700">23 Ekim 2024, 10:00</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">📍</span>
                                                <span className="text-sm text-gray-700">Kadıköy Sahil</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">👥</span>
                                                <span className="text-sm text-gray-700">15/50 katılımcı</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Mahallemizi temiz tutmak için birlikte çalışalım! Sahil temizliği yapacağız, 
                                            çevre bilinci oluşturacağız ve güzel vakit geçireceğiz. Tüm komşularımız davetli!
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>❤️</span>
                                                    <span>23 beğeni</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>💬</span>
                                                    <span>8 yorum</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📤</span>
                                                    <span>12 paylaşım</span>
                                                </span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {auth.user ? (
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Katıl
                                                    </button>
                                                ) : (
                                                    <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Giriş Yap
                                                    </Link>
                                                )}
                                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                    Detaylar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Etkinlik 2 */}
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 relative">
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                                🐕 Hayvan
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-bold">Hayvan Barınağı Ziyareti</h3>
                                            <p className="text-sm opacity-90">Sevgi ve Bakım Günü</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">📅</span>
                                                <span className="text-sm text-gray-700">26 Ekim 2024, 14:00</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">📍</span>
                                                <span className="text-sm text-gray-700">İstanbul Hayvan Barınağı</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">👥</span>
                                                <span className="text-sm text-gray-700">8/20 katılımcı</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Barınaktaki dostlarımızla vakit geçirelim! Onlara sevgi gösterelim, 
                                            bakımlarına yardım edelim ve belki yeni bir aile üyesi bulalım.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>❤️</span>
                                                    <span>45 beğeni</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>💬</span>
                                                    <span>12 yorum</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📤</span>
                                                    <span>18 paylaşım</span>
                                                </span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {auth.user ? (
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Katıl
                                                    </button>
                                                ) : (
                                                    <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Giriş Yap
                                                    </Link>
                                                )}
                                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                    Detaylar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Etkinlik 3 */}
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500 relative">
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                                🎨 Sanat
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-bold">Sanat Atölyesi</h3>
                                            <p className="text-sm opacity-90">Resim ve El Sanatları</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">📅</span>
                                                <span className="text-sm text-gray-700">28 Ekim 2024, 16:00</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">📍</span>
                                                <span className="text-sm text-gray-700">Kadıköy Sanat Merkezi</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-500">👥</span>
                                                <span className="text-sm text-gray-700">12/15 katılımcı</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            Sanatla buluşalım! Resim, el sanatları ve yaratıcılık atölyesi. 
                                            Malzemeler temin edilecek, sadece yaratıcılığınızı getirin!
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>❤️</span>
                                                    <span>18 beğeni</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>💬</span>
                                                    <span>5 yorum</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📤</span>
                                                    <span>7 paylaşım</span>
                                                </span>
                                            </div>
                                            <div className="flex space-x-2">
                                                {auth.user ? (
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Katıl
                                                    </button>
                                                ) : (
                                                    <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Giriş Yap
                                                    </Link>
                                                )}
                                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                    Detaylar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Daha Fazla Göster */}
                            <div className="text-center mt-8">
                                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                                    Daha Fazla Etkinlik Yükle
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
