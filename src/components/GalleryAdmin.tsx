import { useEffect, useState } from 'react';
import {
  getAllGalleryImages,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  toggleImageActive,
  reorderImages,
  type GalleryImage,
  type MediaType
} from '../lib/galleryStorage';
import { Upload, Trash2, Eye, EyeOff, GripVertical, Plus, X, Play } from 'lucide-react';

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newMediaType, setNewMediaType] = useState<MediaType>('image');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    setLoading(true);
    const galleryImages = await getAllGalleryImages();
    setImages(galleryImages);
    setLoading(false);
  }

  async function handleAddImage() {
    if (!newImageUrl.trim() || !newImageTitle.trim()) {
      alert('Vul alle velden in');
      return;
    }

    const newImage = await addGalleryImage({
      url: newImageUrl,
      title: newImageTitle,
      media_type: newMediaType,
    });

    if (newImage) {
      setImages([...images, newImage]);
      setNewImageUrl('');
      setNewImageTitle('');
      setNewMediaType('image');
      setShowAddForm(false);
    } else {
      alert('Fout bij toevoegen van media');
    }
  }

  async function handleToggleActive(id: string, currentStatus: boolean) {
    const success = await toggleImageActive(id, !currentStatus);
    if (success) {
      setImages(images.map(img =>
        img.id === id ? { ...img, is_active: !currentStatus } : img
      ));
    } else {
      alert('Fout bij wijzigen van status');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Weet je zeker dat je dit item wilt verwijderen?')) {
      return;
    }

    const success = await deleteGalleryImage(id);
    if (success) {
      setImages(images.filter(img => img.id !== id));
    } else {
      alert('Fout bij verwijderen van item');
    }
  }

  function handleDragStart(index: number) {
    setDraggedIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];

    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    setImages(newImages);
    setDraggedIndex(index);
  }

  async function handleDragEnd() {
    if (draggedIndex === null) return;

    const imageIds = images.map(img => img.id);
    const success = await reorderImages(imageIds);

    if (!success) {
      alert('Fout bij opslaan van volgorde');
      await loadImages();
    }

    setDraggedIndex(null);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Galerij Beheer</h1>
        <p className="text-gray-600">Beheer de afbeeldingen en video's in de galerij</p>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          {showAddForm ? <X size={20} /> : <Plus size={20} />}
          {showAddForm ? 'Annuleren' : 'Media Toevoegen'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Nieuwe Media</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Media Type
              </label>
              <select
                value={newMediaType}
                onChange={(e) => setNewMediaType(e.target.value as MediaType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="image">Afbeelding</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {newMediaType === 'video' ? 'Video URL' : 'Afbeelding URL'}
              </label>
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder={newMediaType === 'video' ? '/pad/naar/video.mp4' : '/pad/naar/afbeelding.png'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {newMediaType === 'video' ? 'Gebruik een directe video URL (.mp4, .webm, etc.)' : 'Gebruik een afbeelding URL'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newImageTitle}
                onChange={(e) => setNewImageTitle(e.target.value)}
                placeholder="Beschrijvende titel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              onClick={handleAddImage}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Upload size={20} />
              Toevoegen
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-12"></th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preview</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Titel</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">URL</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {images.map((image, index) => (
                <tr
                  key={image.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`hover:bg-gray-50 cursor-move ${draggedIndex === index ? 'opacity-50' : ''}`}
                >
                  <td className="px-4 py-3">
                    <GripVertical size={20} className="text-gray-400" />
                  </td>
                  <td className="px-4 py-3">
                    {image.media_type === 'video' ? (
                      <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
                        <Play size={24} className="text-white" />
                      </div>
                    ) : (
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {image.media_type === 'video' ? 'Video' : 'Afbeelding'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{image.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                    {image.url}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        image.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {image.is_active ? 'Actief' : 'Inactief'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(image.id, image.is_active)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                        title={image.is_active ? 'Deactiveren' : 'Activeren'}
                      >
                        {image.is_active ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                        title="Verwijderen"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Geen items in de galerij
        </div>
      )}
    </div>
  );
}
