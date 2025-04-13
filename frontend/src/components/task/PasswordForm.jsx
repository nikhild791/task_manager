import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const PasswordFormSchema = z.object({
  oldpassword: z.string().min(3, "oldPassword must be at least 5 characters"),
  newpassword: z.string().min(5, "newPassword must be at least 5 characters"),
});

const PasswordForm = ({ onSubmit }) => {
  const { currentUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      oldpassword: "",
      newpassword: ""
    },
  });

  const handleSubmit = (values) => {
    if (!currentUser) return;
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="oldpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter old password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update Password
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForm;
