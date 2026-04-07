import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Cpu, Lightbulb, Sparkles } from "lucide-react";

const PersonalizedOverview = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Popular Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Popular Projects
            </h2>
            <Button variant="link" className="text-muted-foreground">
              See All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Card 1 */}
            <Card className="overflow-hidden border-none shadow-md">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
                  alt="Bio-Dome"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="space-y-1">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary" className="uppercase text-[10px]">
                    IOT
                  </Badge>
                  <Badge variant="secondary" className="uppercase text-[10px]">
                    Expert
                  </Badge>
                </div>
                <CardTitle className="text-xl">Automated Bio-Dome v2</CardTitle>
                <CardDescription className="line-clamp-2">
                  A complete climate-controlled system for exotic plants using
                  AI for...
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Badge variant="outline" className="rounded-full">
                  +12
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span>4.9 (1.2k)</span>
                </div>
              </CardFooter>
            </Card>

            {/* Project Card 2 */}
            <Card className="overflow-hidden border-none shadow-md">
              <div className="aspect-video relative">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                  alt="Neon Visor"
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader className="space-y-1">
                <div className="flex gap-2 mb-2">
                  <Badge variant="secondary" className="uppercase text-[10px]">
                    Wearables
                  </Badge>
                  <Badge variant="secondary" className="uppercase text-[10px]">
                    Intermediate
                  </Badge>
                </div>
                <CardTitle className="text-xl">Neon-Sync Visor</CardTitle>
                <CardDescription className="line-clamp-2">
                  Bluetooth reactive visor with OLED data overlay and
                  environmental...
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Badge variant="outline" className="rounded-full">
                  +45
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span>5.0 (840)</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Right Column: In Progress & AI */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">In Progress</h2>

          <div className="space-y-4">
            {/* Progress Item 1 */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 flex gap-4">
                <div className="bg-secondary p-3 rounded-lg h-fit">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">Lunar Rover MK-I</h4>
                    <p className="text-xs text-muted-foreground">
                      Last edited 2h ago
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span>Wiring Simulation</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Item 2 */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 flex gap-4">
                <div className="bg-secondary p-3 rounded-lg h-fit">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm">
                      Smart Lighting Grid
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Last edited 1d ago
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span>Component Sourcing</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestion Card */}
            <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                  <Sparkles className="w-4 h-4" />
                  AI Intelligence
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Based on your Rover project, I suggest checking out the new
                  high-torque brushless motors just added to stock.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="p-0 h-auto gap-2">
                  Open Suggestions <ExternalLink className="w-3 h-3" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedOverview;
