import {
  Cpu,
  Zap,
  PlayCircle,
  ShoppingCart,
  TrendingDown,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const WorkspacePanel = ({ components, totalCost, onAddToCart }: any) => {
  return (
    <Card className="flex-1 flex flex-col shadow-sm border-muted overflow-hidden">
      <Tabs defaultValue="components" className="flex flex-col h-full">
        <CardHeader className="p-0 border-b bg-muted/20">
          <TabsList className="w-full justify-start rounded-none bg-transparent h-14 p-0">
            <TabsTrigger
              value="components"
              className="h-full px-6 data-[state=active]:bg-background rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <Cpu className="w-4 h-4 mr-2" /> BOM
            </TabsTrigger>
            <TabsTrigger
              value="circuit"
              className="h-full px-6 data-[state=active]:bg-background rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <Zap className="w-4 h-4 mr-2" /> Circuit
            </TabsTrigger>
            <TabsTrigger
              value="simulation"
              className="h-full px-6 data-[state=active]:bg-background rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              <PlayCircle className="w-4 h-4 mr-2" /> Simulation
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="flex-1 p-6">
          <TabsContent value="components" className="m-0 h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <CardTitle>Bill of Materials</CardTitle>
                <CardDescription>
                  Recommended components for your build
                </CardDescription>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  Estimated Cost
                </Badge>
                <div className="text-2xl font-bold text-primary">
                  ${totalCost.toFixed(2)}
                </div>
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-22rem)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                {components.map((comp: any) => (
                  <Card
                    key={comp.id}
                    className="bg-muted/20 border-muted-foreground/10 hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">{comp.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ${comp.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onAddToCart(comp)}
                      >
                        <ShoppingCart className="w-4 h-4 text-primary" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </CardContent>

        <div className="p-4 border-t bg-muted/10 flex justify-end gap-3">
          <Button variant="outline" size="sm" className="h-9 px-4">
            <FileText className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button variant="secondary" size="sm" className="h-9 px-4">
            <TrendingDown className="w-4 h-4 mr-2" /> Optimize
          </Button>
          <Button size="sm" className="h-9 px-4">
            Checkout
          </Button>
        </div>
      </Tabs>
    </Card>
  );
};
