import { AppSidebar } from "@/components/app-sidebar";
import { FeaturedProducts } from "@/components/home/featured-products";
import FeaturedProductsSection from "@/components/studio/FeaturedProductsSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { Plus, Cpu, Zap, Radio, Send } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import PersonalizedOverview from "@/components/studio/PersonalizedOverview";
const page = async () => {
  const sampleProjects = [
    {
      id: 1,
      title: "Smart Home Hub",
      desc: "IoT controller with ESP32",
      icon: Radio,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Line Follower Robot",
      desc: "Arduino based robotics",
      icon: Cpu,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Weather Station",
      desc: "Solar powered sensors",
      icon: Zap,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
    },
  });

  return (
    <div>
      <AppSidebar />

      <div className="p-20">
        <SidebarTrigger />

        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Electronics Platform</h1>
            <p className="text-gray-500">
              Design, simulate, and build your next hardware project.
            </p>
          </div>
          <Button className="p-6 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-indigo-200">
            <Plus className="w-5 h-5" />
            Start New Project
          </Button>
        </div>

        <div className="h-[50vh] overflow-hidden p-4  pt-0  flex flex-col items-center justify-center ">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              What you are building today?
            </h1>
            <p className="text-gray-500">
              Start from scratch or use a template
            </p>
          </div>
          <div className="w-full">
            {/* <Input placeholder="Start Chating with AI" /> */}
            <div className="flex gap-2 items-center max-w-7xl mx-auto">
              <Textarea placeholder="E.g., I want to build a line follower..." />

              <Button
                className="p-5  rounded-md transition-colors"
                variant="outline"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <FeaturedProductsSection featuredProducts={featuredProducts} />

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/70 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${project.color}`}
                >
                  <project.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
            <PersonalizedOverview />
        </div>
      </div>
    </div>
  );
};

export default page;
