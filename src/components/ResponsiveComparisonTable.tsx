import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const comparisonData: { category: string; scores: Record<string, number | null> }[] = [
  {
    category: "Subscription Lifecycle Management",
    scores: {
      "Total avg. coverage": null,
      "Automation Features": 84,
      "Analytics & Reporting": null,
      "Usage Plans Scalability": null,
      "Billing Accuracy": null,
      "Auto Billing & Invoicing": 86,
      "Payment Methods": 92,
      "Billing Flexibility": null,
      "System Integration": null
    }
  },
  {
    category: "Dunning Management", 
    scores: {
      "Total avg. coverage": null,
      "Automation Features": 86,
      "Analytics & Reporting": 83,
      "Usage Plans Scalability": null,
      "Billing Accuracy": null,
      "Auto Billing & Invoicing": null,
      "Payment Methods": null,
      "Billing Flexibility": null,
      "System Integration": 92
    }
  },
  {
    category: "Usage-based Billing",
    scores: {
      "Total avg. coverage": null,
      "Automation Features": null,
      "Analytics & Reporting": null,
      "Usage Plans Scalability": 79,
      "Billing Accuracy": null,
      "Auto Billing & Invoicing": 80,
      "Payment Methods": 79,
      "Billing Flexibility": 71,
      "System Integration": 76
    }
  },
  {
    category: "Billing Management",
    scores: {
      "Total avg. coverage": null,
      "Automation Features": null,
      "Analytics & Reporting": 88,
      "Usage Plans Scalability": null,
      "Billing Accuracy": 74,
      "Auto Billing & Invoicing": null,
      "Payment Methods": 65,
      "Billing Flexibility": null,
      "System Integration": null
    }
  },
  {
    category: "Billing Compliance",
    scores: {
      "Total avg. coverage": null,
      "Automation Features": null,
      "Analytics & Reporting": null,
      "Usage Plans Scalability": null,
      "Billing Accuracy": null,
      "Auto Billing & Invoicing": 60,
      "Payment Methods": null,
      "Billing Flexibility": null,
      "System Integration": 88
    }
  },
  {
    category: "Invoicing Automation",
    scores: {
      "Total avg. coverage": null,
      "Automation Features": null,
      "Analytics & Reporting": null,
      "Usage Plans Scalability": null,
      "Billing Accuracy": null,
      "Auto Billing & Invoicing": null,
      "Payment Methods": null,
      "Billing Flexibility": null,
      "System Integration": null
    }
  },
  {
    category: "Quote To Cash",
    scores: {
      "Total avg. coverage": null,
      "Automation Features": null,
      "Analytics & Reporting": null,
      "Usage Plans Scalability": null,
      "Billing Accuracy": null,
      "Auto Billing & Invoicing": null,
      "Payment Methods": 48,
      "Billing Flexibility": 16,
      "System Integration": null
    }
  },
  {
    category: "Financial Reporting",
    scores: {
      "Total avg. coverage": null,
      "Automation Features": null,
      "Analytics & Reporting": null,
      "Usage Plans Scalability": null,
      "Billing Accuracy": null,
      "Auto Billing & Invoicing": null,
      "Payment Methods": null,
      "Billing Flexibility": null,
      "System Integration": null
    }
  }
];

const columns = [
  "Total avg. coverage",
  "Automation Features", 
  "Analytics & Reporting",
  "Usage Plans Scalability",
  "Billing Accuracy",
  "Auto Billing & Invoicing",
  "Payment Methods",
  "Billing Flexibility",
  "System Integration"
];

function getScoreColor(score: number | null): string {
  if (score === null) return "bg-gray-200 text-gray-400";
  if (score >= 80) return "bg-green-500 text-white";
  if (score >= 70) return "bg-orange-500 text-white";
  if (score >= 60) return "bg-orange-400 text-white";
  return "bg-red-500 text-white";
}

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) {
    return <span className="text-gray-400 text-center">–</span>;
  }
  
  return (
    <Badge className={`${getScoreColor(score)} hover:${getScoreColor(score)} text-xs px-2 py-1`}>
      {score}%
    </Badge>
  );
}

export function ResponsiveComparisonTable() {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-900 min-w-[200px]">
                    Category
                  </th>
                  {columns.slice(1).map((column) => (
                    <th key={column} className="text-center p-3 font-medium text-gray-600 text-xs min-w-[100px]">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-900 text-sm">
                      {row.category}
                    </td>
                    {columns.slice(1).map((column) => (
                      <td key={column} className="p-3 text-center">
                        <div className="flex justify-center">
                          <ScoreBadge score={row.scores[column]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tablet Horizontal Scroll */}
      <div className="hidden md:block lg:hidden">
        <ScrollArea className="w-full">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden min-w-[800px]">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-3 font-medium text-gray-900 min-w-[160px] text-sm">
                    Category
                  </th>
                  {columns.slice(1, 5).map((column) => (
                    <th key={column} className="text-center p-2 font-medium text-gray-600 text-xs min-w-[90px]">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-gray-900 text-sm">
                      {row.category}
                    </td>
                    {columns.slice(1, 5).map((column) => (
                      <td key={column} className="p-2 text-center">
                        <div className="flex justify-center">
                          <ScoreBadge score={row.scores[column]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {comparisonData.map((row, index) => (
          <Card key={index} className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-gray-900">{row.category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-3">
                {columns.slice(1).map((column) => {
                  const score = row.scores[column];
                  if (score === null) return null;
                  
                  return (
                    <div key={column} className="flex flex-col items-center p-2 bg-gray-50 rounded">
                      <div className="text-xs text-gray-600 mb-1 text-center leading-tight">
                        {column}
                      </div>
                      <ScoreBadge score={score} />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}