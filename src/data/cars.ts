
export interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  fuelType: string;
  transmission: string;
  engine: string;
  horsepower: number;
  mileage: number;
  exteriorColor: string;
  interiorColor: string;
  bodyType: string;
  description: string;
  features: string[];
  inStock: boolean;
  image: string;
  gallery: string[];
}

export const carsData: Car[] = [
  {
    id: "1",
    name: "Model S",
    brand: "Tesla",
    price: 79990,
    year: 2023,
    fuelType: "Electric",
    transmission: "Automatic",
    engine: "Dual Motor",
    horsepower: 670,
    mileage: 0,
    exteriorColor: "Pearl White",
    interiorColor: "Black",
    bodyType: "Sedan",
    description: "The Tesla Model S is an all-electric five-door liftback sedan produced by Tesla, Inc. since 2012. The Model S features a dual motor all-wheel drive system.",
    features: [
      "Autopilot",
      "17-inch touchscreen",
      "Wireless charging",
      "Premium audio system",
      "Heated seats",
      "Glass roof"
    ],
    inStock: true,
    image: "https://images.unsplash.com/photo-1619240078201-1055be15e136?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1619240078201-1055be15e136?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1659947182438-7be2009df4fe?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617788138017-80ad244c2f2c?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: "2",
    name: "A4",
    brand: "Audi",
    price: 39900,
    year: 2023,
    fuelType: "Petrol",
    transmission: "Automatic",
    engine: "2.0L Turbo",
    horsepower: 201,
    mileage: 5000,
    exteriorColor: "Mythos Black",
    interiorColor: "Beige",
    bodyType: "Sedan",
    description: "The Audi A4 is a line of compact executive cars produced since 1994 by the German car manufacturer Audi, a subsidiary of the Volkswagen Group.",
    features: [
      "Virtual Cockpit",
      "MMI Navigation",
      "Leather seats",
      "LED headlights",
      "Parking assist",
      "Bang & Olufsen sound system"
    ],
    inStock: true,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614200179396-2bdb77872df5?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: "3",
    name: "X5",
    brand: "BMW",
    price: 59900,
    year: 2023,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engine: "3.0L Turbo",
    horsepower: 335,
    mileage: 3000,
    exteriorColor: "Alpine White",
    interiorColor: "Black",
    bodyType: "SUV",
    description: "The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999. It was BMW's first SUV and it features all-wheel drive and is available with either manual or automatic transmission.",
    features: [
      "Panoramic sunroof",
      "BMW Live Cockpit Professional",
      "Gesture control",
      "Harman Kardon surround sound",
      "Heated steering wheel",
      "Adaptive LED headlights"
    ],
    inStock: true,
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: "4",
    name: "911",
    brand: "Porsche",
    price: 101200,
    year: 2023,
    fuelType: "Petrol",
    transmission: "Automatic",
    engine: "3.0L Twin-Turbo",
    horsepower: 443,
    mileage: 1000,
    exteriorColor: "Racing Yellow",
    interiorColor: "Black",
    bodyType: "Coupe",
    description: "The Porsche 911 is a two-door, 2+2 high performance rear-engined sports car made since 1963 by Porsche AG of Stuttgart, Germany. It has a rear-mounted flat-six engine and all round independent suspension.",
    features: [
      "Sport Chrono Package",
      "BOSE Surround Sound System",
      "18-way adaptive sports seats",
      "Lane Keep Assist",
      "Porsche Dynamic Chassis Control",
      "LED Matrix headlights"
    ],
    inStock: true,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: "5",
    name: "Mustang",
    brand: "Ford",
    price: 44090,
    year: 2023,
    fuelType: "Petrol",
    transmission: "Manual",
    engine: "5.0L V8",
    horsepower: 460,
    mileage: 500,
    exteriorColor: "Race Red",
    interiorColor: "Ebony",
    bodyType: "Coupe",
    description: "The Ford Mustang is an American car manufactured by Ford. It was originally based on the platform of the second-generation North American Ford Falcon, a compact car.",
    features: [
      "Track Apps",
      "Bang & Olufsen sound system",
      "FordPass Connect",
      "SYNC 3",
      "Leather seats",
      "Rear view camera"
    ],
    inStock: false,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1584345604476-8ec5f82d661f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547744822-d381beb5fc2d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: "6",
    name: "Range Rover",
    brand: "Land Rover",
    price: 92000,
    year: 2023,
    fuelType: "Diesel",
    transmission: "Automatic",
    engine: "3.0L V6",
    horsepower: 355,
    mileage: 2000,
    exteriorColor: "Santorini Black",
    interiorColor: "Ivory",
    bodyType: "SUV",
    description: "The Land Rover Range Rover is a full-size luxury SUV produced by British car manufacturer Land Rover, a subsidiary of Jaguar Land Rover.",
    features: [
      "Meridian™ Surround Sound System",
      "InControl Touch Pro Duo",
      "Head-up Display",
      "Terrain Response 2",
      "Panoramic Roof",
      "Adaptive Dynamics"
    ],
    inStock: true,
    image: "https://images.unsplash.com/photo-1542228866-0d55eca1beff?q=80&w=1000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542228866-0d55eca1beff?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1537984822441-cff330075342?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536154010-6ae9872907bb?q=80&w=1000&auto=format&fit=crop"
    ]
  }
];

export const brands = [...new Set(carsData.map(car => car.brand))];
export const fuelTypes = [...new Set(carsData.map(car => car.fuelType))];
