import { VariablesWrapper } from "~/pages/variables";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function VariablesPage() {
  return <VariablesWrapper />;
}
