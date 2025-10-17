import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateHelpRequest({ auth }) {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: '',
        latitude: '',
        longitude: '',
        address: '',
        expires_at: '',
        priority: 1,
        images: []
    });

    const categories = [
        { value: 'ev', label: '🏠 Ev & Bahçe', icon: '🏠' },
        { value: 'hayvan', label: '🐕 Hayvan Bakımı', icon: '🐕' },
        { value: 'taşıma', label: '🚗 Taşıma', icon: '🚗' },
        { value: 'gıda', label: '🍎 Gıda', icon: '🍎' },
        { value: 'ulaşım', label: '🚌 Ulaşım', icon: '🚌' },
        { value: 'yardımsever', label: '🤝 Genel Yardım', icon: '🤝' },
        { value: 'çevre', label: '🌱 Çevre', icon: '🌱' },
        { value: 'sağlık', label: '🏥 Sağlık', icon: '🏥' },
        { value: 'eğitim', label: '📚 Eğitim', icon: '📚' }
    ];

    const priorities = [
        { value: 1, label: 'Normal', color: 'green' },
        { value: 2, label: 'Acil', color: 'yellow' },
        { value: 3, label: 'Acil Durum', color: 'red' }
    ];

    const getCurrentLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setData({
                        ...data,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setLoading(false);
                },
                (error) => {
                    console.error('Konum alınamadı:', error);
                    setLoading(false);
                }
            );
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post('/api/help-requests', {
            onSuccess: () => {
                // Başarılı olduğunda dashboard'a yönlendir
                window.location.href = '/dashboard';
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    🆘 Yardım İsteği Oluştur
                </h2>
            }
        >
            <Head title="Yardım İsteği Oluştur" />

            <div className="py-6">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Başlık */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Başlık *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Örn: Matkap lazım"
                                        required
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Açıklama */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Açıklama *
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Yardım isteğinizi detaylı bir şekilde açıklayın..."
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Kategori */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori *
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {categories.map((category) => (
                                            <label key={category.value} className="relative">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category.value}
                                                    checked={data.category === category.value}
                                                    onChange={(e) => setData('category', e.target.value)}
                                                    className="sr-only"
                                                />
                                                <div className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                                                    data.category === category.value 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                    <div className="text-center">
                                                        <div className="text-2xl mb-1">{category.icon}</div>
                                                        <div className="text-sm font-medium">{category.label}</div>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>

                                {/* Öncelik */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Öncelik
                                    </label>
                                    <div className="flex space-x-4">
                                        {priorities.map((priority) => (
                                            <label key={priority.value} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="priority"
                                                    value={priority.value}
                                                    checked={data.priority == priority.value}
                                                    onChange={(e) => setData('priority', parseInt(e.target.value))}
                                                    className="mr-2"
                                                />
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    priority.color === 'green' ? 'bg-green-100 text-green-800' :
                                                    priority.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {priority.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Konum */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Konum *
                                    </label>
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={getCurrentLocation}
                                            disabled={loading}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                        >
                                            {loading ? 'Alınıyor...' : '📍 Mevcut Konumu Kullan'}
                                        </button>
                                    </div>
                                    
                                    {location && (
                                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm text-green-800">
                                                ✅ Konum alındı: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                                            </p>
                                        </div>
                                    )}

                                    <input
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Adres (opsiyonel)"
                                    />
                                    {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
                                </div>

                                {/* Bitiş Tarihi */}
                                <div>
                                    <label htmlFor="expires_at" className="block text-sm font-medium text-gray-700">
                                        Ne Zaman Kadar Lazım? *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="expires_at"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                        min={new Date().toISOString().slice(0, 16)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.expires_at && <p className="mt-1 text-sm text-red-600">{errors.expires_at}</p>}
                                </div>

                                {/* Gönder Butonu */}
                                <div className="flex justify-end space-x-3">
                                    <a
                                        href="/dashboard"
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        İptal
                                    </a>
                                    <button
                                        type="submit"
                                        disabled={processing || !data.latitude || !data.longitude}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        {processing ? 'Oluşturuluyor...' : '🚀 Yardım İsteği Oluştur'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
