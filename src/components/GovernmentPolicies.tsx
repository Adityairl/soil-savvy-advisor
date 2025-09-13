import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Calendar, ExternalLink, Award } from "lucide-react";

interface Policy {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: 'new' | 'active' | 'updated';
  benefitAmount?: string;
  eligibility: string;
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'PM-KISAN Direct Benefit Transfer',
    description: 'Financial support of ₹6,000 per year to eligible farmer families',
    category: 'Financial Support',
    date: '2024-01-15',
    status: 'active',
    benefitAmount: '₹6,000/year',
    eligibility: 'Small & marginal farmers'
  },
  {
    id: '2',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Comprehensive crop insurance scheme for farmers',
    category: 'Insurance',
    date: '2024-02-01',
    status: 'updated',
    benefitAmount: 'Up to ₹2L coverage',
    eligibility: 'All farmers'
  },
  {
    id: '3',
    title: 'Soil Health Card Scheme',
    description: 'Free soil testing and nutrient management advice',
    category: 'Soil Management',
    date: '2024-01-28',
    status: 'new',
    benefitAmount: 'Free service',
    eligibility: 'All farmers'
  },
  {
    id: '4',
    title: 'Kisan Credit Card',
    description: 'Easy access to institutional credit for farmers',
    category: 'Credit',
    date: '2024-02-10',
    status: 'active',
    benefitAmount: 'Up to ₹3L loan',
    eligibility: 'Landholding farmers'
  },
  {
    id: '5',
    title: 'Organic Farming Promotion',
    description: 'Financial assistance for adopting organic farming practices',
    category: 'Sustainable Agriculture',
    date: '2024-02-20',
    status: 'new',
    benefitAmount: '₹50,000/hectare',
    eligibility: 'Certified organic farmers'
  }
];

export function GovernmentPolicies() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800 border-green-200';
      case 'updated': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Financial Support': return <Award className="w-4 h-4" />;
      case 'Insurance': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Card className="h-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="w-5 h-5 text-primary" />
          Government Policies & Schemes
        </CardTitle>
        <CardDescription>
          Latest agricultural policies and benefits for farmers
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-4">
            {mockPolicies.map((policy) => (
              <div
                key={policy.id}
                className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-card"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(policy.category)}
                    <h4 className="font-semibold text-sm text-card-foreground">
                      {policy.title}
                    </h4>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(policy.status)}`}
                  >
                    {policy.status.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {policy.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <span className="text-xs font-medium text-primary">Benefit:</span>
                    <p className="text-xs text-card-foreground font-semibold">
                      {policy.benefitAmount}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-primary">Eligibility:</span>
                    <p className="text-xs text-card-foreground">
                      {policy.eligibility}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">
                      {new Date(policy.date).toLocaleDateString()}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                    <span className="text-xs">Learn More</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}