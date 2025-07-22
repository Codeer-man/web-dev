import LoginForm from "@/components/loginform";
import { login } from "@/lib/action/(auth)/auth";

export default async function loaginPage() {
  const handlRes = async () => {
    let res = await login({
      email: "example@gmail.com",
      password: "checkhere123",
    });
    console.log(res, "response");
  };

  return (
    <div>
      {/* clienst side auth login  */}
      <LoginForm />
      {/* server side auth  */}
      <h1>client</h1>
      <button>Submit</button>
    </div>
  );
}
