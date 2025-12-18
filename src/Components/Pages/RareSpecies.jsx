import React, { useEffect, useState } from "react";
import {
    Search,
    MapPin,
    ArrowRight,
    AlertTriangle,
    Star,
    Heart,
} from "lucide-react";
import { sampleSpecies } from '../Data/SampleData.js'
import { useNavigate } from 'react-router-dom'   
import StatusBadge from "../Common/StatusBadge.jsx";
import LoadingSpinner from "../Common/LoadingSpinner.jsx";

export default function RareSpecies() {
    const navigate = useNavigate();  
    const categories = ["Mammal", "Bird", "Reptile"];
    const statuses = ["Critically Endangered", "Endangered", "Vulnerable"];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 

        return () => clearTimeout(timer);
    }, []);

    // 🔹 filtering logic
    const filteredSpecies = sampleSpecies.filter((species) => {
        const term = searchTerm.toLowerCase();

        // combine species name + scientific name
        const combined = `${species.species_name} ${species.scientific_name}`.toLowerCase();
        // console.log(combined);

        // check if search term exists in combined string
        const matchesSearch =
            term === "" ||
            combined.includes(term) ||
            species.last_sighting_location.district.toLowerCase().includes(term);

        const matchesCategory =
            selectedCategory === "" || species.category === selectedCategory;

        const matchesStatus =
            selectedStatus === "" || species.population_status === selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });


    const [visibleCount, setVisibleCount] = useState(7);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6); 
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
            {/* Header */}
            <section className="bg-gradient-to-r from-red-800 via-orange-700 to-pink-700 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center bg-red-500/20 border border-red-400/30 rounded-full px-6 py-3 mb-6">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-300 animate-pulse" />
                        <span className="text-red-200 font-medium">
                            Conservation Priority
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Rare & Endangered
                        <span className="block bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                            Species of Nepal
                        </span>
                    </h1>
                    <p className="text-xl text-orange-200 max-w-4xl mx-auto leading-relaxed">
                        Nepal's most precious WildLife faces extinction. These remarkable
                        species need our immediate attention and protection.
                    </p>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="py-8 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 items-center">
                    {/* search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search species..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm transition-all duration-300"
                        />
                    </div>

                    {/* filters */}
                    <div className="flex gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                        >
                            <option value="">All Status</option>
                            {statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    {/* count */}
                    <div className="flex items-center bg-orange-50 text-orange-700 px-4 py-2 rounded-lg border border-orange-200">
                        <Star className="h-4 w-4 mr-2" />
                        <span className="font-semibold">{filteredSpecies.length}</span>
                        <span className="ml-1">species found</span>
                    </div>
                </div>
            </section>

            {/* Species Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading && (
                        <div className="flex justify-center py-16">
                            <LoadingSpinner size="lg" message="Loading species..." />
                        </div>
                    )}

                    {!loading && error && (
                        <div className="text-center py-16 text-red-600">{error}</div>
                    )}

                    {!loading && !error && filteredSpecies.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredSpecies.slice(0, visibleCount).map((sp) => (
                                    <div
                                        key={sp._id}
                                        className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 cursor-pointer"
                                        onClick={() => navigate(`/species/${sp._id}`)}  //  go to detail page
                                    >
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={sp.photos[0]?.url}
                                                alt={sp.species_name}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                            <div className="absolute top-3 right-3">
                                                <StatusBadge status={sp.population_status} size="sm" />
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600">
                                                {sp.species_name}
                                            </h3>
                                            <p className="text-sm italic text-slate-600 mb-4">
                                                {sp.scientific_name}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                    {sp.category}
                                                </span>
                                                <div className="flex items-center text-slate-500">
                                                    <Heart className="h-4 w-4 mr-1 text-red-400" />
                                                    <span className="text-xs">Protected</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Load More */}
                            {visibleCount < filteredSpecies.length && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        type="button"
                                        onClick={handleLoadMore}
                                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {!loading && !error && filteredSpecies.length === 0 && (
                        <div className="text-center py-16 text-slate-500">
                            No species found matching your filters.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
