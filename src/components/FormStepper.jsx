import { Step, Stepper, useStepper } from "@/components/ui/stepper";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

// import React from "react";
import { Button } from "./ui/button";

const steps = [{ label: "Step 1" }, { label: "Step 2" }];

const FormStepper = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <FirstStepForm />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <SecondStepForm />
            </Step>
          );
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
};

const FirstFormSchema = z.object({
  fullname: z.string().min(1).max(255, {
    message: "Enter your full name",
  }),
  email: z.string().email().min(1).max(255, {
    message: "Invalid email address",
  }),
});

function FirstStepForm() {
  const { nextStep } = useStepper();

  const form = useForm({
    resolver: zodResolver(FirstFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  function onSubmit(data) {
    nextStep();
    toast({
      title: "First step submitted!",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Your email address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

const SecondFormSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function SecondStepForm() {
  const { nextStep } = useStepper();

  const form = useForm({
    resolver: zodResolver(SecondFormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(data) {
    nextStep();
    toast({
      title: "Second step submitted!",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>This is your private password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();

  return (
    <div className="flex w-full justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="secondary"
          >
            Prev
          </Button>
          <Button size="sm">
            {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) return null;

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
    </div>
  );
}

export default FormStepper;
