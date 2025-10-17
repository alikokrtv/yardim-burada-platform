import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function GroupsCreate({ auth }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        city: '',
        category: '',
        rules: '',
        is_public: true,
        cover_image: null
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== '') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await fetch('/api/groups', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                },
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    window.location.href = '/groups';
                }, 2000);
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error creating group:', error);
            setErrors({ general: 'Bir hata oluştu' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Grup Oluştur - YardımBurada+" />
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
                            </div>
                        </div>
                    </div>
                </header>

                {/* Ana İçerik */}
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Yeni Grup Oluştur</h1>
                            <p className="text-gray-600">Topluluğunuzu oluşturun ve insanları bir araya getirin</p>
                        </div>

                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                                <p className="font-semibold">Grup başarıyla oluşturuldu!</p>
                                <p className="text-sm">Gruplar sayfasına yönlendiriliyorsunuz...</p>
                            </div>
                        )}

                        {errors.general && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                                <p className="font-semibold">{errors.general}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Grup Adı */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Grup Adı *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Örn: İstanbul Hayvanseverler"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Açıklama */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Grup Açıklaması *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Grubunuzun amacını ve ne tür aktiviteler yapacağınızı açıklayın..."
                                    required
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Şehir ve Kategori */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                        Şehir *
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Şehir Seçin</option>
                                        <option value="İstanbul">İstanbul</option>
                                        <option value="Ankara">Ankara</option>
                                        <option value="İzmir">İzmir</option>
                                        <option value="Bursa">Bursa</option>
                                        <option value="Antalya">Antalya</option>
                                        <option value="Adana">Adana</option>
                                        <option value="Konya">Konya</option>
                                        <option value="Gaziantep">Gaziantep</option>
                                    </select>
                                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Kategori *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Kategori Seçin</option>
                                        <option value="Hayvan Bakımı">🐕 Hayvan Bakımı</option>
                                        <option value="Çevre & Doğa">🌲 Çevre & Doğa</option>
                                        <option value="Mahalle">🏘️ Mahalle</option>
                                        <option value="Çevre">🌱 Çevre</option>
                                        <option value="Spor">⚽ Spor</option>
                                        <option value="Sanat">🎨 Sanat</option>
                                        <option value="Müzik">🎵 Müzik</option>
                                        <option value="Kitap">📚 Kitap</option>
                                        <option value="Teknoloji">💻 Teknoloji</option>
                                        <option value="Yemek">🍳 Yemek</option>
                                    </select>
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                                </div>
                            </div>

                            {/* Grup Kuralları */}
                            <div>
                                <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-2">
                                    Grup Kuralları
                                </label>
                                <textarea
                                    id="rules"
                                    value={data.rules}
                                    onChange={(e) => setData('rules', e.target.value)}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Grubunuzun kurallarını belirtin (opsiyonel)..."
                                />
                                {errors.rules && <p className="mt-1 text-sm text-red-600">{errors.rules}</p>}
                            </div>

                            {/* Grup Gizliliği */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Grup Gizliliği
                                </label>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="is_public"
                                            value="true"
                                            checked={formData.is_public === true}
                                            onChange={handleChange}
                                            className="mr-3"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900">Açık Grup</div>
                                            <div className="text-sm text-gray-500">Herkes grubu görebilir ve katılabilir</div>
                                        </div>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="is_public"
                                            value="false"
                                            checked={formData.is_public === false}
                                            onChange={handleChange}
                                            className="mr-3"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900">Kapalı Grup</div>
                                            <div className="text-sm text-gray-500">Sadece davet edilenler katılabilir</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Kapak Resmi */}
                            <div>
                                <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kapak Resmi
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <div className="text-gray-500">
                                        <span className="text-4xl block mb-2">📷</span>
                                        <p>Kapak resmi yüklemek için tıklayın</p>
                                        <p className="text-sm">PNG, JPG, GIF (Max 5MB)</p>
                                    </div>
                                    <input
                                        type="file"
                                        id="cover_image"
                                        name="cover_image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Butonlar */}
                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <Link
                                    href="/groups"
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    İptal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {loading ? 'Oluşturuluyor...' : 'Grubu Oluştur'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
