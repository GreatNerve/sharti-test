import FormGenerate from "@/components/ui/includes/FormGenrate";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const fomrSchema = z.object({
  feildName: z.string().nonempty(),
  type: z.string().nonempty(),
});

const fomrmShape = [
  {
    name: "feildName",
    type: "text",
    placeholder: "Field Name",
  },
  {
    name: "placeholder",
    type: "text",
    placeholder: "Placeholder",
  },
  {
    name: "type",
    type: "select",
    options: [
      { value: "text", label: "Text" },
      { value: "email", label: "Email" },
      { value: "number", label: "Number" },
      { value: "textarea", label: "Textarea" },
    ],
  },
];

export default function Home() {
  const form = useForm({
    resolver: zodResolver(fomrSchema),
  });
  const [fomrState, setFormState] = useState([]);

  const onSubmit = (data) => {
    setFormState((prev) => {
      if (data.type === "name") {
        return [...prev, { name: data.feildName, type: data.type , placeholder: data.placeholder}];
      }
    });
    form.reset();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-screen">
      <div className="bg-gray-100 p-4 rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Form</h1>
        <div className="w-full max-w-[400px]">
          <FormGenerate
            form={form}
            formFields={fomrmShape}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </div>
      </div>
      <div className=" p-4 rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">View Form</h1>
        <div className="w-full max-w-[400px]">
          {fomrState?.length > 0 ? (
            <FormGenerate form={form} formFields={fomrState} />
          ) : (
            <div className="text-center text-gray-500">No Form Created Yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
