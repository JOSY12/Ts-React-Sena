const values = import.meta.env ?? {}

export const env = {
  apiUrl: values.VITE_AXIOS_BASE_URL?.trim() ?? '',
  clerkKey: values.VITE_CLERK_PUBLISHABLE_KEY?.trim() ?? '',
  cloudName: values.VITE_CLOUDINARY_CLOUD_NAME?.trim() || 'rebelion',
  uploadPreset: values.VITE_CLOUDINARY_UPLOAD_PRESET?.trim() || 'proyecto_techsells'
}

export function configurationErrors(): string[] {
  const errors: string[] = []
  try {
    const url = new URL(env.apiUrl)
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error()
  } catch {
    errors.push('Configura VITE_AXIOS_BASE_URL con la URL HTTP de tu API.')
  }
  if (!/^pk_(test|live)_/.test(env.clerkKey)) {
    errors.push(
      'Configura VITE_CLERK_PUBLISHABLE_KEY con una clave publicable de Clerk.'
    )
  }
  return errors
}
