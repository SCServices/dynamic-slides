import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Edit, Share2, Download } from 'lucide-react';

export default function ViewerPage() {
  const { deckId } = useParams();
  const [slides, setSlides] = useState([
    { id: 1, type: 'title', title: 'Quarterly Business Review', subtitle: 'Q2 2023 Performance & Insights' },
    { id: 2, type: 'text', title: 'Key Highlights', content: '• Revenue increased by 24% YoY\n• New customer acquisition up 18%\n• Product engagement metrics improved across all segments' },
    { id: 3, type: 'chart', title: 'Revenue Growth', chartType: 'bar' },
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which slide is currently in view
      const slideElements = document.querySelectorAll('.slide-section');
      let currentSlideIndex = 0;
      
      slideElements.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          currentSlideIndex = index;
        }
      });
      
      setActiveSlideIndex(currentSlideIndex);
      
      // Hide controls when scrolling down, show when at top
      if (scrollPosition > 100) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const slideElements = document.querySelectorAll('.slide-section');
    if (slideElements[index]) {
      slideElements[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Floating Controls */}
      <div 
        className={`fixed top-0 left-0 right-0 z-10 transition-transform duration-300 ${
          showControls ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-background/80 backdrop-blur-md border-b p-4">
          <div className="container max-w-7xl mx-auto flex items-center justify-between">
            <Link to={`/editor/${deckId}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
            
            <div className="text-center">
              <h1 className="font-semibold">Quarterly Business Review</h1>
              <div className="text-sm text-muted-foreground">Slide {activeSlideIndex + 1} of {slides.length}</div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slides */}
      <div className="pt-20">
        {slides.map((slide, index) => (
          <section 
            key={slide.id} 
            className="slide-section min-h-screen flex items-center justify-center p-6 md:p-12"
            style={{
              background: index % 2 === 0 ? 'var(--background)' : 'var(--muted)'
            }}
          >
            <Card className="w-full max-w-4xl shadow-xl">
              <CardContent className="p-8 md:p-12">
                {slide.type === 'title' && (
                  <div className="text-center space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold gradient-text">{slide.title}</h2>
                    <p className="text-xl md:text-2xl text-muted-foreground">{slide.subtitle}</p>
                  </div>
                )}
                
                {slide.type === 'text' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">{slide.title}</h2>
                    <div className="text-lg whitespace-pre-line">
                      {slide.content}
                    </div>
                  </div>
                )}
                
                {slide.type === 'chart' && (
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">{slide.title}</h2>
                    <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Chart visualization</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm shadow-lg"
          onClick={() => scrollToSlide(activeSlideIndex + 1)}
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}