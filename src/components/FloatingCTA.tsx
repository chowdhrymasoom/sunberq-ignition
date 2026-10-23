import { MessageCircle } from "lucide-react";

export function FloatingCTA() {
  return (
    <a
      href="https://wa.me/919719358578"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 h-12 px-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition-all"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Talk to us</span>
    </a>
  );
}
