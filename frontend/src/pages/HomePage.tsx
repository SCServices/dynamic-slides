import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, FileUp, BarChart3, Layout, Zap } from 'lucide-react';

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b py-4 px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layout className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Dynamic Slides</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth?mode=login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 hero-pattern">
        <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">Transform</span> raw content into stunning presentations
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Upload text, screenshots, or data and let AI create beautiful, shareable slide decks in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="group">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/generate">
                  <Button size="lg" variant="outline">
                    Try demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div 
                className="relative z-10 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 transform"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: isHovered ? '0 20px 40px rgba(106, 76, 255, 0.3)' : '0 10px 30px rgba(106, 76, 255, 0.2)'
                }}
              >
                <img 
                  src="/placeholder.svg" 
                  alt="Dynamic Slides Preview" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileUp className="h-10 w-10 text-primary" />,
                title: "Upload Content",
                description: "Drag and drop text, screenshots, or spreadsheets to get started."
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "AI Processing",
                description: "Our AI analyzes your content and creates structured slides automatically."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
                title: "Edit & Share",
                description: "Customize your deck and share it with a beautiful, scrollable interface."
              }
            ].map((feature, index) => (
              <Card key={index} className="slide-card border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 md:px-10">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Layout className="h-5 w-5 text-primary" />
            <span className="font-semibold">Dynamic Slides</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dynamic Slides. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}