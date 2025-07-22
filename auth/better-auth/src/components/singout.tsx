"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  async function handlLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }
  //! in client
  // to get session first method
  const { data: session, isPending } = authClient.useSession();
  // second method
  // const { data: session, error } = authClient.getSession();

  console.log(session);
  const user = session?.user;
  return (
    <div>
      <button onClick={handlLogout}>{user?.name.charAt(0)} </button>
    </div>
  );
}
