import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/variables", "routes/variables.tsx"), route("/variables/:variableId", "routes/variable-details.tsx")] satisfies RouteConfig;
