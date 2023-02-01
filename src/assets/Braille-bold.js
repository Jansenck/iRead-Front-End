﻿import { jsPDF } from "jspdf"
var font = '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ACIABQAAACIABwAAAAIACAAA//8Bov/fAlYCuwIiAAYAAAAiAAcAAAACAAgAAP//AI7/3wJWArsCIgADAAAAIgAGAAAAIgAHAAAAAgAIAAD//wCO/98CVgK7AiIABAAAACIABgAAACIABwAAAAIACAAA//8Ajv/fAlYCuwIiAAMAAAAiAAQAAAAiAAYAAAAiAAcAAAACAAgAAP//AI7/3wJWArsCIgAFAAAAIgAGAAAAIgAHAAAAAgAIAAD//wCO/98CVgK7AiIAAwAAACIABQAAACIABgAAACIABwAAAAIACAAA//8Ajv/fAlYCuwIiAAQAAAAiAAUAAAAiAAYAAAAiAAcAAAACAAgAAP//AI7/3wJWArsCIgADAAAAIgAEAAAAIgAFAAAAIgAGAAAAIgAHAAAAAgAIAAD//wGiAgcCVgK7AgIABgAA//8AjgIHAUICuwICAAMAAP//AI4A8wFCArsCIgADAAAAAgAEAAD//wCOAgcCVgK7AiIAAwAAAAIABgAA//8AjgDzAlYCuwIiAAMAAAAiAAYAAAACAAcAAP//AI4A8wJWArsCIgADAAAAAgAHAAD//wCOAPMCVgK7AiIAAwAAACIABAAAAAIABgAA//8AjgDzAlYCuwIiAAMAAAAiAAQAAAAiAAYAAAACAAcAAP//AI4A8wJWArsCIgADAAAAIgAEAAAAAgAHAAD//wCOAPMCVgK7AiIABAAAAAIABgAA//8AjgDzAlYCuwIiAAQAAAAiAAYAAAACAAcAAP//AI7/3wFCArsCIgADAAAAAgAFAAD//wCO/98BQgK7AiIAAwAAACIABAAAAAIABQAA//8Ajv/fAlYCuwIiAAMAAAAiAAUAAAACAAYAAP//AI7/3wJWArsCIgADAAAAIgAFAAAAIgAGAAAAAgAHAAD//wCO/98CVgK7AiIAAwAAACIABQAAAAIABwAA//8Ajv/fAlYCuwIiAAMAAAAiAAQAAAAiAAUAAAACAAYAAP//AI7/3wJWArsCIgADAAAAIgAEAAAAIgAFAAAAIgAGAAAAAgAHAAD//wCO/98CVgK7AiIAAwAAACIABAAAACIABQAAAAIABwAA//8Ajv/fAlYCuwIiAAQAAAAiAAUAAAACAAYAAP//AI7/3wJWArsCIgAEAAAAIgAFAAAAIgAGAAAAAgAHAAD//wCO/98CVgK7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MzQ1B1Bkb3RzMTYHUGRvdHMyNghQZG90czEyNgdQZG90czM2CFBkb3RzMTM2CFBkb3RzMjM2CVBkb3RzMTIzNgdQZG90czQ2CFBkb3RzMTQ2CFBkb3RzMjQ2CVBkb3RzMTI0NghQZG90czM0NglQZG90czEzNDYJUGRvdHMyMzQ2ClBkb3RzMTIzNDYHUGRvdHM1NghQZG90czE1NghQZG90czI1NglQZG90czEyNTYIUGRvdHMzNTYJUGRvdHMxMzU2CVBkb3RzMjM1NgpQZG90czEyMzU2CFBkb3RzNDU2CVBkb3RzMTQ1NglQZG90czI0NTYKUGRvdHMxMjQ1NglQZG90czM0NTYKUGRvdHMxMzQ1NgpQZG90czIzNDU2C1Bkb3RzMTIzNDU2BVBET1Q0BVBET1QxB1BET1RTMTIHUERPVFMxNAhQRE9UUzE0NQdQRE9UUzE1CFBET1RTMTI0CVBET1RTMTI0NQhQRE9UUzEyNQdQRE9UUzI0CFBET1RTMjQ1B1BET1RTMTMIUERPVFMxMjMIUERPVFMxMzQJUERPVFMxMzQ1CFBET1RTMTM1CVBET1RTMTIzNApQRE9UUzEyMzQ1CVBET1RTMTIzNQhQRE9UUzIzNAlQRE9UUzIzNDUIUERPVFMxMzYJUERPVFMxMjM2CVBET1RTMjQ1NglQRE9UUzEzNDYKUERPVFMxMzQ1NglQRE9UUzEzNTYIUERPVFMyNDYJUERPVFMxMjU2ClBET1RTMTI0NTYHUERPVFM0NQABuwAHAAYABgDoGXBFaLwAAgACARQABgAFJUQYcEVoYEQAuwAIAAoACgA5GXBFaLwABQAFARQACgAFJUQYcEVoIIpgILgACSNEYES0HhsZExFLUlixCwArG0tSWLENACsbS1JYsQsAKxtLUlixDQArG0tSWLEMACtZWVlZWSIAAA==';
var callAddFont = function () {
this.addFileToVFS('Braille-bold.ttf', font);
this.addFont('Braille-bold.ttf', 'Braille', 'bold');
};
jsPDF.API.events.push(['addFonts', callAddFont])
