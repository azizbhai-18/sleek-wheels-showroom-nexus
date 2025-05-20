
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { carsData, Car } from '@/data/cars';

const Admin = () => {
  const [inventory, setInventory] = useState<Car[]>(carsData);
  const [orders] = useState([
    { id: 'ORD-001', customer: 'John Smith', car: 'Tesla Model S', date: '2023-05-15', status: 'Completed', amount: 82500 },
    { id: 'ORD-002', customer: 'Sarah Johnson', car: 'BMW X5', date: '2023-05-18', status: 'Processing', amount: 64200 },
    { id: 'ORD-003', customer: 'Mike Wilson', car: 'Audi A4', date: '2023-05-20', status: 'Processing', amount: 42300 },
    { id: 'ORD-004', customer: 'Emily Davis', car: 'Ford Mustang', date: '2023-05-22', status: 'Pending', amount: 46700 },
  ]);
  
  const [services] = useState([
    { id: 'SRV-001', customer: 'Robert Brown', car: 'Tesla Model S', type: 'Full Service', date: '2023-05-16', status: 'Completed' },
    { id: 'SRV-002', customer: 'Alice Green', car: 'Land Rover Range Rover', type: 'Basic Service', date: '2023-05-19', status: 'Scheduled' },
    { id: 'SRV-003', customer: 'David Lee', car: 'BMW X5', type: 'Custom Service', date: '2023-05-21', status: 'In Progress' },
    { id: 'SRV-004', customer: 'Lisa Chen', car: 'Porsche 911', type: 'Full Service', date: '2023-05-23', status: 'Scheduled' },
  ]);
  
  const [sellRequests] = useState([
    { id: 'SELL-001', customer: 'James Wilson', car: 'Audi A6', year: '2019', date: '2023-05-15', status: 'Pending Inspection' },
    { id: 'SELL-002', customer: 'Emma Taylor', car: 'BMW 3 Series', year: '2018', date: '2023-05-17', status: 'Offer Made' },
    { id: 'SELL-003', customer: 'Michael Johnson', car: 'Mercedes C-Class', year: '2020', date: '2023-05-19', status: 'Pending Inspection' },
    { id: 'SELL-004', customer: 'Sophia Brown', car: 'Lexus RX', year: '2017', date: '2023-05-21', status: 'Declined' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Toggle stock status
  const toggleStockStatus = (carId: string) => {
    setInventory(inventory.map(car => 
      car.id === carId ? { ...car, inStock: !car.inStock } : car
    ));
  };
  
  // Filter inventory by search term
  const filteredInventory = inventory.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Manage your inventory, orders, services, and sell requests.
        </p>
        
        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="sell-requests">Sell Requests</TabsTrigger>
          </TabsList>
          
          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="max-w-sm">
                <Input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button className="bg-car-primary hover:bg-car-secondary">
                Add New Car
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.name}`}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {car.brand} {car.name}
                      </TableCell>
                      <TableCell>{car.year}</TableCell>
                      <TableCell>${car.price.toLocaleString()}</TableCell>
                      <TableCell>
                        {car.inStock ? (
                          <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>
                        ) : (
                          <Badge variant="outline">Out of Stock</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button 
                            variant={car.inStock ? "destructive" : "outline"} 
                            size="sm"
                            onClick={() => toggleStockStatus(car.id)}
                          >
                            {car.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.car}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            order.status === 'Completed' ? 'bg-green-500 hover:bg-green-600' :
                            order.status === 'Processing' ? 'bg-blue-500 hover:bg-blue-600' :
                            'bg-yellow-500 hover:bg-yellow-600'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.id}</TableCell>
                      <TableCell>{service.customer}</TableCell>
                      <TableCell>{service.car}</TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>{service.date}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            service.status === 'Completed' ? 'bg-green-500 hover:bg-green-600' :
                            service.status === 'In Progress' ? 'bg-blue-500 hover:bg-blue-600' :
                            'bg-yellow-500 hover:bg-yellow-600'
                          }
                        >
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Update Status
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Sell Requests Tab */}
          <TabsContent value="sell-requests" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Car</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.customer}</TableCell>
                      <TableCell>{request.car}</TableCell>
                      <TableCell>{request.year}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            request.status === 'Offer Made' ? 'bg-green-500 hover:bg-green-600' :
                            request.status === 'Pending Inspection' ? 'bg-yellow-500 hover:bg-yellow-600' :
                            'bg-red-500 hover:bg-red-600'
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={request.status === 'Declined'}
                          >
                            Make Offer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
