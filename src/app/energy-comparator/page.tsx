import { Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-blue-600 block">Energy Deal</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Compare energy offers from top providers across Europe. Save
              money, choose renewable energy, and find the best rates for your
              home.
            </p>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">8+</div>
                <div className="text-gray-600">Energy Providers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  €300+
                </div>
                <div className="text-gray-600">Average Annual Savings</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">2</div>
                <div className="text-gray-600">Countries Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
