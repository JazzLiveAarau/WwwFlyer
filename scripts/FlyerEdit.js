// File: FlyerEdit.js
// Date: 2020-02-20
// Author: Gunnar Lidén

// File content
// =============
// Functions for XML Edit


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set XML Edit Controls
function setXmlEditControls()
{
	if (1 == g_current_text_number) // Short text and band name
	{
		setXmlEditControlsShortText();
	}
	else if (2 == g_current_text_number) // Musician name, instrument and text
	{
		setXmlEditControlsMusicianText();
	}	
	else if (3 == g_current_text_number) // Additional text and label
	{
		setXmlEditControlsAdditionalText();
	}	
	else  // Not valid value
	{
		alert("setXmlEditControls Unvalid current text number " + g_current_text_number.toString());
	}		
	
	setPublishTextFlagCheckBox();
		
	
} // setXmlEditControls

// Set XML Edit Controls for short text and band name
function setXmlEditControlsShortText()
{
    var element_div_label_text = getElementDivLabelText();	
    element_div_label_text.innerHTML = '<b>' + g_label_band_name + '</b>';		
	
	var element_div_label_instrument = getElementDivLabelInstrument();
	element_div_label_instrument.style.display = "none";
	
	hideToolTipInstrument();
	
	var element_div_musician_dropdown = getElementDivMusicianDropdown();
	element_div_musician_dropdown.style.display = "none";
	
	var element_text_instrument = getElementTextInstrument();
	element_text_instrument.style.display = "none";
	
	var element_div_label_textarea = getElementDivLabelTextarea();
	element_div_label_textarea.innerHTML = '<b>' + g_label_short_descr + '</b>';
	
	var element_text_header = getElementTextHeader();
	
	element_text_header.readOnly = true;
		
	var element_textarea = getElementTextarea();
	
    if (g_flyer_application_mode == "EditXml")
	{
	    element_text_header.value = getBandName(g_current_concert_number);	
		
		element_textarea.value = getConcertShortText(g_current_concert_number);	
		
		element_textarea.readOnly = false;
	}
    else if (g_flyer_application_mode == "AdminXml")
	{
	    element_text_header.value = "";	
		
		element_textarea.value = "";
		
		element_textarea.readOnly = true;
	
	}
	else
	{
	    alert("setXmlEditControlsShortText Not a valid value g_flyer_application_mode= " + g_flyer_application_mode);
	}	

} // setXmlEditControlsShortText

// Set XML Edit Controls for musician name, instrument and text
function setXmlEditControlsMusicianText()
{
    var element_div_label_text = getElementDivLabelText();	
    element_div_label_text.innerHTML = '<b>' + g_label_musician_name + '</b>';	
	
	var element_div_label_instrument = getElementDivLabelInstrument();
	element_div_label_instrument.style.display = "block";
	element_div_label_instrument.innerHTML = '<b>' + g_label_instrument + '</b>';	
	
	var element_text_instrument = getElementTextInstrument();
	element_text_instrument.style.display = "block";
	displayToolTipInstrument();
	
	var element_div_musician_dropdown = getElementDivMusicianDropdown();
	element_div_musician_dropdown.style.display = "block";	
	
	element_text_instrument.readOnly = true;
	
	var element_div_label_textarea = getElementDivLabelTextarea();
	element_div_label_textarea.innerHTML = '<b>' + g_label_musician_text + '</b>';	
	
	var element_text_header = getElementTextHeader();
	
	element_text_header.readOnly = true;
		
	var element_textarea = getElementTextarea();
		
    if (g_flyer_application_mode == "EditXml")
	{
	    element_text_header.value =  getMusicianName(g_current_concert_number, g_current_musician_number);	
		
		element_text_instrument.value =  getMusicianInstrument(g_current_concert_number, g_current_musician_number);	
		
		element_textarea.value = getMusicianText(g_current_concert_number, g_current_musician_number);
		
		element_textarea.readOnly = false;
	}
    else if (g_flyer_application_mode == "AdminXml")
	{
	    element_text_header.value = "";	
		
		element_text_instrument.value = "";
		
		element_textarea.value = "";
		
		element_textarea.readOnly = true;
	
	}
	else
	{
	    alert("setXmlEditControlsMusicianText Not a valid value g_flyer_application_mode= " + g_flyer_application_mode);
	}	
	
	
} // setXmlEditControlsMusicianText

// Set XML Edit Controls for additional text and label
function setXmlEditControlsAdditionalText()
{
    var element_div_label_text = getElementDivLabelText();	
    element_div_label_text.innerHTML = '<b>' + g_label_additional_text_header + '</b>';		
	
	var element_div_label_instrument = getElementDivLabelInstrument();
	element_div_label_instrument.style.display = "none";
	
	var element_text_instrument = getElementTextInstrument();
	element_text_instrument.style.display = "none";
	
	hideToolTipInstrument();
	
	var element_div_musician_dropdown = getElementDivMusicianDropdown();
	element_div_musician_dropdown.style.display = "none";	
	
	var element_div_label_textarea = getElementDivLabelTextarea();
	element_div_label_textarea.innerHTML = '<b>' + g_label_additional_text + '</b>';
	
	var element_text_header = getElementTextHeader();
		
	var element_textarea = getElementTextarea();
	
    if (g_flyer_application_mode == "EditXml")
	{
		element_text_header.value = getConcertLabelFlyerText(g_current_concert_number);
		
		element_textarea.value = getConcertFlyerText(g_current_concert_number);
		
		element_textarea.readOnly = false;
		
		element_text_header.readOnly = false;
	}
    else if (g_flyer_application_mode == "AdminXml")
	{
		element_text_header.value = getConcertLabelFlyerText(g_current_concert_number);
		
		element_textarea.value = "";
		
		element_textarea.readOnly = true;
		
		element_text_header.readOnly = true;
	
	}
	else
	{
	    alert("setXmlEditControlsShortText Not a valid value g_flyer_application_mode= " + g_flyer_application_mode);
	}	
	
} // setXmlEditControlsAdditionalText


 
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls  ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility functions  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Get element for the label of the header
function getElementDivLabelText()
{
	var ret_element_div_label_text = document.getElementById(g_id_div_label_header_text);
    if (null == ret_element_div_label_text)
    {
        alert("getElementDivLabelText g_id_div_label_header_text is null");
    }	

    return ret_element_div_label_text;	
	
} // getElementDivLabelText

// Get element for the header text
function getElementTextHeader()
{
    var ret_element_text_header = document.getElementById(g_id_header_text);	
    if (null == ret_element_text_header)
    {
        alert("getElementTextHeader g_id_header_text is null");
    }	
	
	return ret_element_text_header;
	
} // getElementTextHeader

// Get element for the label of the instrument
function getElementDivLabelInstrument()
{
	var ret_element_div_label_instrument = document.getElementById(g_id_div_label_instrument_text);
    if (null == ret_element_div_label_instrument)
    {
        alert("getElementDivLabelText g_id_div_label_instrument_text is null");
    }	

    return ret_element_div_label_instrument;	
	
} // getElementDivLabelInstrument

// Get element for the musicians dropdown
function getElementDivMusicianDropdown()
{
	var ret_element_div_musician_drop_down = document.getElementById(g_id_div_musician_drop_down);
    if (null == ret_element_div_musician_drop_down)
    {
        alert("getElementDivLabelText g_id_div_musician_drop_down is null");
    }	

    return ret_element_div_musician_drop_down;	
	
} // getElementDivMusicianDropdown



// Get element for the instrument text
function getElementTextInstrument()
{
    var ret_element_text_instrument = document.getElementById(g_id_instrument_text);	
    if (null == ret_element_text_instrument)
    {
        alert("getElementTextInstrument g_id_instrument_text is null");
    }	
	
	return ret_element_text_instrument;
	
} // getElementTextInstrument

// Get element for the label of the textarea
function getElementDivLabelTextarea()
{
    var ret_element_div_textarea_concert = document.getElementById(g_id_div_label_text_textarea);	
    if (null == ret_element_div_textarea_concert)
    {
        alert("setLabelTextareaConcert g_id_div_label_text_textarea is null");
    }	
	
	return ret_element_div_textarea_concert;
	
} // getElementDivLabelTextarea

// Get element for the textarea
function getElementTextarea()
{
    var ret_element_textarea = document.getElementById(g_id_text_textarea);	
    if (null == ret_element_textarea)
    {
        alert("setLabelTextareaConcert g_id_text_textarea is null");
    }	
	
	return ret_element_textarea;
	
} // getElementTextarea


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility functions  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Data Copied From Admin  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns true if data has been copied
function dataIsCopied()
{
	var ret_is_copied = false;
	
	var musiker_1_instrument = getMusicianInstrument(g_current_concert_number, 1);
	
	if (musiker_1_instrument.length > 0)
	{
		ret_is_copied = true;
	}
	else
	{
		ret_is_copied = false;
	}
	
	return ret_is_copied;
	
} // ret_is_copied


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Data Copied From Admin  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Input Concert Textarea  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Execute an input change in the concert textarea
// 1. Get the text string from the concert textarea. Call of getElementTextarea
// 2. If the string is empty, replace it with NotYetSetNodeValue. Call of setFlagNodeValueIsNotSetForEmptyString
// 3. Set concert, musician or additional text. Global variable g_current_text_number determines which to set.
// 4. Set all HTML texts for the flyer. Call of  setAllTexts
// 5. Save text in the XML Edit file on the server. Call of saveXmlEditObjectToFile
//    Please note that the save function replaces the in XML not allowed characters &, < and >
function execConcertTextAreaChange()
{
	if (g_flyer_application_mode == "AdminXml")
	{
		return;
	}
	
	var element_textarea = getElementTextarea();
	
	var textarea_value = element_textarea.value;
	
	var mod_textarea_value = textarea_value;
	
	mod_textarea_value = setFlagNodeValueIsNotSetForEmptyString(mod_textarea_value);
		
	if (g_current_text_number == 1)
	{
		setConcertShortText(g_current_concert_number, mod_textarea_value);
	}
	else if (g_current_text_number == 2)
	{
		setMusicianText(g_current_concert_number, g_current_musician_number, mod_textarea_value);
	}	
	else if (g_current_text_number == 3)
	{		
		setConcertFlyerText(g_current_concert_number, mod_textarea_value);
	}		
	
	setAllTexts();
	
	saveXmlEditObjectToFile();
	
} // execConcertTextAreaChange


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Input Concert Textarea  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Input Label Text //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Execute an input change of the label text
function execConcertTextLabelChange()
{
	if (g_flyer_application_mode == "AdminXml")
	{
		return;
	}	
	
	if (g_current_text_number != 3)
	{
		return;
	}		
	
	var element_text_header = getElementTextHeader();
	
	var text_header_value = element_text_header.value;
	
	var mod_text_header_value = text_header_value;
	
	mod_text_header_value = setFlagNodeValueIsNotSetForEmptyString(mod_text_header_value);
	
	mod_text_header_value = ReplaceNotAllowedXmlChars(mod_text_header_value);	
	
	setConcertLabelFlyerText(g_current_concert_number, mod_text_header_value);
	
	setAllTexts();
	
	saveXmlEditObjectToFile();	
	
} // execConcertTextLabelChange


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Input Label Text ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
