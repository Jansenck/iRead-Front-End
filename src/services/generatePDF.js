import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { storeText } from './textApi';

function generatePDF({printRefs, text, fullText}){

    if(text === null || text === undefined) {
        window.alert('Please, type some text before to download');
        return;
    }

    html2canvas(printRefs.current, { 
        dpi: 24, 
        scale: 3, 
        useCORS: true, 
        logging: true, 
        allowTaint:true, 
        letterRendering: 1, 
    }).then(canvas => {
        
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
        
        //pdf.save('iRead.pdf');
        storeText(fullText);
    });
}

export default generatePDF;