import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, FolderOpen, Users, Image, Plus, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Teams", href: "#teams", icon: Users },
    { name: "Gallery", href: "#gallery", icon: Image },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BuildIT
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => item.href.startsWith('#') ? document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }) : navigate(item.href)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-smooth"
                >
                  <item.icon size={16} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="default" onClick={() => navigate("/projects/new")}>
                  <Plus size={16} />
                  New Project
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Welcome to BuildIT
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        const { error } = await signOut();
                        if (error) {
                          toast.error("Error signing out");
                        } else {
                          toast.success("Signed out successfully");
                          navigate("/");
                        }
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="ghost" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 shadow-card">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.href.startsWith('#')) {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate(item.href);
                    }
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  <item.icon size={16} />
                  {item.name}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                {user ? (
                  <>
                    <Button 
                      variant="default" 
                      className="w-full justify-start"
                      onClick={() => {
                        navigate("/projects/new");
                        setIsMenuOpen(false);
                      }}
                    >
                      <Plus size={16} />
                      New Project
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={async () => {
                        const { error } = await signOut();
                        if (error) {
                          toast.error("Error signing out");
                        } else {
                          toast.success("Signed out successfully");
                          navigate("/");
                        }
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut size={16} />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;