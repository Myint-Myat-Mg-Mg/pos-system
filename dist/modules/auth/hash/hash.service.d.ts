export declare class HashService {
    hash(password: string): Promise<string>;
    verify(hashedPassword: string, plainPassword: string): Promise<boolean>;
}
