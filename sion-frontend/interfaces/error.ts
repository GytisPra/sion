interface SionError {
  code: number;
  message: string;
  description: string;
  meta: unknown;
}

export default SionError;
