import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"
import { MemberCard } from "./MemberCard"
import { useSelector } from "react-redux";
import { selectMembers } from "@/features/members/membersSlice";

export function MembersList({ title = "Members" }: { title?: string }) {

    const members = useSelector(selectMembers);

    return (
        <div className="col-span-3 mt-4">
            <div className="flex items-center justify-start gap-5 mb-4">
                <h3 className="text-xl font-bold text-primary">{title}</h3>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <div className="absolute right-12 -top-12 flex gap-1">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-8 w-8 border-none hover:bg-slate-100 text-primary/70 hover:text-primary" />
                    <CarouselNext className="relative right-0 bottom-0 top-0 translate-y-0 h-8 w-8 border-none hover:bg-slate-100 text-primary/70 hover:text-primary" />
                </div>

                <CarouselContent className="-ml-6">
                    {members.map((person, idx) => {
                        return (
                            <CarouselItem key={idx} className="pl-6 lg:basis-1/2">
                                <MemberCard member={{
                                    name: person.personalDetails.name,
                                    role: person.personalDetails.role,
                                    bio: person.description.text || "No Description",
                                    projects: person.projects.length,
                                    rating: person.rating.avgRating,
                                    image: "https://github.com/shadcn.png"
                                }}
                                />
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
