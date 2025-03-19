import FormGenerate from "@/components/ui/includes/FormGenrate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

const fomrSchema = z.object({
  feildName: z.string().nonempty(),
  placeholder: z.string().nonempty(),
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
    placeholder: "Select Type",
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

  const localfomr = localStorage.getItem("fomrState");
  const [fomrState, setFormState] = useState(localfomr ? JSON.parse(localfomr) : []);

  useEffect(() => {
    localStorage.setItem("fomrState", JSON.stringify(fomrState));
  }, [fomrState]);

  const onSubmit = (data) => {
    setFormState((prev) => {
      return [
        ...prev,
        {
          name: data.feildName,
          type: data.type,
          placeholder: data.placeholder,
        },
      ];
    });
    form.reset({
      feildName: "",
      placeholder: "",
      type: "",
    });
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
            submitText={"Add Field"}
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
