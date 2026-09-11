import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/registerations")({
  beforeLoad: () => {
    throw redirect({
      to: "/registrations",
      statusCode: 301,
    });
  },
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, follow" },
      { title: "Redirecting to Registrations — GetIntoD2C" },
    ],
    links: [
      { rel: "canonical", href: "https://getintod2c.in/registrations" },
    ],
  }),
  component: () => null,
});
