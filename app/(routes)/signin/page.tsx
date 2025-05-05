import { auth, signIn } from "@/app/auth";
import { H1 } from "@/components/typography/headings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { domain } from "@/lib/utils";
// import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

/**
 * Renders the sign-in page, redirecting authenticated users to the home page.
 *
 * Displays options for users to sign in using GitHub or Google. If the user is already authenticated, they are redirected to the root path.
 */
export default async function Page() {
  if (await auth()) redirect("/");

  return (
    <div className="m-10">
      <H1>Sign in Page</H1>
      <div className="text-center">
        In order to trade you must sign in with one of the following providers.
      </div>
      <div className="mx-auto mt-4 w-fit">
        <form
          action={async (fd) => {
            "use server";
            const providerValue = fd.get("provider") as string;
            const provider = providerValue.replace("Sign in with ", "");
            switch (provider) {
              case "Google":
                await signIn("google", { redirectTo: domain });
                break;
              case "Github":
                await signIn("github", { redirectTo: domain });
                break;
              default:
                console.error("Invalid provider");
                redirect("/");
            }
          }}
        >
          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="focus-visible:bg-primary/90 cursor-pointer"
              asChild
            >
              <Input
                className="text-white"
                name="provider"
                type="submit"
                value="Sign in with Github"
              />
              {/* <GitHubLogoIcon /> */}
            </Button>
            <Button
              type="submit"
              className="focus-visible:bg-primary/90 cursor-pointer"
              asChild
            >
              <Input
                className="text-white"
                name="provider"
                type="submit"
                value="Sign in with Google"
              />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
