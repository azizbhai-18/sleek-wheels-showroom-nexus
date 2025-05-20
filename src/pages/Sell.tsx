
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { brands } from '@/data/cars';

// Years for the dropdown
const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

// Condition options
const conditions = [
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" }
];

// Form schema
const formSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  mileage: z.coerce.number().int().positive("Mileage must be a positive number"),
  condition: z.string().min(1, "Condition is required"),
  exteriorColor: z.string().min(1, "Exterior color is required"),
  transmission: z.string().min(1, "Transmission is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  description: z.string().min(10, "Please provide a brief description of your car"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type FormValues = z.infer<typeof formSchema>;

const Sell = () => {
  const { toast } = useToast();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  
  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      mileage: 0,
      condition: "",
      exteriorColor: "",
      transmission: "",
      fuelType: "",
      description: "",
      name: "",
      email: "",
      phone: "",
    },
  });
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Convert files to image URLs
    const newImages: string[] = [];
    
    Array.from(files).forEach(file => {
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
    });
    
    setTimeout(() => {
      setUploadedImages([...uploadedImages, ...newImages]);
      setUploading(false);
      clearInterval(interval);
    }, 2000);
  };
  
  // Remove uploaded image
  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    URL.revokeObjectURL(newImages[index]);
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };
  
  // Calculate estimated value based on form data
  const calculateEstimatedValue = (data: FormValues) => {
    // This is a very simplified calculation for demonstration
    let baseValue = 0;
    
    // Brand factor (just an example)
    switch (data.brand) {
      case "Tesla": 
        baseValue = 50000; break;
      case "Audi": 
        baseValue = 40000; break;
      case "BMW": 
        baseValue = 45000; break;
      case "Porsche": 
        baseValue = 80000; break;
      case "Ford": 
        baseValue = 30000; break;
      case "Land Rover": 
        baseValue = 60000; break;
      default: 
        baseValue = 25000;
    }
    
    // Age depreciation (5% per year)
    const age = new Date().getFullYear() - parseInt(data.year);
    baseValue = baseValue * Math.pow(0.95, age);
    
    // Mileage factor (depreciation per 10,000 miles)
    baseValue = baseValue * (1 - (data.mileage / 100000) * 0.2);
    
    // Condition factor
    switch (data.condition) {
      case "excellent": 
        baseValue = baseValue * 1.1; break;
      case "good": 
        baseValue = baseValue * 1; break;
      case "fair": 
        baseValue = baseValue * 0.8; break;
      case "poor": 
        baseValue = baseValue * 0.6; break;
    }
    
    return Math.round(baseValue);
  };

  // Submit handler
  function onSubmit(data: FormValues) {
    console.log("Car selling request submitted:", data);
    console.log("Uploaded images:", uploadedImages);
    
    // Calculate estimated value
    const value = calculateEstimatedValue(data);
    setEstimatedValue(value);
    
    toast({
      title: "Information Received",
      description: "We've received your car details. Our team will contact you shortly.",
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Sell Your Car</h1>
        <p className="text-muted-foreground mb-8">
          Complete the form below to get an estimated value for your car and start the selling process.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sell Car Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Car Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {brands.map((brand) => (
                                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                              ))}
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Camry, Model S" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
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
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mileage (km)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 50000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condition</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {conditions.map((condition) => (
                                <SelectItem key={condition.value} value={condition.value}>
                                  {condition.label}
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
                      name="exteriorColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exterior Color</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Red, Silver" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="transmission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transmission</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select transmission" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="automatic">Automatic</SelectItem>
                              <SelectItem value="manual">Manual</SelectItem>
                              <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                              <SelectItem value="cvt">CVT</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fuelType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fuel type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="petrol">Petrol</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="electric">Electric</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="plugin_hybrid">Plug-in Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide additional details about your car" 
                              className="resize-none" 
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6">
                      <div className="text-center">
                        <Label htmlFor="carImages" className="cursor-pointer block">
                          <div className="mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="mb-1">Drag and drop your images here or click to browse</p>
                          <p className="text-xs text-muted-foreground">Upload up to 5 images (JPG, PNG)</p>
                        </Label>
                        <Input 
                          id="carImages" 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                          disabled={uploading || uploadedImages.length >= 5}
                        />
                      </div>
                    </div>
                    
                    {uploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                    
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image} 
                              alt={`Uploaded car ${index + 1}`} 
                              className="w-full h-24 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                
                <Button 
                  type="submit" 
                  className="w-full bg-car-primary hover:bg-car-secondary"
                >
                  Get Your Car Valuation
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Information Sidebar */}
          <div className="lg:col-span-1">
            {estimatedValue ? (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Estimated Value</h2>
                
                <div className="text-center py-6">
                  <div className="text-3xl font-bold text-car-primary mb-2">
                    ${estimatedValue.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    This is an estimated value based on the information provided. The final offer may vary based on a physical inspection of your vehicle.
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <p className="mb-4">
                    Our team will contact you shortly to schedule an inspection and make a final offer.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-car-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        1
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Submit Your Car Details</h3>
                        <p className="text-sm text-muted-foreground">
                          Fill in the form with accurate information about your car.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-car-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        2
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Receive Initial Valuation</h3>
                        <p className="text-sm text-muted-foreground">
                          Get an estimated value based on the provided information.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-car-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        3
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Schedule Inspection</h3>
                        <p className="text-sm text-muted-foreground">
                          Our team will contact you to arrange a physical inspection.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-car-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        4
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Get Final Offer</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive a final offer based on the inspection results.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-car-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        5
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Complete the Sale</h3>
                        <p className="text-sm text-muted-foreground">
                          Accept the offer and complete the paperwork to sell your car.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Tips for Better Valuation</h2>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Provide accurate mileage and condition information
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Upload clear photos of the exterior, interior, and engine
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Include service history and maintenance details
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mention any upgrades or recent repairs
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Be honest about any damages or issues
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sell;
