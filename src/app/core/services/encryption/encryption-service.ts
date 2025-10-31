import { Injectable } from '@angular/core';
// Importamos todo desde 'aes-js'
import * as aesjs from 'aes-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {


  // Una clave de 256 bits (32 bytes)
  private key: Uint8Array = new Uint8Array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ]);

  // Un Vector de Inicialización (IV) de 16 bytes.
  // En un sistema real, este IV debe ser único por cada cifrado
  // y generalmente se envía junto con el texto cifrado.
  // Por simplicidad del ejemplo, lo dejamos fijo.
  private iv: Uint8Array = new Uint8Array([
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
  ]);

  constructor() { }

  /**
   * Cifra un texto plano (string) y devuelve un string en Base64.
   */
  encrypt(plainText: string): string {
    // 1. Convertir el texto a bytes (aes-js trabaja con bytes)
    const textBytes = aesjs.utils.utf8.toBytes(plainText);

    // 2. Rellenar los bytes (padding)
    // AES cifra en bloques de 16 bytes. Si el texto no es múltiplo,
    // debemos rellenarlo usando el estándar PKCS#7.
    const paddedBytes = aesjs.padding.pkcs7.pad(textBytes);

    // 3. Crear la instancia del modo CBC
    const aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);

    // 4. Cifrar los bytes
    const encryptedBytes = aesCbc.encrypt(paddedBytes);

    // 5. Convertir los bytes cifrados a un string (Base64 es común)
    // Base64 es más eficiente que Hex para almacenar/transmitir.
    return btoa(String.fromCharCode(...Array.from(encryptedBytes)));
  }

  /**
   * Descifra un string en Base64 y devuelve el texto plano.
   */
  decrypt(encryptedBase64: string): string {
    try {
      // 1. Convertir el Base64 de nuevo a bytes
      const encryptedBytes = new Uint8Array(atob(encryptedBase64).split('').map(char => char.charCodeAt(0)));

      // 2. Crear la instancia del modo CBC (con la misma key e IV)
      const aesCbc = new aesjs.ModeOfOperation.cbc(this.key, this.iv);

      // 3. Descifrar los bytes
      const decryptedBytes = aesCbc.decrypt(encryptedBytes);

      // 4. Quitar el relleno (padding)
      const unpaddedBytes = aesjs.padding.pkcs7.strip(decryptedBytes);

      // 5. Convertir los bytes de nuevo a un string UTF-8
      return aesjs.utils.utf8.fromBytes(unpaddedBytes);
      
    } catch (e) {
      console.error("Error al descifrar:", e);
      // Retornar un error o un string vacío si el descifrado falla
      // (ej. clave incorrecta, datos corruptos).
      return "Error: No se pudo descifrar";
    }
  }
}