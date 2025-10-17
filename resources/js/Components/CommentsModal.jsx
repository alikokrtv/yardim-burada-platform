import { useState, useEffect } from 'react';

export default function CommentsModal({ isOpen, onClose, helpRequestId, auth }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && helpRequestId) {
            fetchComments();
        }
    }, [isOpen, helpRequestId]);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/help-requests/${helpRequestId}/messages`);
            const data = await response.json();
            if (data.success) {
                setComments(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const submitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const response = await fetch(`/api/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                },
                body: JSON.stringify({
                    help_request_id: helpRequestId,
                    content: newComment,
                    type: 'help_request'
                })
            });

            if (response.ok) {
                setNewComment('');
                fetchComments(); // Yenile
            } else {
                alert('Yorum gönderilemedi');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Bir hata oluştu');
        } finally {
            setSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50" onClick={onClose}>
            <div 
                className="bg-white rounded-t-2xl sm:rounded-lg w-full sm:max-w-2xl sm:mx-4 max-h-[85vh] sm:max-h-[80vh] flex flex-col animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - Instagram tarzı */}
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-semibold text-gray-900">Yanıtlar</h2>
                        <span className="text-sm text-gray-500">({comments.length})</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Comments - Instagram tarzı scroll */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-gray-500 mt-2 text-sm">Yükleniyor...</p>
                        </div>
                    ) : comments.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {comments.map((comment) => (
                                <div key={comment.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                                    <div className="flex space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">
                                                {comment.sender?.name?.charAt(0)?.toUpperCase() || 'A'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-baseline space-x-2">
                                                <span className="font-semibold text-gray-900 text-sm">
                                                    {comment.sender?.name || 'Anonim'}
                                                </span>
                                                <span className="text-gray-400 text-xs">
                                                    {new Date(comment.created_at).toLocaleDateString('tr-TR', { 
                                                        day: 'numeric', 
                                                        month: 'short',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-gray-800 text-sm mt-1 break-words">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <span className="text-5xl block mb-3">💬</span>
                            <p className="text-gray-600 font-medium">Henüz yorum yok</p>
                            <p className="text-sm text-gray-400 mt-1">İlk yorumu sen yap!</p>
                        </div>
                    )}
                </div>

                {/* Comment Form - Instagram tarzı alt sabit */}
                <div className="border-t bg-white p-4">
                    {auth?.user ? (
                        <form onSubmit={submitComment} className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-sm">
                                    {auth.user.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            </div>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Yorum ekle..."
                                className="flex-1 bg-gray-50 border-none rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                disabled={submitting}
                            />
                            {newComment.trim() && (
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="text-blue-600 font-semibold text-sm hover:text-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {submitting ? '...' : 'Gönder'}
                                </button>
                            )}
                        </form>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-gray-600 text-sm mb-3">Yorum yapmak için giriş yapmalısın</p>
                            <a 
                                href="/login" 
                                className="inline-block px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
                            >
                                Giriş Yap
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

