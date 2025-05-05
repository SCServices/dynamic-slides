import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Save, 
  Share2, 
  Plus, 
  Trash2, 
  MoveVertical, 
  Image as ImageIcon, 
  BarChart3, 
  Type, 
  Layout, 
  Wand2 
} from 'lucide-react';

export default function EditorPage() {
  const { deckId } = useParams();
  const [slides, setSlides] = useState([
    { id: 1, type: 'title', title: 'Quarterly Business Review', subtitle: 'Q2 2023 Performance & Insights' },
    { id: 2, type: 'text', title: 'Key Highlights', content: '• Revenue increased by 24% YoY\n• New customer acquisition up 18%\n• Product engagement metrics improved across all segments' },
    { id: 3, type: 'chart', title: 'Revenue Growth', chartType: 'bar' },
  ]);
  const [activeSlide, setActiveSlide] = useState(1);
  const [deckTitle, setDeckTitle] = useState('Quarterly Business Review');

  const handleAddSlide = (type: string) => {
    const newSlide = {
      id: slides.length + 1,
      type,
      title: `New ${type} slide`,
      content: '',
    };
    setSlides([...slides, newSlide]);
    setActiveSlide(newSlide.id);
  };

  const handleUpdateSlide = (id: number, field: string, value: string) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    ));
  };

  const handleDeleteSlide = (id: number) => {
    if (slides.length > 1) {
      const newSlides = slides.filter(slide => slide.id !== id);
      setSlides(newSlides);
      setActiveSlide(newSlides[0].id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Header */}
      <header className="border-b py-4 px-6 md:px-10 bg-background">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/generate" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Input 
              value={deckTitle} 
              onChange={(e) => setDeckTitle(e.target.value)} 
              className="font-semibold text-lg border-none bg-transparent focus-visible:ring-0 w-auto"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
            <Link to={`/view/${deckId}`}>
              <Button size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Slide Navigator */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Slides</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => handleAddSlide('text')}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {slides.map((slide) => (
              <Card 
                key={slide.id} 
                className={`cursor-pointer transition-all slide-transition ${activeSlide === slide.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setActiveSlide(slide.id)}
              >
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {slide.type === 'title' && <Type className="h-4 w-4 text-primary" />}
                    {slide.type === 'text' && <FileText className="h-4 w-4 text-primary" />}
                    {slide.type === 'chart' && <BarChart3 className="h-4 w-4 text-primary" />}
                    <span className="text-sm truncate max-w-[120px]">{slide.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoveVertical className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSlide(slide.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Add new slide</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="h-auto py-2 px-3 flex flex-col items-center gap-1" onClick={() => handleAddSlide('title')}>
                <Type className="h-4 w-4" />
                <span className="text-xs">Title</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 px-3 flex flex-col items-center gap-1" onClick={() => handleAddSlide('text')}>
                <FileText className="h-4 w-4" />
                <span className="text-xs">Text</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 px-3 flex flex-col items-center gap-1" onClick={() => handleAddSlide('chart')}>
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">Chart</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 px-3 flex flex-col items-center gap-1" onClick={() => handleAddSlide('image')}>
                <ImageIcon className="h-4 w-4" />
                <span className="text-xs">Image</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 px-3 flex flex-col items-center gap-1" onClick={() => handleAddSlide('split')}>
                <Layout className="h-4 w-4" />
                <span className="text-xs">Split</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 px-3 flex flex-col items-center gap-1">
                <Wand2 className="h-4 w-4" />
                <span className="text-xs">AI</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Slide Editor */}
        <div className="md:col-span-2 space-y-4">
          <Card className="shadow-lg min-h-[500px] flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              {slides.find(slide => slide.id === activeSlide)?.type === 'title' && (
                <div className="flex flex-col items-center justify-center text-center h-full space-y-6 p-8">
                  <Input 
                    value={slides.find(slide => slide.id === activeSlide)?.title || ''}
                    onChange={(e) => handleUpdateSlide(activeSlide, 'title', e.target.value)}
                    className="text-3xl font-bold border-none text-center bg-transparent focus-visible:ring-0"
                    placeholder="Slide Title"
                  />
                  <Textarea 
                    value={slides.find(slide => slide.id === activeSlide)?.subtitle || ''}
                    onChange={(e) => handleUpdateSlide(activeSlide, 'subtitle', e.target.value)}
                    className="text-xl border-none text-center bg-transparent focus-visible:ring-0 resize-none"
                    placeholder="Subtitle or description"
                  />
                </div>
              )}
              
              {slides.find(slide => slide.id === activeSlide)?.type === 'text' && (
                <div className="flex flex-col h-full space-y-4 p-6">
                  <Input 
                    value={slides.find(slide => slide.id === activeSlide)?.title || ''}
                    onChange={(e) => handleUpdateSlide(activeSlide, 'title', e.target.value)}
                    className="text-2xl font-semibold border-none bg-transparent focus-visible:ring-0"
                    placeholder="Slide Title"
                  />
                  <Textarea 
                    value={slides.find(slide => slide.id === activeSlide)?.content || ''}
                    onChange={(e) => handleUpdateSlide(activeSlide, 'content', e.target.value)}
                    className="flex-1 text-lg border-none bg-transparent focus-visible:ring-0 resize-none"
                    placeholder="Slide content"
                  />
                </div>
              )}
              
              {slides.find(slide => slide.id === activeSlide)?.type === 'chart' && (
                <div className="flex flex-col h-full space-y-4 p-6">
                  <Input 
                    value={slides.find(slide => slide.id === activeSlide)?.title || ''}
                    onChange={(e) => handleUpdateSlide(activeSlide, 'title', e.target.value)}
                    className="text-2xl font-semibold border-none bg-transparent focus-visible:ring-0"
                    placeholder="Chart Title"
                  />
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50" />
                      <p className="mt-2 text-muted-foreground">Chart visualization will appear here</p>
                      <Button variant="outline" className="mt-4">
                        Configure Chart
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Properties Panel */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="style">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="style" className="pt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Theme</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {['#6A4CFF', '#FFB400', '#FF4C6A', '#4CFF6A'].map((color, i) => (
                        <div 
                          key={i}
                          className="w-full aspect-square rounded-md cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-primary"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Layout</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="h-auto py-2 px-3 justify-start">
                        <Layout className="h-4 w-4 mr-2" />
                        <span className="text-xs">Default</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-2 px-3 justify-start">
                        <Layout className="h-4 w-4 mr-2" />
                        <span className="text-xs">Split</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="pt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Slide Settings</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="justify-start">
                          <span className="text-xs">Duplicate</span>
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start text-destructive">
                          <span className="text-xs">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}