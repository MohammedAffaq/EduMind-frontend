import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

const SchoolGallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Modern Classrooms",
      category: "Facilities",
      description: "Our classrooms are equipped with smart boards, ergonomic furniture, and ample natural light to create an optimal learning environment.",
      moreImages: [
        "https://images.unsplash.com/photo-1509062522246-37559cc792f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Science Laboratories",
      category: "Labs",
      description: "State-of-the-art Physics, Chemistry, and Biology labs where students can conduct experiments safely under expert supervision.",
      moreImages: [
        "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Library & Research",
      category: "Resources",
      description: "A vast collection of books, journals, and digital resources to foster a love for reading and research among students.",
      moreImages: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      url: "/assets/sports.png",
      title: "Sports Complex",
      category: "Sports",
      description: "Our newly inaugurated Sports Complex features an Olympic-size swimming pool, indoor basketball courts, and a gymnasium.",
      moreImages: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      url: "/assets/computer.png",
      title: "Computer Center",
      category: "Technology",
      description: "High-tech computer labs with the latest hardware and software to ensure students stay ahead in the digital age.",
      moreImages: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      title: "Cultural Events",
      category: "Activities",
      description: "We host various cultural events throughout the year to celebrate diversity and showcase student talent.",
      moreImages: [
        "https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white" id="life">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Life & Facilities</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our vibrant campus environment designed to foster learning, creativity, and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] cursor-pointer"
              onClick={() => setSelectedItem(image)}
            >
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">{image.category}</span>
                <h3 className="text-white text-xl font-bold">{image.title}</h3>
                <div className="mt-2 flex items-center text-white/80 text-sm font-medium">
                  Read More <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="relative h-64 sm:h-80">
              <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">{selectedItem.category}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedItem.title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{selectedItem.description}</p>
              
              {selectedItem.moreImages && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedItem.moreImages.map((img, idx) => (
                      <img key={idx} src={img} alt={`Gallery ${idx}`} className="rounded-xl shadow-sm h-48 w-full object-cover hover:shadow-md transition-shadow" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SchoolGallery;