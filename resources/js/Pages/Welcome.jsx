import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import CommentsModal from '../Components/CommentsModal';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [nearbyRequests, setNearbyRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commentsModal, setCommentsModal] = useState({ isOpen: false, helpRequestId: null });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Konum çekme (opsiyonel)
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setLocationError(null);
                },
                (error) => {
                    console.log('Konum izni verilmedi, genel içerik gösteriliyor');
                    setLocationError('Konum izni verilmedi');
                    // Konum olmadan devam et
                }
            );
        } else {
            setLocationError('Geolocation desteklenmiyor');
        }
    }, []);

    // Yakındaki yardım isteklerini çek
    const fetchRequests = async (pageNum = 1, append = false) => {
        if (userLocation) {
            setLoading(true);
            try {
                const response = await fetch(`/api/help-requests/nearby?lat=${userLocation.latitude}&lng=${userLocation.longitude}&radius=10&page=${pageNum}`);
                const data = await response.json();
                
                if (data.success) {
                    if (append) {
                        setNearbyRequests(prev => [...prev, ...(data.data || [])]);
                    } else {
                        setNearbyRequests(data.data || []);
                    }
                    setHasMore(data.data && data.data.length > 0);
                }
            } catch (error) {
                console.error('Error fetching nearby requests:', error);
            } finally {
                setLoading(false);
            }
        } else {
            // Konum yoksa genel istekleri çek
            setLoading(true);
            try {
                const response = await fetch(`/api/help-requests?page=${pageNum}`);
                const data = await response.json();
                
                if (data.success) {
                    if (append) {
                        setNearbyRequests(prev => [...prev, ...(data.data.data || [])]);
                    } else {
                        setNearbyRequests(data.data.data || []);
                    }
                    setHasMore(data.data.next_page_url !== null);
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchRequests(1, false);
    }, [userLocation]);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
                if (!loading && hasMore) {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchRequests(nextPage, true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, page]);

    // Yardım et fonksiyonu
    const handleHelpRequest = async (requestId) => {
        if (!auth.user) {
            alert('Yardım etmek için giriş yapmalısınız');
            return;
        }
        
        try {
            const response = await fetch(`/api/help-requests/${requestId}/help`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                }
            });
            
            if (response.ok) {
                alert('Yardım teklifiniz gönderildi!');
                // Feed'i yenile
                if (userLocation) {
                    fetch(`/api/help-requests/nearby?lat=${userLocation.latitude}&lng=${userLocation.longitude}&radius=10`)
                        .then(response => response.json())
                        .then(data => setNearbyRequests(data.data || []));
                }
            } else {
                alert('Bir hata oluştu');
            }
        } catch (error) {
            console.error('Error helping request:', error);
            alert('Bir hata oluştu');
        }
    };

    // Paylaş fonksiyonu
    const handleShareRequest = async (request) => {
        const url = `${window.location.origin}/help-requests/${request.id}`;
        const shareData = {
            title: request.title || 'Yardım İsteği',
            text: `${request.title} - ${request.description?.substring(0, 100)}...`,
            url: url
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                alert('Paylaşıldı!');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    // Kullanıcı iptal etmediyse, clipboard'a kopyala
                    copyToClipboard(url);
                }
            }
        } else {
            // Native share desteklenmiyorsa, URL'yi kopyala
            copyToClipboard(url);
        }
    };

    const copyToClipboard = async (url) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                alert('Link panoya kopyalandı! 📋');
            } else {
                // Fallback
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Link kopyalandı! 📋');
            }
        } catch (error) {
            console.error('Copy failed:', error);
            alert('Link kopyalanamadı: ' + url);
        }
    };

    // Yanıtları açma fonksiyonu
    const handleOpenComments = (helpRequestId) => {
        setCommentsModal({ isOpen: true, helpRequestId });
    };

    return (
        <>
            <Head title="YardımBurada+ - Topluluk Temelli Yardımlaşma Platformu" />
            <div className="bg-gray-50 min-h-screen">
                {/* Header - Sosyal medya tarzı */}
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

                {/* Ana İçerik - Sosyal medya feed tarzı */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sol Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Hızlı Erişim</h3>
                                <div className="space-y-3">
                                    <Link href="/help-requests/create" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                                        <span className="text-xl">📝</span>
                                        <span>Yardım İste</span>
                                    </Link>
                                    <Link href="/groups" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                                        <span className="text-xl">👥</span>
                                        <span>Gruplar</span>
                                    </Link>
                                    <Link href="/events" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                                        <span className="text-xl">📅</span>
                                        <span>Etkinlikler</span>
                                    </Link>
                                    <Link href="/nearby" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                                        <span className="text-xl">📍</span>
                                        <span>Yakınımdakiler</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Popüler Kategoriler</h3>
                                <div className="space-y-2">
                                    {['🏠 Ev & Bahçe', '🐕 Hayvan Bakımı', '🚗 Taşıma', '🍎 Gıda', '🚌 Ulaşım'].map((category, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-700">{category}</span>
                                            <span className="text-gray-400">{Math.floor(Math.random() * 50) + 10}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                                    </div>

                        {/* Ana Feed */}
                        <div className="lg:col-span-2">
                            {!auth.user ? (
                                <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        🧩 YardımBurada+'ya Hoş Geldiniz!
                                    </h2>
                                    <p className="text-gray-600 mb-6">
                                        Yakınınızdaki insanlarla yardımlaşın, topluluklar oluşturun ve yardım ettikçe madalyonlar kazanın.
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                        <Link
                                            href="/register"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                        >
                                            🚀 Hemen Başla
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                                        >
                                            Giriş Yap
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 font-semibold text-lg">
                                                {auth.user.name?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <Link
                                                href="/help-requests/create"
                                                className="w-full bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-3 text-gray-600 transition-colors"
                                            >
                                                Ne tür yardıma ihtiyacınız var?
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-4 pt-4 border-t">
                                        <Link href="/help-requests/create" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <span className="text-xl">📝</span>
                                            <span>Yardım İste</span>
                                        </Link>
                                        <Link href="/events/create" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <span className="text-xl">📅</span>
                                            <span>Etkinlik Oluştur</span>
                                        </Link>
                                        <Link href="/groups/create" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <span className="text-xl">👥</span>
                                            <span>Grup Oluştur</span>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Gerçek Yardım İstekleri Feed'i */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {userLocation ? 'Yakınımdaki Yardım İstekleri' : 'Son Yardım İstekleri'}
                                    </h3>
                                    {locationError && (
                                        <span className="text-sm text-red-500">
                                            Konum alınamadı: {locationError}
                                        </span>
                                    )}
                                </div>
                                
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                        <p className="text-gray-500 mt-2">Yardım istekleri yükleniyor...</p>
                                    </div>
                                ) : nearbyRequests.length > 0 ? (
                                    nearbyRequests.map((request) => (
                                        <div key={request.id} className="bg-white rounded-lg shadow-sm p-6">
                                            <div className="flex items-start space-x-4">
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                    <span className="text-green-600 font-semibold">
                                                        {request.user?.name?.charAt(0) || 'U'}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <h4 className="font-semibold text-gray-900">{request.user?.name || 'Anonim'}</h4>
                                                        <span className="text-gray-500 text-sm">
                                                            {new Date(request.created_at).toLocaleString('tr-TR')}
                                                        </span>
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                            {request.category}
                                                        </span>
                                                        {request.priority > 1 && (
                                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                                request.priority === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {request.priority === 2 ? 'Acil' : 'Acil Durum'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">{request.title}</h3>
                                                    <p className="text-gray-700 mb-3">{request.description}</p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                            <button 
                                                                onClick={() => handleOpenComments(request.id)}
                                                                className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                                            >
                                                                <span>💬</span>
                                                                <span>{request.comments_count || 0} yanıt</span>
                                                            </button>
                                                            <span className="flex items-center space-x-1">
                                                                <span>❤️</span>
                                                                <span>{request.likes_count || 0} beğeni</span>
                                                            </span>
                                                            <span className="flex items-center space-x-1">
                                                                <span>📍</span>
                                                                <span>{request.address || 'Konum belirtilmemiş'}</span>
                                                            </span>
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <button 
                                                                onClick={() => handleHelpRequest(request.id)}
                                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                                            >
                                                                Yardım Et
                                                            </button>
                                                            <button 
                                                                onClick={() => handleShareRequest(request)}
                                                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                                            >
                                                                📤 Paylaş
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <span className="text-4xl block mb-2">🤝</span>
                                        <p className="text-gray-500">Henüz yardım isteği yok</p>
                                        <p className="text-sm text-gray-400">İlk yardım isteğini sen oluştur!</p>
                                    </div>
                                )}

                                {/* Loading indicator */}
                                {loading && (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                        <p className="text-gray-500 mt-2">Daha fazla yükleniyor...</p>
                                    </div>
                                )}

                                {/* Örnek Post 2 */}
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
                                            </div>
                                            <p className="text-gray-700 mb-3">
                                                Kedim için veteriner randevusu var ama arabam bozuk. 
                                Veterinere götürmek için yardım edebilecek birisi var mı? 
                                Yaklaşık 1 saat sürecek. 🐱
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>💬</span>
                                                    <span>7 yanıt</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📍</span>
                                                    <span>Beşiktaş, İstanbul</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>⭐</span>
                                                    <span>4.9 (25 değerlendirme)</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                {/* Örnek Post 3 */}
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
                                            </div>
                                            <p className="text-gray-700 mb-3">
                                                Evden eve taşınma yapıyorum. Eşyaları taşımak için 
                                yardıma ihtiyacım var. Sadece 2-3 saat sürecek, 
                                kahve ve yemek ikramım var! 📦
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span className="flex items-center space-x-1">
                                                    <span>💬</span>
                                                    <span>5 yanıt</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>📍</span>
                                                    <span>Şişli, İstanbul</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <span>⭐</span>
                                                    <span>4.7 (18 değerlendirme)</span>
                                                </span>
                                            </div>
                                    </div>
                                    </div>
                                    </div>

                                {/* Daha Fazla Göster */}
                                <div className="text-center">
                                    <Link 
                                        href="/help-requests" 
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Tüm yardım isteklerini görüntüle →
                                    </Link>
                                </div>
                            </div>
                        </div>
                                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t mt-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="text-xl font-bold text-blue-600 mb-4">🧩 YardımBurada+</div>
                                <p className="text-gray-600 text-sm">
                                    Topluluk temelli yardımlaşma platformu
                                        </p>
                                    </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Platform</h4>
                                <div className="space-y-2 text-sm">
                                    <Link href="/help-requests" className="text-gray-600 hover:text-blue-600 block">Yardım İstekleri</Link>
                                    <Link href="/groups" className="text-gray-600 hover:text-blue-600 block">Gruplar</Link>
                                    <Link href="/events" className="text-gray-600 hover:text-blue-600 block">Etkinlikler</Link>
                                    <Link href="/nearby" className="text-gray-600 hover:text-blue-600 block">Yakınımdakiler</Link>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Destek</h4>
                                <div className="space-y-2 text-sm">
                                    <Link href="/help" className="text-gray-600 hover:text-blue-600 block">Yardım Merkezi</Link>
                                    <Link href="/contact" className="text-gray-600 hover:text-blue-600 block">İletişim</Link>
                                    <Link href="/privacy" className="text-gray-600 hover:text-blue-600 block">Gizlilik</Link>
                                    <Link href="/terms" className="text-gray-600 hover:text-blue-600 block">Kullanım Şartları</Link>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Topluluk</h4>
                                <div className="space-y-2 text-sm">
                                    <Link href="/blog" className="text-gray-600 hover:text-blue-600 block">Blog</Link>
                                    <Link href="/success-stories" className="text-gray-600 hover:text-blue-600 block">Başarı Hikayeleri</Link>
                                    <Link href="/volunteers" className="text-gray-600 hover:text-blue-600 block">Gönüllüler</Link>
                                </div>
                            </div>
                        </div>
                        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
                            <p>© 2024 YardımBurada+. Tüm hakları saklıdır.</p>
                            <p className="mt-2">Laravel v{laravelVersion} (PHP v{phpVersion}) ile geliştirilmiştir</p>
                        </div>
                    </div>
                </footer>

                {/* Comments Modal */}
                <CommentsModal
                    isOpen={commentsModal.isOpen}
                    onClose={() => setCommentsModal({ isOpen: false, helpRequestId: null })}
                    helpRequestId={commentsModal.helpRequestId}
                    auth={auth}
                />
            </div>
        </>
    );
}
