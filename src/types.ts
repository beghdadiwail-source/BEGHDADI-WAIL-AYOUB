
export interface ProtocolDetail {
  id: string;
  name: string;
  fullName: string;
  description: string;
  port: string;
  useCase: string;
  layer: string;
  security: "Secure" | "Insecure" | "Neutral";
}
