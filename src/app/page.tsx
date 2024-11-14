import { auth } from "@/lib/auth";
import Image from "next/image";
import { SideNav } from "@/components/sidenav";
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  if (!session?.user) {
    redirect('/auth/login')
  }
  return (
    <section>
      <SideNav/>
    </section>    
  );
}
