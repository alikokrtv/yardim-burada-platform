import { Head, Link } from '@inertiajs/react';

export default function GroupsIndex({ auth, groups = [] }) {
    return (
        <>
            <Head title="Gruplar - YardımBurada+" />
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
                                    <Link href="/groups" className="text-blue-600 font-medium">Gruplar</Link>
                                    <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium">Etkinlikler</Link>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href="/groups/create"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            + Grup Oluştur
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
                                <h3 className="font-semibold text-gray-900 mb-4">Kategoriler</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: 'Hayvanseverler', count: 23, icon: '🐕' },
                                        { name: 'Doğa Yürüyüşçüleri', count: 18, icon: '🌲' },
                                        { name: 'Mahalle Gönüllüleri', count: 45, icon: '🏘️' },
                                        { name: 'Çevre Dostları', count: 32, icon: '🌱' },
                                        { name: 'Spor Severler', count: 28, icon: '⚽' },
                                        { name: 'Sanat Severler', count: 15, icon: '🎨' }
                                    ].map((category, index) => (
                                        <button 
                                            key={index} 
                                            className="flex items-center justify-between text-sm hover:bg-blue-50 p-2 rounded-lg transition-colors w-full"
                                            onClick={() => alert(`${category.name} kategorisi filtreleniyor...`)}
                                        >
                                            <span className="text-gray-700">{category.icon} {category.name}</span>
                                            <span className="text-gray-400">{category.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Popüler Etiketler</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['#hayvansever', '#doğa', '#gönüllü', '#çevre', '#spor', '#sanat', '#müzik', '#kitap'].map((tag, index) => (
                                        <button 
                                            key={index} 
                                            className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors"
                                            onClick={() => alert(`${tag} etiketi ile filtreleniyor...`)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Ana Feed */}
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Topluluk Grupları</h1>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        Tümü
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Üye Olduklarım
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Yakınımdakiler
                                    </button>
                                </div>
                            </div>

                            {/* Grup Kartları */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Grup 1 */}
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500"></div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 text-xl">🐕</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">İstanbul Hayvanseverler</h3>
                                                <p className="text-gray-500 text-sm">Hayvan Bakımı</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-4">
                                            İstanbul'da yaşayan hayvanseverlerin buluşma noktası. 
                                            Sokak hayvanlarına yardım, veteriner paylaşımları ve daha fazlası.
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>👥</span>
                                                    <span>1,247 üye</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📍</span>
                                                    <span>İstanbul</span>
                                                </span>
                                            </div>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                Açık Grup
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            {auth.user ? (
                                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                    Gruba Katıl
                                                </button>
                                            ) : (
                                                <Link href="/login" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 text-center">
                                                    Giriş Yap
                                                </Link>
                                            )}
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                Detaylar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Grup 2 */}
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-purple-600 text-xl">🌲</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Doğa Yürüyüşçüleri</h3>
                                                <p className="text-gray-500 text-sm">Çevre & Doğa</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-4">
                                            Hafta sonları doğa yürüyüşleri düzenliyoruz. 
                                            Temiz hava, güzel manzaralar ve yeni arkadaşlıklar için katılın!
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>👥</span>
                                                    <span>892 üye</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📍</span>
                                                    <span>İstanbul</span>
                                                </span>
                                            </div>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                Açık Grup
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            {auth.user ? (
                                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                    Gruba Katıl
                                                </button>
                                            ) : (
                                                <Link href="/login" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 text-center">
                                                    Giriş Yap
                                                </Link>
                                            )}
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                Detaylar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Grup 3 */}
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500"></div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                                <span className="text-orange-600 text-xl">🏘️</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Kadıköy Mahalle Gönüllüleri</h3>
                                                <p className="text-gray-500 text-sm">Mahalle</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-4">
                                            Kadıköy'de yaşayan komşularımızla yardımlaşma ve dayanışma. 
                                            Mahalle etkinlikleri, temizlik kampanyaları ve daha fazlası.
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>👥</span>
                                                    <span>456 üye</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📍</span>
                                                    <span>Kadıköy</span>
                                                </span>
                                            </div>
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                                Onaylı Grup
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            {auth.user ? (
                                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                    Gruba Katıl
                                                </button>
                                            ) : (
                                                <Link href="/login" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 text-center">
                                                    Giriş Yap
                                                </Link>
                                            )}
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                Detaylar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Grup 4 */}
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 text-xl">🌱</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Çevre Dostları</h3>
                                                <p className="text-gray-500 text-sm">Çevre</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-4">
                                            Sürdürülebilir yaşam ve çevre koruma konularında bilinçlendirme. 
                                            Geri dönüşüm, temizlik kampanyaları ve eğitimler.
                                        </p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>👥</span>
                                                    <span>1,123 üye</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📍</span>
                                                    <span>İstanbul</span>
                                                </span>
                                            </div>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                Açık Grup
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            {auth.user ? (
                                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                    Gruba Katıl
                                                </button>
                                            ) : (
                                                <Link href="/login" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 text-center">
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

                            {/* Daha Fazla Göster */}
                            <div className="text-center mt-8">
                                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                                    Daha Fazla Grup Yükle
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
