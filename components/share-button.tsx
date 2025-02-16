"use client";

import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton({ pollId }: { pollId: string }) {
  const shareUrl = `${window.location.origin}/poll/${pollId}`;

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast.success("Link copied to clipboard!");
        }}
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
      <Button
        onClick={() => {
          navigator.share({
            title: "Vote in this poll",
            url: shareUrl,
          });
        }}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
}
