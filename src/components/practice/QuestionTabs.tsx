import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const QuestionTabs = () => {
  return (
    <Tabs defaultValue="problem" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="problem">Problem</TabsTrigger>
        <TabsTrigger value="solution">Solution</TabsTrigger>
        <TabsTrigger value="quote">Quote</TabsTrigger>
      </TabsList>
      
      <TabsContent value="problem" className="mt-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border min-h-[200px]">
          <h3 className="text-2xl font-semibold mb-8 text-center text-gray-800">
            What is the probability of rolling a 15 in a single roll of a fair 25-sided die?
          </h3>
        </div>
      </TabsContent>
      
      <TabsContent value="solution" className="mt-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border min-h-[200px]">
          Solution content here...
        </div>
      </TabsContent>
      
      <TabsContent value="quote" className="mt-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border min-h-[200px]">
          Quote content here...
        </div>
      </TabsContent>
    </Tabs>
  );
};