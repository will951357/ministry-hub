import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, DollarSign, Landmark, Users, Check, ExternalLink, Smartphone, Church, Heart, Globe, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Helper components for the landing page
const TestimonialCard = ({ quote, name, church, size }: { quote: string; name: string; church: string; size: string }) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="flex-grow mb-4">
        <p className="italic text-church-secondary">{quote}</p>
      </div>
      <div>
        <p className="font-semibold text-church-primary">{name}</p>
        <p className="text-sm text-church-secondary">{church}</p>
        <p className="text-xs text-church-secondary/70">{size}</p>
      </div>
    </CardContent>
  </Card>
);

const PricingCard = ({ 
  tier, 
  price, 
  description, 
  features, 
  buttonText, 
  popular 
}: { 
  tier: string; 
  price: string; 
  description: string; 
  features: string[]; 
  buttonText: string; 
  popular: boolean;
}) => (
  <Card className={`relative h-full ${popular ? "border-church-accent shadow-lg" : ""}`}>
    {popular && (
      <div className="absolute -top-4 left-0 right-0 flex justify-center">
        <span className="bg-church-accent text-white text-xs font-semibold py-1 px-3 rounded-full">
          Most Popular
        </span>
      </div>
    )}
    <CardContent className={`p-6 ${popular ? "pt-8" : ""}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-church-primary mb-1">{tier}</h3>
        <div className="text-3xl font-bold text-church-primary mb-2">{price}<span className="text-sm font-normal text-church-secondary">/month</span></div>
        <p className="text-church-secondary text-sm">{description}</p>
      </div>
      <div className="mb-6">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-church-accent mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center">
        <Button className={popular ? "bg-church-accent hover:bg-church-accent/90 w-full" : "w-full"}>
          {buttonText}
        </Button>
      </div>
    </CardContent>
  </Card>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <button
        className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-church-primary">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-church-secondary">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function LandingPage() {
  const isMobile = useIsMobile();
  const [activeFeature, setActiveFeature] = useState<string | null>("mobile");
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-church-primary">
            MinistryHub
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-church-secondary hover:text-church-primary transition-colors">Features</a>
            <a href="#pricing" className="text-church-secondary hover:text-church-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="text-church-secondary hover:text-church-primary transition-colors">Testimonials</a>
            <a href="#faq" className="text-church-secondary hover:text-church-primary transition-colors">FAQ</a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - with softer gradient background */}
      <section className="relative py-20 bg-gradient-to-r from-[#F8FAFC] via-[#F9FAFB] to-[#F8FAFC] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
          </svg>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block p-1 px-3 mb-6 rounded-full bg-blue-50 border border-blue-100">
              <div className="flex items-center space-x-2 text-sm font-medium text-blue-700">
                <Church className="h-4 w-4" />
                <span>Built specifically for growing ministries</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-church-primary leading-tight mb-4">
              Grow Your Church Community and Impact
            </h1>
            <p className="mt-4 text-xl text-church-secondary mb-8 max-w-2xl mx-auto">
              Strengthen connections, inspire engagement, and expand your ministry's reach—all through one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Schedule a Demo
              </Button>
            </div>
            <div className="flex justify-center text-sm text-church-secondary mb-10">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-church-accent" />
                <span>No credit card required</span>
              </div>
              <div className="mx-3">•</div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-church-accent" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-church-primary text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="mt-2 text-white/80">Churches</div>
            </div>
            <div>
              <div className="text-3xl font-bold">20k+</div>
              <div className="mt-2 text-white/80">Members Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="mt-2 text-white/80">Denominations</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99%</div>
              <div className="mt-2 text-white/80">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Content Carousel */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-church-primary">Everything You Need in One Place</h2>
            <p className="mt-4 text-xl text-church-secondary max-w-2xl mx-auto">
              MinistryHub streamlines all aspects of church management with powerful, easy-to-use tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Features Cards Row - Now outside carousel */}
            <div className="col-span-1 lg:col-span-4 space-y-4">
              <div 
                onClick={() => setActiveFeature('mobile')} 
                className={`cursor-pointer w-full p-6 rounded-lg transition-all duration-300 ${
                  activeFeature === 'mobile' 
                    ? "bg-white shadow-md border-l-4 border-church-accent" 
                    : "bg-church-muted hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Smartphone className="h-10 w-10 text-church-accent" />
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 ${activeFeature === 'mobile' ? "text-church-accent" : "text-church-primary"}`}>
                    Mobile App
                  </h3>
                  <p className="text-church-secondary">Engage your congregation on the go</p>
                </div>
              </div>
              
              <div 
                onClick={() => setActiveFeature('members')} 
                className={`cursor-pointer w-full p-6 rounded-lg transition-all duration-300 ${
                  activeFeature === 'members' 
                    ? "bg-white shadow-md border-l-4 border-church-accent" 
                    : "bg-church-muted hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Users className="h-10 w-10 text-church-accent" />
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 ${activeFeature === 'members' ? "text-church-accent" : "text-church-primary"}`}>
                    Member Management
                  </h3>
                  <p className="text-church-secondary">Track member information and spiritual journeys</p>
                </div>
              </div>
              
              <div 
                onClick={() => setActiveFeature('events')} 
                className={`cursor-pointer w-full p-6 rounded-lg transition-all duration-300 ${
                  activeFeature === 'events' 
                    ? "bg-white shadow-md border-l-4 border-church-accent" 
                    : "bg-church-muted hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Calendar className="h-10 w-10 text-church-accent" />
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 ${activeFeature === 'events' ? "text-church-accent" : "text-church-primary"}`}>
                    Event Planning
                  </h3>
                  <p className="text-church-secondary">Organize services and special events</p>
                </div>
              </div>
              
              <div 
                onClick={() => setActiveFeature('finance')} 
                className={`cursor-pointer w-full p-6 rounded-lg transition-all duration-300 ${
                  activeFeature === 'finance' 
                    ? "bg-white shadow-md border-l-4 border-church-accent" 
                    : "bg-church-muted hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <DollarSign className="h-10 w-10 text-church-accent" />
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 ${activeFeature === 'finance' ? "text-church-accent" : "text-church-primary"}`}>
                    Financial Tracking
                  </h3>
                  <p className="text-church-secondary">Manage tithes, donations, and expenses</p>
                </div>
              </div>
              
              <div 
                onClick={() => setActiveFeature('classes')} 
                className={`cursor-pointer w-full p-6 rounded-lg transition-all duration-300 ${
                  activeFeature === 'classes' 
                    ? "bg-white shadow-md border-l-4 border-church-accent" 
                    : "bg-church-muted hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <BookOpen className="h-10 w-10 text-church-accent" />
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 ${activeFeature === 'classes' ? "text-church-accent" : "text-church-primary"}`}>
                    Classes Management
                  </h3>
                  <p className="text-church-secondary">Create and manage learning programs</p>
                </div>
              </div>
              
              <div 
                onClick={() => setActiveFeature('groups')} 
                className={`cursor-pointer w-full p-6 rounded-lg transition-all duration-300 ${
                  activeFeature === 'groups' 
                    ? "bg-white shadow-md border-l-4 border-church-accent" 
                    : "bg-church-muted hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <Landmark className="h-10 w-10 text-church-accent" />
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 ${activeFeature === 'groups' ? "text-church-accent" : "text-church-primary"}`}>
                    Ministry Groups
                  </h3>
                  <p className="text-church-secondary">Coordinate small groups and volunteer teams</p>
                </div>
              </div>
            </div>

            {/* Feature Details Column with Carousel */}
            <div className="col-span-1 lg:col-span-8">
              <div className="bg-white rounded-xl shadow-lg p-6 h-full overflow-hidden transition-all duration-500 transform">
                <Carousel className="w-full h-full" onSelect={(index: number) => {
                  // Map index to feature name
                  const features = ['mobile', 'members', 'events', 'finance', 'classes', 'groups'];
                  if (index >= 0 && index < features.length) {
                    setActiveFeature(features[index]);
                  }
                }}>
                  <CarouselContent className="h-full">
                    <CarouselItem className="h-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
                        <div>
                          <div className="inline-block p-1 px-3 mb-4 rounded-full bg-blue-50 border border-blue-100">
                            <div className="flex items-center space-x-2 text-sm font-medium text-blue-700">
                              <Smartphone className="h-4 w-4" />
                              <span>Mobile Experience</span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-church-primary mb-4">Take Your Ministry Everywhere</h3>
                          <p className="text-church-secondary mb-6">
                            Connect with your congregation anytime, anywhere with our powerful mobile app. Send notifications, manage events, and track attendance on the go.
                          </p>
                          <ul className="space-y-3 mb-6">
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-church-accent mr-2 mt-0.5" />
                              <span>Real-time notifications and updates</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-church-accent mr-2 mt-0.5" />
                              <span>Mobile check-in for events</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-church-accent mr-2 mt-0.5" />
                              <span>Secure giving and donation tracking</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-church-accent mr-2 mt-0.5" />
                              <span>Member directory and communication</span>
                            </li>
                          </ul>
                          <Button className="bg-church-accent hover:bg-church-accent/90">
                            Download Our App
                          </Button>
                        </div>
                        <div className="flex justify-center">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-church-accent to-blue-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                            <img 
                              src="https://images.unsplash.com/photo-1551038247-3d9af20df552" 
                              alt="Mobile app on a smartphone" 
                              className="relative rounded-xl shadow-xl max-w-xs w-full h-auto object-contain z-10 transform transition-all duration-500 hover:scale-105"
                            />
                          </div>
                        </div>
                      </div>
                    </CarouselItem>

                    <CarouselItem className="h-full">
                      <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-church-primary mb-4">Member Management</h3>
                        <p className="text-church-secondary mb-6">
                          Build a stronger community by tracking member information, attendance patterns, and spiritual journeys all in one place.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Member Profiles</h4>
                            <p className="text-church-secondary">Comprehensive profiles with family connections, groups, and service history.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Attendance Tracking</h4>
                            <p className="text-church-secondary">Monitor attendance trends and identify disengaged members.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Communication Tools</h4>
                            <p className="text-church-secondary">Send targeted emails and SMS messages to specific groups.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Connection Tracking</h4>
                            <p className="text-church-secondary">Track spiritual growth and discipleship progress.</p>
                          </div>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1527266237111-a4989d028b4b?auto=format&fit=crop&w=800" 
                          alt="Member management interface" 
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      </div>
                    </CarouselItem>

                    <CarouselItem className="h-full">
                      <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-church-primary mb-4">Event Planning</h3>
                        <p className="text-church-secondary mb-6">
                          Schedule, promote, and manage all your church events with powerful and intuitive tools.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Calendar Management</h4>
                            <p className="text-church-secondary">Centralized calendar for all church events and room bookings.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Online Registration</h4>
                            <p className="text-church-secondary">Simple registration forms and attendance tracking.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Check-in System</h4>
                            <p className="text-church-secondary">Secure and efficient check-in for children and events.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Volunteer Coordination</h4>
                            <p className="text-church-secondary">Manage event volunteers and their assignments.</p>
                          </div>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800" 
                          alt="Event calendar interface" 
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      </div>
                    </CarouselItem>

                    <CarouselItem className="h-full">
                      <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-church-primary mb-4">Financial Tracking</h3>
                        <p className="text-church-secondary mb-6">
                          Manage your church finances with confidence and transparency.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Online Giving</h4>
                            <p className="text-church-secondary">Secure donations and recurring giving options.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Fund Accounting</h4>
                            <p className="text-church-secondary">Track designated funds and manage your budget.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Pledge Management</h4>
                            <p className="text-church-secondary">Track giving campaigns and capital projects.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Financial Reports</h4>
                            <p className="text-church-secondary">Clear insights with customizable reports.</p>
                          </div>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800" 
                          alt="Financial dashboard" 
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      </div>
                    </CarouselItem>

                    <CarouselItem className="h-full">
                      <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-church-primary mb-4">Classes Management</h3>
                        <p className="text-church-secondary mb-6">
                          Create, organize and manage educational programs and classes for all age groups in your church community.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Course Creation</h4>
                            <p className="text-church-secondary">Design curriculum, set learning objectives, and organize course materials.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Class Scheduling</h4>
                            <p className="text-church-secondary">Easily schedule classes, assign teachers, and manage room availability.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Student Progress</h4>
                            <p className="text-church-secondary">Track attendance, assignments, and spiritual development of students.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Resource Management</h4>
                            <p className="text-church-secondary">Organize teaching materials, videos, and digital resources for each class.</p>
                          </div>
                        </div>
                        <div className="bg-church-muted p-6 rounded-lg mb-6">
                          <h4 className="font-semibold mb-3 text-church-primary">How It Works</h4>
                          <ol className="list-decimal list-inside space-y-2 text-church-secondary">
                            <li>Create courses with learning objectives and curriculum plans</li>
                            <li>Schedule individual classes with specific dates and locations</li>
                            <li>Assign qualified teachers and track their availability</li>
                            <li>Manage student enrollment and attendance</li>
                            <li>Generate reports on class effectiveness and student progress</li>
                          </ol>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800" 
                          alt="Class management interface" 
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      </div>
                    </CarouselItem>

                    <CarouselItem className="h-full">
                      <div className="animate-fade-in">
                        <h3 className="text-2xl font-bold text-church-primary mb-4">Ministry Groups</h3>
                        <p className="text-church-secondary mb-6">
                          Foster deeper community connections through organized ministry groups and teams.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Small Groups</h4>
                            <p className="text-church-secondary">Organize and manage home groups and Bible studies.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Service Teams</h4>
                            <p className="text-church-secondary">Coordinate volunteers and ministry teams.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Communication Tools</h4>
                            <p className="text-church-secondary">Group messaging and resource sharing.</p>
                          </div>
                          <div className="bg-church-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-church-primary">Accountability</h4>
                            <p className="text-church-secondary">Track progress and foster spiritual growth.</p>
                          </div>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800" 
                          alt="Small group meeting" 
                          className="rounded-lg w-full h-48 object-cover"
                        />
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="flex justify-center mt-6">
                    <CarouselPrevious className="relative static translate-y-0 mr-2" />
                    <CarouselNext className="relative static translate-y-0 ml-2" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-church-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-church-primary">Trusted by Church Leaders</h2>
            <p className="mt-4 text-xl text-church-secondary max-w-2xl mx-auto">
              See what pastors and administrators are saying about MinistryHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="MinistryHub has transformed how we manage our congregation. The member tracking and financial tools have saved us countless hours."
              name="Pastor Michael Johnson"
              church="Grace Community Church"
              size="500 members"
            />
            <TestimonialCard
              quote="The event management features are incredible. We've seen a 30% increase in attendance since we started using MinistryHub to organize our services."
              name="Sarah Williams"
              church="Lighthouse Fellowship"
              size="150 members"
            />
            <TestimonialCard
              quote="As a small church, we needed something simple yet powerful. MinistryHub fits our needs perfectly and grows with us."
              name="Pastor David Rodriguez"
              church="New Life Church"
              size="75 members"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-church-primary">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-church-secondary max-w-2xl mx-auto">
              Choose the plan that fits your ministry's needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              tier="Starter"
              price="$29"
              description="Perfect for small churches just getting started"
              features={[
                "Up to 100 members",
                "Basic member management",
                "Simple event calendar",
                "Donation tracking",
                "Email support"
              ]}
              buttonText="Start Free Trial"
              popular={false}
            />
            <PricingCard
              tier="Growth"
              price="$79"
              description="For growing churches with expanded needs"
              features={[
                "Up to 500 members",
                "Advanced member profiles",
                "Group management",
                "Full financial suite",
                "Priority support",
                "Custom reporting"
              ]}
              buttonText="Start Free Trial"
              popular={true}
            />
            <PricingCard
              tier="Ministry"
              price="$149"
              description="Complete solution for larger ministries"
              features={[
                "Unlimited members",
                "Multi-campus support",
                "Advanced analytics",
                "API access",
                "Dedicated account manager",
                "Custom integrations",
                "24/7 phone support"
              ]}
              buttonText="Contact Sales"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-church-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-church-primary">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-church-secondary max-w-2xl mx-auto">
              Find answers to common questions about MinistryHub.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem
              question="How long does it take to set up MinistryHub?"
              answer="Most churches are fully set up within a day or two. Our onboarding team will help you import your existing data and configure the system to match your needs."
            />
            <FaqItem
              question="Can I import my existing member database?"
              answer="Yes! MinistryHub supports importing from Excel, CSV, and most popular church management systems. Our team will assist with the migration process."
            />
            <FaqItem
              question="Is my church data secure?"
              answer="Absolutely. We use enterprise-grade encryption and security practices to ensure your data is always protected. We never share your information with third parties."
            />
            <FaqItem
              question="What kind of support do you offer?"
              answer="All plans include email support. Growth and Ministry plans include priority support with faster response times, and the Ministry plan includes phone support."
            />
            <FaqItem
              question="Do you offer discounts for small churches?"
              answer="Yes, we offer special pricing for churches with fewer than 50 members. Contact our sales team for details."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-church-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Ready to Transform Your Church Management?</h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto text-white/90">
            Join hundreds of churches already using MinistryHub to grow their ministries and communities.
          </p>
          <div className="mt-10">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-church-primary hover:bg-white/90">
                Start Your Free 14-Day Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/70">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">MinistryHub</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
              <p className="text-sm text-gray-400">
                Subscribe to our newsletter for updates on new features and resources.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} MinistryHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
