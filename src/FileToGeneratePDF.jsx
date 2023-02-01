export default function FileToGeneratePDF(){

    const element = document.getElementById('element-to-print');
    var worker = html2pdf().from(element).save();

    return(
        <div>
            <div className="container" id="element-to-print">
                <h1 className="char">⠟</h1>
                <h1 className="char">⠟</h1>
                <h1 className="char">⠟</h1>
            </div>
            <div className="html2pdf__page-break"></div>
        </div>
    );
}