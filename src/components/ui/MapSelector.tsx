import { Fragment, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OW_MAPS } from "@/models/overwatch/maps";
import { capitalize } from "@/utils/functions.ts";

interface Props {
  selectedMap: string;
  onSelect: (value: string) => void;
}

export function MapSelector({ selectedMap, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between p-2"
        >
          {selectedMap ? capitalize(selectedMap) : "Select map..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 h-96 overflow-auto">
        <Command>
          <CommandInput placeholder="Search map..." />
          <CommandEmpty>No map found.</CommandEmpty>
          <CommandGroup>
            {Object.entries(OW_MAPS).map(([mapType, mapList]) => (
              <Fragment key={mapType}>
                {mapList.map((mapName) => (
                  <CommandItem
                    key={mapName}
                    value={mapName}
                    onSelect={(currentValue) => {
                      onSelect(
                        currentValue === selectedMap ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                  >
                    {mapName}
                  </CommandItem>
                ))}
              </Fragment>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
