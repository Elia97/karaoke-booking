import { Music } from "lucide-react";
import { Badge } from "@/components/ui";

interface HeaderProps {
  tableNumber: string;
}

export function Header({ tableNumber }: HeaderProps) {
  return (
    <div className="border-b">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <Music className="size-6 sm:size-9" />
            <h1 className="text-2xl sm:text-3xl font-bold">Karaoke</h1>
          </div>
          <p className="mb-2 sm:mb-3 text-sm sm:text-base text-muted-foreground">
            Trova la canzone perfetta per te
          </p>
          {tableNumber && (
            <Badge
              variant="secondary"
              className="mt-1 sm:mt-2 text-xs sm:text-sm"
            >
              Tavolo {tableNumber}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
