"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MagicLinkForm } from "./MagicLinkForm";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="alchemy-glass overflow-hidden border-electric-orchid/45 bg-[#08080d]/95 p-0 text-hot-white shadow-[0_0_70px_rgba(139,92,246,0.28)] sm:max-w-[460px]">
        <div className="h-px bg-gradient-to-r from-plasma-violet via-electric-orchid to-signal-cyan shadow-[0_0_18px_var(--electric-orchid)]" />
        <div className="p-6 sm:p-7">
          <DialogHeader className="text-left">
            <p className="alchemy-kicker">Secure entry</p>
            <DialogTitle className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-hot-white">
              Enter Interface Alchemy
            </DialogTitle>
            <DialogDescription className="mt-2 leading-6 text-white/50">
              One email. One secure link. No password to remember or recover.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <MagicLinkForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
