export interface ReviewType {
  rating: number | undefined;
  feedback: FormDataEntryValue | null;
  image: File[];
  business : string | undefined;
}
