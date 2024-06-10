"use client";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { useEffect, useState } from "react";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  //*    const [isMounted, setIsMounted] = useState(false);
  //*   useEffect(() => {
  //*    setIsMounted(true);
  // *  }, []);

  //? all of above equivalent useMountedState() ==> fix hydration

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewAccountSheet />
    </>
  );
};
