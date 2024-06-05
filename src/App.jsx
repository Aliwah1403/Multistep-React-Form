import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  { id: "Step 1", name: "Personal information" },
  { id: "Step 2", name: "Address" },
  { id: "Step 3", name: "Summary" },
];

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Please enter a valid email.",
  }),
  country: z.string().min(2, {
    country: "Please select your country of residence..",
  }),
  // country: z
  //   .string({
  //     required_error: "Please select your country of residence.",
  //   })
  //   .country(),
});

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setpreviousStep] = useState(0);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
    },
  });

  function onSubmit(values) {
    //  toast({
    //    title: "Form successfully submitted",
    //    description: "You can view your entered data on your profile"
    //  });
    console.log(values);
  }

  return (
    <div className="h-screen">
      <div className="h-full flex justify-center items-center">
        {" "}
        <Dialog>
          <DialogTrigger>
            {" "}
            <Button>
              <PlusIcon className="mr-1" />
              New Data
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new data</DialogTitle>
              <DialogDescription>
                Make additions to your data here. Click save at the end when you
                are done
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <nav aria-label="Progress">
                <ol
                  role="list"
                  className="space-y-4 md:flex md:space-x-8 md:space-y-0"
                >
                  {steps.map((step, index) => (
                    <li key={step.name} className="md:flex-1">
                      {currentStep > index ? (
                        <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                          <span className="text-sm font-medium text-sky-600 transition-colors">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      ) : currentStep === index ? (
                        <div
                          className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                          aria-current="step"
                        >
                          <span className="text-sm font-medium text-sky-600">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      ) : (
                        <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                          <span className="text-sm font-medium text-gray-500 transition-colors">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              {/* Data form */}
              {currentStep === 0 && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-row gap-x-6 w-full ">
                      <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter
                      className={cn(
                        " sm:justify-between ",
                        "gap-2 pt-2 sm:space-x-0"
                      )}
                    >
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <div className="flex flex-row gap-1">
                        {" "}
                        <Button
                          type="button"
                          size="icon"
                          onClick={prev}
                          disabled={currentStep === 0}
                        >
                          <ChevronLeft />
                        </Button>
                        <Button size="icon" type="button" onClick={next}>
                          <ChevronRight />
                        </Button>
                      </div>
                    </DialogFooter>
                  </form>
                </Form>
              )}
              {currentStep === 1 && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your country of residence" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="m@example.com">
                                Kenya
                              </SelectItem>
                              <SelectItem value="m@google.com">
                                Tanzania
                              </SelectItem>
                              <SelectItem value="m@support.com">
                                Uganda
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-row gap-x-6 w-full ">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>State / Province</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>ZIP / Postal code</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter
                      className={cn(
                        " sm:justify-between ",
                        "gap-2 pt-2 sm:space-x-0"
                      )}
                    >
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <div className="flex flex-row gap-1">
                        {" "}
                        <Button type="button" size="icon" onClick={prev}>
                          <ChevronLeft />
                        </Button>
                        <Button size="icon" type="button" onClick={next}>
                          <ChevronRight />
                        </Button>
                      </div>
                    </DialogFooter>
                  </form>
                </Form>
              )}
              {currentStep === 2 && (
                <>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Complete
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Thank you for your submission
                  </p>
                  <DialogFooter
                    className={cn(
                      " sm:justify-between ",
                      "gap-2 pt-2 sm:space-x-0"
                    )}
                  >
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <div className="flex flex-row gap-1">
                      {" "}
                      <Button type="button" size="icon" onClick={prev}>
                        <ChevronLeft />
                      </Button>
                      <Button
                        size="icon"
                        type="button"
                        disabled={currentStep === steps.length - 1}
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </DialogFooter>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
