import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="flex justify-center">
          <Layout className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg" className="mt-4">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;