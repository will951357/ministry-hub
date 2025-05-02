
import React from 'react';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PlanFeature = {
  name: string;
  basic: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
};

const planFeatures: PlanFeature[] = [
  { name: "Members", basic: "Up to 100", standard: "Up to 500", premium: "Unlimited" },
  { name: "Admin users", basic: "1", standard: "3", premium: "10" },
  { name: "Event management", basic: true, standard: true, premium: true },
  { name: "Donations tracking", basic: true, standard: true, premium: true },
  { name: "Financial reports", basic: false, standard: true, premium: true },
  { name: "Mobile app", basic: false, standard: true, premium: true },
  { name: "Custom branding", basic: false, standard: false, premium: true },
  { name: "API access", basic: false, standard: false, premium: true },
  { name: "Priority support", basic: false, standard: false, premium: true },
];

type PlanCardProps = {
  title: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  currentPlan?: boolean;
  onSelect: () => void;
};

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  buttonText,
  currentPlan = false,
  onSelect
}) => {
  return (
    <div className={cn(
      "relative flex flex-col rounded-lg border p-6 shadow-sm transition-all",
      popular ? "border-primary/50 shadow-lg" : "",
      currentPlan ? "bg-muted/50" : ""
    )}>
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          MOST POPULAR
        </div>
      )}
      
      <div className="mb-4 mt-2 text-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="mt-2 flex items-baseline justify-center">
          <span className="text-3xl font-bold">${price}</span>
          <span className="ml-1 text-sm text-muted-foreground">/month</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      
      <ul className="mb-6 mt-4 flex flex-col gap-2 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <Button 
          className={cn(
            "w-full",
            popular ? "" : "variant-outline",
            currentPlan ? "bg-muted-foreground/80" : ""
          )}
          onClick={onSelect}
          variant={popular ? "default" : "outline"}
        >
          {currentPlan ? "Current Plan" : buttonText}
        </Button>
      </div>
    </div>
  );
};

export const PlanInfo = () => {
  const { toast } = useToast();
  
  const handleUpgrade = (plan: string) => {
    toast({
      title: "Upgrade initiated",
      description: `You're being redirected to upgrade to the ${plan} plan.`,
    });
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Plan Information
          <Badge variant="outline" className="ml-2">BASIC PLAN</Badge>
        </CardTitle>
        <CardDescription>
          View your current plan and upgrade to access more features for your church.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-8">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <Star className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Unlock more features for your ministry</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>Upgrade your plan to get access to advanced features to better manage your church and reach more people.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Plans comparison */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse mb-8">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-2 text-left font-medium">Feature</th>
                <th className="py-3 px-4 text-center font-medium">Basic</th>
                <th className="py-3 px-4 text-center font-medium bg-amber-50">Standard</th>
                <th className="py-3 px-4 text-center font-medium">Premium</th>
              </tr>
            </thead>
            <tbody>
              {planFeatures.map((feature, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                  <td className="py-3 px-2">{feature.name}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof feature.basic === "boolean" ? (
                      feature.basic ? <Check className="mx-auto h-4 w-4 text-green-500" /> : "—"
                    ) : (
                      feature.basic
                    )}
                  </td>
                  <td className="py-3 px-4 text-center bg-amber-50/50">
                    {typeof feature.standard === "boolean" ? (
                      feature.standard ? <Check className="mx-auto h-4 w-4 text-green-500" /> : "—"
                    ) : (
                      feature.standard
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof feature.premium === "boolean" ? (
                      feature.premium ? <Check className="mx-auto h-4 w-4 text-green-500" /> : "—"
                    ) : (
                      feature.premium
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <PlanCard
            title="Basic"
            price={0}
            description="Essential features for small churches just getting started."
            features={[
              "Up to 100 members",
              "1 admin user",
              "Basic event management",
              "Donation tracking"
            ]}
            buttonText="Current Plan"
            currentPlan={true}
            onSelect={() => {}}
          />
          
          <PlanCard
            title="Standard"
            price={49}
            description="Advanced features for growing churches."
            features={[
              "Up to 500 members",
              "3 admin users",
              "Financial reports",
              "Mobile app for members",
              "Email notifications"
            ]}
            popular={true}
            buttonText="Upgrade to Standard"
            onSelect={() => handleUpgrade("Standard")}
          />
          
          <PlanCard
            title="Premium"
            price={99}
            description="Complete solution for established churches."
            features={[
              "Unlimited members",
              "10 admin users",
              "Custom branding",
              "API access",
              "Priority support",
              "Advanced analytics"
            ]}
            buttonText="Upgrade to Premium"
            onSelect={() => handleUpgrade("Premium")}
          />
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-6">
        <p className="text-sm text-muted-foreground">
          All plans include our core features like member management, check-in system, and basic reporting.
          Need help choosing? <a href="#" className="text-primary underline">Contact our sales team</a>
        </p>
      </CardFooter>
    </>
  );
};
