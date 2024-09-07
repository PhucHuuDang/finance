"use client";

import { useMountedState } from "react-use";

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";

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
      <EditAccountSheet />
    </>
  );
};
