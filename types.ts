
export interface Scene {
  id: string;
  prompt: string;
  imageUrl?: string;
  isLoading: boolean;
  error?: string;
}
