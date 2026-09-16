"use client";
import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";

/** Ловит utm-метки при заходе на сайт. Ничего не рисует. */
export default function UtmCatcher() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
