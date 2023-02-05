import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import useText from './useText';


export default function generatePdf({ fullText, printRefs }){

  //const { fullText, printRefs } = params;
  
  if(fullText === null || fullText === undefined) {
    return;
  }

  html2canvas(
    printRefs.current, { 
      dpi: 24,
      scale: 3, 
      logging: true, 
      useCORS: true, 
      allowTaint:true, 
      letterRendering: 1, 
    }).then(canvas => {
    
      var pdf = new jsPDF('p', 'mm', [270, 210]);
      
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var imgWidth = 210; 
      var pageHeight= pdf.internal.pageSize.height;
      var imgHeight = canvas.height * imgWidth / canvas.width;

      var heightLeft = imgHeight;
      var position = 0;
      
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      let length = fullText?.length;
      
      for(let i = 0; i < length-1; i++) {
        position += heightLeft - imgHeight; // top padding for other pages
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      }

      pdf.save('iRead.pdf');
      savePdfText(fullText);
    });
}

/* async function savePdfText(fullText){
  try {
    await useText(fullText);
    toast('Seu PDF foi salvo!');
    //navigate('/dashboard');
    console.log('deu bom');
  } catch (err) {
    console.log('deu ruim');
    toast('Não conseguimos salvar seu PDF!');
  }
} */