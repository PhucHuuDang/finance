import { z } from "zod";

import { Loader2 } from "lucide-react";

import { useGetAccountDetail } from "@/features/accounts/api/use-get-account-detail";
import { useOpenAccount } from "../hooks/use-open-account";

import { insertAccountSchema } from "@/db/schema";

import { AccountForm } from "./account-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEditAccount } from "../api/use-edit-account";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();
  const editMutation = useEditAccount(id);

  const accountQuery = useGetAccountDetail(id);

  const isLoading = accountQuery.isLoading;

  const isPending = editMutation.isPending;

  const onSubmit = (values: FormValues) => {
    // console.log(values);
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValue = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };

  console.log({ id });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Do you want to edit this account?</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex item-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={defaultValue}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
