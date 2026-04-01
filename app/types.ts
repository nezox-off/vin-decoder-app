export interface Variable {
  ID: number;
  Name: string;
  Description: string;
  GroupName: string;
  DataType: "string" | "int" | "decimal" | "lookup";
}

export interface VinDecode {
  Value: string | null;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
}

export interface VariableValue {
  ElementName: string;
  Id: number;
  Name: string;
}
