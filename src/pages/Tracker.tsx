import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { z } from "zod";
import AutoForm from "@/components/ui/auto-form";
import { Separator } from "@/components/ui/separator.tsx";
import { MapsContainer } from "@/components/ui/mapsContainer.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SaveIcon } from "lucide-react";

const formSchema = z.object({
  teamName: z.string(),
  date: z.coerce.date(),
  info: z.string().optional(),
});

export function Tracker() {
  const [nbMaps, setNbMaps] = useState(1);

  const addMap = () => {
    setNbMaps(nbMaps + 1);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-semibold">Tracker</div>
      <div className="flex flex-col gap-3 w-full lg:flex-row">
        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Add a result</CardTitle>
            <CardDescription>Add a result to your stats</CardDescription>
          </CardHeader>
          <CardContent>
            <AutoForm
              formSchema={formSchema}
              fieldConfig={{
                info: { fieldType: "textarea" },
              }}
            ></AutoForm>
            <MapsContainer nbMaps={nbMaps} />
            <Button variant="outline" onClick={addMap} className="my-2">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add a map
            </Button>
            <Separator />
            <Button className="mt-2">
              <SaveIcon className="mr-2 h-4 w-4" />
              Save
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full lg:grow">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              View your results and stats in a table
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
