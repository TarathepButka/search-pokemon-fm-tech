import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<string, string> = {
  bug: "bg-[#A8B820] text-white shadow-[#A8B820]/30 shadow-lg",
  dark: "bg-[#705848] text-white shadow-[#705848]/30 shadow-lg",
  dragon: "bg-[#7038F8] text-white shadow-[#7038F8]/30 shadow-lg",
  electric: "bg-[#F8D030] text-[#1e293b] shadow-[#F8D030]/30 shadow-lg",
  fairy: "bg-[#EE99AC] text-white shadow-[#EE99AC]/30 shadow-lg",
  fighting: "bg-[#C03028] text-white shadow-[#C03028]/30 shadow-lg",
  fire: "bg-[#F08030] text-white shadow-[#F08030]/30 shadow-lg",
  flying: "bg-[#A890F0] text-white shadow-[#A890F0]/30 shadow-lg",
  ghost: "bg-[#705898] text-white shadow-[#705898]/30 shadow-lg",
  grass: "bg-[#78C850] text-[#1e293b] shadow-[#78C850]/30 shadow-lg",
  ground: "bg-[#E0C068] text-[#1e293b] shadow-[#E0C068]/30 shadow-lg",
  ice: "bg-[#98D8D8] text-[#1e293b] shadow-[#98D8D8]/30 shadow-lg",
  normal: "bg-[#A8A878] text-[#1e293b] shadow-[#A8A878]/30 shadow-lg",
  poison: "bg-[#A040A0] text-white shadow-[#A040A0]/30 shadow-lg",
  psychic: "bg-[#F85888] text-white shadow-[#F85888]/30 shadow-lg",
  rock: "bg-[#B8A038] text-white shadow-[#B8A038]/30 shadow-lg",
  steel: "bg-[#B8B8D0] text-[#1e293b] shadow-[#B8B8D0]/30 shadow-lg",
  water: "bg-[#6890F0] text-white shadow-[#6890F0]/30 shadow-lg",
};

export function TypeBadge({ type }: { type: string }) {
  const style =
    TYPE_STYLES[type.toLowerCase()] ?? "bg-muted text-muted-foreground";

  return (
    <Badge
      className={cn(
        "border-transparent px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider",
        style,
      )}
    >
      {type}
    </Badge>
  );
}
