import { hash, compare } from 'bcryptjs'
import validator from 'validator'

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await compare(password, hashedPassword)
}

// export function sanitizeInput(input: string): string {
//   return validator.escape(validator.trim(input))
// }

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email)
}

export function isValidPhone(phone: string): boolean {
  // Basic phone validation - customize for your region
  return validator.isMobilePhone(phone, 'any', { strictMode: false })
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

export function validatePhone(phone: string): boolean {
  // Supports international formats with + prefix
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,20}$/
  return phoneRegex.test(phone)
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 2000) // Limit length
}