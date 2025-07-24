import { Card } from "@/components/ui/card";
import { FolderOpen, Users, Image, Calendar, Target, BarChart3 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FolderOpen,
      title: "Project Management",
      description: "Create, organize, and track projects with intuitive boards and timelines."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Build teams, assign tasks, and collaborate seamlessly across all projects."
    },
    {
      icon: Image,
      title: "Portfolio Gallery",
      description: "Showcase your completed projects to impress clients and stakeholders."
    },
    {
      icon: Calendar,
      title: "Timeline Tracking",
      description: "Stay on schedule with visual timelines and milestone tracking."
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and track project goals with clear metrics and progress indicators."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get insights into team performance and project success rates."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From freelancers to enterprise teams, our platform adapts to your workflow and grows with your ambitions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={feature.title} className="p-6 shadow-card hover:shadow-hover transition-smooth group">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-primary rounded-lg mr-4 group-hover:shadow-hover transition-smooth">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;