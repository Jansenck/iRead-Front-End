import { useRef, useEffect } from 'react';
import React, { useState } from 'react';
import styled from "styled-components";
import { toast } from 'react-toastify';

import Logo from '../../components/Logo';

import { translator } from '../../hooks/api/translator';
import generatePDF from '../../services/generatePDF';

function Translator() {

  const printRefs = useRef([]);
  const pageRefs = useRef([]);

  const [text, setText] = useState(undefined);
  const [fullText, setFullText] = useState(undefined);
  const [line, setLine] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLineInPage, setCurrentLineInPage] = useState(0);

  function charConverter(value){

    const params = {
      value,
      line,
      setLine,
      setText,
      setCurrentPage,
      setCurrentLineInPage
    };

    translator(params);
    setFullText(value);
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
        <button onClick={() => generatePDF({printRefs, text, fullText})}>Generate PDF</button>
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
                <Logo height='2cm' width='10cm'/>
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
              <Logo height='2cm' width='10cm'/>
            </HeaderPage>
            <PageNumber>1</PageNumber>
          </div>

        }
        
      </div>
    </div>
	);
}

export default Translator;

const HeaderPage = styled.header`
  height: 2cm;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.firstPage?  null: "visibility: hidden;" };
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

