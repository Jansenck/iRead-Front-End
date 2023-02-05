
const hashtable = {
  a: '⠁', 
  á: '⠷',
  à: '⠫',
  â: '⠡',
  ã: '⠜',
  b: '⠃', 
  c: '⠉',
  ç: '⠯' ,
  d: '⠙', 
  e: '⠑', 
  é: '⠿',
  è: '⠮',
  ê: '⠣',
  f: '⠋', 
  g: '⠛', 
  h: '⠓', 
  i: '⠊', 
  í: '⠌',
  j: '⠚', 
  k: '⠅',
  l: '⠇', 
  m: '⠍', 
  n: '⠝', 
  o: '⠕', 
  ó: '⠬',
  ô: '⠹',
  õ: '⠊',
  p: '⠏', 
  q: '⠟', 
  r: '⠗', 
  s: '⠎', 
  t: '⠞', 
  u: '⠥', 
  ú: '⠾',
  v: '⠧', 
  w: '⠺',
  x: '⠭', 
  y: '⠽',
  z: '⠵',
  0: '⠚',
  1: '⠁',
  2: '⠃',
  3: '⠉',
  4: '⠙',
  5: '⠑',
  6: '⠋',
  7: '⠛',
  8: '⠓',
  9: '⠊',
  ',': '⠂',
  '.': '⠄',
  "'": '⠄',
  ';': '⠆',
  ':': '⠒',
  '!': '⠖',
  '?': '⠢',
  '-': '⠤',
  '"': '⠦',
  '*': '⠔',
  '$': '⠰',
};

export function translateToBraille(params){

    const { fullText, setCurrentPage, setText, line, setLine, setCurrentLineInPage } = params;

    const currentLine = Math.ceil(fullText.length / 25);
    setLine(currentLine);
        
    const pageText = fullText.match(new RegExp(/.{1,648}/g));
    
    let pages = pageText !== null? pageText.length-1 : 0;

    setCurrentLineInPage(line - pages*27);

    setCurrentPage(pageText?.length -1);

    const textCharacters = pageText?.map(text => {

      const test = text?.split(' ');
      
      const textConvertedToBraille = test.map(world => {

        const regexToMonetaryNumber =  /^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/;
        const isMonetaryNumber = regexToMonetaryNumber.test(world);

        if(isMonetaryNumber){

          let brailleWorld = '⠨⠗ ⠰⠼';
          const [ sign, fullText ] = world.split('$');
          
          fullText.split('').map(element => {
            brailleWorld += hashtable[element];
          });

          return brailleWorld;

        }

        const worldInUpperCase = /^[A-Z]+$/.test(world.normalize('NFD').replace(/[^A-Za-z]/g, ''));

        if(worldInUpperCase){

          let brailleWorld = '⠨⠨';

          world.split('').map(element => {
            brailleWorld += hashtable[element.toLowerCase()];
          });

          return brailleWorld;

        }

        /* TODO:  */

        const worldInTitleCase = /^[A-Z][^\s]*/;

        if (worldInTitleCase.test(world)){

          let brailleWorld = '⠨';
          
          world.split('').map(element => {
            
            brailleWorld += hashtable[element.toLowerCase()];
          });

          return brailleWorld;
        };

        const regexToNumber = /^\d+$/;
        const isNumber = (regexToNumber.test(world));

        if(isNumber){
          
          let brailleWorld = '⠼';
          
          world.split('').map(element => {
            brailleWorld += hashtable[element];
          });

          return brailleWorld;
        }
        const regexToEuro = /^€/;
        const isEuro = regexToEuro.test(world);

        if(isEuro) return '⠈⠑'

        let brailleWorld = '';

        world.split('').map(element => {
          brailleWorld += hashtable[element.toLowerCase()];
        });

        return brailleWorld;

      });
      
      const brailleTextCharacters = textConvertedToBraille.join(' ').split('');
      return brailleTextCharacters;
    });
    
  setText(textCharacters);
  return textCharacters;
  //setBrailleText(brailleTextCharacters);
}