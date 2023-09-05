import { writeFileSync } from 'fs';

export const writeThyFile = (data) => {
    writeFileSync('./respuesta.txt', data)
}