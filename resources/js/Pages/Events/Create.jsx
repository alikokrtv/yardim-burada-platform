import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function EventsCreate({ auth }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        address: '',
        max_participants: '',
        latitude: '',
        longitude: '',
        images: null
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
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

            const response = await fetch('/api/events', {
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
                    window.location.href = '/events';
                }, 2000);
            } else {
                setErrors(data.errors || {});
            }
        } catch (error) {
            console.error('Error creating event:', error);
            setErrors({ general: 'Bir hata oluştu' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Etkinlik Oluştur - YardımBurada+" />
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
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Yeni Etkinlik Oluştur</h1>
                            <p className="text-gray-600">Topluluğunuz için etkinlik düzenleyin</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Etkinlik Başlığı */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Etkinlik Başlığı *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Örn: Mahalle Temizlik Kampanyası"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Açıklama */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Etkinlik Açıklaması *
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Etkinliğin detaylarını açıklayın..."
                                    required
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Tarih ve Saat */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
                                        Başlangıç Tarihi ve Saati *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="start_date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                                </div>

                                <div>
                                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
                                        Bitiş Tarihi ve Saati
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="end_date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                                </div>
                            </div>

                            {/* Konum */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                    Etkinlik Konumu *
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Örn: Kadıköy Sahil, İstanbul"
                                    required
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            {/* Katılımcı Sayısı */}
                            <div>
                                <label htmlFor="max_participants" className="block text-sm font-medium text-gray-700 mb-2">
                                    Maksimum Katılımcı Sayısı
                                </label>
                                <input
                                    type="number"
                                    id="max_participants"
                                    value={data.max_participants}
                                    onChange={(e) => setData('max_participants', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Örn: 50"
                                    min="1"
                                />
                                {errors.max_participants && <p className="mt-1 text-sm text-red-600">{errors.max_participants}</p>}
                            </div>

                            {/* Etkinlik Resimleri */}
                            <div>
                                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                                    Etkinlik Resimleri
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <div className="text-gray-500">
                                        <span className="text-4xl block mb-2">📷</span>
                                        <p>Etkinlik resimleri yüklemek için tıklayın</p>
                                        <p className="text-sm">PNG, JPG, GIF (Max 5MB each)</p>
                                    </div>
                                    <input
                                        type="file"
                                        id="images"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => setData('images', e.target.files)}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Etkinlik Türü */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Etkinlik Türü
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        { value: 'social', label: '🎉 Sosyal', desc: 'Eğlence ve sosyalleşme' },
                                        { value: 'environment', label: '🌱 Çevre', desc: 'Çevre koruma' },
                                        { value: 'animal', label: '🐕 Hayvan', desc: 'Hayvan bakımı' },
                                        { value: 'sport', label: '🏃‍♂️ Spor', desc: 'Spor aktiviteleri' },
                                        { value: 'art', label: '🎨 Sanat', desc: 'Sanat ve kültür' },
                                        { value: 'education', label: '📚 Eğitim', desc: 'Eğitim ve öğrenme' },
                                        { value: 'volunteer', label: '🤝 Gönüllü', desc: 'Gönüllü çalışma' },
                                        { value: 'other', label: '🔧 Diğer', desc: 'Diğer aktiviteler' }
                                    ].map((type) => (
                                        <label key={type.value} className="flex flex-col items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="radio"
                                                name="event_type"
                                                value={type.value}
                                                className="mb-2"
                                            />
                                            <span className="text-lg mb-1">{type.label}</span>
                                            <span className="text-xs text-gray-500 text-center">{type.desc}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Butonlar */}
                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <Link
                                    href="/events"
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    İptal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Oluşturuluyor...' : 'Etkinliği Oluştur'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
