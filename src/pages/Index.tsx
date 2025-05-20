
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { carsData } from '@/data/cars';

const Index = () => {
  const featuredCars = carsData.filter(car => car.inStock).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 bg-car-dark overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1494905998402-395d579af36f" 
            alt="Luxury Car" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Perfect Drive
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Discover luxury and performance cars crafted for the ultimate driving experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/stock">
                <Button className="hero-button bg-car-primary hover:bg-car-secondary">
                  Browse Cars
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" className="hero-button border-white text-white hover:bg-white/10">
                  Sell Your Car
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cars Section */}
      <section className="car-section">
        <h2 className="section-title">Featured Cars</h2>
        <p className="section-subtitle">Explore our handpicked selection of premium vehicles available right now.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredCars.map(car => (
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
        
        <div className="flex justify-center mt-10">
          <Link to="/stock">
            <Button className="bg-car-primary hover:bg-car-secondary">
              View All Cars
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="car-section bg-gray-100 dark:bg-gray-800">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">We offer comprehensive automotive services to meet all your needs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Buy a Car</h3>
            <p className="text-muted-foreground mb-4">
              Browse our extensive inventory of quality vehicles to find your perfect match.
            </p>
            <Link to="/stock">
              <Button variant="outline" className="mt-2">Explore Stock</Button>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Sell Your Car</h3>
            <p className="text-muted-foreground mb-4">
              Get a competitive offer for your vehicle with our hassle-free selling process.
            </p>
            <Link to="/sell">
              <Button variant="outline" className="mt-2">Get Started</Button>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Service & Maintenance</h3>
            <p className="text-muted-foreground mb-4">
              Keep your vehicle in top condition with our professional service center.
            </p>
            <Link to="/service">
              <Button variant="outline" className="mt-2">Book Service</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="car-section">
        <h2 className="section-title">Customer Testimonials</h2>
        <p className="section-subtitle">Hear what our satisfied customers have to say about their experience with us.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-1 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "Excellent service from start to finish. The staff was knowledgeable and helped me find the perfect car for my needs."
            </p>
            <p className="font-bold">- Michael J.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-1 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "The car servicing was done quickly and professionally. They explained everything that was needed and didn't try to sell me unnecessary services."
            </p>
            <p className="font-bold">- Sarah K.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-1 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "I sold my car to AutoHaven and the process was so easy. They offered a fair price and handled all the paperwork. Highly recommend!"
            </p>
            <p className="font-bold">- Emily R.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-car-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Browse our inventory, book a test drive, or contact our team for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/stock">
              <Button className="hero-button bg-white text-car-primary hover:bg-gray-100">
                View Inventory
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="hero-button border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
