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

export function sanitizeInput(input: string): string {
  return validator.escape(validator.trim(input))
}

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email)
}

export function isValidPhone(phone: string): boolean {
  // Basic phone validation - customize for your region
  return validator.isMobilePhone(phone, 'any', { strictMode: false })
}