import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Collector for 10+ years",
      content:
        "PokéTrade has completely transformed how I collect cards. I've found rare cards I've been searching for years!",
      avatar: "/back.png",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Tournament Player",
      content:
        "The quality of cards and the verification process gives me confidence when purchasing for competitions.",
      avatar: "/back.png",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "New Collector",
      content:
        "As someone new to collecting, the community here has been incredibly welcoming and helpful.",
      avatar: "/back.png",
    },
  ];

  return (
    <section className="container py-12 md:py-24">
      <div className="mb-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          What Our Community Says
        </h2>
        <p className="text-muted-foreground mt-4 max-w-[700px]">
          Join thousands of satisfied collectors and traders
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-none shadow-lg">
            <CardContent className="pt-6">
              <Quote className="text-primary mb-4 h-8 w-8" />
              <p className="mb-6 italic">{testimonial.content}</p>
              <div className="flex items-center">
                <Avatar className="mr-4 h-10 w-10">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
