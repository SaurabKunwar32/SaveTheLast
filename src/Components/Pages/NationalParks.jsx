import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  ArrowRight,
  TreePine,
  Users,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Common/LoadingSpinner.jsx";
import { TotalNationalParks } from '../Data/SampleData.js'


export default function NationalParks() {
  const [parks, setParks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch parks using fetch API
  // useEffect(() => {
  //   const fetchParks = async () => {
  //     setLoading(true);
  //     setError("");
  //     try {
  //       const res = await fetch("/api/parks"); 
  //       if (!res.ok) throw new Error("Failed to fetch parks");
  //       const data = await res.json();
  //       setParks(data);
  //     } catch (err) {
  //       setError(err.message || "Failed to load parks");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchParks();
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 

    return () => clearTimeout(timer);
  }, []);

  // Filter parks based on search
  const filteredParks = TotalNationalParks.filter((park) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      park.name.toLowerCase().includes(lowerSearch) ||
      park.location.district.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
            <TreePine className="h-5 w-5 mr-2 text-emerald-300" />
            <span className="text-emerald-200 font-medium">Protected Wilderness</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            National Parks of
            <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
              Nepal
            </span>
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Discover the protected areas that safeguard Nepal's incredible biodiversity from the lowland Terai to the high Himalayas
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search parks by name or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200">
                <TreePine className="h-4 w-4 mr-2" />
                <span className="font-semibold">{filteredParks.length}</span>
                <span className="ml-1">parks found</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parks Grid or Loading/Error */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner size="lg" message="Loading parks..." />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-16">{error}</div>
          ) : filteredParks.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <TreePine className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No parks found</h3>
                <p className="text-slate-500">
                  No National parks match your search criteria. Try adjusting your search terms.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredParks.map((park) => (
                <Link
                  key={park._id}
                  to={`/parks/${park.slug}`}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={park.coverImageUrl}
                      alt={park.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white/90 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{park.location.district}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-white text-sm font-medium">
                          {Object.values(park.stats).reduce((a, b) => a + b, 0)} species
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                      {park.name}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                      {park.description}
                    </p>

                    {/* Species Stats */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                      <div className="text-center bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <div className="font-bold text-lg text-emerald-700">{park.stats.mammals_count}</div>
                        <div className="text-slate-600 text-xs">Mammals</div>
                      </div>
                      <div className="text-center bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <div className="font-bold text-lg text-blue-700">{park.stats.birds_count}</div>
                        <div className="text-slate-600 text-xs">Birds</div>
                      </div>
                      <div className="text-center bg-orange-50 p-3 rounded-xl border border-orange-100">
                        <div className="font-bold text-lg text-orange-700">{park.stats.reptiles_count}</div>
                        <div className="text-slate-600 text-xs">Reptiles</div>
                      </div>
                      <div className="text-center bg-purple-50 p-3 rounded-xl border border-purple-100">
                        <div className="font-bold text-lg text-purple-700">{park.stats.fish_count}</div>
                        <div className="text-slate-600 text-xs">Fish</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <div className="flex items-center">
                          <Camera className="h-4 w-4 mr-1" />
                          <span>Gallery</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>WildLife</span>
                        </div>
                      </div>
                      <div className="flex items-center text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 font-semibold">
                        <span className="mr-2">Explore</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Plan Your WildLife Adventure</h2>
          <p className="text-xl text-emerald-200 mb-8">
            Each national park offers unique experiences and WildLife encounters. Start planning your journey into Nepal's wilderness today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Plan Your Visit
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Conservation Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
