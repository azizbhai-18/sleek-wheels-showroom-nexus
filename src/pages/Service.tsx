
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
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
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, addDays, getDay, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { brands } from '@/data/cars';

// Service types
const serviceTypes = [
  {
    id: "basic",
    name: "Basic Service",
    price: 149,
    description: "Oil change, fluid top-ups, filter replacement, and basic inspection.",
    duration: "1-2 hours"
  },
  {
    id: "full",
    name: "Full Service",
    price: 299,
    description: "Comprehensive inspection, filter replacements, brake check, suspension check, and more.",
    duration: "3-4 hours"
  },
  {
    id: "custom",
    name: "Custom Service",
    price: null,
    description: "Custom service based on your specific requirements.",
    duration: "Varies"
  }
];

// Time slots
const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

// Function to check if date is a weekend
function isWeekend(date: Date) {
  const day = getDay(date);
  return day === 0 || day === 6;
}

// Form schema
const formSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  serviceType: z.string().min(1, "Service type is required"),
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string().min(1, "Time slot is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Service = () => {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  // Form setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      serviceType: "",
      date: undefined,
      timeSlot: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  
  // Get the selected service type
  const watchServiceType = form.watch("serviceType");
  const selectedService = serviceTypes.find(service => service.id === watchServiceType);
  
  // Submit handler
  function onSubmit(data: FormValues) {
    console.log("Service booking submitted:", data);
    
    toast({
      title: "Service Booked",
      description: `Your service has been scheduled for ${format(data.date, "MMMM d, yyyy")} at ${data.timeSlot}.`,
    });
    
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Book a Service</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Schedule a maintenance service for your vehicle. Our experienced technicians provide quality service to keep your car in top condition.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {serviceTypes.map((service) => (
                <Card key={service.id} className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  watchServiceType === service.id && "ring-2 ring-car-primary"
                )}
                onClick={() => form.setValue("serviceType", service.id)}
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {service.description}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>Duration: {service.duration}</span>
                      <span className="font-medium">
                        {service.price ? `$${service.price}` : 'Quote required'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Vehicle Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Service Details</h2>
                    
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceTypes.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.name} {service.price ? `($${service.price})` : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => 
                                    date < new Date() || 
                                    date > addDays(new Date(), 30) ||
                                    isWeekend(date) ||
                                    isSameDay(date, new Date()) // Cannot book same day
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Service available Mon-Fri, up to 30 days ahead.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="timeSlot"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Slot</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!form.getValues().date}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Please select a date first.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide any specific concerns or issues with your car" 
                              className="resize-none" 
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Book Service
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Service;
