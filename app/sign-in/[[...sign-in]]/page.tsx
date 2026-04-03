import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center w-full  justify-center h-screen">
      <div>
        <SignIn   />
      </div>
    </div>
  );
}
