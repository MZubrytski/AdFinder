export function removeEmptyValues(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0),
    ),
  );
}
