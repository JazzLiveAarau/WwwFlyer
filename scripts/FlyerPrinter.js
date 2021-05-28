// File: FlyerPrinter.js
// Date: 2019-06-09
// Author: Gunnar Lidén

// File content
// =============
// Functions for the setting of printing properties 


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Printer Parameters  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Folded A6 width of pages 1 (title page), 2, 3 and 6 in millimeter
var g_folded_a6_width_page_one_two_three_six = 105.0;

// Folded A6 width of pages 4 and 5 in millimeter
var g_folded_a6_width_page_four_five = 103.0;

// Folded A6 height for all pages in millimeter
var g_folded_a6_height_all_pages = 148.0;

// Height text logo (as image) in millimeter
var g_height_text_logo = 10.0;

// Size of margins that will be trimmed (cut) away
var g_trim_size = 3.0;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Printer Parameters  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Printer Function  ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets all printer properties
// Please note that the CSS file defines start (default) values that may be changed by this 
// function
function setPrinterProperties()
{
	setSizePagePrintOne();
	
	setSizePagePrintTwo();
	
	setPropertiesPageTwoBox();
	
	setPropertiesPageFiveBox();
	
	setPropertiesPageOneBox();
	
	setPropertiesPageFourBox();
	
	setPropertiesPageThreeBox();
	
	setPropertiesPageSixBox();
	
	setSizeFlyerImage();
	
	setCuttingLines();
	
	setTextLogoBlackAreas();
	
} // setPrinterProperties



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Printer Function  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Size Print Pages  /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the size of the page print one
function setSizePagePrintOne()
{
	var element_id_page_print_one = document.getElementById(g_id_page_print_one);
	if (null == element_id_page_print_one)
	{
		alert("setSizePagePrintOne Element with id g_id_page_print_one is null");
		
		return;
	}
	
	var total_width_print_page = getWidthPrintPageForPrintline();
	
	var total_height_print_page = getHeightPrintPageForPrintline();
	
	element_id_page_print_one.style.width = total_width_print_page.toString() + "mm";
	
	element_id_page_print_one.style.height = total_height_print_page.toString() + "mm";
		
} // setSizePagePrintOne

// Sets the size of the page print two
function setSizePagePrintTwo()
{
	var element_id_page_print_two = document.getElementById(g_id_page_print_two);
	if (null == element_id_page_print_two)
	{
		alert("setSizePagePrintTwo Element with id g_id_page_print_two is null");
		
		return;
	}
	
	var total_width_print_page = getWidthPrintPageForPrintline();
	
	var total_height_print_page = getHeightPrintPageForPrintline();
	
	element_id_page_print_two.style.width = total_width_print_page.toString() + "mm";
	
	element_id_page_print_two.style.height = total_height_print_page.toString() + "mm";
		
} // setSizePagePrintTwo

// Returns the total width in millimeter - before trimming - for a print page 
function getWidthPrintPage()
{
	var ret_total_width_print_page = g_trim_size + 
	                                 g_folded_a6_width_page_four_five + 
	                                 2.0*g_folded_a6_width_page_one_two_three_six + 
									 g_trim_size + 
									 addWidthForBoundaries();
									 
	return ret_total_width_print_page;
	
} // getWidthPrintPage

// Returns the width of the PDF for Printline
function getWidthPrintPageForPrintline()
{
	return 336.28;
	
} // getWidthPrintPageForPrintline

// Returns the height of the PDF for Printline
function getHeightPrintPageForPrintline()
{
	return 171.28;
	
} // getHeightPrintPageForPrintline

// Returns the additional margin for printline PDF
function getPrintlineAdditionalMargin()
{
   var ret_margin = (getHeightPrintPageForPrintline() - getHeightPrintPage())/2.0;
   
   return ret_margin;
	
} // getPrintlineAdditionalMargin


// Returns additional width when boundaries are displayed
function addWidthForBoundaries()
{
	if (g_flyer_display_boundaries)
	{
		return 1.0;
	}
	else
	{
		return 0.0;
	}
	
} // addWidthForBoundaries

// Returns the total height in millimeter - before trimming - for a print page 
function getHeightPrintPage()
{
	var ret_total_height_print_page = g_trim_size + g_folded_a6_height_all_pages + g_trim_size;
								 
	return ret_total_height_print_page;
	
} // getHeightPrintPage



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Size Print Pages  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Properties Box Pages  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the printer properties of the page two box
function setPropertiesPageTwoBox()
{
	var element_page_two_box = document.getElementsByTagName("PageTwoBox")[0];
	if (null == element_page_two_box)
	{
		alert("setPropertiesPageTwoBox Element with id g_id_page_print_two is null");
		
		return;
	}
	
	var width_page_two_box = g_folded_a6_width_page_one_two_three_six;
	
	var height_page_two_box = g_folded_a6_height_all_pages + g_trim_size;
	
	element_page_two_box.style.width = width_page_two_box.toString() + "mm";
	
	element_page_two_box.style.height = height_page_two_box.toString() + "mm";
	
	var margin_left_mm = g_trim_size + getPrintlineAdditionalMargin();
	
	element_page_two_box.style.marginLeft = margin_left_mm.toString() + "mm";
	
	//QQQ element_page_two_box.style.marginLeft = g_trim_size.toString() + "mm";
	
	element_page_two_box.style.marginRight = "0.0mm";
	
	var margin_top_mm = getPrintlineAdditionalMargin();
	
	element_page_two_box.style.marginTop = margin_top_mm.toString() + "mm";
	
	//QQ element_page_two_box.style.marginTop = "0.0mm";
	
	element_page_two_box.style.marginBottom = "0.0mm";
		
} // setPropertiesPageTwoBox

// Sets the printer properties of the page five box
function setPropertiesPageFiveBox()
{
	var element_page_five_box = document.getElementsByTagName("PageFiveBox")[0];
	if (null == element_page_five_box)
	{
		alert("setPropertiesPageFiveBox Element with id g_id_page_print_two is null");
		
		return;
	}
	
	var width_page_five_box = g_folded_a6_width_page_four_five;
	
	var height_page_five_box = g_folded_a6_height_all_pages + g_trim_size;
	
	element_page_five_box.style.width = width_page_five_box.toString() + "mm";
	
	element_page_five_box.style.height = height_page_five_box.toString() + "mm";
	
	var margin_left_mm = g_trim_size + getPrintlineAdditionalMargin();
	
	element_page_five_box.style.marginLeft = margin_left_mm.toString() + "mm";
	
	//QQQ element_page_five_box.style.marginLeft = g_trim_size.toString() + "mm";
	
	element_page_five_box.style.marginRight = "0.0mm";
	
	var margin_top_mm = getPrintlineAdditionalMargin();
	
	element_page_five_box.style.marginTop = margin_top_mm.toString() + "mm";	
	
	//QQQ element_page_five_box.style.marginTop = "0.0mm";
	
	element_page_five_box.style.marginBottom = "0.0mm";
		
} // setPropertiesPageFiveBox

// Sets the printer properties of the page one box
// This is the title page. The poster (image) shall also be in the trimming area
function setPropertiesPageOneBox()
{
	var element_page_one_box = document.getElementsByTagName("PageOneBox")[0];
	if (null == element_page_one_box)
	{
		alert("setPropertiesPageOneBox Element with tag name PageOneBox is null");
		
		return;
	}
	
	var width_page_one_box = g_folded_a6_width_page_one_two_three_six + g_trim_size;
	
	var height_page_one_box = g_folded_a6_height_all_pages + 2.0*g_trim_size;
	
	element_page_one_box.style.width = width_page_one_box.toString() + "mm";
	
	element_page_one_box.style.height = height_page_one_box.toString() + "mm";
	
	element_page_one_box.style.marginLeft = "0.0mm";
	
	element_page_one_box.style.marginRight = "0.0mm";
	
	var margin_top_mm = getPrintlineAdditionalMargin();
	
	element_page_one_box.style.marginTop = margin_top_mm.toString() + "mm";		
	
	//QQ element_page_one_box.style.marginTop = "0.0mm";
	
	element_page_one_box.style.marginBottom = "0.0mm";
		
} // setPropertiesPageOneBox

// Sets the printer properties of the page four box
function setPropertiesPageFourBox()
{
	var element_page_four_box = document.getElementsByTagName("PageFourBox")[0];
	if (null == element_page_four_box)
	{
		alert("setPropertiesPageFourBox Element with tag name PageFourBox is null");
		
		return;
	}
	
	var width_page_four_box = g_folded_a6_width_page_four_five;
	
	var height_page_four_box = g_folded_a6_height_all_pages + g_trim_size;
	
	element_page_four_box.style.width = width_page_four_box.toString() + "mm";
	
	element_page_four_box.style.height = height_page_four_box.toString() + "mm";
	
	element_page_four_box.style.marginLeft = "0.0mm";
	
	element_page_four_box.style.marginRight = g_trim_size.toString() + "mm";
	
	var margin_top_mm = getPrintlineAdditionalMargin();
	
	element_page_four_box.style.marginTop = margin_top_mm.toString() + "mm";	
	
	//QQ element_page_four_box.style.marginTop = "0.0mm";
	
	element_page_four_box.style.marginBottom = "0.0mm";
		
} // setPropertiesPageFourBox

// Sets the printer properties of the page three box
function setPropertiesPageThreeBox()
{
	var element_page_three_box = document.getElementsByTagName("PageThreeBox")[0];
	if (null == element_page_three_box)
	{
		alert("setPropertiesPageThreeBox Element with tag name PageThreeBox is null");
		
		return;
	}
	
	var width_page_three_box = g_folded_a6_width_page_one_two_three_six;
	
	var height_page_three_box = g_folded_a6_height_all_pages + g_trim_size;
	
	element_page_three_box.style.width = width_page_three_box.toString() + "mm";
	
	element_page_three_box.style.height = height_page_three_box.toString() + "mm";
	
	element_page_three_box.style.marginLeft = "0.0mm";
	
	element_page_three_box.style.marginRight = "0.0mm";
	
	var margin_top_mm = getPrintlineAdditionalMargin();
	
	element_page_three_box.style.marginTop = margin_top_mm.toString() + "mm";	
	
	//QQ element_page_three_box.style.marginTop = "0.0mm";
	
	element_page_three_box.style.marginBottom = "0.0mm";
		
} // setPropertiesPageThreeBox

// Sets the printer properties of the page six box
function setPropertiesPageSixBox()
{
	var element_page_six_box = document.getElementsByTagName("PageSixBox")[0];
	if (null == element_page_six_box)
	{
		alert("setPropertiesPageSixBox Element with tag name PageSixBox is null");
		
		return;
	}
	
	var width_page_six_box = g_folded_a6_width_page_one_two_three_six;
	
	var height_page_six_box = g_folded_a6_height_all_pages + g_trim_size;
	
	element_page_six_box.style.width = width_page_six_box.toString() + "mm";
	
	element_page_six_box.style.height = height_page_six_box.toString() + "mm";
	
	element_page_six_box.style.marginLeft = "0.0mm";
	
	element_page_six_box.style.marginRight = "0.0mm";
	
	var margin_top_mm = getPrintlineAdditionalMargin();
	
	element_page_six_box.style.marginTop = margin_top_mm.toString() + "mm";	
	
	//QQ element_page_six_box.style.marginTop = "0.0mm";
	
	element_page_six_box.style.marginBottom = "0.0mm";
		
} // setPropertiesPageSixBox


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Properties Box Pages  ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Size Flyer Image //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the size of the flyer image
function setSizeFlyerImage()
{
	var element_id_flyer_image = document.getElementById(g_id_flyer_image);
	if (null == element_id_flyer_image)
	{
		alert("setSizeFlyerImage Element with id g_id_flyer_image is null");
		
		return;
	}
	
	var width_flyer_image = g_folded_a6_width_page_one_two_three_six + g_trim_size;
	
	var height_flyer_image = g_folded_a6_height_all_pages + 2.0*g_trim_size;
	
	element_id_flyer_image.style.width = width_flyer_image.toString() + "mm";
	
	element_id_flyer_image.style.height = height_flyer_image.toString() + "mm";
		
} // setSizeFlyerImage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Size Flyer Image ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create PDF ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// https://itnext.io/javascript-convert-html-css-to-pdf-print-supported-very-sharp-and-not-blurry-c5ffe441eb5e
// https://stackoverflow.com/questions/16858954/how-to-properly-use-jspdf-library
// 

// Creates the two PDF files
function createPdfFiles()
{
	// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_document_queryselectorall_p
	
	var pdf_nodes = document.querySelectorAll("PagePrint");
	
	var pdf_names = [getPdfFileNameFront(), getPdfFileNameReverse()];
	
	var pdf_qualtity = 10;

	for (var index_pdf=0; index_pdf<pdf_nodes.length; index_pdf++) 
	{
		var current_pdf_node = pdf_nodes[index_pdf];
		
		var current_pdf_name = pdf_names[index_pdf];

		if (index_pdf == 0)
		{
			createOnePdfFile(current_pdf_node, current_pdf_name, pdf_qualtity);
		}
		else
		{
			createSecondPdfFile(current_pdf_node, current_pdf_name, pdf_qualtity);
		}
		
		
		
	}	

} // createPdfFiles

// Returns the name of the PDF file for the flyer front side
function getPdfFileNameFront()
{
	var pdf_name_front = "";
	
	pdf_name_front = pdf_name_front + g_file_name_flyer_folded_a6_front_start;
	
	pdf_name_front = pdf_name_front + g_current_concert_number.toString() + "_";
	
	pdf_name_front = pdf_name_front + getCurrentDate();
	
	pdf_name_front = pdf_name_front + ".pdf";
	
	return pdf_name_front;
	
} // getPdfFileNameFront

// Returns the name of the PDF file for the flyer reverse side
function getPdfFileNameReverse()
{	
	var pdf_name_reverse = "";
	
	pdf_name_reverse = pdf_name_reverse + g_file_name_flyer_folded_a6_reverse_start;
	
	pdf_name_reverse = pdf_name_reverse + g_current_concert_number.toString() + "_";
	
	pdf_name_reverse = pdf_name_reverse + getCurrentDate();
	
	pdf_name_reverse = pdf_name_reverse + ".pdf";
	
	return pdf_name_reverse;
	
} // getPdfFileNameReverse

// Returns the current date as string
function getCurrentDate()
{
	var current_date = new Date();
    var current_year = current_date.getFullYear();
	var current_month = current_date.getMonth() + 1;
	var current_day = current_date.getDate();	
	
	var ret_date_str = current_year.toString();
	if (current_month <= 9)
	{
		ret_date_str = ret_date_str + "0" + current_month.toString();
	}
	else
	{
		ret_date_str = ret_date_str + current_month.toString();
	}
	
	if (current_day <= 9)
	{
		ret_date_str = ret_date_str + "0" + current_day.toString();
	}
	else
	{
		ret_date_str = ret_date_str + current_day.toString();
	}
	
	return ret_date_str;
	
} // getCurrentDate

// Create one PDF file
function createOnePdfFile(i_pdf_node, i_pdf_name, i_pdf_quality)
{
	// https://itnext.io/javascript-convert-html-css-to-pdf-print-supported-very-sharp-and-not-blurry-c5ffe441eb5e
	// https://developer.tizen.org/community/tip-tech/creating-pdf-documents-jspdf Parameters new jsPDF
	// https://stackoverflow.com/questions/36472094/how-to-set-image-to-fit-width-of-the-page-using-jspdf  Parameters 
	// https://stackoverflow.com/questions/23104008/where-to-change-default-pdf-page-width-and-font-size-in-jspdf-debug-js Custom sized PDF

	var node_width_mm = getWidthPrintPageForPrintline();
	
	var node_height_mm = getHeightPrintPageForPrintline();
	
	var pdf_quality_int = parseInt(i_pdf_quality);
	
    html2canvas(i_pdf_node, {scale: pdf_quality_int, dpi: 500}
						 ).then(canvas => {
			let pdf = new jsPDF('landscape', 'mm', [node_width_mm, node_height_mm]);
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, node_width_mm, node_height_mm);
			pdf.save(i_pdf_name);
		});	
	
	
} // createOnePdfFile

function createSecondPdfFile(i_pdf_node, i_pdf_name, i_pdf_quality)
{
	// https://itnext.io/javascript-convert-html-css-to-pdf-print-supported-very-sharp-and-not-blurry-c5ffe441eb5e
	// https://developer.tizen.org/community/tip-tech/creating-pdf-documents-jspdf Parameters new jsPDF
	// https://stackoverflow.com/questions/36472094/how-to-set-image-to-fit-width-of-the-page-using-jspdf  Parameters 
	// https://stackoverflow.com/questions/23104008/where-to-change-default-pdf-page-width-and-font-size-in-jspdf-debug-js Custom sized PDF
	// https://cdnjs.com/libraries/jspdf

	var node_width_mm = getWidthPrintPageForPrintline();
	
	var node_height_mm = getHeightPrintPageForPrintline();
	
	var pdf_quality_int = parseInt(i_pdf_quality);
	
    html2canvas(i_pdf_node, {scale: pdf_quality_int, dpi: 500}
						 ).then(canvas => {
			let pdf = new jsPDF('landscape', 'mm', [node_width_mm, node_height_mm]);
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, node_width_mm, node_height_mm);
			pdf.save(i_pdf_name);
		});	
	
	
} // createOnePdfFile



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create PDF //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Cutting Lines /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_vertical_line2
// https://www.w3schools.com/css/tryit.asp?filename=trycss_position_absolute

// Sets the prinline cutting lines
function setCuttingLines()
{
	var cutting_element_id_top_vl_left_page_one = getIdCuttingLine(g_id_top_left_vl_page_one);
	
	cutting_element_id_top_vl_left_page_one.style.left = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_top_vl_left_page_one.style.height = getCuttingLineLength().toString() + "mm";	
	
	var cutting_element_id_top_left_hl_page_one = getIdCuttingLine(g_id_top_left_hl_page_one);
	
	cutting_element_id_top_left_hl_page_one.style.top = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_top_left_hl_page_one.style.width = getCuttingLineLength().toString() + "mm";	
	
	
	var cutting_element_id_top_vl_right_page_one = getIdCuttingLine(g_id_top_right_vl_page_one);
	
	cutting_element_id_top_vl_right_page_one.style.right = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_top_vl_right_page_one.style.height = getCuttingLineLength().toString() + "mm";	
	
	var cutting_element_id_top_right_hl_page_one = getIdCuttingLine(g_id_top_right_hl_page_one);
	
	cutting_element_id_top_right_hl_page_one.style.top = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_top_right_hl_page_one.style.width = getCuttingLineLength().toString() + "mm";		


	var cutting_element_id_bottom_vl_left_page_one = getIdCuttingLine(g_id_bottom_left_vl_page_one);
	
	cutting_element_id_bottom_vl_left_page_one.style.left = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_bottom_vl_left_page_one.style.height = getCuttingLineLength().toString() + "mm";	
	
	var cutting_element_id_bottom_left_hl_page_one = getIdCuttingLine(g_id_bottom_left_hl_page_one);
	
	cutting_element_id_bottom_left_hl_page_one.style.bottom = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_bottom_left_hl_page_one.style.width = getCuttingLineLength().toString() + "mm";	
	
	
	var cutting_element_id_bottom_vl_right_page_one = getIdCuttingLine(g_id_bottom_right_vl_page_one);
	
	cutting_element_id_bottom_vl_right_page_one.style.right = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_bottom_vl_right_page_one.style.height = getCuttingLineLength().toString() + "mm";	
	
	var cutting_element_id_bottom_right_hl_page_one = getIdCuttingLine(g_id_bottom_right_hl_page_one);
	
	cutting_element_id_bottom_right_hl_page_one.style.bottom = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_bottom_right_hl_page_one.style.width = getCuttingLineLength().toString() + "mm";		
	

	var cutting_element_id_top_vl_left_page_two = getIdCuttingLine(g_id_top_left_vl_page_two);
	
	cutting_element_id_top_vl_left_page_two.style.left = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_top_vl_left_page_two.style.height = getCuttingLineLength().toString() + "mm";	
	
	var cutting_element_id_top_left_hl_page_two = getIdCuttingLine(g_id_top_left_hl_page_two);
	
	cutting_element_id_top_left_hl_page_two.style.top = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_top_left_hl_page_two.style.width = getCuttingLineLength().toString() + "mm";	
	
	
	var cutting_element_id_top_vl_right_page_two = getIdCuttingLine(g_id_top_right_vl_page_two);
	
	cutting_element_id_top_vl_right_page_two.style.right = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_top_vl_right_page_two.style.height = getCuttingLineLength().toString() + "mm";	
	
	var cutting_element_id_top_right_hl_page_two = getIdCuttingLine(g_id_top_right_hl_page_two);
	
	cutting_element_id_top_right_hl_page_two.style.top = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_top_right_hl_page_two.style.width = getCuttingLineLength().toString() + "mm";		


	var cutting_element_id_bottom_vl_left_page_two = getIdCuttingLine(g_id_bottom_left_vl_page_two);
	
	cutting_element_id_bottom_vl_left_page_two.style.left = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_bottom_vl_left_page_two.style.height = getCuttingLineLength().toString() + "mm";	
	
	var cutting_element_id_bottom_left_hl_page_two = getIdCuttingLine(g_id_bottom_left_hl_page_two);
	
	cutting_element_id_bottom_left_hl_page_two.style.bottom = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_bottom_left_hl_page_two.style.width = getCuttingLineLength().toString() + "mm";	
	
	
	var cutting_element_id_bottom_vl_right_page_two = getIdCuttingLine(g_id_bottom_right_vl_page_two);
	
	cutting_element_id_bottom_vl_right_page_two.style.right = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_bottom_vl_right_page_two.style.height = getCuttingLineLength().toString() + "mm";	
	
	var cutting_element_id_bottom_right_hl_page_two = getIdCuttingLine(g_id_bottom_right_hl_page_two);
	
	cutting_element_id_bottom_right_hl_page_two.style.bottom = getCuttingLineDistanceFromBorder().toString() + "mm";
	
	cutting_element_id_bottom_right_hl_page_two.style.width = getCuttingLineLength().toString() + "mm";		

	displayOrHideCuttingLines();
	
	
} // setCuttingLines

// Returns the distance for a cutting line
function getCuttingLineDistanceFromBorder()
{
	return getPrintlineAdditionalMargin() + g_trim_size;
	
} // getCuttingLineDistanceFromBorder

// Returns the length for a cutting line
function getCuttingLineLength()
{
	return getPrintlineAdditionalMargin();
	
} // getCuttingLineLength

// Returns the identity of a cutting line
function getIdCuttingLine(i_id_cutting_line)
{
	var cutting_element_id = document.getElementById(i_id_cutting_line);
	if (null == cutting_element_id)
	{
		alert("getIdCuttingLine Element with id " + i_id_cutting_line + " is null");
		
		return cutting_element_id;
	}	
	
	return cutting_element_id;
	
} // getIdCuttingLine


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Cutting Lines /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Black Areas ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the black areas left or rigt of text logo
function setTextLogoBlackAreas()
{
	var element_black_top_area_left_page_one = getIdBlackArea(g_id_top_black_area_left_page_one);
	
	var element_black_top_area_left_page_two = getIdBlackArea(g_id_top_black_area_left_page_two);
	
	var element_black_top_area_right_page_two = getIdBlackArea(g_id_top_black_area_right_page_two);
	
	var width_area = g_trim_size;
	
	var height_area = 10.0;
	
	setDivBlackImageForTextLogo(element_black_top_area_left_page_one, width_area, height_area);
	
	setDivBlackImageForTextLogo(element_black_top_area_left_page_two, width_area, height_area);
	
	setDivBlackImageForTextLogo(element_black_top_area_right_page_two, width_area, height_area);
	
	element_black_top_area_left_page_one.style.left = (getCuttingLineDistanceFromBorder() - g_trim_size).toString() + "mm";
	
	element_black_top_area_left_page_one.style.top = (getCuttingLineDistanceFromBorder() - g_trim_size).toString() + "mm";
	
	element_black_top_area_left_page_two.style.left = (getCuttingLineDistanceFromBorder() - g_trim_size).toString() + "mm";
	
	element_black_top_area_left_page_two.style.top = (getCuttingLineDistanceFromBorder() - g_trim_size).toString() + "mm";	
	
	element_black_top_area_right_page_two.style.left = (getWidthPrintPage() + g_trim_size + g_trim_size - 0.5).toString() + "mm";
		
	element_black_top_area_right_page_two.style.top = (getCuttingLineDistanceFromBorder() - g_trim_size).toString() + "mm";		
	
	
} // setTextLogoBlackAreas

// Returns the identity of a black
function getIdBlackArea(i_id_black_area)
{
	var black_area_element_id = document.getElementById(i_id_black_area);
	if (null == black_area_element_id)
	{
		alert("getIdBlackArea Element with id " + i_id_black_area + " is null");
		
		return black_area_element_id;
	}	
	
	return black_area_element_id;
	
} // getIdBlackArea

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Black Areas /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
