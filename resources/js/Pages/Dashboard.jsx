import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [helpRequests, setHelpRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Kullanıcının konumunu al
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    fetchNearbyHelpRequests(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error('Konum alınamadı:', error);
                    fetchHelpRequests();
                }
            );
        } else {
            fetchHelpRequests();
        }
    }, []);

    const fetchNearbyHelpRequests = async (lat, lng) => {
        try {
            const response = await fetch(`/api/help-requests/nearby?latitude=${lat}&longitude=${lng}&radius=10`);
            const data = await response.json();
            if (data.success) {
                setHelpRequests(data.data);
            }
        } catch (error) {
            console.error('Yakındaki yardım istekleri alınamadı:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchHelpRequests = async () => {
        try {
            const response = await fetch('/api/help-requests');
            const data = await response.json();
            if (data.success) {
                setHelpRequests(data.data.data || []);
            }
        } catch (error) {
            console.error('Yardım istekleri alınamadı:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'ev': '🏠',
            'hayvan': '🐕',
            'taşıma': '🚗',
            'gıda': '🍎',
            'ulaşım': '🚌',
            'yardımsever': '🤝',
            'çevre': '🌱',
            'sağlık': '🏥',
            'eğitim': '📚'
        };
        return icons[category] || '❓';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            1: 'bg-green-100 text-green-800',
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
        return texts[priority] || 'Normal';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        🧩 YardımBurada+ Dashboard
                    </h2>
                    <Link
                        href="/help-requests/create"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        + Yardım İsteği Oluştur
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Kullanıcı İstatistikleri */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">🤝</div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Yardım Ettim</p>
                                        <p className="text-2xl font-semibold text-gray-900">{auth.user.stats?.helps_given || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">📥</div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Yardım Aldım</p>
                                        <p className="text-2xl font-semibold text-gray-900">{auth.user.stats?.helps_received || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">⭐</div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">XP</p>
                                        <p className="text-2xl font-semibold text-gray-900">{auth.user.xp || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="text-2xl">🏆</div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Seviye</p>
                                        <p className="text-2xl font-semibold text-gray-900">{auth.user.level || 1}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Yakındaki Yardım İstekleri */}
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {userLocation ? '📍 Yakındaki Yardım İstekleri' : '📋 Son Yardım İstekleri'}
                            </h3>
                            
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    <p className="mt-2 text-gray-500">Yükleniyor...</p>
                                </div>
                            ) : helpRequests.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">🤷‍♂️</div>
                                    <p className="text-gray-500">Henüz yardım isteği bulunmuyor.</p>
                                    <Link
                                        href="/help-requests/create"
                                        className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        İlk Yardım İsteğini Oluştur
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {helpRequests.map((request) => (
                                        <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-2xl">{getCategoryIcon(request.category)}</span>
                                                    <h4 className="text-lg font-semibold text-gray-900">{request.title}</h4>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                                    {getPriorityText(request.priority)}
                                                </span>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-3">{request.description}</p>
                                            
                                            <div className="flex justify-between items-center text-sm text-gray-500">
                                                <div className="flex items-center space-x-4">
                                                    <span>👤 {request.user.name}</span>
                                                    <span>📍 {request.address || 'Konum belirtilmemiş'}</span>
                                                    <span>⏰ {new Date(request.expires_at).toLocaleString('tr-TR')}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                                                        Yardım Et
                                                    </button>
                                                    <Link
                                                        href={`/help-requests/${request.id}`}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Detay
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
