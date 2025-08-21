const validationMessages: Record<string, (label?: string) => string> = {
  "validation:longerThanMin": (label) =>
    `${label || "This field"} is too short.`,
  "validation:shorterThanMax": (label) =>
    `${label || "This field"} is too long.`,
  "validation:greaterThanMax": (label) =>
    `${label || "This field"} is greater than the maximum allowed.`,
  "validation:lessThanMin": (label) =>
    `${label || "This field"} is less than the minimum allowed.`,
  "validation:email": (label) =>
    `Please enter a valid ${label?.toLowerCase() || "email address"}.`,
  "validation:requiresAtLeast": (label) =>
    `${label || "This field"} requires at least one item.`,
  "validation:invalid": (label) =>
    `${label || "This field"} has an invalid value.`,
};

export function handleApiError(error: any): string {
  try {
    if (error?.errors?.length > 0) {
      const nestedErrors = error.errors.flatMap(
        (err: any) => err?.data?.errors || []
      );
      if (nestedErrors.length > 0) {
        return nestedErrors
          .map((e: any) => {
            const msgFn = validationMessages[e.message];
            return msgFn
              ? msgFn(e.label || e.path)
              : `${e.label || e.path || "Error"}: ${e.message}`;
          })
          .join("\n");
      }
    }

    if (error?.message) {
      const msgFn = validationMessages[error.message];
      return msgFn ? msgFn() : error.message;
    }

    return "Something went wrong. Please try again.";
  } catch (e) {
    return "Unexpected error occurred.";
  }
}
