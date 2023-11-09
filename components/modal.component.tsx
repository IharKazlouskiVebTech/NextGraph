"use client";

import React, { ReactNode, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ModalComponent = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onClose = useCallback((): void => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent): void => {
      if (e.target === overlay.current && onClose) {
        onClose();
      }
    },
    [overlay, onClose],
  );

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-8"
      >
        <Image src="/close.svg" width={17} height={17} alt="close-icon" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
