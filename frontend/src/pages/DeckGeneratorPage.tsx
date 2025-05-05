import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, Image, Table, FileText, ArrowLeft, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeckGeneratorPage() {
  const [activeTab, setActiveTab] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/editor/demo-deck-123');
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Handle file drop logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Header */}
      <header className="border-b py-4 px-6 md:px-10 bg-background">
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>
          <h1 className="text-xl font-semibold">Create New Deck</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <Card className="shadow-xl animate-fade-in">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              What would you like to turn into slides?
            </h2>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Text</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  <span>Screenshots</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-2">
                  <Table className="h-4 w-4" />
                  <span>Spreadsheet</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-6">
                <Textarea
                  placeholder="Paste your text content here... (e.g., meeting notes, article, report)"
                  className="min-h-[200px] mb-6"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="image" className="mt-6">
                <div
                  className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center min-h-[200px] mb-6 flex flex-col items-center justify-center gap-4"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <FileUp className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Drag & drop screenshots here</p>
                    <p className="text-sm text-muted-foreground">or click to browse files</p>
                  </div>
                  <Button variant="outline" className="mt-2">
                    Select Files
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="data" className="mt-6">
                <div
                  className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center min-h-[200px] mb-6 flex flex-col items-center justify-center gap-4"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Table className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Drag & drop Excel or CSV file</p>
                    <p className="text-sm text-muted-foreground">We'll turn your data into beautiful charts</p>
                  </div>
                  <Button variant="outline" className="mt-2">
                    Select File
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || (activeTab === 'text' && !textInput.trim())}
                className="px-8 gap-2"
              >
                <Wand2 className="h-5 w-5" />
                {isGenerating ? 'Generating slides...' : 'Generate Slides'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}