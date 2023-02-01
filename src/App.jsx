import jsPDF from 'jspdf';
import { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import React, { useState } from 'react';
import styled from "styled-components";

function App() {

  const printRefs = useRef([]);
  const pageRefs = useRef([]);

  const [text, setText] = useState(undefined);
  const [line, setLine] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLineInPage, setCurrentLineInPage] = useState(0);

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
    '#%EURO%#': '⠈⠑',
    '#%UPPERCASE%#': '⠈⠑'
  };

  function charConverter(value){

    const currentLine = Math.ceil(value.length / 25);
    setLine(currentLine);
    
    const pageText = value.match(new RegExp(/.{1,648}/g));
    
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
          const [ sign, value ] = world.split('$');
          
          value.split('').map(element => {
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
    
  }

  function generatePDF(){

    console.log('text: ', text);
    
    if(text === null || text === undefined) {
      window.alert('Please, type some text before to download');
      return;
    }

    html2canvas(printRefs.current, { logging: true, allowTaint:true, letterRendering: 1, useCORS: true, scale: 3, dpi: 24 }).then(canvas => {
      
      const pdf = new jsPDF('p', 'mm', [270, 210]);
      
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var imgWidth = 210; 
      var pageHeight= pdf.internal.pageSize.height;

      
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      
      
      var position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      let length = text?.length;
      
      for(let i = 0; i < length-1; i++) {
        position += heightLeft - imgHeight; // top padding for other pages
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      }
      pdf.save('iRead.pdf');
    });
  }

  useEffect(() => {

    let page;

    if(currentLineInPage <= 20) {

      page = printRefs.current[currentPage];
      
      if (page && currentLineInPage > 15) {
        
       page.scrollIntoView({ behavior: 'smooth', block: 'center' });

     } else if(page && currentLineInPage < 12) {

       page.scrollIntoView({ behavior: 'smooth', block: 'start'});
     }
    } else {

      page = document.getElementById(`bottom-${currentPage}`);

      if(page) {
        page.scrollIntoView({ behavior: 'smooth', block: 'center'});
      }

      if(text === undefined) {
        const element = pageRefs.current;
        element.scrollIntoView({ behavior: 'smooth', block: 'start'});
      }
    }

  }, [currentLineInPage]);

	return (
    <div className='container' ref={pageRefs}>
      <Form >
        <TextArea spellCheck="false" type="text" onChange={(e) => charConverter(e.target.value)}/>
        <button onClick={generatePDF}>Generate PDF</button>
      </Form>
      <div className='allPages' ref={printRefs}>

        {
          text !== undefined ?

          text.map((characters, index) => (
            <div 
              key={index}
              id={`page-${currentPage}`}
              className="print" 

              ref={el => printRefs.current[index] = el}
            >
              <HeaderPage firstPage={index === 0 ? true : false}>
                <Logo className={"logo"} rel="icon" type="image/svg+xml" src={"./src/assets/iRead-Logo.svg"} />
              </HeaderPage>
              <div className='braille-text'>
                    {
                      characters.map((char, index) => {
                        return <p className="char" key={index}> {char}</p>
                      })
                    }
              </div>
              <PageNumber id={`bottom-${index}`}>{index+1}</PageNumber>
            </div>
          ))

          :

          <div 
            id={`page-0`}
            className="print" 
            
          >
            <HeaderPage firstPage={true}>
              <Logo className={"logo"} rel="icon" type="image/svg+xml" src={"./src/assets/iRead-Logo.svg"} />
            </HeaderPage>
            <PageNumber>1</PageNumber>
          </div>

        }
        
      </div>
    </div>
	);
}

export default App;

const HeaderPage = styled.header`
  height: 2cm;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.firstPage?  null: "visibility: hidden;" };
`; 

const Logo = styled.img`
  height: 2cm;
  width: 10cm;
  display: node;
`;

const Form = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 10%;
  top: 10%;
`;

const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  height: 350px;
  width: 380px;
  border: 1px solid #153495;
  border-radius: 8px;
  padding: 10%;
  box-sizing: content-box;
  text-align: justify;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
`;

const PageNumber = styled.p`
  position: absolute;
  right: 50%;
  bottom: 4%;
  font-size: 15px;
`;

