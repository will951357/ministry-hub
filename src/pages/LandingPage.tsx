
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
                <Carousel className="w-full h-full" setApi={(api) => {
                  // You can handle carousel API here if needed
                }}>
                  <CarouselContent className="h-full">
                    <CarouselItem className="h-full" value="mobile">
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

                    <CarouselItem className="h-full" value="members">
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

                    <CarouselItem className="h-full" value="events">
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

                    <CarouselItem className="h-full" value="finance">
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

                    <CarouselItem className="h-full" value="classes">
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

                    <CarouselItem className="h-full" value="groups">
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
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Updates</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Webinars</a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} MinistryHub. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ quote, name, church, size }: { quote: string; name: string; church: string; size: string }) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="text-yellow-500 flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-church-secondary mb-6 italic">"{quote}"</p>
        <div>
          <p className="font-semibold text-church-primary">{name}</p>
          <p className="text-sm text-church-secondary">{church}</p>
          <p className="text-xs text-gray-500">{size}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Pricing Card Component
function PricingCard({ tier, price, description, features, buttonText, popular = false }: 
  { tier: string; price: string; description: string; features: string[]; buttonText: string; popular?: boolean }) {
  return (
    <div className={`rounded-xl overflow-hidden ${popular ? "ring-2 ring-church-accent relative transform scale-105 shadow-xl" : "border border-gray-200 shadow"}`}>
      {popular && (
        <div className="bg-church-accent text-white text-xs font-semibold text-center py-1">
          MOST POPULAR
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-church-primary">{tier}</h3>
        <div className="mt-4 flex items-baseline text-church-primary">
          <span className="text-4xl font-extrabold">{price}</span>
          <span className="ml-1 text-xl text-gray-500">/month</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-church-accent flex-shrink-0 mr-2 mt-0.5" />
              <span className="text-church-secondary">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`mt-8 w-full ${popular ? "bg-church-accent hover:bg-church-accent/90" : ""}`}
          variant={popular ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

// FAQ Item Component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-medium text-church-primary">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`px-6 pb-4 ${isOpen ? "block" : "hidden"}`}
      >
        <p className="text-church-secondary">{answer}</p>
      </div>
    </div>
  );
}
