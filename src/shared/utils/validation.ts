export function textRules(label: string, max: number, min = 1, optional = false) {
  return {
    setValueAs: (value: string) => value.trim(),
    required: optional ? false : `${label} es obligatorio.`,
    minLength: {
      value: optional ? 0 : min,
      message: `Usa al menos ${min} caracteres.`
    },
    maxLength: { value: max, message: `Usa un máximo de ${max} caracteres.` }
  }
}
