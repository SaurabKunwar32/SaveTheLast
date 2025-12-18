import React, { useEffect, useState } from 'react'
import { rareSpecies, protectedWilderness,TotalNationalParks } from '../Data/SampleData.js'
import Bimg from './b.jpg'
import { TreePine, MapPin, Eye, Shield, ArrowRight, Star, Camera, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../Common/LoadingSpinner.jsx'
import StatusBadge from '../Common/StatusBadge.jsx'



export default function Home() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);


    useEffect(()=>{
                window.scrollTo(0, 0);
    },[])

    return (
        <div className="min-h-screen">
            {/* Hero section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative bg-cover bg-center bg-blend-overlay min-h-screen flex items-center"
                    style={{
                        backgroundImage: `url(${Bimg})`
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                        <div className="text-center">

                            <div className="mb-8">
                                <div className="inline-flex items-center bg-emerald-600/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-6 py-3 mb-6">
                                    <Camera className="h-5 w-5 mr-2 text-emerald-300" />
                                    <span className="text-emerald-200 font-medium">Discover • Protect • Preserve</span>
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                                Discover Nepal's
                                <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                                    WildLife Heritage
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-slate-200 leading-relaxed">
                                Explore the incredible biodiversity of Nepal's national parks and learn about
                                our rare and endangered species that call the Himalayas home.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link
                                    to="/parks"
                                    className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1"
                                >
                                    <MapPin className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                                    <span>Explore Parks</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>

                                <Link
                                    to="/rare-species"
                                    className="group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1"
                                >
                                    <Star className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                                    <span>Rare Species</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>

                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* Featured Parks */}
            <section className="py-20 bg-white" >

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-medium mb-4">
                            <TreePine className="h-4 w-4 mr-2" />
                            Featured Destinations
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Nepal's Protected Wilderness
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Discover Nepal's most spectacular national parks and the incredible WildLife they protect
                        </p>
                    </div>

                    {loading ? (
                        <LoadingSpinner message="Loading data..." size="lg" />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {protectedWilderness.map((park) => (
                                <Link
                                    key={park._id}
                                    to={`/parks/${park.slug}`}
                                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={park.coverImageUrl}
                                            alt={park.name}
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex items-center text-white/90 text-sm mb-2">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                <span>{park.location.district}</span>
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
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="text-center bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                                <div className="font-bold text-2xl text-emerald-700">{park.stats.mammals_count}</div>
                                                <div className="text-slate-600 text-sm">Mammals</div>
                                            </div>
                                            <div className="text-center bg-blue-50 p-3 rounded-xl border border-blue-100">
                                                <div className="font-bold text-2xl text-blue-700">{park.stats.birds_count}</div>
                                                <div className="text-slate-600 text-sm">Birds</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-slate-500 font-medium">
                                                Total: {Object.values(park.stats).reduce((a, b) => a + b, 0)} species
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

                    <div className="text-center mt-12">
                        <Link
                            to="/parks"
                            className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            View All Parks
                            <ArrowRight className="ml-3 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>


            {/* Rare Species Spotlight */}
            <section  className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50" >

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-medium mb-4">
                            <Star className="h-4 w-4 mr-2" />
                            Conservation Priority
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                            Rare Species Spotlight
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Meet Nepal's most endangered WildLife - every species tells a story of survival and hope
                        </p>
                    </div>

                    {loading ? (
                        <LoadingSpinner message="Loading data..." size="lg" />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {rareSpecies.map((species) => (
                                <Link
                                    key={species._id}
                                    to={`/species/${species._id}`}
                                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={species.photos[0]?.url || 'https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg'}
                                            alt={species.species_name}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <StatusBadge status={species.population_status} size="sm" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                                            {species.species_name}
                                        </h3>
                                        <p className="text-sm italic text-slate-600 mb-3">
                                            {species.scientific_name}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                                                {species.category}
                                            </span>
                                            {species.parks.length > 0 && (
                                                <div className="flex items-center text-xs text-slate-500">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    <span>{species.parks[0].name.split(' ')[0]}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center text-orange-600 group-hover:text-orange-700 transition-colors duration-300 font-semibold">
                                            <span className="mr-2 text-sm">Learn more</span>
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            to="/rare-species"
                            className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            View All Rare Species
                            <ArrowRight className="ml-3 h-5 w-5" />
                        </Link>
                    </div>                </div>
            </section>

            {/* Conservation Stats */}
            <section  className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Conservation Impact</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Together, we're making a difference in WildLife conservation across Nepal
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
                            <div className="flex items-center justify-center mb-6">
                                <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <TreePine className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-emerald-700 mb-2 text-center">{TotalNationalParks.length}</div>
                            <div className="text-slate-600 text-center font-medium">National Parks</div>
                        </div>
                        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
                            <div className="flex items-center justify-center mb-6">
                                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Eye className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-blue-700 mb-2 text-center">1,200+</div>
                            <div className="text-slate-600 text-center font-medium">WildLife Species</div>
                        </div>
                        <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
                            <div className="flex items-center justify-center mb-6">
                                <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-orange-700 mb-2 text-center">{rareSpecies.length}</div>
                            <div className="text-slate-600 text-center font-medium">Endangered Species</div>
                        </div>

                    </div>

                </div>
            </section>

            {/* Conservation Message */}
            <section  className="py-20 bg-gradient-to-r from-slate-800 via-emerald-800 to-teal-800 text-white relative overflow-hidden" >
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                            <Shield className="h-10 w-10 text-emerald-300" />
                        </div>
                    </div>
                    <blockquote className="text-3xl md:text-4xl font-bold mb-8 leading-relaxed">
                        "In the end, we will conserve only what we love, we will love only what we understand, and we will understand only what we are taught."
                    </blockquote>

                    <cite className="text-xl text-emerald-200 mb-8 block">
                        - Baba Dioum, Senegalese Ecologist
                    </cite>

                    <p className="text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8">
                        Every species lost is a story that can never be told again. Together,
                        we can protect Nepal's natural heritage for generations to come.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-slate-800 px-8 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Support Conservation
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Learn How to Help
                        </button>
                    </div>

                </div>
            </section>
        </div>
    )
}
