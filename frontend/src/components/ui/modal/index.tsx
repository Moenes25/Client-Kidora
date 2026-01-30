// src/components/ui/modal.tsx
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const wrapper = isFullscreen ? "w-full h-full" : "w-full max-w-2xl";
  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center">
      {!isFullscreen && (
        <div
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-[6px]"
          onClick={onClose}
        />
      )}
      <div
        ref={modalRef}
        className={[
          "relative overflow-hidden rounded-3xl border border-white/10 bg-white/90 shadow-2xl backdrop-blur dark:bg-gray-900/90",
          wrapper,
          className || "",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-gray-700 shadow hover:bg-white/90 dark:bg-gray-800/70 dark:text-gray-200"
            aria-label="Fermer la fenêtre"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
