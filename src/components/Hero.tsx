import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Manage Projects,
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Build Teams</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              The complete project management solution for teams, freelancers, students, and professionals. 
              Create projects, showcase your work, and collaborate seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg">
                Start Your Project
              </Button>
              <Button variant="outline" size="lg">
                View Gallery
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Project Management Dashboard" 
                className="rounded-2xl shadow-hover w-full h-auto"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-glow opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;