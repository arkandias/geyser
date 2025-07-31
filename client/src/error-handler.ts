import { errorMessage } from "@geyser/shared";

const redirectToError = (error: unknown) => {
  const message = encodeURIComponent(errorMessage(error));
  window.location.href = `/error.html?message=${message}`;
};

// Catch all uncaught errors
window.addEventListener("error", (event) => {
  redirectToError(event.error);
});

// Catch unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  redirectToError(event.reason);
});
