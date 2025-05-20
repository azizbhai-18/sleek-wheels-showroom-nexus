
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { carsData, brands, fuelTypes } from '@/data/cars';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

const Stock = () => {
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [filters, setFilters] = useState({
    brand: '',
    fuelType: '',
    priceRange: [0, 150000],
    search: '',
  });

  // Find min and max prices from data
  const minPrice = Math.min(...carsData.map(car => car.price));
  const maxPrice = Math.max(...carsData.map(car => car.price));

  useEffect(() => {
    let result = carsData;
    
    // Filter by brand
    if (filters.brand) {
      result = result.filter(car => car.brand === filters.brand);
    }
    
    // Filter by fuel type
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }
    
    // Filter by price range
    result = result.filter(car => 
      car.price >= filters.priceRange[0] && 
      car.price <= filters.priceRange[1]
    );
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(car => 
        car.brand.toLowerCase().includes(searchLower) || 
        car.name.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredCars(result);
  }, [filters]);

  const handleReset = () => {
    setFilters({
      brand: '',
      fuelType: '',
      priceRange: [minPrice, maxPrice],
      search: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Car Inventory</h1>
          <p className="text-muted-foreground mb-8">
            Browse our selection of premium vehicles.
          </p>
          
          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Filter Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <Input 
                  type="text" 
                  placeholder="Search brand or model"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-full"
                />
              </div>
              
              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <Select
                  value={filters.brand}
                  onValueChange={(value) => setFilters({...filters, brand: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Brands</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Fuel Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Fuel Type</label>
                <Select
                  value={filters.fuelType}
                  onValueChange={(value) => setFilters({...filters, fuelType: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Fuel Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Fuel Types</SelectItem>
                    {fuelTypes.map(fuelType => (
                      <SelectItem key={fuelType} value={fuelType}>{fuelType}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
                </label>
                <Slider
                  min={minPrice}
                  max={maxPrice}
                  step={1000}
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({...filters, priceRange: value})}
                  className="py-4"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleReset} className="mr-2">
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard 
                  key={car.id}
                  id={car.id}
                  name={car.name}
                  brand={car.brand}
                  price={car.price}
                  image={car.image}
                  year={car.year}
                  fuelType={car.fuelType}
                  mileage={car.mileage}
                  inStock={car.inStock}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No cars found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
              <Button onClick={handleReset} className="mt-4 bg-car-primary hover:bg-car-secondary">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Stock;
