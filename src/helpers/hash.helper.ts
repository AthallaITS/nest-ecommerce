import bcrypt from 'bcrypt';
export class HashHelper {
  private static salt = 10;

  /**
   * Encrypts plain string
   * @param str
   * @returns Promise<string> returns encrypted
   */
  static async encrypt(str: string): Promise<string> {
    return await bcrypt.hash(str, this.salt);
  }

  /**
   * Compares encrypted and provided string
   * @param plain {string}
   * @param encrypted {string}
   * @returns Promise<boolean> Returns Boolean if provided string and encrypted are equal
   */
  static async compare(plain: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(plain, encrypted);
  }
}
