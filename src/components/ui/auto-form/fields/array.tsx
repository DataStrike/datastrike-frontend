import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { beautifyObjectName } from "../utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../accordion";
import AutoFormObject from "./object";
import { Button } from "../../button";
import { Plus, Trash } from "lucide-react";
import { Separator } from "../../separator";

export default function AutoFormArray({
  name,
  item,
  form,
  path = [],
  fieldConfig,
}: {
  name: string;
  item: z.ZodArray<any>;
  form: ReturnType<typeof useForm>;
  path?: string[];
  fieldConfig?: any;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });
  const title = item._def.description ?? beautifyObjectName(name);

  return (
    <AccordionItem value={name}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="border-l p-2 pl-4">
        {fields.map((_field, index) => {
          const key = [...path, index.toString()].join(".");
          return (
            <div className="mb-4 grid gap-6" key={`${key}`}>
              <AutoFormObject
                schema={item._def.type as z.ZodObject<any, any>}
                form={form}
                fieldConfig={fieldConfig}
                path={[...path, index.toString()]}
              />
              <Button
                variant="destructive"
                size="icon"
                type="button"
                onClick={() => remove(index)}
              >
                <Trash className="h-4 w-4" />
              </Button>
              <Separator />
            </div>
          );
        })}
        <Button
          type="button"
          onClick={() => append({})}
          className="flex p-2 items-center "
        >
          <Plus className="mr-1" size={14} />
          Add
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
}
