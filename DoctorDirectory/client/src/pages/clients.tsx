import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  User, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Activity,
  Pill,
  CalendarDays,
} from "lucide-react";

// Mock client data
const clients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 34,
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Boston, MA 02115",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    lastVisit: "2023-04-15",
    nextAppointment: "2023-05-10",
    doctor: "Dr. Michael Chen",
    medicalConditions: ["Hypertension", "Asthma"],
    medications: ["Lisinopril", "Albuterol"],
    insuranceProvider: "Blue Cross Blue Shield",
    appointments: [
      { date: "2023-04-15", doctor: "Dr. Michael Chen", type: "Regular Checkup", status: "Completed" },
      { date: "2023-03-10", doctor: "Dr. Michael Chen", type: "Follow-up", status: "Completed" },
      { date: "2023-02-05", doctor: "Dr. Emily Wong", type: "Specialist Consult", status: "Completed" },
      { date: "2023-05-10", doctor: "Dr. Michael Chen", type: "Regular Checkup", status: "Scheduled" },
    ],
    notes: "Patient is responding well to current treatment plan. Blood pressure has improved over the last 3 months."
  },
  {
    id: 2,
    name: "David Martinez",
    age: 42,
    email: "david.martinez@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Chicago, IL 60611",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    lastVisit: "2023-04-12",
    nextAppointment: "2023-05-20",
    doctor: "Dr. Emily Wong",
    medicalConditions: ["Diabetes Type 2", "High Cholesterol"],
    medications: ["Metformin", "Atorvastatin"],
    insuranceProvider: "Aetna",
    appointments: [
      { date: "2023-04-12", doctor: "Dr. Emily Wong", type: "Regular Checkup", status: "Completed" },
      { date: "2023-03-01", doctor: "Dr. Emily Wong", type: "Follow-up", status: "Completed" },
      { date: "2023-01-15", doctor: "Dr. John Davis", type: "Emergency Visit", status: "Completed" },
      { date: "2023-05-20", doctor: "Dr. Emily Wong", type: "Lab Results Review", status: "Scheduled" },
    ],
    notes: "Patient needs to improve diet and exercise routine. Blood sugar levels are still fluctuating."
  },
  {
    id: 3,
    name: "Lisa Thompson",
    age: 28,
    email: "lisa.thompson@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, San Francisco, CA 94102",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    lastVisit: "2023-04-18",
    nextAppointment: "2023-06-05",
    doctor: "Dr. Sarah Miller",
    medicalConditions: ["Migraines", "Anxiety"],
    medications: ["Sumatriptan", "Sertraline"],
    insuranceProvider: "UnitedHealthcare",
    appointments: [
      { date: "2023-04-18", doctor: "Dr. Sarah Miller", type: "Regular Checkup", status: "Completed" },
      { date: "2023-02-20", doctor: "Dr. Sarah Miller", type: "Follow-up", status: "Completed" },
      { date: "2023-01-10", doctor: "Dr. Sarah Miller", type: "New Patient Visit", status: "Completed" },
      { date: "2023-06-05", doctor: "Dr. Sarah Miller", type: "Follow-up", status: "Scheduled" },
    ],
    notes: "Patient reports decreased frequency of migraines with current medication. Therapy sessions for anxiety are helping."
  },
  {
    id: 4,
    name: "Robert Wilson",
    age: 56,
    email: "robert.wilson@example.com",
    phone: "+1 (555) 789-0123",
    address: "321 Elm St, New York, NY 10001",
    photo: "https://randomuser.me/api/portraits/men/4.jpg",
    lastVisit: "2023-04-10",
    nextAppointment: "2023-05-15",
    doctor: "Dr. John Davis",
    medicalConditions: ["Arthritis", "Hypertension"],
    medications: ["Ibuprofen", "Hydrochlorothiazide"],
    insuranceProvider: "Medicare",
    appointments: [
      { date: "2023-04-10", doctor: "Dr. John Davis", type: "Regular Checkup", status: "Completed" },
      { date: "2023-03-15", doctor: "Dr. John Davis", type: "Follow-up", status: "Completed" },
      { date: "2023-02-10", doctor: "Dr. Michael Chen", type: "Specialist Consult", status: "Completed" },
      { date: "2023-05-15", doctor: "Dr. John Davis", type: "Follow-up", status: "Scheduled" },
    ],
    notes: "Patient has been experiencing increased joint pain. Physical therapy recommended."
  },
  {
    id: 5,
    name: "Emily Carter",
    age: 31,
    email: "emily.carter@example.com",
    phone: "+1 (555) 234-5678",
    address: "654 Maple Ave, Austin, TX 78701",
    photo: "https://randomuser.me/api/portraits/women/5.jpg",
    lastVisit: "2023-04-20",
    nextAppointment: "2023-05-25",
    doctor: "Dr. Michael Chen",
    medicalConditions: ["Allergies", "Eczema"],
    medications: ["Cetirizine", "Hydrocortisone Cream"],
    insuranceProvider: "Cigna",
    appointments: [
      { date: "2023-04-20", doctor: "Dr. Michael Chen", type: "Regular Checkup", status: "Completed" },
      { date: "2023-03-05", doctor: "Dr. Michael Chen", type: "Follow-up", status: "Completed" },
      { date: "2023-01-22", doctor: "Dr. Sarah Miller", type: "Specialist Consult", status: "Completed" },
      { date: "2023-05-25", doctor: "Dr. Michael Chen", type: "Allergy Test", status: "Scheduled" },
    ],
    notes: "Patient's eczema has improved. Continuing with current treatment plan."
  }
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [activeView, setActiveView] = useState("grid");
  
  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.medicalConditions.some(condition => 
      condition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">Client Profiles</h1>
        <p className="text-neutral-600 mt-2">
          Manage and view detailed client information
        </p>
      </div>
      
      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search clients by name or condition..."
            className="pl-9 bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-muted rounded-md p-1 flex items-center">
            <button
              onClick={() => setActiveView("grid")}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                activeView === "grid" 
                  ? "bg-primary text-white" 
                  : "hover:bg-accent/50"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setActiveView("list")}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                activeView === "list" 
                  ? "bg-primary text-white" 
                  : "hover:bg-accent/50"
              }`}
            >
              List View
            </button>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Enter the client's details to create a new profile
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="age" className="text-right">
                    Age
                  </label>
                  <Input id="age" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="phone" className="text-right">
                    Phone
                  </label>
                  <Input id="phone" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Grid View */}
      {activeView === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden border-primary/10 transition-all hover:shadow-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/70 to-secondary/70"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                      <img 
                        src={client.photo} 
                        alt={client.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=f0f4ff&color=3b82f6&size=128`;
                        }}
                      />
                    </div>
                    <div>
                      <CardTitle className="mb-1">{client.name}</CardTitle>
                      <CardDescription>
                        Age: {client.age} • {client.medicalConditions[0]}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-neutral-500" />
                    <span className="text-neutral-700">{client.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-neutral-500" />
                    <span className="text-neutral-700">{client.phone}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-neutral-500 mt-0.5" />
                    <span className="text-neutral-700">{client.address}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium mb-2">Medical Information</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {client.medicalConditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/10">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm mt-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-neutral-500" />
                      <span className="text-neutral-600">Last Visit:</span>
                    </div>
                    <span className="font-medium">{client.lastVisit}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-neutral-500" />
                      <span className="text-neutral-600">Doctor:</span>
                    </div>
                    <span className="font-medium">{client.doctor}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent text-white"
                  onClick={() => setSelectedClient(client)}
                >
                  View Full Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* List View */}
      {activeView === "list" && (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical Records
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={client.photo} 
                          alt={client.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(client.name)}&background=f0f4ff&color=3b82f6&size=128`;
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-xs text-gray-500">{client.age} years old</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{client.phone}</div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {client.medicalConditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/10">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Last: {client.lastVisit}</div>
                    <div className="text-xs text-gray-500">Next: {client.nextAppointment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setSelectedClient(client)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Client Detail Dialog */}
      {selectedClient && (
        <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
          <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-primary to-accent">
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
              <div className="absolute -bottom-16 left-8 flex items-end">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                  <img 
                    src={selectedClient.photo} 
                    alt={selectedClient.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedClient.name)}&background=f0f4ff&color=3b82f6&size=128`;
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-20 px-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                  <p className="text-gray-500 text-sm">Age: {selectedClient.age} • {selectedClient.insuranceProvider}</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Edit Profile</Button>
              </div>
              
              <div className="mt-6 border-b border-gray-200">
                <div className="flex space-x-6">
                  {["info", "medical", "appointments"].map((tab) => {
                    const isActive = tab === "info"; // Default to info tab
                    return (
                      <button
                        key={tab}
                        className={`pb-2 px-1 text-sm font-medium flex items-center border-b-2 transition-colors ${
                          isActive
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab === "info" && <User className="w-4 h-4 mr-2" />}
                        {tab === "medical" && <Activity className="w-4 h-4 mr-2" />}
                        {tab === "appointments" && <CalendarDays className="w-4 h-4 mr-2" />}
                        {tab === "info" && "Personal Info"}
                        {tab === "medical" && "Medical Records"}
                        {tab === "appointments" && "Appointments"}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-6">
                {/* Always showing the Personal Info content since we're simplifying */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Email Address</div>
                          <div className="text-gray-700">{selectedClient.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Phone Number</div>
                          <div className="text-gray-700">{selectedClient.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <div className="text-sm font-medium">Address</div>
                          <div className="text-gray-700">{selectedClient.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Primary Care</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Primary Doctor</div>
                          <div className="text-gray-700">{selectedClient.doctor}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Last Visit</div>
                          <div className="text-gray-700">{selectedClient.lastVisit}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="text-sm font-medium">Next Appointment</div>
                          <div className="text-gray-700">{selectedClient.nextAppointment}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Medical Conditions</h3>
                    <div className="space-y-2">
                      {selectedClient.medicalConditions.map((condition, index) => (
                        <div key={index} className="flex items-center bg-primary/5 p-3 rounded-lg">
                          <Activity className="w-5 h-5 mr-3 text-primary" />
                          <span>{condition}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-medium mt-6 mb-4">Medications</h3>
                    <div className="space-y-2">
                      {selectedClient.medications.map((medication, index) => (
                        <div key={index} className="flex items-center bg-secondary/5 p-3 rounded-lg">
                          <Pill className="w-5 h-5 mr-3 text-secondary" />
                          <span>{medication}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Medical Notes</h3>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-start mb-3">
                        <FileText className="w-5 h-5 mr-2 text-primary mt-0.5" />
                        <div className="text-sm font-medium">Latest Assessment</div>
                      </div>
                      <p className="text-gray-700">{selectedClient.notes}</p>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium">Insurance Details</h3>
                        <Button size="sm" variant="outline">Update</Button>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="text-sm font-medium">Provider</div>
                        <div className="text-gray-700 mb-2">{selectedClient.insuranceProvider}</div>
                        
                        <div className="text-sm font-medium mt-3">Policy Status</div>
                        <div className="text-green-600 flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Appointment History</h3>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      New Appointment
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Doctor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedClient.appointments.map((appointment, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {appointment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {appointment.doctor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {appointment.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={
                                appointment.status === "Completed" 
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : appointment.status === "Scheduled"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }>
                                {appointment.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="px-6 py-4 border-t border-gray-100 mt-6">
              <Button variant="outline" onClick={() => setSelectedClient(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}