import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const loginScehma = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormField = z.infer<typeof loginScehma>;

export default function FormData() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormField>({
    resolver: zodResolver(loginScehma),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data.email);
    console.log(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("email")} placeholder="Email" />
      {errors.email?.message}
      <input type="password" {...register("password")} placeholder="password" />
      {errors.password?.message}
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
    </form>
  );
}
