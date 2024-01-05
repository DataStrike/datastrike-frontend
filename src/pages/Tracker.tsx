import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { DatePicker } from "@/components/ui/datepicker.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Tracker() {
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
            <div className="grid gap-2">
              <Input placeholder="Team name" />
              <DatePicker />
              <Textarea placeholder="Info" />
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Select a map" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>KOTH</SelectLabel>
                      <SelectItem value="lijiang">Lijiang</SelectItem>
                      <SelectItem value="nepal">Nepal</SelectItem>
                      <SelectItem value="oasis">Oasis</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
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
