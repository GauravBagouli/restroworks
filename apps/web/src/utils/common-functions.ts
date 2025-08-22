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

type ValidationError = {
  message: string;
  label?: string;
  path?: string;
};

type ApiError = {
  message?: string;
  errors?: {
    data?: {
      errors?: ValidationError[];
    };
  }[];
};


export function handleApiError(error: unknown): string {
  try {
    const err = error as ApiError;
    if (err?.errors?.length) {
      const nestedErrors =
        err.errors.flatMap((e) => e.data?.errors ?? []) ?? [];

      if (nestedErrors.length > 0) {
        return nestedErrors
          .map((e) => {
            const msgFn = validationMessages[e.message];
            return msgFn
              ? msgFn(e.label || e.path)
              : `${e.label || e.path || "Error"}: ${e.message}`;
          })
          .join("\n");
      }
    }

    if (err?.message) {
      const msgFn = validationMessages[err.message];
      return msgFn ? msgFn() : err.message;
    }

    return "Something went wrong. Please try again.";
  } catch (e) {
    console.error(e);
    return "Unexpected error occurred.";
  }
}
