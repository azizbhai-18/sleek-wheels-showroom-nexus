
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface CarProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  year: number;
  fuelType: string;
  mileage: number;
  inStock: boolean;
}

const CarCard = ({ id, name, brand, price, image, year, fuelType, mileage, inStock }: CarProps) => {
  return (
    <Card className="car-card h-full flex flex-col justify-between">
      <div className="relative">
        <img 
          src={image} 
          alt={`${brand} ${name}`} 
          className="car-card-image"
        />
        {inStock ? (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">In Stock</Badge>
        ) : (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">Out of Stock</Badge>
        )}
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold">{brand} {name}</h3>
            <p className="text-sm text-muted-foreground">{year} • {fuelType}</p>
          </div>
          <p className="font-bold text-car-primary">${price.toLocaleString()}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Mileage: {mileage.toLocaleString()} km</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/stock/${id}`} className="w-full">
          <Button 
            className="w-full bg-car-primary hover:bg-car-secondary" 
            disabled={!inStock}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
