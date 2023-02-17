import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

export type SnackBarVariant = "normal" | "success" | "error";

const _panelClass = (variant?: SnackBarVariant): string[] | undefined => {
  return variant === "success"
    ? ["snack-success"]
    : variant === "error"
    ? ["snack-error"]
    : undefined;
};

@Injectable({ providedIn: "root" })
export class SnackBarService {
  public constructor(private readonly _snackBar: MatSnackBar) {}

  public snackbar = (
    message: string,
    variant?: SnackBarVariant,
    duration = 10000
  ): void => {
    this._snackBar.open(message, "إغلاق", {
      direction: "rtl",
      duration,
      panelClass: _panelClass(variant),
    });
  };
}
