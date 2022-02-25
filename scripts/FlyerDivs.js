// File: FlyerDivs.js
// Date: 2022-02-25
// Author: Gunnar Lidén

// File content
// =============
// Functions and identities for divs

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Remove Borders  ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function removeAllBorders()
{
	var all_border_elements = getElementsWithBorders();
	
	for (index_element=0; index_element<all_border_elements.length; index_element++)
	{
		var current_element = all_border_elements[index_element];
		
		current_element.style.borderStyle = "none";
		
	}
	
} // removeAllBorders

function getElementsWithBorders()
{
	var ret_elements = [];
	
    var element_page_print = document.getElementsByTagName("PagePrint")[0];	
	
	ret_elements[0] = element_page_print;
	
	element_page_print = document.getElementsByTagName("PagePrint")[1];	
	
	ret_elements[1] = element_page_print;
	
	var element_page_five_box = document.getElementsByTagName("PageFiveBox")[0];
	
	ret_elements[2] = element_page_five_box;
	
	var element_page_six_box = document.getElementsByTagName("PageSixBox")[0];
	
	ret_elements[3] = element_page_six_box;	
	
	var element_page_one_box = document.getElementsByTagName("PageOneBox")[0];
	
	ret_elements[4] = element_page_one_box;		
		
	var element_page_two_box = document.getElementsByTagName("PageTwoBox")[0];
	
	ret_elements[5] = element_page_two_box;	
	
	var element_page_three_box = document.getElementsByTagName("PageThreeBox")[0];
	
	ret_elements[6] = element_page_three_box;		

	var element_page_four_box = document.getElementsByTagName("PageFourBox")[0];
	
	ret_elements[7] = element_page_four_box;
	
    var element_text_logo = document.getElementById(g_id_div_a6_page_5_text_logo);
	
    ret_elements[8] = element_text_logo;	
	
    element_text_logo = document.getElementById(g_id_div_a6_page_2_text_logo);
	
    ret_elements[9] = element_text_logo;	

    element_text_logo = document.getElementById(g_id_div_a6_page_3_text_logo);
	
    ret_elements[10] = element_text_logo;	
	
    element_text_logo = document.getElementById(g_id_div_a6_page_4_text_logo);
	
    ret_elements[11] = element_text_logo;		
	
    element_text_logo = document.getElementById(g_id_div_a6_page_6_text_logo);
	
    ret_elements[12] = element_text_logo;
	
	//element_text_logo = document.getElementById(g_id_div_a6_page_1);
	
    // ret_elements[13] = element_text_logo;
	
    var element_text_column = document.getElementById(g_id_div_text_column_page_5);
	
    ret_elements[13] = element_text_column;	
	
    element_text_column = document.getElementById(g_id_div_text_column_page_6);
	
    ret_elements[14] = element_text_column;	
	
    element_text_column = document.getElementById(g_id_div_text_column_page_6);
	
    ret_elements[15] = element_text_column;		

    element_text_column = document.getElementById(g_id_div_text_column_page_2);
	
    ret_elements[16] = element_text_column;	
	
    element_text_column = document.getElementById(g_id_div_text_column_page_3);
	
    ret_elements[17] = element_text_column;	

    element_text_column = document.getElementById(g_id_div_text_column_page_4);
	
    ret_elements[18] = element_text_column;	
	

	return ret_elements;
	
} // getElementsWithBorders

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Remove Borders  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Borders  //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the border of the print page one element
function setBorderPagePrintOne()
{
	var element_id_page_print_one = document.getElementById(g_id_page_print_one);
	
	element_id_page_print_one.style.border = "thin solid black";
	
} // setBorderPagePrintOne

// Sets the border of the print page two element
function setBorderPagePrintTwo()
{
	var element_id_page_print_two = document.getElementById(g_id_page_print_two);
	
	element_id_page_print_two.style.border = "thin solid black";
	
} // setBorderPagePrintTwo


// Sets the border of the text block on page two
function setBorderTextBlockPageTwo()
{
	// https://www.w3schools.com/jsref/prop_style_border.asp
	
	var element_text_column_page_two = document.getElementById(g_id_div_text_column_page_2);
	
	element_text_column_page_two.style.border = "thin solid #0000FF";
	
} // setBorderTextBlockPageTwo

// Sets the border of the text block on page three
function setBorderTextBlockPageThree()
{
	// https://www.w3schools.com/jsref/prop_style_border.asp
	
	var element_text_column_page_three = document.getElementById(g_id_div_text_column_page_3);
	
	element_text_column_page_three.style.border = "thin solid #0000FF";
	
} // setBorderTextBlockPageThree

// Sets the border of the text block on page four
function setBorderTextBlockPageFour()
{
	// https://www.w3schools.com/jsref/prop_style_border.asp
	
	var element_text_column_page_four = document.getElementById(g_id_div_text_column_page_4);
	
	element_text_column_page_four.style.border = "thin solid #0000FF";
	
} // setBorderTextBlockPageFour

// Sets the border of the bounding box for page two
function setBorderBoxPageTwo()
{
	var element_page_two_box = document.getElementsByTagName("PageTwoBox")[0];
	
	element_page_two_box.style.border = "thin solid black";
	
} // setBorderBoxPageTwo

// Sets the border of the bounding box for page three
function setBorderBoxPageThree()
{
	var element_page_three_box = document.getElementsByTagName("PageThreeBox")[0];
	
	element_page_three_box.style.border = "thin solid black";
	
} // setBorderBoxPageThree

// Sets the border of the bounding box for page four
function setBorderBoxPageFour()
{
	var element_page_four_box = document.getElementsByTagName("PageFourBox")[0];
	
	element_page_four_box.style.border = "thin solid black";
	
} // setBorderBoxPageFour

// Sets the border of the bounding box for page one
function setBorderBoxPageOne()
{
	var element_page_one_box = document.getElementsByTagName("PageOneBox")[0];
	
	element_page_one_box.style.border = "thin solid black";
	
} // setBorderBoxPageOne

// Sets the border of the bounding box for page five
function setBorderBoxPageFive()
{
	var element_page_five_box = document.getElementsByTagName("PageFiveBox")[0];
	
	element_page_five_box.style.border = "thin solid black";
	
} // setBorderBoxPageFive

// Sets the border of the bounding box for page six
function setBorderBoxPageSix()
{
	var element_page_six_box = document.getElementsByTagName("PageSixBox")[0];
	
	element_page_six_box.style.border = "thin solid black";
	
} // setBorderBoxPageSix

// Hides the border of the print page one element
function hideBorderPagePrintOne()
{
	var element_id_page_print_one = document.getElementById(g_id_page_print_one);
	
	element_id_page_print_one.style.borderStyle = "none";
	
} // hideBorderPagePrintOne

// Hides the border of the print page two element
function hideBorderPagePrintTwo()
{
	var element_id_page_print_two = document.getElementById(g_id_page_print_two);
	
	element_id_page_print_two.style.borderStyle = "none";
	
} // hideBorderPagePrintTwo



// Hides the border of the bounding box for page two
function hideBorderBoxPageTwo()
{
	var element_page_two_box = document.getElementsByTagName("PageTwoBox")[0];
	
	//element_page_two_box.style.border = "thin solid black";
	element_page_two_box.style.borderStyle = "none";
	
} // hideBorderBoxPageTwo

// Hides the border of the bounding box for page three
function hideBorderBoxPageThree()
{
	var element_page_three_box = document.getElementsByTagName("PageThreeBox")[0];
	
	//element_page_three_box.style.border = "thin solid black";
	element_page_three_box.style.borderStyle = "none";
	
} // hideBorderBoxPageThree

// Hides the border of the bounding box for page four
function hideBorderBoxPageFour()
{
	var element_page_four_box = document.getElementsByTagName("PageFourBox")[0];
	
	//element_page_four_box.style.border = "thin solid black";
	element_page_four_box.style.borderStyle = "none";
	
} // hideBorderBoxPageFour

// Hides the border of the bounding box for page one
function hideBorderBoxPageOne()
{
	var element_page_one_box = document.getElementsByTagName("PageOneBox")[0];
	
	element_page_one_box.style.borderStyle = "none";
	
} // hideBorderBoxPageOne

// Hides the border of the bounding box for page five
function hideBorderBoxPageFive()
{
	var element_page_five_box = document.getElementsByTagName("PageFiveBox")[0];
	
	element_page_five_box.style.borderStyle = "none";
	
} // hideBorderBoxPageFive

// Hides the border of the bounding box for page six
function hideBorderBoxPageSix()
{
	var element_page_six_box = document.getElementsByTagName("PageSixBox")[0];
	
	element_page_six_box.style.borderStyle = "none";
	
} // hideBorderBoxPageSix

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Borders  ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Clear Element Functions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Clear the element musician one label and text on page two
function clearLabelTextMusicianOnePageTwo()
{
	var element_page_2_musician_name_1 = document.getElementById(g_id_div_a6_page_2_musician_name_1);
	
	var element_page_2_musician_text_1 = document.getElementById(g_id_div_a6_page_2_musician_text_1);
		
    element_page_2_musician_name_1.innerHTML = "";
	
	element_page_2_musician_text_1.innerHTML = "";
	
} // clearLabelTextMusicianOnePageTwo

// Clear the element musician two label and text on page two
function clearLabelTextMusicianTwoPageTwo()
{
	var element_page_2_musician_name_2 = document.getElementById(g_id_div_a6_page_2_musician_name_2);
	
	var element_page_2_musician_text_2 = document.getElementById(g_id_div_a6_page_2_musician_text_2);
		
    element_page_2_musician_name_2.innerHTML = "";
	
	element_page_2_musician_text_2.innerHTML = "";
	
} // clearLabelTextMusicianTwoPageTwo

// Clear the element musician three label and text on page two
function clearLabelTextMusicianThreePageTwo()
{
	var element_page_2_musician_name_3 = document.getElementById(g_id_div_a6_page_2_musician_name_3);
	
	var element_page_2_musician_text_3 = document.getElementById(g_id_div_a6_page_2_musician_text_3);
		
    element_page_2_musician_name_3.innerHTML = "";
	
	element_page_2_musician_text_3.innerHTML = "";
	
} // clearLabelTextMusicianThreePageTwo

// Clear the element musician one label and text on page three
function clearLabelTextMusicianOnePageThree()
{
	var element_page_3_musician_name_1 = document.getElementById(g_id_div_a6_page_3_musician_name_1);
	
	var element_page_3_musician_text_1 = document.getElementById(g_id_div_a6_page_3_musician_text_1);
		
    element_page_3_musician_name_1.innerHTML = "";
	
	element_page_3_musician_text_1.innerHTML = "";
	
} // clearLabelTextMusicianOnePageThree

// Clear the element musician two label and text on page three
function clearLabelTextMusicianTwoPageThree()
{
	var element_page_3_musician_name_2 = document.getElementById(g_id_div_a6_page_3_musician_name_2);
	
	var element_page_3_musician_text_2 = document.getElementById(g_id_div_a6_page_3_musician_text_2);
		
    element_page_3_musician_name_2.innerHTML = "";
	
	element_page_3_musician_text_2.innerHTML = "";
	
} // clearLabelTextMusicianTwoPageThree

// Clear the element musician three label and text on page three
function clearLabelTextMusicianThreePageThree()
{
	var element_page_3_musician_name_3 = document.getElementById(g_id_div_a6_page_3_musician_name_3);
	
	var element_page_3_musician_text_3 = document.getElementById(g_id_div_a6_page_3_musician_text_3);
		
    element_page_3_musician_name_3.innerHTML = "";
	
	element_page_3_musician_text_3.innerHTML = "";
	
} // clearLabelTextMusicianThreePageThree

// Clear the element musician four label and text on page three
function clearLabelTextMusicianFourPageThree()
{
	var element_page_3_musician_name_4 = document.getElementById(g_id_div_a6_page_3_musician_name_4);
	
	var element_page_3_musician_text_4 = document.getElementById(g_id_div_a6_page_3_musician_text_4);
		
    element_page_3_musician_name_4.innerHTML = "";
	
	element_page_3_musician_text_4.innerHTML = "";
	
} // clearLabelTextMusicianFourPageThree

// Clear the element musician five label and text on page three
function clearLabelTextMusicianFivePageThree()
{
	var element_page_3_musician_name_5 = document.getElementById(g_id_div_a6_page_3_musician_name_5);
	
	var element_page_3_musician_text_5 = document.getElementById(g_id_div_a6_page_3_musician_text_5);
		
    element_page_3_musician_name_5.innerHTML = "";
	
	element_page_3_musician_text_5.innerHTML = "";
	
} // clearLabelTextMusicianFivePageThree

// Clear the element musician six label and text on page three
function clearLabelTextMusicianSixPageThree()
{
	var element_page_3_musician_name_6 = document.getElementById(g_id_div_a6_page_3_musician_name_6);
	
	var element_page_3_musician_text_6 = document.getElementById(g_id_div_a6_page_3_musician_text_6);
		
    element_page_3_musician_name_6.innerHTML = "";
	
	element_page_3_musician_text_6.innerHTML = "";
	
} // clearLabelTextMusicianSixPageThree


// Clear the element musician one label and text on page four
function clearLabelTextMusicianOnePageFour()
{
	var element_page_4_musician_name_1 = document.getElementById(g_id_div_a6_page_4_musician_name_1);
	
	var element_page_4_musician_text_1 = document.getElementById(g_id_div_a6_page_4_musician_text_1);
		
    element_page_4_musician_name_1.innerHTML = "";
	
	element_page_4_musician_text_1.innerHTML = "";
	
} // clearLabelTextMusicianOnePageFour

// Clear the element musician two label and text on page four
function clearLabelTextMusicianTwoPageFour()
{
	var element_page_4_musician_name_2 = document.getElementById(g_id_div_a6_page_4_musician_name_2);
	
	var element_page_4_musician_text_2 = document.getElementById(g_id_div_a6_page_4_musician_text_2);
		
    element_page_4_musician_name_2.innerHTML = "";
	
	element_page_4_musician_text_2.innerHTML = "";
	
} // clearLabelTextMusicianTwoPageFour

// Clear the element musician three label and text on page four
function clearLabelTextMusicianThreePageFour()
{
	var element_page_4_musician_name_3 = document.getElementById(g_id_div_a6_page_4_musician_name_3);
	
	var element_page_4_musician_text_3 = document.getElementById(g_id_div_a6_page_4_musician_text_3);
		
    element_page_4_musician_name_3.innerHTML = "";
	
	element_page_4_musician_text_3.innerHTML = "";
	
} // clearLabelTextMusicianThreePageFour

// Clear the element musician four label and text on page four
function clearLabelTextMusicianFourPageFour()
{
	var element_page_4_musician_name_4 = document.getElementById(g_id_div_a6_page_4_musician_name_4);
	
	var element_page_4_musician_text_4 = document.getElementById(g_id_div_a6_page_4_musician_text_4);
		
    element_page_4_musician_name_4.innerHTML = "";
	
	element_page_4_musician_text_4.innerHTML = "";
	
} // clearLabelTextMusicianFourPageFour

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Clear Element Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide-Display Elements /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hides the element <PagePrint> one (first/front page) 
function hidePagePrintOne()
{
	var element_id_page_print_one = document.getElementById(g_id_page_print_one);
	if (null == element_id_page_print_one)
	{
		alert("hidePagePrintOne Element with id g_id_page_print_one is null");
		
		return;
	}
		
	element_id_page_print_one.style.display = "none";
	
} // hidePagePrintOne

// Displays the element <PagePrint> one (first/front page) 
function displayPagePrintOne()
{
	var element_id_page_print_one = document.getElementById(g_id_page_print_one);
	if (null == element_id_page_print_one)
	{
		alert("displayPagePrintOne Element with id g_id_page_print_one is null");
		
		return;
	}
		
	element_id_page_print_one.style.display = "block";
	
} // displayPagePrintOne

// Hides the element <PagePrint> two (reverse page) 
function hidePagePrintTwo()
{
	var element_id_page_print_two = document.getElementById(g_id_page_print_two);
	if (null == element_id_page_print_two)
	{
		alert("hidePagePrintTwo Element with id g_id_page_print_two is null");
		
		return;
	}
		
	element_id_page_print_two.style.display = "none";
	
} // hidePagePrintTwo

// Displays the element <PagePrint> two (reverse page) 
function displayPagePrintTwo()
{
	var element_id_page_print_two = document.getElementById(g_id_page_print_two);
	if (null == element_id_page_print_two)
	{
		alert("displayPagePrintTwo Element with id g_id_page_print_two is null");
		
		return;
	}
		
	element_id_page_print_two.style.display = "block";
	
} // displayPagePrintTwo

// Hides the div element publish concert text checkbox
function hidePublishCheckbox()
{
	var element_id_div_publish_concert_texts = document.getElementById(g_id_div_publish_concert_texts);
	if (null == element_id_div_publish_concert_texts)
	{
		alert("hidePublishCheckbox Element with id g_id_div_publish_concert_texts is null");
		
		return;
	}
		
	element_id_div_publish_concert_texts.style.display = "none";
	
} // hidePublishCheckbox

// Hides the div element publish concert text checkbox
function displayPublishCheckbox()
{
	var element_id_div_publish_concert_texts = document.getElementById(g_id_div_publish_concert_texts);
	if (null == element_id_div_publish_concert_texts)
	{
		alert("displayPublishCheckbox Element with id g_id_div_publish_concert_texts is null");
		
		return;
	}
		
	element_id_div_publish_concert_texts.style.display = "block";
	
} // displayPublishCheckbox

// Hides the element <PageFourBox>
function hidePageFourBox()
{
	var element_id_page_four_box = document.getElementById(g_id_page_four_box);
	if (null == element_id_page_four_box)
	{
		alert("hidePageFourBox Element with id g_id_page_four_box is null");
		
		return;
	}
		
	element_id_page_four_box.style.display = "none";
	
} // hidePageFourBox

// Hides the element musicians dropdown
function hideMusiciansDropdown()
{
	var element_id_div_musician_drop_down = document.getElementById(g_id_div_musician_drop_down);
	if (null == element_id_div_musician_drop_down)
	{
		alert("hideMusiciansDropdown Element with id g_id_div_musician_drop_down is null");
		
		return;
	}
		
	element_id_div_musician_drop_down.style.display = "none";
	
} // hideMusiciansDropdown

// Hides the element text dropdown
function hideTextDropdown()
{
	var element_id_div_text_drop_down = document.getElementById(g_id_div_text_drop_down);
	if (null == element_id_div_text_drop_down)
	{
		alert("hideTextDropdown Element with id g_id_div_text_drop_down is null");
		
		return;
	}
		
	element_id_div_text_drop_down.style.display = "none";
	
} // hideTextDropdown

// Hides the element password dropdown
function hidePasswordDropdown()
{
	var element_id_div_password_drop_down = document.getElementById(g_id_div_password_drop_down);
	if (null == element_id_div_password_drop_down)
	{
		alert("hidePasswordDropdown Element with id g_id_div_password_drop_down is null");
		
		return;
	}
		
	element_id_div_password_drop_down.style.display = "none";
	
} // hidePasswordDropdown

// Hides the element active mode
function hideActiveMode()
{
	var element_id_div_active_mode = document.getElementById(g_id_div_active_mode);
	if (null == element_id_div_active_mode)
	{
		alert("hideActiveMode Element with id g_id_div_active_mode is null");
		
		return;
	}
		
	element_id_div_active_mode.style.display = "none";
	
} // hideActiveMode

// Hides the element label text area
function hideLabelTextArea()
{
	var element_id_div_label_text_textarea = document.getElementById(g_id_div_label_text_textarea);
	if (null == element_id_div_label_text_textarea)
	{
		alert("hideLabelTextArea Element with id g_id_div_label_text_textarea is null");
		
		return;
	}
		
	element_id_div_label_text_textarea.style.display = "none";
	
} // hideLabelTextArea

// Hides the element text area
function hideTextArea()
{
	var element_id_div_text_textarea = document.getElementById(g_id_div_text_textarea);
	if (null == element_id_div_text_textarea)
	{
		alert("hideTextArea Element with id g_id_div_text_textarea is null");
		
		return;
	}
		
	element_id_div_text_textarea.style.display = "none";
	
} // hideTextArea

// Hides the element label header for the text
function hideLabelHeaderText()
{
	var element_id_div_label_header_text = document.getElementById(g_id_div_label_header_text);
	if (null == element_id_div_label_header_text)
	{
		alert("hideLabelHeaderText Element with id g_id_div_label_header_text is null");
		
		return;
	}
		
	element_id_div_label_header_text.style.display = "none";
	
} // hideLabelHeaderText

// Hides the element label header for the text
function hideHeaderText()
{
	var element_id_div_header_text = document.getElementById(g_id_div_header_text);
	if (null == element_id_div_header_text)
	{
		alert("hideHeaderText Element with id g_id_div_header_text is null");
		
		return;
	}
		
	element_id_div_header_text.style.display = "none";
	
} // hideHeaderText

// Hides the element warning text area
function hideWarningTextArea()
{
	var element_id_div_warning_textarea = document.getElementById(g_id_div_warning_textarea);
	if (null == element_id_div_warning_textarea)
	{
		alert("hideWarningTextArea Element with id g_id_div_warning_textarea is null");
		
		return;
	}
		
	element_id_div_warning_textarea.style.display = "none";
	
} // hideWarningTextArea



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Hide-Display Elements ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Element Sizes /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Element Sizes ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Height Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Get the height of the text logo on page two
function getHeightTextLogoPageTwo()
{
	return getHeightOfHtmlElement(g_id_div_a6_page_2_text_logo);
	
} // getHeightTextLogoPageTwo

// Get the height of the short text on page two
function getHeightBandNamePageTwo()
{
	return getHeightOfHtmlElement(g_id_div_a6_page_2_band_name);
	
} // getHeightBandNamePageTwo

// Get the height of the short text on page two
function getHeightShortTextPageTwo()
{
	return getHeightOfHtmlElement(g_id_div_a6_page_2_short_text);
	
} // getHeightShortTextPageTwo

// Get the height of the musician label and text on page two
function getHeightLabelTextMusicianOnePageTwo()
{
    var height_page_2_musician_name_1 = getHeightOfHtmlElement(g_id_div_a6_page_2_musician_name_1);
	
	var height_page_2_musician_text_1 = getHeightOfHtmlElement(g_id_div_a6_page_2_musician_text_1);
		
	return height_page_2_musician_name_1 + height_page_2_musician_text_1;
	
} // getHeightLabelTextMusicianOnePageTwo


// Get the height of the text logo on page three
function getHeightTextLogoPageThree()
{	
	return getHeightOfHtmlElement(g_id_div_a6_page_3_text_logo);
	
} // getHeightTextLogoPageThree

// Get the height of the text logo on page four
function getHeightTextLogoPageFour()
{
	return getHeightOfHtmlElement(g_id_div_a6_page_4_text_logo);
	
} // getHeightTextLogoPageFour

// Get the height of text block on page two
function getHeightTextBlockPageTwo()
{
	return getHeightOfHtmlElement(g_id_div_text_column_page_2);
	
} // getHeightTextBlockPageTwo

// Get the height of text block on page three
function getHeightTextBlockPageThree()
{
	return getHeightOfHtmlElement(g_id_div_text_column_page_3);
	
} // getHeightTextBlockPageThree

// Get the height of text block on page four
function getHeightTextBlockPageFour()
{
	return getHeightOfHtmlElement(g_id_div_text_column_page_4);
	
} // getHeightTextBlockPageFour

// Get the height of the text bounding box for page two
function getHeightBoxPageTwo()
{
	return getHeightOfHtmlElementTagName("PageTwoBox");
	
} // getHeightBoxPageTwo

// Get the height of the text bounding box for page three
function getHeightBoxPageThree()
{
	return getHeightOfHtmlElementTagName("PageThreeBox");
	
} // getHeightBoxPageThree

// Get the height of the text bounding box for page four
function getHeightBoxPageFour()
{
	return getHeightOfHtmlElementTagName("PageFourBox");
	
} // getHeightBoxPageFour

// Get the total height for page two
function getTotalHeightPageTwo()
{
	var ret_total_height_page_2 = -0.123456789;
	
	var height_mm_text_logo_page_2 = getHeightTextLogoPageTwo();
	
	var height_mm_text_block_page_2 = getHeightTextBlockPageTwo();
	
	var height_mm_text_bounding_box_page_2 = getHeightBoxPageTwo();
	
	ret_total_height_page_2 = height_mm_text_logo_page_2 + height_mm_text_block_page_2;	
	
	return ret_total_height_page_2;
	
} // getTotalHeightPageTwo

// Get the remaining height for page two
function getRemainingHeightPageTwo()
{
	var total_height_page_2 = getTotalHeightPageTwo();
	
	var remaining_height_page_2 = g_page_max_height - total_height_page_2;
	
	return remaining_height_page_2;
	
} // getRemainingHeightPageTwo

// Get the total height for page three
function getTotalHeightPageThree()
{
	var ret_total_height_page_3 = -0.123456789;
	
	var height_mm_text_logo_page_3 = getHeightTextLogoPageThree();
	
	var height_mm_text_block_page_3 = getHeightTextBlockPageThree();
	
	var height_mm_text_bounding_box_page_3 = getHeightBoxPageThree();
	
	ret_total_height_page_3 = height_mm_text_logo_page_3 + height_mm_text_block_page_3;	
	
	return ret_total_height_page_3;
	
} // getTotalHeightPageThree

// Get the remaining height for page three
function getRemainingHeightPageThree()
{
	var total_height_page_3 = getTotalHeightPageThree();
	
	var remaining_height_page_3 = g_page_max_height - total_height_page_3;
	
	return remaining_height_page_3;
	
} // getRemainingHeightPageThree

// Get the remaining height for page four for musicians
function getRemainingHeightPageFourMusicians()
{
	var total_height_page_4 = getTotalHeightPageFour();
	
	var remaining_height_page_4 = g_page_max_height - total_height_page_4;
	
	return remaining_height_page_4;
	
} // getRemainingHeightPageFourMusicians

// Get the total height for page four
function getTotalHeightPageFour()
{
	var ret_total_height_page_4 = -0.123456789;
	
	var height_mm_text_logo_page_4 = getHeightTextLogoPageFour();
	
	var height_mm_text_block_page_4 = getHeightTextBlockPageFour();
	
	var height_mm_text_bounding_box_page_4 = getHeightBoxPageFour();
	
	ret_total_height_page_4 = height_mm_text_logo_page_4 + height_mm_text_block_page_4;	
	
	return ret_total_height_page_4;
	
} // getTotalHeightPageFour

// Get the remaining height for page four
function getRemainingHeightPageFour()
{
	var total_height_page_4 = getTotalHeightPageFour();
	
	var remaining_height_page_4 = g_page_max_height - total_height_page_4;
	
	return remaining_height_page_4;
	
} // getRemainingHeightPageFour

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Height Functions ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Decrease the width of the element <PagePrint> two (reverse page) 
function decreaseWidthPagePrintTwo()
{
	var element_id_page_print_two = document.getElementById(g_id_page_print_two);
	if (null == element_id_page_print_two)
	{
		alert("decreaseWidthPagePrintTwo Element with id g_id_page_print_two is null");
		
		return;
	}
	
	var current_width_page_print_two_mm = getWidthOfHtmlElement(g_id_page_print_two);
	
	var new_width_mm = 0.70*current_width_page_print_two_mm;
		
	setWidthOfHtmlElement(g_id_page_print_two, new_width_mm);
	
} // decreaseWidthPagePrintTwo

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Height Utility Functions //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Get the height of an HTML element like for instance the <div> element
function getHeightOfHtmlElement(i_id_div)
{
	var element_div = document.getElementById(i_id_div);
	
	var element_height_px = element_div.clientHeight;
	
	var element_height_mm = pixelToMillimeter(element_height_px);
	
	var element_height_mm_box = pixelToMillimeterRelativeBoundingBox(element_height_px);
	
	var int_dum = 1;
	if (Math.abs(element_height_mm - element_height_mm_box) > 1.0)
	{
		int_dum = 2;
	}
	
	return element_height_mm_box;
	
} // getHeightOfHtmlElement

// Get the height in millimeter of an HTML element like for instance the <PageTwoBox> element
function getHeightOfHtmlElementTagName(i_tag_name)
{
	var element_tag_name = document.getElementsByTagName(i_tag_name)[0];
	
	var element_height_px = element_tag_name.clientHeight;
	
	var element_height_mm = pixelToMillimeter(element_height_px);
	
	var element_height_mm_box = pixelToMillimeterRelativeBoundingBox(element_height_px);
	
	var int_dum = 1;
	if (Math.abs(element_height_mm - element_height_mm_box) > 1.0)
	{
		int_dum = 2;
	}	
	
	return element_height_mm_box;
	
} // getHeightOfHtmlElementTagName

// Get the height in pixel of an HTML element like for instance the <PageTwoBox> element
function getPixelHeightOfHtmlElementTagName(i_tag_name)
{
	var element_tag_name = document.getElementsByTagName(i_tag_name)[0];
	
	var element_height_px = element_tag_name.clientHeight;
	
	return element_height_px;
	
} // getPixelHeightOfHtmlElementTagName

// Get the width of an HTML element like for instance the <div> element
function getWidthOfHtmlElement(i_id_div)
{
	var element_div = document.getElementById(i_id_div);
	
	var element_width_px = element_div.clientWidth;
	
	var element_width_mm = pixelToMillimeter(element_width_px);
	
	var element_width_mm_box = pixelToMillimeterRelativeBoundingBox(element_width_px);
	
	var int_dum = 1;
	if (Math.abs(element_width_mm - element_width_mm_box) > 1.0)
	{
		int_dum = 2;
	}
	
	return element_width_mm_box;
	
} // getWidthOfHtmlElement

// Set the width of an HTML element like for instance the <PrintPage> element
function setWidthOfHtmlElement(i_id_div, i_width_mm)
{
	var element_div = document.getElementById(i_id_div);
	
	element_div.style.width = i_width_mm.toString() + "mm";
	
} // setWidthOfHtmlElement

// Convert millimeter to pixel
function millimeterToPixel(i_length_mm) 
{
	// https://stackoverflow.com/questions/7650413/pixel-to-mm-equation
	
    var div = document.createElement('div');
    div.style.display = 'block';
    div.style.height = '100mm';
    document.body.appendChild(div);
    var convert = div.offsetHeight * i_length_mm / 100;
    div.parentNode.removeChild(div);
    return convert;
	
} // millimeterToPixel

// Convert pixel to millimeter
function pixelToMillimeter(i_length_px) 
{
	var mm_to_px_factor = millimeterToPixel(1.0);
	
	var px_to_mm = i_length_px/mm_to_px_factor;
	
	return px_to_mm;
	
} // pixelToMillimeter

// Returns the height in millimeter. Input is the height in pixel
// There are differences height results for different browsers
// Probably also for different screen scalings and browser zoomings
// The height is therefore compared relative to the limiting
// bounding box for page two (could also be three or four) 
function pixelToMillimeterRelativeBoundingBox(i_height_pixel)
{
	var pixel_height_bounding_box = getPixelHeightBoxPageTwo(); 
	
	var ret_mm_height = g_bounding_box_height/pixel_height_bounding_box*i_height_pixel;
	
	return ret_mm_height;
		
} // pixelToMillimeterRelativeBoundingBox

// Get the pixel height of the text bounding box for page two
function getPixelHeightBoxPageTwo()
{
	return getPixelHeightOfHtmlElementTagName("PageTwoBox");
	
} // getPixelHeightBoxPageTwo

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Height Utility Functions ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide Tooltips /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hide tooltip for the application header
function hideToolTipApplicationHeader()
{
	 var element_tooltip_application_header = document.getElementById(g_id_tooltip_application_header);
	 
	 if (null == element_tooltip_application_header)
	 {
		 alert("hideToolTipApplicationHeader Element with id g_id_tooltip_application_header is null");
		 
		 return;
	 }
	 
	 element_tooltip_application_header.style.display = "none";;
	
} // hideToolTipApplicationHeader

// Hide tooltip for the login dropdown
function hideToolTipLoginDropdown()
{
	 var element_tooltip_login_dropdown = document.getElementById(g_id_tooltip_login_dropdown);
	 
	 if (null == element_tooltip_login_dropdown)
	 {
		 alert("hideToolTipLoginDropdown Element with id g_id_tooltip_login_dropdown is null");
		 
		 return;
	 }
	 
	 element_tooltip_login_dropdown.style.display = "none";;
	
} // hideToolTipLoginDropdown

// Hide tooltip for the password dropdown
function hideToolTipPasswordDropdown()
{
	 var element_tooltip_password_dropdown = document.getElementById(g_id_tooltip_password_dropdown);
	 
	 if (null == element_tooltip_password_dropdown)
	 {
		 alert("hideToolTipPasswordDropdown Element with id g_id_tooltip_password_dropdown is null");
		 
		 return;
	 }
	 
	 element_tooltip_password_dropdown.style.display = "none";;
	
} // hideToolTipPasswordDropdown

// Hide tooltip for the season dropdown
function hideToolTipSeasonDropdown()
{
	 var element_tooltip_season_dropdown = document.getElementById(g_id_tooltip_season_dropdown);
	 
	 if (null == element_tooltip_season_dropdown)
	 {
		 alert("hideToolTipSeasonDropdown Element with id g_id_tooltip_season_dropdown is null");
		 
		 return;
	 }
	 
	 element_tooltip_season_dropdown.style.display = "none";;
	
} // hideToolTipSeasonDropdown

// Hide tooltip for the concert dropdown
function hideToolTipConcertDropdown()
{
	 var element_tooltip_concert_dropdown = document.getElementById(g_id_tooltip_concert_dropdown);
	 
	 if (null == element_tooltip_concert_dropdown)
	 {
		 alert("hideToolTipConcertDropdown Element with id g_id_tooltip_concert_dropdown is null");
		 
		 return;
	 }
	 
	 element_tooltip_concert_dropdown.style.display = "none";;
	
} // hideToolTipConcertDropdown

// Hide tooltip for the musician dropdown
function hideToolTipMusicianDropdown()
{
	 var element_tooltip_musician_dropdown = document.getElementById(g_id_tooltip_musician_dropdown);
	 
	 if (null == element_tooltip_musician_dropdown)
	 {
		 alert("hideToolTipMusicianDropdown Element with id g_id_tooltip_musician_dropdown is null");
		 
		 return;
	 }
	 
	 element_tooltip_musician_dropdown.style.display = "none";;
	
} // hideToolTipMusicianDropdown

// Hide tooltip for the text input case dropdown
function hideToolTipTextInputCaseDropdown()
{
	 var element_tooltip_text_input_case_dropdown = document.getElementById(g_id_tooltip_text_input_case_dropdown);
	 
	 if (null == element_tooltip_text_input_case_dropdown)
	 {
		 alert("hideToolTipTextInputCaseDropdown Element with id g_id_tooltip_text_input_case_dropdown is null");
		 
		 return;
	 }
	 
	 element_tooltip_text_input_case_dropdown.style.display = "none";;
	
} // hideToolTipTextInputCaseDropdown

// Hide tooltip for the text input area
function hideToolTipTextInputArea()
{
	 var element_tooltip_text_input = document.getElementById(g_id_tooltip_text_input);
	 
	 if (null == element_tooltip_text_input)
	 {
		 alert("hideToolTipTextInputArea Element with id g_id_tooltip_text_input is null");
		 
		 return;
	 }
	 
	 element_tooltip_text_input.style.display = "none";;
	
} // hideToolTipTextInputArea

// Hide tooltip for the band name text
function hideToolTipBandName()
{
	 var element_tooltip_bandname_text = document.getElementById(g_id_tooltip_bandname_text);
	 
	 if (null == element_tooltip_bandname_text)
	 {
		 alert("hideToolTipBandName Element with id g_id_tooltip_bandname_text is null");
		 
		 return;
	 }
	 
	 element_tooltip_bandname_text.style.display = "none";;
	
} // hideToolTipBandName

// Hide tooltip for the active mode button
function hideToolTipActiveMode()
{
	 var element_tooltip_active_mode = document.getElementById(g_id_tooltip_active_mode);
	 
	 if (null == element_tooltip_active_mode)
	 {
		 alert("hideToolTipActiveMode Element with id g_id_tooltip_active_mode is null");
		 
		 return;
	 }
	 
	 element_tooltip_active_mode.style.display = "none";;
	
} // hideToolTipActiveMode

// Hide tooltip for the instrument text
function hideToolTipInstrument()
{
	 var element_tooltip_instrument_text = document.getElementById(g_id_tooltip_instrument_text);
	 
	 if (null == element_tooltip_instrument_text)
	 {
		 alert("hideToolTipInstrument Element with id g_id_tooltip_instrument_text is null");
		 
		 return;
	 }
	 
	 element_tooltip_instrument_text.style.display = "none";
	
} // hideToolTipInstrument

// Display tooltip for the instrument text
function displayToolTipInstrument()
{
	 var element_tooltip_instrument_text = document.getElementById(g_id_tooltip_instrument_text);
	 
	 if (null == element_tooltip_instrument_text)
	 {
		 alert("displayToolTipInstrument Element with id g_id_tooltip_instrument_text is null");
		 
		 return;
	 }
	 
	 // TODO Position of tooltip not OK element_tooltip_instrument_text.style.display = "block";
	 element_tooltip_instrument_text.style.display = "none";
	
} // displayToolTipInstrument

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Hide Tooltips ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide/Display Page Four ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hide the page four free text elements
function hidePageFourFreeText()
{
	var element_div_a6_page_4_free_header = document.getElementById(g_id_div_a6_page_4_free_header);
	
	element_div_a6_page_4_free_header.style.display = "none";
	
	var element_div_a6_page_4_free_text = document.getElementById(g_id_div_a6_page_4_free_text);	
	
	element_div_a6_page_4_free_text.style.display = "none";
	
} // hidePageFourFreeText

// Display the page four free text elements
function displayPageFourFreeText()
{
	var element_div_a6_page_4_free_header = document.getElementById(g_id_div_a6_page_4_free_header);
	
	element_div_a6_page_4_free_header.style.display = "block";
	
	var element_div_a6_page_4_free_text = document.getElementById(g_id_div_a6_page_4_free_text);	
	
	element_div_a6_page_4_free_text.style.display = "block";
	
} // displayPageFourFreeText

// Hide the page four free text elements
function hidePageFourMusicianTexts()
{
	var element_div_a6_page_4_musician_name_1 = document.getElementById(g_id_div_a6_page_4_musician_name_1);
	
	element_div_a6_page_4_musician_name_1.style.display = "none";
	
	var element_div_a6_page_4_musician_name_2 = document.getElementById(g_id_div_a6_page_4_musician_name_2);
	
	element_div_a6_page_4_musician_name_2.style.display = "none";
	
	var element_div_a6_page_4_musician_name_3 = document.getElementById(g_id_div_a6_page_4_musician_name_3);
	
	element_div_a6_page_4_musician_name_3.style.display = "none";
	
	var element_div_a6_page_4_musician_name_4 = document.getElementById(g_id_div_a6_page_4_musician_name_4);
	
	element_div_a6_page_4_musician_name_4.style.display = "none";

	var element_div_a6_page_4_musician_text_1 = document.getElementById(g_id_div_a6_page_4_musician_text_1);
	
	element_div_a6_page_4_musician_text_1.style.display = "none";
	
	var element_div_a6_page_4_musician_text_2 = document.getElementById(g_id_div_a6_page_4_musician_text_2);
	
	element_div_a6_page_4_musician_text_2.style.display = "none";
	
	var element_div_a6_page_4_musician_text_3 = document.getElementById(g_id_div_a6_page_4_musician_text_3);
	
	element_div_a6_page_4_musician_text_3.style.display = "none";
	
	var element_div_a6_page_4_musician_text_4 = document.getElementById(g_id_div_a6_page_4_musician_text_4);
	
	element_div_a6_page_4_musician_text_4.style.display = "none";
	
} // hidePageFourMusicianTexts

// Display the page four free text elements
function displayPageFourMusicianTexts()
{
	var element_div_a6_page_4_musician_name_1 = document.getElementById(g_id_div_a6_page_4_musician_name_1);
	
	element_div_a6_page_4_musician_name_1.style.display = "block";
	
	var element_div_a6_page_4_musician_name_2 = document.getElementById(g_id_div_a6_page_4_musician_name_2);
	
	element_div_a6_page_4_musician_name_2.style.display = "block";
	
	var element_div_a6_page_4_musician_name_3 = document.getElementById(g_id_div_a6_page_4_musician_name_3);
	
	element_div_a6_page_4_musician_name_3.style.display = "block";
	
	var element_div_a6_page_4_musician_name_4 = document.getElementById(g_id_div_a6_page_4_musician_name_4);
	
	element_div_a6_page_4_musician_name_4.style.display = "block";

	var element_div_a6_page_4_musician_text_1 = document.getElementById(g_id_div_a6_page_4_musician_text_1);
	
	element_div_a6_page_4_musician_text_1.style.display = "block";
	
	var element_div_a6_page_4_musician_text_2 = document.getElementById(g_id_div_a6_page_4_musician_text_2);
	
	element_div_a6_page_4_musician_text_2.style.display = "block";
	
	var element_div_a6_page_4_musician_text_3 = document.getElementById(g_id_div_a6_page_4_musician_text_3);
	
	element_div_a6_page_4_musician_text_3.style.display = "block";
	
	var element_div_a6_page_4_musician_text_4 = document.getElementById(g_id_div_a6_page_4_musician_text_4);
	
	element_div_a6_page_4_musician_text_4.style.display = "block";
		
} // displayPageFourMusicianTexts


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Hide/Display Page Four //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Element Identities ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Identities are hardcoded in PrintFoldedA6.htm or other flyer htm files

// <PrintPage> one
var g_id_page_print_one = "id_page_print_one";

// <PrintPage> two
var g_id_page_print_two = "id_page_print_two";

// PageFourBox
var g_id_page_four_box = "id_page_four_box";

// Header for the application
var g_id_div_header_application_flyer = "id_div_header_application_flyer";

// Pages
//QQ var g_id_div_a6_page_1 = "id_div_a6_page_1"; // Title page 
var g_id_div_a6_page_2 = "id_div_a6_page_2"; 
var g_id_div_a6_page_3 = "id_div_a6_page_3"; 
var g_id_div_a6_page_4 = "id_div_a6_page_4"; 
var g_id_div_a6_page_5 = "id_div_a6_page_5"; 
var g_id_div_a6_page_6 = "id_div_a6_page_6"; 

// Text logo on page 2, 3, 4, 5 and 6
var g_id_div_a6_page_2_text_logo = "id_div_a6_page_2_text_logo";
var g_id_div_a6_page_3_text_logo = "id_div_a6_page_3_text_logo";
var g_id_div_a6_page_4_text_logo = "id_div_a6_page_4_text_logo";
var g_id_div_a6_page_5_text_logo = "id_div_a6_page_5_text_logo";
var g_id_div_a6_page_6_text_logo = "id_div_a6_page_6_text_logo";

// Text (content) columns
var g_id_div_text_column_page_5 = "id_div_text_column_page_5";
var g_id_div_text_column_page_6 = "id_div_text_column_page_6";
var g_id_div_text_column_page_2 = "id_div_text_column_page_2";
var g_id_div_text_column_page_3 = "id_div_text_column_page_3";
var g_id_div_text_column_page_4 = "id_div_text_column_page_4";

// Band name page 2
var g_id_div_a6_page_2_band_name = "id_div_a6_page_2_band_name";

// Band name page 6
var g_id_div_a6_page_6_band_name = "id_div_a6_page_6_band_name";

// Musician list page 6
var g_id_div_a6_page_6_musician_list = "id_div_a6_page_6_musician_list";

// Short text page 2
var g_id_div_a6_page_2_short_text = "id_div_a6_page_2_short_text";

// Musician name page 2 
var g_id_div_a6_page_2_musician_name_1 = "id_div_a6_page_2_musician_name_1";
var g_id_div_a6_page_2_musician_name_2 = "id_div_a6_page_2_musician_name_2";
var g_id_div_a6_page_2_musician_name_3 = "id_div_a6_page_2_musician_name_3";

// Musician name page 3 
var g_id_div_a6_page_3_musician_name_1 = "id_div_a6_page_3_musician_name_1";
var g_id_div_a6_page_3_musician_name_2 = "id_div_a6_page_3_musician_name_2";
var g_id_div_a6_page_3_musician_name_3 = "id_div_a6_page_3_musician_name_3";
var g_id_div_a6_page_3_musician_name_4 = "id_div_a6_page_3_musician_name_4";
var g_id_div_a6_page_3_musician_name_5 = "id_div_a6_page_3_musician_name_5";
var g_id_div_a6_page_3_musician_name_6 = "id_div_a6_page_3_musician_name_6";

// Musician name page 4 
var g_id_div_a6_page_4_musician_name_1 = "id_div_a6_page_4_musician_name_1";
var g_id_div_a6_page_4_musician_name_2 = "id_div_a6_page_4_musician_name_2";
var g_id_div_a6_page_4_musician_name_3 = "id_div_a6_page_4_musician_name_3";
var g_id_div_a6_page_4_musician_name_4 = "id_div_a6_page_4_musician_name_4";

// Musician text page 2
var g_id_div_a6_page_2_musician_text_1 = "id_div_a6_page_2_musician_text_1";
var g_id_div_a6_page_2_musician_text_2 = "id_div_a6_page_2_musician_text_2";
var g_id_div_a6_page_2_musician_text_3 = "id_div_a6_page_2_musician_text_3";

// Musician text page 3
var g_id_div_a6_page_3_musician_text_1 = "id_div_a6_page_3_musician_text_1";
var g_id_div_a6_page_3_musician_text_2 = "id_div_a6_page_3_musician_text_2";
var g_id_div_a6_page_3_musician_text_3 = "id_div_a6_page_3_musician_text_3";
var g_id_div_a6_page_3_musician_text_4 = "id_div_a6_page_3_musician_text_4";
var g_id_div_a6_page_3_musician_text_5 = "id_div_a6_page_3_musician_text_5";
var g_id_div_a6_page_3_musician_text_6 = "id_div_a6_page_3_musician_text_6";

// Musician text page 4
var g_id_div_a6_page_4_musician_text_1 = "id_div_a6_page_4_musician_text_1";
var g_id_div_a6_page_4_musician_text_2 = "id_div_a6_page_4_musician_text_2";
var g_id_div_a6_page_4_musician_text_3 = "id_div_a6_page_4_musician_text_3";
var g_id_div_a6_page_4_musician_text_4 = "id_div_a6_page_4_musician_text_4";

// Free text header page 4
var g_id_div_a6_page_4_free_header = "id_div_a6_page_4_free_header";

// Free text page 4
var g_id_div_a6_page_4_free_text = "id_div_a6_page_4_free_text";

// Entrance fee header page 5
var g_id_div_a6_page_5_entrance_header = "id_div_a6_page_5_entrance_header";

// Entrance fee text page 5
var g_id_div_a6_page_5_entrance_text = "id_div_a6_page_5_entrance_text";

// QR Codes with texts
var g_id_div_qr_code_page_5_cell_1_1 = "id_div_qr_code_page_5_cell_1_1";
var g_id_div_qr_code_page_5_cell_1_2 = "id_div_qr_code_page_5_cell_1_2";
var g_id_div_qr_code_page_5_cell_2_1 = "id_div_qr_code_page_5_cell_2_1";
var g_id_div_qr_code_page_5_cell_2_2 = "id_div_qr_code_page_5_cell_2_2";
//20220225 var g_id_div_qr_code_page_5_cell_3_1 = "id_div_qr_code_page_5_cell_3_1";
//20220225 var g_id_div_qr_code_page_5_cell_3_2 = "id_div_qr_code_page_5_cell_3_2";
var g_id_div_qr_code_page_5_cell_4_1 = "id_div_qr_code_page_5_cell_4_1";
var g_id_div_qr_code_page_5_cell_4_2 = "id_div_qr_code_page_5_cell_4_2";
var g_id_div_qr_code_page_5_cell_5_1 = "id_div_qr_code_page_5_cell_5_1";
var g_id_div_qr_code_page_5_cell_5_2 = "id_div_qr_code_page_5_cell_5_2";

var g_id_div_qr_code_page_6_cell_1_1 = "id_div_qr_code_page_6_cell_1_1";
var g_id_div_qr_code_page_6_cell_1_2 = "id_div_qr_code_page_6_cell_1_2";
var g_id_div_qr_code_page_6_cell_2_1 = "id_div_qr_code_page_6_cell_2_1";
var g_id_div_qr_code_page_6_cell_2_2 = "id_div_qr_code_page_6_cell_2_2";

// Image with logos
var g_id_div_a6_page_6_logos_image = "id_div_a6_page_6_logos_image";

// Flyer images
var g_id_flyer_image = "id_flyer_image";

// Dropdowns
var g_id_div_season_drop_down = "id_div_season_drop_down";
var g_id_div_concert_drop_down = "id_div_concert_drop_down";
var g_id_div_login_drop_down = "id_div_login_drop_down";
var g_id_div_musician_drop_down = "id_div_musician_drop_down";
var g_id_div_text_drop_down = "id_div_text_drop_down";
var g_id_div_password_drop_down = "id_div_password_drop_down";

// Multiple line textarea for test results
var g_id_div_tester_textarea = "id_div_tester_textarea";
var g_id_tester_textarea = "id_tester_textarea";

// Edit XML 
var g_id_div_label_header_text = "id_div_label_header_text";
var g_id_div_header_text = "id_div_header_text";
var g_id_div_label_instrument_text = "id_div_label_instrument_text";
var g_id_div_instrument_text = "id_div_instrument_text";
var g_id_div_label_text_textarea = "id_div_label_text_textarea";
var g_id_div_text_textarea = "id_div_text_textarea";
var g_id_text_textarea = "id_text_textarea";
var g_id_header_text = "id_header_text";
var g_id_instrument_text = "id_instrument_text";

// Active mode paragraph
var g_id_div_active_mode = "id_div_active_mode";
var g_id_paragraph_active_mode = "id_paragraph_active_mode";

// Create PDF files
var g_id_div_create_pdf_files = "id_div_create_pdf_files";

// Logout div
var g_id_div_logout_button = "id_div_logout_button";

// Div for publish concert text flag
var g_id_div_publish_concert_texts = "id_div_publish_concert_texts";

// Check box for publish concert text flag
var g_id_publish_concert_texts = "id_publish_concert_texts";

// Warning text area
var g_id_div_warning_textarea = "id_div_warning_textarea";
var g_id_warning_textarea = "id_warning_textarea";

// Display boundaries paragraph
var g_id_div_display_boundaries = "id_div_display_boundaries";
var g_id_paragraph_display_boundaries = "id_paragraph_display_boundaries";

// Display or hide cutting line paragraph
var g_id_div_display_hide_cutting_lines = "id_div_display_hide_cutting_lines";
var g_id_paragraph_display_hide_cutting_lines = "id_paragraph_display_hide_cutting_lines";

// Cutting lines 

var g_id_top_left_vl_page_one = "id_top_left_vl_page_one";
var g_id_top_left_hl_page_one = "id_top_left_hl_page_one";
var g_id_top_right_vl_page_one = "id_top_right_vl_page_one";
var g_id_top_right_hl_page_one = "id_top_right_hl_page_one";

var g_id_bottom_left_vl_page_one = "id_bottom_left_vl_page_one";
var g_id_bottom_left_hl_page_one = "id_bottom_left_hl_page_one";
var g_id_bottom_right_vl_page_one = "id_bottom_right_vl_page_one";
var g_id_bottom_right_hl_page_one = "id_bottom_right_hl_page_one";

var g_id_top_left_vl_page_two = "id_top_left_vl_page_two";
var g_id_top_left_hl_page_two = "id_top_left_hl_page_two";
var g_id_top_right_vl_page_two = "id_top_right_vl_page_two";
var g_id_top_right_hl_page_two = "id_top_right_hl_page_two";

var g_id_bottom_left_vl_page_two = "id_bottom_left_vl_page_two";
var g_id_bottom_left_hl_page_two = "id_bottom_left_hl_page_two";
var g_id_bottom_right_vl_page_two = "id_bottom_right_vl_page_two";
var g_id_bottom_right_hl_page_two = "id_bottom_right_hl_page_two";

// Black image left or right of text logo
var g_id_top_black_area_left_page_one = "id_top_black_area_left_page_one";
var g_id_top_black_area_left_page_two = "id_top_black_area_left_page_two";
var g_id_top_black_area_right_page_two = "id_top_black_area_right_page_two";

var g_id_tooltip_application_header = "id_tooltip_application_header";

var g_id_div_flyer_help = "id_div_flyer_help";

var g_id_tooltip_login_dropdown = "id_tooltip_login_dropdown";

var g_id_tooltip_password_dropdown = "id_tooltip_password_dropdown";

var g_id_tooltip_season_dropdown = "id_tooltip_season_dropdown";

var g_id_tooltip_concert_dropdown = "id_tooltip_concert_dropdown";

var g_id_tooltip_musician_dropdown = "id_tooltip_musician_dropdown";

var g_id_tooltip_text_input_case_dropdown = "id_tooltip_text_input_case_dropdown";

var g_id_tooltip_text_input = "id_tooltip_text_input";

var g_id_tooltip_bandname_text = "id_tooltip_bandname_text";

var g_id_tooltip_instrument_text = "id_tooltip_instrument_text";

var g_id_tooltip_active_mode = "id_tooltip_active_mode";

var g_id_tooltip_display_boundaries = "id_tooltip_display_boundaries";

var g_id_tooltip_create_pdf_files = "id_tooltip_create_pdf_files";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Identities //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

