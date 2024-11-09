import { auth } from "@/lib/auth";
import Image from "next/image";
import { LoginButton, LogoutButton } from "./AuthButton";

export default async function Home() {
  const session = await auth()
  return (
    <div className="mx-auto py-4 max-w-lg">
      <div>
        <h1>
          {session?.user
            ? "AUTHENTICATED" + " " + session.user.email
            : "NOT AUTHENTICATED"
          }
        </h1>
      </div>
      <div>
          {!session?.user
            ? <LoginButton/>
            : <LogoutButton/>
          }
      </div>
    </div>
  );
}
