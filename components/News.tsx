import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function News() {
  return (
    <section
      id="news"
      className="flex justify-between items-center py-16 md:py-32"
    >
      <div className="w-1/2 flex flex-col gap-2 text-left">
        <h3 className="text-6xl font-semibold">Stay Connected</h3>
        <p className="text-lg">
          Subscribe to community news, event invites, and important
          announcements. We respect your privacy and only send meaningful
          updates.
        </p>
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email">Your Email</Label>
        <Input type="email" id="email" placeholder="Email" />
        <Button variant={"default"} size={"lg"}>
          Subscribe
        </Button>
      </div>
    </section>
  );
}
