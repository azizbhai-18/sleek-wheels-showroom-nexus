
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { carsData } from '@/data/cars';

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  
  const car = carsData.find(car => car.id === id);
  
  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
            <p className="mb-6">The car you're looking for doesn't exist or has been removed.</p>
            <Link to="/stock">
              <Button>Back to Inventory</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/stock" className="flex items-center text-car-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inventory
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Images */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={car.gallery[activeImage]} 
                alt={`${car.brand} ${car.name}`} 
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {car.gallery.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`rounded overflow-hidden border-2 ${index === activeImage ? 'border-car-primary' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`${car.brand} ${car.name} thumbnail ${index + 1}`} 
                    className="w-full h-auto aspect-video object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Car Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-1">{car.brand} {car.name}</h1>
              <p className="text-lg text-muted-foreground">{car.year} • {car.mileage.toLocaleString()} km</p>
              
              <div className="mt-4">
                <span className="text-3xl font-bold text-car-primary">${car.price.toLocaleString()}</span>
              </div>
              
              {car.inStock ? (
                <div className="mt-2 inline-flex items-center text-sm text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  In Stock
                </div>
              ) : (
                <p className="mt-2 text-sm text-red-500">Currently Unavailable</p>
              )}
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Fuel Type</p>
                <p className="font-medium">{car.fuelType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engine</p>
                <p className="font-medium">{car.engine}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horsepower</p>
                <p className="font-medium">{car.horsepower} HP</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transmission</p>
                <p className="font-medium">{car.transmission}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Body Type</p>
                <p className="font-medium">{car.bodyType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Exterior Color</p>
                <p className="font-medium">{car.exteriorColor}</p>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <Link to={`/order?carId=${car.id}`} className="flex-1">
                <Button 
                  disabled={!car.inStock}
                  className="w-full bg-car-primary hover:bg-car-secondary"
                >
                  Order This Car
                </Button>
              </Link>
              <Button variant="outline" className="flex-1">
                Contact Dealer
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="grid grid-cols-3 max-w-md">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <h3 className="text-xl font-bold mb-4">About this {car.brand} {car.name}</h3>
              <p className="text-muted-foreground">{car.description}</p>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Brand</span>
                    <span className="font-medium">{car.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-medium">{car.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Year</span>
                    <span className="font-medium">{car.year}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Mileage</span>
                    <span className="font-medium">{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Body Type</span>
                    <span className="font-medium">{car.bodyType}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Engine</span>
                    <span className="font-medium">{car.engine}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Transmission</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Fuel Type</span>
                    <span className="font-medium">{car.fuelType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Horsepower</span>
                    <span className="font-medium">{car.horsepower} HP</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Interior Color</span>
                    <span className="font-medium">{car.interiorColor}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CarDetail;
