import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Building2, Calendar, DollarSign, MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  budget: number | null;
  start_date: string | null;
  end_date: string | null;
  location: string | null;
  project_type: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
}

const statusColors: Record<string, string> = {
  planning: "bg-blue-100 text-blue-800",
  in_progress: "bg-green-100 text-green-800", 
  on_hold: "bg-yellow-100 text-yellow-800",
  completed: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusLabels: Record<string, string> = {
  planning: "Planning",
  in_progress: "In Progress",
  on_hold: "On Hold", 
  completed: "Completed",
  cancelled: "Cancelled"
};

const typeLabels: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial", 
  industrial: "Industrial",
  infrastructure: "Infrastructure"
};

const Projects = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    
    if (user) {
      fetchProjects();
    }
  }, [user, authLoading, navigate]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error("Failed to fetch projects");
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      toast.error("Error loading projects");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return "Budget not set";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="pt-20 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage your construction projects</p>
          </div>
          <Button onClick={() => navigate("/projects/new")} className="gap-2">
            <Plus size={16} />
            New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <Building2 size={48} className="mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">No projects yet</h3>
                <p className="text-muted-foreground">Get started by creating your first construction project.</p>
              </div>
              <Button onClick={() => navigate("/projects/new")} className="gap-2">
                <Plus size={16} />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="hover:shadow-hover transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">
                        {project.description || "No description provided"}
                      </CardDescription>
                    </div>
                    <Badge className={statusColors[project.status] || "bg-gray-100 text-gray-800"}>
                      {statusLabels[project.status] || project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 size={14} />
                    <span>{typeLabels[project.project_type] || project.project_type}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>
                  )}
                  
                  {project.budget && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign size={14} />
                      <span>{formatCurrency(project.budget)}</span>
                    </div>
                  )}

                  {project.start_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>
                        {formatDate(project.start_date)}
                        {project.end_date && ` - ${formatDate(project.end_date)}`}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Created {formatDate(project.created_at)}</span>
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>Team</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;