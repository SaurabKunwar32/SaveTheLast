import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, AlertTriangle } from "lucide-react";
import { TotalNationalParks, sampleSpecies } from "../Data/SampleData.js";


export default function ParkDetail() {
    const { slug } = useParams();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // find park
    const park = TotalNationalParks.find((p) => p.slug === slug);

    // find species that belong to this park
    const parkSpecies = sampleSpecies.filter((s) =>
        s.parks.some((p) => p.slug === slug)
    );

    if (!park) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <h2 className="text-2xl font-bold text-slate-700 mb-4">
                    Park not found
                </h2>
                <Link
                    to="/parks"
                    className="text-emerald-600 hover:underline flex items-center"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero */}
            <section className="relative h-[50vh]">
                <img
                    src={park.coverImageUrl}
                    alt={park.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">
                        {park.name}
                    </h1>
                </div>
                <Link
                    to="/parks"
                    className="absolute top-6 left-6 bg-white/80 text-slate-800 px-4 py-2 rounded-lg 
             flex items-center shadow-lg hover:bg-white transition cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back 
                </Link>

            </section>

            {/* Park Info */}
            <section className="max-w-5xl mx-auto py-12 px-4">
                <p className="text-lg text-slate-700 mb-4">{park.description}</p>
                <p className="flex items-center text-slate-600">
                    <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                    {park.location.district}
                </p>
            </section>

            {/* Species in this park */}
            <section className="max-w-6xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">
                    Species in {park.name}
                </h2>
                {parkSpecies.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {parkSpecies.map((species) => (
                            <Link
                                key={species._id}
                                to={`/species/${species._id}`}
                                state={{ parkSlug: slug }} // pass park info to SpeciesDetail
                                className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition border border-slate-100"
                            >
                                <img
                                    src={species.photos[0]?.url}
                                    alt={species.species_name}
                                    className="h-48 w-full object-cover group-hover:scale-105 transition"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-600">
                                        {species.species_name}
                                    </h3>
                                    <p className="text-sm italic text-slate-500">
                                        {species.scientific_name}
                                    </p>
                                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                                        {species.habitat}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                            <AlertTriangle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                No species found
                            </h3>
                            <p className="text-slate-500">
                                No recorded species in this park.                                </p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
