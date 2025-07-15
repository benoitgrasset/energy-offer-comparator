import { Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="min-h-screen">
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
          </div>
          <div className="flex items-center justify-center">
            <Link href="/energy-comparator/france">
              <Button>Compare Energy Offers</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
