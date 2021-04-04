// File: FlyerTester.js
// Date: 2020-02-17
// Author: Gunnar Lidén

// File content
// =============
// Outputs test result to the texter textarea


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Labels /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var g_tester_header = "Parameters and results for the positioning of texts"; 

var g_tester_row_height = "Row height for normal text in millimeter determined by CSS font-size: (e.g. 3.8mm for Body)";

var g_tester_text_logo_padding = "CSS class text_logo padding-top";

var g_tester_text_padding = "CSS class short_text padding-top";

var g_tester_number_chars_per_row = "Number of characters per row determined by font-size (g_tester_row_height)";

var g_tester_page_max_height = "Maximum height of pages 2-4 in millimeter";

var g_tester_band_name_short_text_max_height = "Maximum height of band name and short text in millimeter";

var g_tester_musician_height = "Height in millimeter for musician number ";

var g_tester_on_page = " on page ";

var g_tester_total_height = "Total and remaining height page ";

var g_tester_logo_text_height = "Text logo height in millimeter for page ";

var g_tester_short_text_height = "Short text height in millimeter for page ";

var g_tester_band_name_height = "Band name height in millimeter for page ";

var g_tester_label_height = "Height= ";

var g_tester_text_block_page_two = "Text block page two";
var g_tester_text_block_page_three = "Text block page three";
var g_tester_text_block_page_four = "Text block page four";

var g_tester_text_logo_page_two = "Text logo page two";
var g_tester_text_logo_page_three = "Text logo page three";
var g_tester_text_logo_page_four = "Text logo page four";

var g_tester_text_bounding_box_page_two = "Text bounding box page two";
var g_tester_text_bounding_box_page_three = "Text bounding box page three";
var g_tester_text_bounding_box_page_four = "Text bounding box page four";

var g_tester_total_heigth_page_two = "Total height page two";
var g_tester_total_heigth_page_three = "Total height page three";
var g_tester_total_heigth_page_four = "Total height page four";

var g_tester_remaining_space = " Remaining space: ";

var g_tester_tooltips = "Tooltip strings";

var g_tester_messages = "Message strings";


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Labels ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Append Parameters  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Append the hardcoded parameters that controls the positioning
function appendPositionParameters()
{
	/*
	appendTesterTextArea(g_tester_row_height);
	appendTesterTextArea("g_row_height_text= " + g_row_height_text.toString());
	//appendTesterTextArea(newLine());
	
	appendTesterTextArea(g_tester_text_logo_padding);
	appendTesterTextArea("g_padding_top_text_logo= " + g_padding_top_text_logo.toString());
	//appendTesterTextArea(newLine());
	
	appendTesterTextArea(g_tester_text_logo_padding);
	appendTesterTextArea("g_tester_text_padding= " + g_padding_top_text.toString());
	//appendTesterTextArea(newLine());
	
	appendTesterTextArea(g_tester_number_chars_per_row);
	appendTesterTextArea("g_number_chars_text_per_row= " + g_number_chars_text_per_row.toString());
	//appendTesterTextArea(newLine());	
	*/
	
	appendTesterTextArea(g_tester_page_max_height);
	appendTesterTextArea("g_page_max_height= " + g_page_max_height.toString());
	appendTesterTextArea(newLine());
	
	appendTesterTextArea(g_tester_band_name_short_text_max_height);
	appendTesterTextArea("g_band_name_short_text_max_height= " + g_band_name_short_text_max_height.toString());
	appendTesterTextArea(newLine());	
	
	
} // appendPositionParameters

// Append the hardcoded parameter maximum page height
function appendMaximumPageHeight()
{	
	appendTesterTextArea(g_tester_page_max_height);
	appendTesterTextArea("g_page_max_height= " + g_page_max_height.toString());
	appendTesterTextArea(newLine());
	
} // appendMaximumPageHeight

// Append musician height
function appendMusicianHeight(i_musician_number, i_page_number, i_musician_height)
{
	var musician_label = g_tester_musician_height + i_musician_number.toString() + g_tester_on_page + i_page_number.toString();

	appendTesterTextArea(musician_label);
	appendTesterTextArea("Height= " + i_musician_height.toString());	
	
} // appendMusikerHeight

// Append page height
function appendPageHeight(i_page_number, i_page_height)
{
	var height_label = g_tester_total_height + i_page_number.toString();

	appendTesterTextArea(height_label);
	appendTesterTextArea("Height= " + i_page_height.toString() + " Remaining " + (g_page_max_height - i_page_height).toString());
    appendTesterTextArea(newLine());	
	
} // appendPageHeight

// Append text logo height
function appendTextLogoHeight(i_page_number, i_text_logo_height)
{
	var text_logo_label = g_tester_logo_text_height + i_page_number.toString();

	appendTesterTextArea(text_logo_label);
	appendTesterTextArea("Height= " + i_text_logo_height.toString());
	
} // appendTextLogoHeight



// Append free text height
function appendFreeTextHeight(i_free_text_height)
{

	appendTesterTextArea("Free text height");
	appendTesterTextArea("Height= " + i_free_text_height.toString());
	
} // appendFreeTextHeight

// Append height text block on page two 
function appendHeightTextBlockPageTwo()
{
	var height_mm_text_block_page_2 = getHeightTextBlockPageTwo();
	
	appendTesterTextArea(g_tester_text_block_page_two);
	appendTesterTextArea(g_tester_label_height + height_mm_text_block_page_2.toString());	
	
} // appendHeightTextBlockPageTwo

// Append height text block on page three 
function appendHeightTextBlockPageThree()
{
	var height_mm_text_block_page_3 = getHeightTextBlockPageThree();
	
	appendTesterTextArea(g_tester_text_block_page_three);
	appendTesterTextArea(g_tester_label_height + height_mm_text_block_page_3.toString());	
	
} // appendHeightTextBlockPageThree

// Append height text block on page four 
function appendHeightTextBlockPageFour()
{
	var height_mm_text_block_page_4 = getHeightTextBlockPageThree();
	
	appendTesterTextArea(g_tester_text_block_page_four);
	appendTesterTextArea(g_tester_label_height + height_mm_text_block_page_4.toString());	
	
} // appendHeightTextBlockPageFour

// Append height text logo on page two 
function appendHeightTextLogoPageTwo()
{
	var height_mm_text_logo_page_2 = getHeightTextLogoPageTwo();
	
	appendTesterTextArea(g_tester_text_logo_page_two);
	appendTesterTextArea(g_tester_label_height + height_mm_text_logo_page_2.toString());	
	
} // appendHeightTextLogoPageTwo

// Append height text logo on page three 
function appendHeightTextLogoPageThree()
{
	var height_mm_text_logo_page_3 = getHeightTextLogoPageThree();
	
	appendTesterTextArea(g_tester_text_logo_page_three);
	appendTesterTextArea(g_tester_label_height + height_mm_text_logo_page_3.toString());	
	
} // appendHeightTextLogoPageThree

// Append height text logo on page four 
function appendHeightTextLogoPageFour()
{
	var height_mm_text_logo_page_4 = getHeightTextLogoPageFour();
	
	appendTesterTextArea(g_tester_text_logo_page_four);
	appendTesterTextArea(g_tester_label_height + height_mm_text_logo_page_4.toString());	
	
} // appendHeightTextLogoPageFour

// Append height text bounding box on page two 
function appendHeightTextBoundingBoxPageTwo()
{
	var height_mm_text_bounding_box_page_2 = getHeightBoxPageTwo();
	
	appendTesterTextArea(g_tester_text_bounding_box_page_two);
	appendTesterTextArea(g_tester_label_height + height_mm_text_bounding_box_page_2.toString());	
	
} // appendHeightTextBoundingBoxPageTwo

// Append height text bounding box on page three 
function appendHeightTextBoundingBoxPageThree()
{
	var height_mm_text_bounding_box_page_3 = getHeightBoxPageThree();
	
	appendTesterTextArea(g_tester_text_bounding_box_page_three);
	appendTesterTextArea(g_tester_label_height + height_mm_text_bounding_box_page_3.toString());	
	
} // appendHeightTextBoundingBoxPageThree

// Append height text bounding box on page four 
function appendHeightTextBoundingBoxPageFour()
{
	var height_mm_text_bounding_box_page_4 = getHeightBoxPageFour();
	
	appendTesterTextArea(g_tester_text_bounding_box_page_four);
	appendTesterTextArea(g_tester_label_height + height_mm_text_bounding_box_page_4.toString());	
	
} // appendHeightTextBoundingBoxPageFour

// Append short text height
function appendShortTextHeightPageTwo()
{
	var short_text_label = g_tester_short_text_height;
	
	var short_text_height = getHeightShortTextPageTwo();

	appendTesterTextArea(short_text_label);
	appendTesterTextArea(g_tester_label_height + short_text_height.toString());
	
} // appendShortTextHeight

// Append band name height
function appendBandNameHeightPageTwo()
{
	var band_name_label = g_tester_band_name_height;
	
	var band_name_height = getHeightBandNamePageTwo();

	appendTesterTextArea(band_name_label);
	appendTesterTextArea(g_tester_label_height + band_name_height.toString());
	
} // appendShortTextHeight

// Append total height page two
function appendTotalHeightPageTwo()
{
	var total_height_page_2 = getTotalHeightPageTwo();
	
	var remaining_height_page_2 = getRemainingHeightPageTwo();
	
	appendTesterTextArea(newLine());
	appendTesterTextArea(g_tester_total_heigth_page_two);
	appendTesterTextArea(g_tester_label_height + total_height_page_2.toString() + g_tester_remaining_space + remaining_height_page_2.toString());
	appendTesterTextArea(newLine());
	appendHeightTextLogoPageTwo();
	appendHeightTextBlockPageTwo();
	appendHeightTextBoundingBoxPageTwo();
	appendMaximumPageHeight();
    appendTesterTextArea(newLine());
	appendTesterTextArea(newLine());
	
} // appendTotalHeightPageTwo

// Append total height page three
function appendTotalHeightPageThree()
{	
	var total_height_page_3 = getTotalHeightPageThree();
	
	var remaining_height_page_3 = getRemainingHeightPageThree();	
	
	appendTesterTextArea(newLine());
	appendTesterTextArea(g_tester_total_heigth_page_three);
	appendTesterTextArea(g_tester_label_height + total_height_page_3.toString() + g_tester_remaining_space + remaining_height_page_3.toString());
	appendTesterTextArea(newLine());
	appendHeightTextLogoPageThree();
	appendHeightTextBlockPageThree();
	appendHeightTextBoundingBoxPageThree();
	appendMaximumPageHeight();
    appendTesterTextArea(newLine());
	appendTesterTextArea(newLine());
	
} // appendTotalHeightPageThree

// Append total height page four
function appendTotalHeightPageFour()
{	
	var total_height_page_4 = getTotalHeightPageFour();
	
	var remaining_height_page_4 = getRemainingHeightPageFour();	
	
	appendTesterTextArea(newLine());
	appendTesterTextArea(g_tester_total_heigth_page_four);
	appendTesterTextArea(g_tester_label_height + total_height_page_4.toString() + g_tester_remaining_space + remaining_height_page_4.toString());
	appendTesterTextArea(newLine());
	appendHeightTextLogoPageFour();
	appendHeightTextBlockPageFour();
	appendHeightTextBoundingBoxPageFour();
	appendMaximumPageHeight();
    appendTesterTextArea(newLine());
	appendTesterTextArea(newLine());
	
} // appendTotalHeightPageFour

// Append total height page four for musicians
function appendTotalHeightPageFourMusicians()
{	
	var total_height_page_4 = getTotalHeightPageFour();
	
	var remaining_height_page_4 = getRemainingHeightPageFourMusicians();	
	
	appendTesterTextArea(newLine());
	appendTesterTextArea(g_tester_total_heigth_page_three);
	appendTesterTextArea(g_tester_label_height + total_height_page_4.toString() + g_tester_remaining_space + remaining_height_page_4.toString());
	appendTesterTextArea(newLine());
	appendHeightTextLogoPageFour();
	appendHeightTextBlockPageFour();
	appendHeightTextBoundingBoxPageFour();
	appendMaximumPageHeight();
    appendTesterTextArea(newLine());
	appendTesterTextArea(newLine());
	
} // appendTotalHeightPageFourMusicians

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Append Parameters  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Append Textarea  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Append to the tester text area
function appendTesterTextArea(i_tester_str)
{
	if (null == getTesterTextAreaElement())
	{
		return;
	}
	
	getTesterTextAreaElement().innerHTML = getTesterTextAreaElement().innerHTML + i_tester_str + newLine();
	
	
} // appendTesterTextArea


///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// End Append Textarea  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Init Textarea  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialize the tester textarea
function initTesterTextarea()
{
	if (null == getTesterTextAreaElement())
	{
		return;
	}
	
	getTesterTextAreaElement().innerHTML = "";	
	
} // initTesterTextarea

// Initialize the tester text area
function appendTesterHeaderPositionData()
{
	if (null == getTesterTextAreaElement())
	{
		return;
	}
	
	appendTesterTextArea(g_tester_header + newLine() + "============================" + newLine());
	
} // appendTesterHeaderPositionData


///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// End Init Textarea  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start List Strings  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Append all application Flyer strings
function appendApplicationFlyerStrings()
{
	appendToolTips();
	
	appendMessages();
	
} // appendApplicationFlyerStrings

// Append tooltips
function appendToolTips()
{
	appendTesterTextArea(g_tester_tooltips + newLine() + "============================" + newLine());

    var n_tool_tips = g_tooltip_parameter_values.length;

    if (n_tool_tips != g_tooltip_parameter_names.length)
	{
        alert("appendToolTips Arrays g_tooltip_parameter_values and g_tooltip_parameter_names have different lengths");
		
		return;
	}	

    for (var index_tooltip=0; index_tooltip < n_tool_tips; index_tooltip++)
	{
		var tooltip_str = g_tooltip_parameter_names[index_tooltip] + "=" + newLine();
		
		tooltip_str = tooltip_str + replaceNewLine(g_tooltip_parameter_values[index_tooltip]) + newLine();
		
		appendTesterTextArea(tooltip_str);
	}
	
} // appendToolTips

// Append messages
function appendMessages()
{
	appendTesterTextArea(g_tester_messages + newLine() + "============================" + newLine());

    var n_messages = g_msg_parameter_values.length;

    if (n_messages != g_msg_parameter_names.length)
	{
        alert("appendMessages Arrays g_msg_parameter_values and g_msg_parameter_names have different lengths");
		
		return;
	}	

    for (var index_msg=0; index_msg < n_messages; index_msg++)
	{
		var tooltip_str = g_msg_parameter_names[index_msg] + "=" + newLine();
		
		tooltip_str = tooltip_str + replaceNewLine(g_msg_parameter_values[index_msg]) + newLine();
		
		appendTesterTextArea(tooltip_str);
	}
	
} // appendMessages

// Replaces new line
function replaceNewLine(i_input_str)
{ 
   // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_replace2
   
   var ret_str = i_input_str = i_input_str.replace(/<br>/g, newLine());
   
   return ret_str;
	
} // replaceNewLine

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End List Strings  ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions Textarea  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the tester text area element
function getTesterTextAreaElement()
{
	return document.getElementById(g_id_tester_textarea);
	
} // getTesterTextAreaElement

// Returns new line
function newLine()
{
	return "\r\n";
	
} // newLine

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions Textarea  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
