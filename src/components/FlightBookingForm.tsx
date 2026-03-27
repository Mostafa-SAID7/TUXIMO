import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Plane, 
  Hotel, 
  Car, 
  Headphones, 
  Search,
  ArrowLeftRight,
  Calendar,
  Users
} from "lucide-react";

const FlightBookingForm = () => {
  const [tripType, setTripType] = useState("one-way");
  const [fareType, setFareType] = useState("regular");

  return (
    <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
      {/* Tabs for Flights, Hotels, Cars */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted/50">
            <TabsTrigger value="flights" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              <span className="hidden sm:inline">Flights</span>
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Hotel className="w-4 h-4" />
              <span className="hidden sm:inline">Hotels</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              <span className="hidden sm:inline">Cars</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Headphones className="w-4 h-4" />
          <span className="hidden md:inline">Customer Support</span>
        </Button>
      </div>

      {/* Trip Type Selection */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap items-center gap-6">
          <RadioGroup
            value={tripType}
            onValueChange={setTripType}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label htmlFor="one-way" className="cursor-pointer">
                One Way
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip" className="cursor-pointer">
                Round Trip
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multi-city" id="multi-city" />
              <Label htmlFor="multi-city" className="cursor-pointer">
                Multi-City
              </Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-2 ml-auto">
            <Label htmlFor="class" className="text-sm text-muted-foreground">
              Class:
            </Label>
            <select
              id="class"
              className="bg-background border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Coach</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From */}
          <div className="md:col-span-3">
            <Label htmlFor="from" className="text-sm font-medium mb-2 block">
              From
            </Label>
            <Input
              id="from"
              placeholder="Origin"
              className="h-12"
            />
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </Button>
          </div>

          {/* To */}
          <div className="md:col-span-3">
            <Label htmlFor="to" className="text-sm font-medium mb-2 block">
              To
            </Label>
            <Input
              id="to"
              placeholder="Destination"
              className="h-12"
            />
          </div>

          {/* Depart Date */}
          <div className="md:col-span-2">
            <Label htmlFor="depart" className="text-sm font-medium mb-2 block">
              Depart
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="depart"
                type="date"
                placeholder="Date"
                className="h-12 pl-10"
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="md:col-span-2">
            <Label htmlFor="return" className="text-sm font-medium mb-2 block">
              Return
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="return"
                type="date"
                placeholder="Date"
                className="h-12 pl-10"
                disabled={tripType === "one-way"}
              />
            </div>
          </div>

          {/* Traveler */}
          <div className="md:col-span-1">
            <Label htmlFor="travelers" className="text-sm font-medium mb-2 block">
              Traveler
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="travelers"
                type="number"
                min="1"
                defaultValue="1"
                className="h-12 pl-10"
              />
            </div>
          </div>
        </div>

        {/* Fare Type and Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <RadioGroup
            value={fareType}
            onValueChange={setFareType}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regular" id="regular" />
              <Label htmlFor="regular" className="cursor-pointer">
                Regular Fare
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="cursor-pointer">
                Student Fare
              </Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <span>My Booking</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <span>Flight Status</span>
            </Button>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingForm;
