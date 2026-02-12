import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, ZoomIn } from 'lucide-react';
import Footer from '../components/Footer';

const GalleryPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { id: 1, src: "/assets/school_building.png", category: "Campus", title: "Main Building" },
    { id: 2, src: "https://images.unsplash.com/photo-1509062522246-37559cc792f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", category: "Academic", title: "Computer Lab" },
    { id: 3, src: "https://images.unsplash.com/photo-1576670159805-381a9de1e2b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Sports Complex" },
    { id: 4, src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", category: "Academic", title: "Classroom Session" },
    { id: 5, src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", category: "Events", title: "Cultural Fest" },
    { id: 6, src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", category: "Faculty", title: "Staff Meeting" },
    { id: 7, src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", category: "Academic", title: "Science Lab" },
    { id: 8, src: "https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", category: "Sports", title: "Basketball Court" },
    { id: 9, src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", category: "Academic", title: "Library" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">School Gallery</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">{image.category}</span>
                <h3 className="text-white text-lg font-bold">{image.title}</h3>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
                  <ZoomIn className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;