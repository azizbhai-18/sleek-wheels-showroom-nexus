
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { carsData } from '@/data/cars';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Color options for cars
const colorOptions = [
  { value: "white", label: "Pearl White", price: 0 },
  { value: "black", label: "Obsidian Black", price: 500 },
  { value: "silver", label: "Metallic Silver", price: 500 },
  { value: "red", label: "Vibrant Red", price: 1000 },
  { value: "blue", label: "Ocean Blue", price: 1000 }
];

// Form schema
const formSchema = z.object({
  carId: z.string().min(1, "Please select a car"),
  color: z.string().min(1, "Please select a color"),
  quantity: z.coerce.number().int().min(1).max(5),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(5, "ZIP code is required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [totalPrice, setTotalPrice] = useState(0);

  // Get query params
  const queryParams = new URLSearchParams(location.search);
  const preSelectedCarId = queryParams.get('carId') || '';
  
  // Calculate base price
  const getBasePrice = (carId: string) => {
    const car = carsData.find(car => car.id === carId);
    return car ? car.price : 0;
  };

  // Get color price
  const getColorPrice = (colorValue: string) => {
    const selectedColor = colorOptions.find(color => color.value === colorValue);
    return selectedColor ? selectedColor.price : 0;
  };

  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carId: preSelectedCarId,
      color: "",
      quantity: 1,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zip: "",
      notes: "",
    },
  });

  // Watch for form value changes to update price
  const watchCarId = form.watch("carId");
  const watchColor = form.watch("color");
  const watchQuantity = form.watch("quantity");

  // Update price calculation when values change
  useEffect(() => {
    const basePrice = getBasePrice(watchCarId);
    const colorPrice = getColorPrice(watchColor);
    const total = (basePrice + colorPrice) * (watchQuantity || 1);
    setTotalPrice(total);
  }, [watchCarId, watchColor, watchQuantity]);

  // Submit handler
  function onSubmit(data: FormValues) {
    console.log("Order submitted:", data);
    
    toast({
      title: "Order Placed Successfully",
      description: `Thank you for your order! We will contact you shortly to confirm the details.`,
    });
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Order a Car</h1>
        <p className="text-muted-foreground mb-8">
          Complete the form below to place an order for your new car.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Car Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="carId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Car</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a car" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {carsData
                                .filter(car => car.inStock)
                                .map((car) => (
                                  <SelectItem key={car.id} value={car.id}>
                                    {car.brand} {car.name} (${car.price.toLocaleString()})
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {colorOptions.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                  {color.label} {color.price > 0 ? `(+$${color.price})` : '(Standard)'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special requirements or information about your order" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-car-primary hover:bg-car-secondary"
                  disabled={!watchCarId}
                >
                  Place Order
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {watchCarId ? (
                <>
                  {(() => {
                    const selectedCar = carsData.find(car => car.id === watchCarId);
                    const selectedColor = colorOptions.find(color => color.value === watchColor);
                    
                    return (
                      <div className="space-y-4">
                        {selectedCar && (
                          <div className="flex items-center space-x-4">
                            <img
                              src={selectedCar.image}
                              alt={`${selectedCar.brand} ${selectedCar.name}`}
                              className="w-20 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{selectedCar.brand} {selectedCar.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {selectedCar.year} • {selectedCar.fuelType}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Base Price:</span>
                            <span>${getBasePrice(watchCarId).toLocaleString()}</span>
                          </div>
                          
                          {watchColor && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Color: {selectedColor?.label}
                              </span>
                              <span>
                                {selectedColor?.price > 0 ? `+$${selectedColor.price.toLocaleString()}` : 'Included'}
                              </span>
                            </div>
                          )}
                          
                          {watchQuantity > 1 && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Quantity:
                              </span>
                              <span>
                                {watchQuantity}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Price:</span>
                          <span className="text-xl font-bold text-car-primary">
                            ${totalPrice.toLocaleString()}
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-4">
                          Note: This is an estimate. Final price may vary based on additional options and taxes.
                        </p>
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Please select a car to see the order summary
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Order;
