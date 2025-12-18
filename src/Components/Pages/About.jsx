import { Mountain, TreePine, Heart, Globe, Users, Leaf } from "lucide-react";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-700 to-green-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-emerald-300">SaveTheLast Nepal</span>
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Protecting Nepal's natural heritage, conserving endangered species, and
            inspiring people to live in harmony with nature.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-emerald-800">Our Mission</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Our mission is to protect Nepal's rich biodiversity by raising awareness,
              preserving endangered animals, and ensuring sustainable coexistence between
              humans and nature.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 hover:shadow-xl transition">
            <div className="flex items-center mb-4">
              <Globe className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-emerald-800">Our Vision</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We envision a future where Nepal remains a sanctuary for endangered species,
              protected forests, and thriving ecosystems that benefit both people and WildLife.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <Heart className="h-10 w-10 mx-auto text-pink-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compassion</h3>
              <p className="text-emerald-100">
                We deeply care for all living beings and work to preserve the balance of life.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <Users className="h-10 w-10 mx-auto text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-emerald-100">
                We empower local communities to protect WildLife and benefit from conservation.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <TreePine className="h-10 w-10 mx-auto text-green-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-emerald-100">
                We promote sustainable practices that safeguard ecosystems for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Mountain className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Join Us in Protecting WildLife
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            Together, we can safeguard Nepal's biodiversity and ensure that rare species
            continue to thrive in their natural habitats.
          </p>
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Involved
          </button>
        </div>
      </section>
    </div>
  );
}
