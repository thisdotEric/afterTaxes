import { randomBytes, pbkdf2 } from 'crypto';
import { PasswordConstants } from '../../database/constants';

export interface PersistedPassword {
    salt: string;
    hashedPassword: string;
}

export async function hashPassword(
    password: string
): Promise<PersistedPassword> {
    return new Promise<PersistedPassword>((resolve, reject) => {
        const salt = randomBytes(PasswordConstants.SALT_LENGTH).toString(
            PasswordConstants.BYTE_TO_STRING_ENCODING
        );

        pbkdf2(
            password,
            salt,
            PasswordConstants.ITERATIONS,
            PasswordConstants.PASSWORD_LENGTH,
            PasswordConstants.DIGEST,
            (error, hash) => {
                if (error) reject(error);
                else
                    resolve({
                        salt,
                        hashedPassword: hash.toString(
                            PasswordConstants.BYTE_TO_STRING_ENCODING
                        ),
                    });
            }
        );
    });
}

export async function verifyPassword(
    passwordAttempt: string,
    hashedPassword: string,
    salt: string
): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        pbkdf2(
            passwordAttempt,
            salt,
            PasswordConstants.ITERATIONS,
            PasswordConstants.PASSWORD_LENGTH,
            PasswordConstants.DIGEST,
            (error, hash) => {
                if (error) reject(error);
                else
                    resolve(
                        hashedPassword ===
                            hash.toString(
                                PasswordConstants.BYTE_TO_STRING_ENCODING
                            )
                    );
            }
        );
    });
}
