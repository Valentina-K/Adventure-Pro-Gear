import { z } from 'zod';

export const getLogInSchema = (t: any) =>
  z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: t('email-errors-login.incorrectEmail'),
    }),
    password: z.string().min(8, t('password-errors-login.notEmpty')),
  });

export const getSignUpSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .min(2, t('name-errors-registration.minLength'))
      .regex(/^[a-zA-Z]+$/, t('name-errors-registration.onlyLetters'))
      .max(64, t('name-errors-registration.maxLength'))
      .refine(value => !/^\s|\s$/.test(value), {
        message: t('name-errors-registration.noSpaces'),
      }),
    surname: z
      .string()
      .min(2, t('surname-errors-registration.minLength'))
      .max(64, t('surname-errors-registration.maxLength'))
      .regex(/^[a-zA-Z]+$/, t('surname-errors-registration.onlyLetters'))
      .refine(value => !/^\s|\s$/.test(value), {
        message: t('surname-errors-registration.noSpaces'),
      }),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: t('email-errors-registration.invalidFormat'),
    }),
    password: z
      .string()
      .min(8, t('password-errors-registration.fullMessage'))
      .refine(value => /\d/.test(value), {
        message: t('password-errors-registration.fullMessage'),
      })
      .refine(value => /[A-Z]/.test(value), {
        message: t('password-errors-registration.fullMessage'),
      })
      .refine(value => /[a-z]/.test(value), {
        message: t('password-errors-registration.fullMessage'),
      })
      // .refine(value => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value), {
      //   message: t('password-errors-registration.fullMessage'),
      // }),
      .refine(value => /[@#$%^&+=]/.test(value), {
        message: t('password-errors-registration.fullMessage'),
      })
      .refine(value => !/[^A-Za-z0-9@#$%^&+=]/.test(value), {
        message: t('password-errors-registration.fullMessage'),
      }),
  });

export const getResetPasswordSchema = (authTranslation: any) =>
  z.object({
    newPassword: z
      .string()
      .min(8, authTranslation.registration.zod['password-errors-registration'].quantity)
      .refine(value => /\d/.test(value), {
        message: authTranslation.registration.zod['password-errors-registration'].oneDigit,
      })
      .refine(value => /[A-Z]/.test(value), {
        message:
          authTranslation.registration.zod['password-errors-registration'].oneUppercaseLetter,
      })
      .refine(value => /[a-z]/.test(value), {
        message:
          authTranslation.registration.zod['password-errors-registration'].oneLowercaseLetter,
      })
      .refine(value => /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(value), {
        message:
          authTranslation.registration.zod['password-errors-registration'].oneSpecialCharacter,
      }),
  });

export type SignUpData = z.infer<ReturnType<typeof getSignUpSchema>>;
export type LogInData = z.infer<ReturnType<typeof getLogInSchema>>;
export type ResetPasswordData = z.infer<ReturnType<typeof getResetPasswordSchema>>;
