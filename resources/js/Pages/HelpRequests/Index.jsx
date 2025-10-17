import { Head, Link } from '@inertiajs/react';

export default function HelpRequestsIndex({ auth, helpRequests = [] }) {
    const getCategoryIcon = (category) => {
        const icons = {
            'Ev & Bahçe': '🏠',
            'Hayvan Bakımı': '🐕',
            'Taşıma': '🚗',
            'Gıda': '🍎',
            'Ulaşım': '🚌',
            'Çevre': '🌱',
            'Sağlık': '🏥',
            'Eğitim': '📚'
        };
        return icons[category] || '🤝';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            1: 'bg-gray-100 text-gray-800',
            2: 'bg-yellow-100 text-yellow-800',
            3: 'bg-red-100 text-red-800'
        };
        return colors[priority] || colors[1];
    };

    const getPriorityText = (priority) => {
        const texts = {
            1: 'Normal',
            2: 'Acil',
            3: 'Acil Durum'
        };
        return texts[priority] || texts[1];
    };

    return (
        <>
            <Head title="Yardım İstekleri - YardımBurada+" />
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
                                    <Link href="/help-requests" className="text-blue-600 font-medium">Yardım İstekleri</Link>
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
                                <h3 className="font-semibold text-gray-900 mb-4">Filtreler</h3>
                                <div className="space-y-4">
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Öncelik</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                            <option>Tüm Öncelikler</option>
                                            <option>Normal</option>
                                            <option>Acil</option>
                                            <option>Acil Durum</option>
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
                                <h3 className="font-semibold text-gray-900 mb-4">İstatistikler</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Toplam İstek</span>
                                        <span className="font-semibold">247</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Aktif İstek</span>
                                        <span className="font-semibold text-green-600">89</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tamamlanan</span>
                                        <span className="font-semibold text-blue-600">158</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ana Feed */}
                        <div className="lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Yardım İstekleri</h1>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        Tümü
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Yakınımdakiler
                                    </button>
                                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                                        Kategoriler
                                    </button>
                                </div>
                            </div>

                            {/* Örnek Yardım İstekleri */}
                            <div className="space-y-6">
                                {/* İstek 1 */}
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
                                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Acil</span>
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
                                                        Paylaş
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* İstek 2 */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 font-semibold">E</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h4 className="font-semibold text-gray-900">Elif K.</h4>
                                                <span className="text-gray-500 text-sm">4 saat önce</span>
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">🐕 Hayvan Bakımı</span>
                                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Normal</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Kedim için veteriner taşıma</h3>
                                            <p className="text-gray-700 mb-3">
                                                Kedim için veteriner randevusu var ama arabam bozuk. 
                                Veterinere götürmek için yardım edebilecek birisi var mı? 
                                Yaklaşık 1 saat sürecek. 🐱
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center space-x-1">
                                                        <span>💬</span>
                                                        <span>7 yanıt</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>❤️</span>
                                                        <span>18 beğeni</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>📍</span>
                                                        <span>Beşiktaş, İstanbul</span>
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Yardım Et
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                        Paylaş
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* İstek 3 */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <span className="text-orange-600 font-semibold">M</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h4 className="font-semibold text-gray-900">Mehmet S.</h4>
                                                <span className="text-gray-500 text-sm">6 saat önce</span>
                                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">🚗 Taşıma</span>
                                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Acil Durum</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Evden eve taşınma yardımı</h3>
                                            <p className="text-gray-700 mb-3">
                                                Evden eve taşınma yapıyorum. Eşyaları taşımak için 
                                yardıma ihtiyacım var. Sadece 2-3 saat sürecek, 
                                kahve ve yemek ikramım var! 📦
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span className="flex items-center space-x-1">
                                                        <span>💬</span>
                                                        <span>5 yanıt</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>❤️</span>
                                                        <span>8 beğeni</span>
                                                    </span>
                                                    <span className="flex items-center space-x-1">
                                                        <span>📍</span>
                                                        <span>Şişli, İstanbul</span>
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                                                        Yardım Et
                                                    </button>
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                                                        Paylaş
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Daha Fazla Göster */}
                                <div className="text-center">
                                    <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                                        Daha Fazla Yükle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
