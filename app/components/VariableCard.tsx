import { Link } from "react-router";

interface Variable {
  ID: number;
  Name: string;
  Description: string;
  GroupName: string;
  DataType: "string" | "int" | "decimal" | "lookup";
}



export function VariableCard({ variable }: { variable: Variable }) {
  const TYPE_STYLES: Record<string, string> = {
    string:  "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    int:     "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    decimal: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    lookup:  "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  };
  const badgeClass = TYPE_STYLES[variable.DataType] ?? "bg-gray-100 text-gray-700";

  return (
    <Link
      to={`/variables/${variable.ID}`}
      className="group flex flex-col gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 rounded p-4 transition-all duration-150"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-zinc-100 truncate">
          {variable.Name}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded font-mono shrink-0 ${badgeClass}`}>
          {variable.DataType}
        </span>
      </div>

      {variable.GroupName && (
        <p className="text-xs text-zinc-500 border-l-2 border-orange-500 pl-2">
          {variable.GroupName}
        </p>
      )}

      <p
        className="text-xs text-zinc-400 line-clamp-2 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: variable.Description }}
      />

      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-zinc-600">#{variable.ID}</span>
        <span className="text-xs text-zinc-600 group-hover:text-orange-500 transition-colors">
          View values →
        </span>
      </div>
    </Link>
  );
}
