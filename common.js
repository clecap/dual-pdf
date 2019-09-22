
//var url = 'web/vortrag-v03.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'build/pdf.worker.js';

var pdfDoc = null,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.0,
    canvas1 = document.getElementById('the-canvas1'),
    canvas2 = document.getElementById('the-canvas2');
var    ctx1 = canvas1.getContext('2d');
var    ctx2 = canvas2.getContext('2d');

var canvas = canvas1;
var ctx = ctx1;


function optimizeSize (vp) {
  var pdfRatio = vp.width / vp.height;
  var scRatio = document.body.clientWidth / document.body.clientHeight;
  
  var pdf2ScW = vp.width / document.body.clientWidth;
  var pdf2ScH = vp.height / document.body.clientHeight;
  
  var rat = (pdf2ScW > pdf2ScH ? pdf2ScW : pdf2ScH );  // smaller of the two 
 
  var w = vp.width / rat;  w = Math.floor (w);
  var h = vp.height / rat; h = Math.floor (h);
  
 // alert ("Body size: " + document.body.clientWidth + " " + document.body.clientHeight);
 // alert ("New width: " + w + " hei " + h);
 
  vp.width = w;
  vp.heigth = h;
  
  return 1/rat;
}




// zunächst ist canvas = canvas1 und unten
// wir rendern ncah canvas
// dan flippen wir canvas nach oben
// und canvas wird dann canvas2 und ist wieder unten

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport({scale: scale});
    // alert (viewport.height / viewport.width);
    
    var rat = optimizeSize (viewport);
    
     viewport = page.getViewport({scale: rat});
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {canvasContext: ctx, viewport: viewport};
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
       // render task has finished - flip up the canvas
       canvas.style.zIndex++;
      canvas = (canvas == canvas1 ? canvas2 : canvas1);
      ctx = (ctx == ctx1 ? ctx2 : ctx1);
      
      pageRendering = false;
      if (pageNumPending !== null) {  // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
      
    });
  });

  // Update page counters
  // document.getElementById('page_num').textContent = num;
  
 
  
}

/**
 * If another page rendering in progress, wait until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {if (pageRendering) {pageNumPending = num;} else {renderPage(num);} }



// Asynchronously downloads PDF.
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  // document.getElementById('page_count').textContent = pdfDoc.numPages;
  renderPage(1);    // Initial/first page rendering
});






