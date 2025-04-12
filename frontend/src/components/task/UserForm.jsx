
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



const UserFormSchema = z.object({
  username: z.string().min(3, "Title must be at least 3 characters"),
  
});

const UserForm = ({ onSubmit, isSubmitting }) => {
 

  const { currentUser } = useAuth();
  
  const form = useForm({
    resolver: zodResolver(UserFormSchema),
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." :  "Create User"}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
