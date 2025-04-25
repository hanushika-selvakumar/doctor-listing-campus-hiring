import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Users, 
  CalendarDays, 
  BookOpen, 
  Stethoscope, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  BarChart as BarChartIcon
} from "lucide-react";

// Mock data for analytics
const visitData = [
  { name: 'Jan', visits: 400 },
  { name: 'Feb', visits: 300 },
  { name: 'Mar', visits: 500 },
  { name: 'Apr', visits: 280 },
  { name: 'May', visits: 590 },
  { name: 'Jun', visits: 320 },
  { name: 'Jul', visits: 350 }
];

const specialtyData = [
  { name: 'Cardiology', value: 30 },
  { name: 'Neurology', value: 25 },
  { name: 'Pediatrics', value: 20 },
  { name: 'Orthopedics', value: 15 },
  { name: 'Dermatology', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const appointmentData = [
  { name: 'Mon', inPerson: 24, virtual: 13 },
  { name: 'Tue', inPerson: 30, virtual: 16 },
  { name: 'Wed', inPerson: 28, virtual: 20 },
  { name: 'Thu', inPerson: 27, virtual: 23 },
  { name: 'Fri', inPerson: 32, virtual: 19 },
  { name: 'Sat', inPerson: 25, virtual: 15 },
  { name: 'Sun', inPerson: 18, virtual: 10 }
];

// Mock data for patients
const patients = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    age: 34, 
    lastVisit: '2023-04-15', 
    doctor: 'Dr. Michael Chen',
    condition: 'Hypertension',
    appointmentsCount: 5
  },
  { 
    id: 2, 
    name: 'David Martinez', 
    age: 42, 
    lastVisit: '2023-04-12', 
    doctor: 'Dr. Emily Wong',
    condition: 'Diabetes Type 2',
    appointmentsCount: 8
  },
  { 
    id: 3, 
    name: 'Lisa Thompson', 
    age: 28, 
    lastVisit: '2023-04-18', 
    doctor: 'Dr. Sarah Miller',
    condition: 'Asthma',
    appointmentsCount: 3
  },
  { 
    id: 4, 
    name: 'Robert Wilson', 
    age: 56, 
    lastVisit: '2023-04-10', 
    doctor: 'Dr. John Davis',
    condition: 'Arthritis',
    appointmentsCount: 6
  },
  { 
    id: 5, 
    name: 'Emily Carter', 
    age: 31, 
    lastVisit: '2023-04-20', 
    doctor: 'Dr. Michael Chen',
    condition: 'Anxiety',
    appointmentsCount: 4
  }
];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-lg border border-gray-100">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: item.color }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [activePatient, setActivePatient] = useState<number | null>(null);
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">Analytics Dashboard</h1>
        <p className="text-neutral-600 mt-2">
          Track performance metrics and patient engagement statistics
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-green-600">↑ 12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <CalendarDays className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">386</div>
                <p className="text-xs text-green-600">↑ 8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <Stethoscope className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">72</div>
                <p className="text-xs text-green-600">↑ 4% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Specialties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-full">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-amber-600">- No change</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="mb-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Performance Analytics</h2>
            <div className="flex items-center border rounded-md bg-muted p-1">
              <button className="px-3 py-1.5 rounded-sm text-sm font-medium flex items-center bg-primary text-white">
                <LineChartIcon className="w-4 h-4 mr-2" />
                Trends
              </button>
              <button className="px-3 py-1.5 rounded-sm text-sm font-medium flex items-center text-gray-700 hover:bg-gray-100">
                <BarChartIcon className="w-4 h-4 mr-2" />
                Appointments
              </button>
              <button className="px-3 py-1.5 rounded-sm text-sm font-medium flex items-center text-gray-700 hover:bg-gray-100">
                <PieChartIcon className="w-4 h-4 mr-2" />
                Specialties
              </button>
            </div>
          </div>
          
          {/* Always showing the Trends content */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle>Monthly Patient Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={visitData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="#7c3aed" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Patients Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Patient List</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Visits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className={`${activePatient === patient.id ? 'bg-primary/5' : 'hover:bg-gray-50'}`}
                  onClick={() => setActivePatient(patient.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.condition}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-2">{patient.appointmentsCount}</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${(patient.appointmentsCount / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary hover:text-primary-dark transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}