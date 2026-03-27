import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plane, 
  Hotel, 
  Car, 
  Search,
  ArrowLeftRight,
  Calendar as CalendarIcon,
  Users,
  Minus,
  Plus
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "motion/react";

const FlightBookingForm = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [tripType, setTripType] = useState("one-way");
  const [fareType, setFareType] = useState("regular");
  const [classType, setClassType] = useState("coach");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState(1);
  const [showTravelerPopover, setShowTravelerPopover] = useState(false);

  const incrementTravelers = () => setTravelers(prev => Math.min(prev + 1, 9));
  const decrementTravelers = () => setTravelers(prev => Math.max(prev - 1, 1));

  return (
    <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
      {/* Tabs for Flights, Hotels, Cars */}
      <div className="p-6 border-b border-border">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted/50 p-1">
            <TabsTrigger 
              value="flights" 
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
            >
              <Plane className="w-4 h-4" />
              <span className="hidden sm:inline">Flights</span>
            </TabsTrigger>
            <TabsTrigger 
              value="hotels" 
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
            >
              <Hotel className="w-4 h-4" />
              <span className="hidden sm:inline">Hotels</span>
            </TabsTrigger>
            <TabsTrigger 
              value="cars" 
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
            >
              <Car className="w-4 h-4" />
              <span className="hidden sm:inline">Cars</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="flights" className="mt-0">
              <FlightsContent
                tripType={tripType}
                setTripType={setTripType}
                fareType={fareType}
                setFareType={setFareType}
                classType={classType}
                setClassType={setClassType}
                departDate={departDate}
                setDepartDate={setDepartDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                travelers={travelers}
                incrementTravelers={incrementTravelers}
                decrementTravelers={decrementTravelers}
                showTravelerPopover={showTravelerPopover}
                setShowTravelerPopover={setShowTravelerPopover}
              />
            </TabsContent>

            <TabsContent value="hotels" className="mt-0">
              <HotelsContent
                departDate={departDate}
                setDepartDate={setDepartDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                travelers={travelers}
                incrementTravelers={incrementTravelers}
                decrementTravelers={decrementTravelers}
                showTravelerPopover={showTravelerPopover}
                setShowTravelerPopover={setShowTravelerPopover}
              />
            </TabsContent>

            <TabsContent value="cars" className="mt-0">
              <CarsContent
                departDate={departDate}
                setDepartDate={setDepartDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

interface FlightsContentProps {
  tripType: string;
  setTripType: (value: string) => void;
  fareType: string;
  setFareType: (value: string) => void;
  classType: string;
  setClassType: (value: string) => void;
  departDate: Date | undefined;
  setDepartDate: (date: Date | undefined) => void;
  returnDate: Date | undefined;
  setReturnDate: (date: Date | undefined) => void;
  travelers: number;
  incrementTravelers: () => void;
  decrementTravelers: () => void;
  showTravelerPopover: boolean;
  setShowTravelerPopover: (show: boolean) => void;
}

const FlightsContent = ({
  tripType,
  setTripType,
  fareType,
  setFareType,
  classType,
  setClassType,
  departDate,
  setDepartDate,
  returnDate,
  setReturnDate,
  travelers,
  incrementTravelers,
  decrementTravelers,
  showTravelerPopover,
  setShowTravelerPopover,
}: FlightsContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
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
              <Label htmlFor="one-way" className="cursor-pointer font-medium">
                One Way
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip" className="cursor-pointer font-medium">
                Round Trip
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multi-city" id="multi-city" />
              <Label htmlFor="multi-city" className="cursor-pointer font-medium">
                Multi-City
              </Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-2 ml-auto">
            <Select value={classType} onValueChange={setClassType}>
              <SelectTrigger className="w-[140px] h-10 bg-background border-border">
                <SelectValue placeholder="Coach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coach">Coach</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From */}
          <div className="md:col-span-3">
            <Label htmlFor="from" className="text-sm font-medium mb-2 block text-muted-foreground">
              From
            </Label>
            <Input
              id="from"
              placeholder="Origin"
              className="h-12 bg-background border-border focus:border-foreground transition-colors"
            />
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-muted h-10 w-10"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </Button>
          </div>

          {/* To */}
          <div className="md:col-span-3">
            <Label htmlFor="to" className="text-sm font-medium mb-2 block text-muted-foreground">
              To
            </Label>
            <Input
              id="to"
              placeholder="Destination"
              className="h-12 bg-background border-border focus:border-foreground transition-colors"
            />
          </div>

          {/* Depart Date */}
          <div className="md:col-span-2">
            <Label className="text-sm font-medium mb-2 block text-muted-foreground">
              Depart
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal bg-background border-border hover:border-foreground transition-colors"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departDate ? format(departDate, "PPP") : <span className="text-muted-foreground">Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={departDate}
                  onSelect={setDepartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          <div className="md:col-span-2">
            <Label className="text-sm font-medium mb-2 block text-muted-foreground">
              Return
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal bg-background border-border hover:border-foreground transition-colors"
                  disabled={tripType === "one-way"}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : <span className="text-muted-foreground">Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                  disabled={(date) => departDate ? date < departDate : false}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Traveler */}
          <div className="md:col-span-1">
            <Label className="text-sm font-medium mb-2 block text-muted-foreground">
              Traveler
            </Label>
            <Popover open={showTravelerPopover} onOpenChange={setShowTravelerPopover}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-start text-left font-normal bg-background border-border hover:border-foreground transition-colors"
                >
                  <Users className="mr-2 h-4 w-4" />
                  {travelers}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-4" align="end">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Travelers</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={decrementTravelers}
                      disabled={travelers <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{travelers}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={incrementTravelers}
                      disabled={travelers >= 9}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
              <Label htmlFor="regular" className="cursor-pointer font-medium">
                Regular Fare
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="cursor-pointer font-medium">
                Student Fare
              </Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2 hover:bg-muted transition-colors">
              <span>My Booking</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 hover:bg-muted transition-colors">
              <span>Flight Status</span>
            </Button>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 transition-all hover:scale-105"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightBookingForm;


interface HotelsContentProps {
  departDate: Date | undefined;
  setDepartDate: (date: Date | undefined) => void;
  returnDate: Date | undefined;
  setReturnDate: (date: Date | undefined) => void;
  travelers: number;
  incrementTravelers: () => void;
  decrementTravelers: () => void;
  showTravelerPopover: boolean;
  setShowTravelerPopover: (show: boolean) => void;
}

const HotelsContent = ({
  departDate,
  setDepartDate,
  returnDate,
  setReturnDate,
  travelers,
  incrementTravelers,
  decrementTravelers,
  showTravelerPopover,
  setShowTravelerPopover,
}: HotelsContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Destination */}
        <div className="md:col-span-5">
          <Label htmlFor="hotel-destination" className="text-sm font-medium mb-2 block text-muted-foreground">
            Destination
          </Label>
          <Input
            id="hotel-destination"
            placeholder="City or Hotel Name"
            className="h-12 bg-background border-border focus:border-foreground transition-colors"
          />
        </div>

        {/* Check-in Date */}
        <div className="md:col-span-2">
          <Label className="text-sm font-medium mb-2 block text-muted-foreground">
            Check-in
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal bg-background border-border hover:border-foreground transition-colors"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departDate ? format(departDate, "PPP") : <span className="text-muted-foreground">Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departDate}
                onSelect={setDepartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="md:col-span-2">
          <Label className="text-sm font-medium mb-2 block text-muted-foreground">
            Check-out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal bg-background border-border hover:border-foreground transition-colors"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "PPP") : <span className="text-muted-foreground">Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
                disabled={(date) => departDate ? date < departDate : false}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="md:col-span-2">
          <Label className="text-sm font-medium mb-2 block text-muted-foreground">
            Guests
          </Label>
          <Popover open={showTravelerPopover} onOpenChange={setShowTravelerPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal bg-background border-border hover:border-foreground transition-colors"
              >
                <Users className="mr-2 h-4 w-4" />
                {travelers}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-4" align="end">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Guests</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={decrementTravelers}
                    disabled={travelers <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{travelers}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={incrementTravelers}
                    disabled={travelers >= 9}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1">
          <Button
            size="lg"
            className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-full transition-all hover:scale-105"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

interface CarsContentProps {
  departDate: Date | undefined;
  setDepartDate: (date: Date | undefined) => void;
  returnDate: Date | undefined;
  setReturnDate: (date: Date | undefined) => void;
}

const CarsContent = ({
  departDate,
  setDepartDate,
  returnDate,
  setReturnDate,
}: CarsContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Pick-up Location */}
        <div className="md:col-span-4">
          <Label htmlFor="pickup-location" className="text-sm font-medium mb-2 block text-muted-foreground">
            Pick-up Location
          </Label>
          <Input
            id="pickup-location"
            placeholder="City or Airport"
            className="h-12 bg-background border-border focus:border-foreground transition-colors"
          />
        </div>

        {/* Drop-off Location */}
        <div className="md:col-span-4">
          <Label htmlFor="dropoff-location" className="text-sm font-medium mb-2 block text-muted-foreground">
            Drop-off Location
          </Label>
          <Input
            id="dropoff-location"
            placeholder="City or Airport"
            className="h-12 bg-background border-border focus:border-foreground transition-colors"
          />
        </div>

        {/* Pick-up Date */}
        <div className="md:col-span-2">
          <Label className="text-sm font-medium mb-2 block text-muted-foreground">
            Pick-up
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal bg-background border-border hover:border-foreground transition-colors"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departDate ? format(departDate, "PPP") : <span className="text-muted-foreground">Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departDate}
                onSelect={setDepartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Drop-off Date */}
        <div className="md:col-span-2">
          <Label className="text-sm font-medium mb-2 block text-muted-foreground">
            Drop-off
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal bg-background border-border hover:border-foreground transition-colors"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate ? format(returnDate, "PPP") : <span className="text-muted-foreground">Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
                disabled={(date) => departDate ? date < departDate : false}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Car Type and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <Select defaultValue="any">
          <SelectTrigger className="w-[200px] h-10 bg-background border-border">
            <SelectValue placeholder="Car Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Type</SelectItem>
            <SelectItem value="economy">Economy</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="midsize">Midsize</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="luxury">Luxury</SelectItem>
          </SelectContent>
        </Select>

        <Button
          size="lg"
          className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 transition-all hover:scale-105"
        >
          <Search className="w-5 h-5 mr-2" />
          Search Cars
        </Button>
      </div>
    </motion.div>
  );
};
