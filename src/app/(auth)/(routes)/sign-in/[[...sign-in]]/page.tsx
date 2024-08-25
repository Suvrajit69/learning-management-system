import { SignIn } from "@clerk/nextjs";
export const runtime = 'edge';
 
export default function Page() {
  return <SignIn />;
}