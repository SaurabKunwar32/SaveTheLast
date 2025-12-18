import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Heart, ArrowLeft, AlertTriangle } from "lucide-react";
import StatusBadge from "../Common/StatusBadge.jsx";
import LoadingSpinner from "../Common/LoadingSpinner.jsx";
import { sampleSpecies } from '../Data/SampleData.js'

export default function SpeciesDetail() {
    const { id } = useParams();
    const [species, setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    // useEffect(() => {
    //     const fetchSpeciesDetail = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null);

    //             const res = await fetch(`http://localhost:5000/api/species/${id}`);
    //             if (!res.ok) throw new Error("Failed to fetch species");

    //             const data = await res.json();
    //             setSpecies(data);
    //         } catch (err) {
    //             console.error(err);
    //             setError("Could not load species details.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchSpeciesDetail();
    // }, [id]);

    useEffect(() => {

        window.scrollTo(0, 0);

        const fetchSpeciesDetail = () => {
            setLoading(true);
            const found = sampleSpecies.find((sp) => sp._id === id);
            setSpecies(found || null);
            setLoading(false);
        };

        fetchSpeciesDetail();
    }, [id]);

    if (loading) return <LoadingSpinner size="lg" message="Loading species details..." />;
    if (error) return (
        <div className="flex justify-center py-16">
            <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 font-medium">{error}</p>
        </div>
    );
    if (!species) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)} // 👈 goes back to previous page
                    className="inline-flex items-center text-orange-600 mb-8 font-semibold  cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back 
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Image */}
                    <div className="relative">
                        <img
                            src={species.photos[0]?.url}
                            alt={species.species_name}
                            className="w-full h-96 object-cover"
                        />
                        {species.rare && (
                            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
                                Rare Species
                            </div>
                        )}
                    </div>

                    {/* Grid Content */}
                    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-5xl font-bold text-slate-800 mb-2">
                                    {species.species_name}
                                </h1>
                                <p className="text-2xl italic text-slate-600">{species.scientific_name}</p>
                            </div>

                            <div className="flex items-center gap-4 flex-wrap">
                                <StatusBadge status={species.population_status} size="md" />
                                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                                    {species.category}
                                </span>
                                <div className="flex items-center text-red-400">
                                    <Heart className="h-5 w-5 mr-1" /> Protected
                                </div>
                            </div>

                            <div>
                                <p className="text-slate-700 mb-2">
                                    <strong>Habitat:</strong> {species.habitat}
                                </p>
                                <p className="text-slate-700">
                                    <strong>Diet:</strong> {species.diet}
                                </p>
                            </div>

                            {species.parks?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-2 text-lg">Found in:</h3>
                                    <ul className="list-disc list-inside text-slate-700">
                                        {species.parks.map((park) => (
                                            <li key={park._id} className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-orange-600" /> {park.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Threats */}
                            <div>
                                <h3 className="font-semibold mb-2 text-lg text-red-600">Threats</h3>
                                <ul className="list-disc list-inside text-slate-700">
                                    {species.threats.map((threat, idx) => (
                                        <li key={idx}>{threat}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Conservation Measures */}
                            <div>
                                <h3 className="font-semibold mb-2 text-lg text-green-600">Conservation Measures</h3>
                                <ul className="list-disc list-inside text-slate-700">
                                    {species.conservation_measures.map((measure, idx) => (
                                        <li key={idx}>{measure}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Pros & Cons Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-emerald-50 p-4 rounded-lg shadow">
                                    <h4 className="font-semibold mb-2 text-green-700">Pros</h4>
                                    <ul className="list-disc list-inside text-slate-700">
                                        {species.pros.map((pro, idx) => (
                                            <li key={idx}>{pro}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg shadow">
                                    <h4 className="font-semibold mb-2 text-red-700">Cons</h4>
                                    <ul className="list-disc list-inside text-slate-700">
                                        {species.cons.map((con, idx) => (
                                            <li key={idx}>{con}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Last Sighting & Data Info */}
                            <div className="text-slate-700 space-y-2">
                                <p>
                                    <strong>Last Sighting Location:</strong> {species.last_sighting_location.district} (
                                    Lat: {species.last_sighting_location.coordinates.latitude}, Lon:{" "}
                                    {species.last_sighting_location.coordinates.longitude})
                                </p>
                                <p>
                                    <strong>Data Collected By:</strong> {species.data_collected_by}
                                </p>
                                <p>
                                    <strong>Year Recorded:</strong> {species.year_recorded}
                                </p>
                                <p>
                                    <strong>Created At:</strong> {new Date(species.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
