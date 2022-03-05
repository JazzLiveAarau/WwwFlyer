// File: FlyerChecks.js
// Date: 2022-03-05
// Author: Gunnar Lidén

// File content
// =============
// Data check functions

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Check Lineup  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Check that band names, musician names and musician instruments are equal in admin 
// data (season program XML) and edit data (edit XML files)
function checkFlyerBandData()
{
	var input_flyer_application_mode = g_flyer_application_mode; 

	// displayBandDataHomepageAndEdit();

	if (!flyerNumberOfMusiciansIsEqual())
	{
		alert("Number of musicians is not equal");

		g_flyer_application_mode = input_flyer_application_mode;

		return;
	}

	var musicians_equal = flyerMusicianTextsAreEqual();

	var b_all_equal = true;

	for (var index_musician=0; index_musician < musicians_equal.length; index_musician++)
	{
		var b_names_equal = musicians_equal[index_musician];

		if (!b_names_equal)
		{
			alert("Musician texts not equal for musician number " + (index_musician + 1).toString());

			b_all_equal = false;
		}

	}

	if (b_all_equal)
	{
		alert("All musician texts are equal");
	}

	g_flyer_application_mode = input_flyer_application_mode;

} // checkFlyerBandData

// Returns true if band name is equal in the season program XML file and the edit XML file
function flyerBandNameIsEqual()
{
	var input_flyer_application_mode = g_flyer_application_mode; 

	g_flyer_application_mode = "AdminXml";

	var band_name_homepage = getBandName(g_current_concert_number);

	g_flyer_application_mode = "EditXml";

	var band_name_edit = getBandName(g_current_concert_number);

	g_flyer_application_mode = input_flyer_application_mode;

	if (band_name_homepage == band_name_edit)
	{
		return true;
	}
	else
	{
		return false;
	}

} // flyerBandNameIsEqual

// Returns true if band text is equal in the season program XML file and the edit XML file
function flyerBandTextIsEqual()
{
	var input_flyer_application_mode = g_flyer_application_mode; 

	g_flyer_application_mode = "AdminXml";

	var band_text_homepage = getConcertShortText(g_current_concert_number);

	g_flyer_application_mode = "EditXml";

	var band_text_edit = getConcertShortText(g_current_concert_number);

	g_flyer_application_mode = input_flyer_application_mode;

	if (band_text_homepage == band_text_edit)
	{
		return true;
	}
	else
	{
		return false;
	}

} // flyerBandTextIsEqual

// Returns true if the free flyer label is equal in the season program XML file and the edit XML file
function flyerFreeLabelIsEqual()
{
	var input_flyer_application_mode = g_flyer_application_mode; 

	g_flyer_application_mode = "AdminXml";

	var flyer_label_hompage = getConcertLabelFlyerText(g_current_concert_number);

	g_flyer_application_mode = "EditXml";

	var flyer_label_edit = getConcertLabelFlyerText(g_current_concert_number);

	g_flyer_application_mode = input_flyer_application_mode;

	if (flyer_label_hompage == flyer_label_edit)
	{
		return true;
	}
	else
	{
		return false;
	}

} // flyerFreeLabelIsEqual

// Returns true if the free flyer text is equal in the season program XML file and the edit XML file
function flyerFreeTextIsEqual()
{
	var input_flyer_application_mode = g_flyer_application_mode; 

	g_flyer_application_mode = "AdminXml";

	var flyer_text_hompage = getConcertFlyerText(g_current_concert_number);

	g_flyer_application_mode = "EditXml";

	var flyer_text_edit = getConcertFlyerText(g_current_concert_number);

	g_flyer_application_mode = input_flyer_application_mode;

	if (flyer_text_hompage == flyer_text_edit)
	{
		return true;
	}
	else
	{
		return false;
	}

} // flyerFreeTextIsEqual

// Returns true if the number of musicians is equal in the season program XML file and the edit XML file
function flyerNumberOfMusiciansIsEqual()
{
	var b_admin = true;

	var musicians_homepage = getFlyerMusicianNamesArray(b_admin);

	b_admin = false;

	var musicians_edit = getFlyerMusicianNamesArray(b_admin);

	if (musicians_homepage.length == musicians_edit.length)
	{
		return true;
	}
	else
	{
		return false;
	}

} // flyerNumberOfMusiciansIsEqual

// Returns an array with booleans telling if the musician name is equal or not
// in the season program XML file and the edit XML file
function flyerMusicianNamesAreEqual()
{
	if (!flyerNumberOfMusiciansIsEqual())
	{
		alert("flyerMusicianNamesAreEqual Number of musicians is not equal");

		return null;
	}

	var b_admin = true;

	var musicians_homepage = getFlyerMusicianNamesArray(b_admin);

	b_admin = false;

	var musicians_edit = getFlyerMusicianNamesArray(b_admin);

	var n_musicians = musicians_homepage.length;

	var ret_musicians_bool = [];

	for (var index_musician=0; index_musician < n_musicians; index_musician++)
	{
		var musician_homepage = musicians_homepage[index_musician];

		var musician_edit = musicians_edit[index_musician];

		if (musician_homepage == musician_edit)
		{
			ret_musicians_bool[index_musician] = true;
		}
		else
		{
			ret_musicians_bool[index_musician] = false;
		}

	} // index_musician

	return ret_musicians_bool;

} // flyerMusicianNamesAreEqual

// Returns an array with booleans telling if the musician instrument is equal or not
// in the season program XML file and the edit XML file
function flyerMusicianInstrumentsAreEqual()
{
	if (!flyerNumberOfMusiciansIsEqual())
	{
		alert("flyerMusicianInstrumentsAreEqual Number of musicians is not equal");

		return null;
	}

	var b_admin = true;

	var instruments_homepage = getFlyerMusicianInstrumentsArray(b_admin);

	b_admin = false;

	var instruments_edit = getFlyerMusicianInstrumentsArray(b_admin);

	var n_musicians = instruments_homepage.length;

	var ret_instruments_bool = [];

	for (var index_musician=0; index_musician < n_musicians; index_musician++)
	{
		var instrument_homepage = instruments_homepage[index_musician];

		var instrument_edit = instruments_edit[index_musician];

		if (instrument_homepage == instrument_edit)
		{
			ret_instruments_bool[index_musician] = true;
		}
		else
		{
			ret_instruments_bool[index_musician] = false;
		}

	} // index_musician

	return ret_instruments_bool;

} // flyerMusicianInstrumentsAreEqual

// Returns an array with booleans telling if the musician text is equal or not
// in the season program XML file and the edit XML file
function flyerMusicianTextsAreEqual()
{
	if (!flyerNumberOfMusiciansIsEqual())
	{
		alert("flyerMusicianTextsAreEqual Number of musicians is not equal");

		return null;
	}

	var b_admin = true;

	var texts_homepage = getFlyerMusicianInstrumentsArray(b_admin);

	b_admin = false;

	var texts_edit = getFlyerMusicianTextsArray(b_admin);

	var n_musicians = texts_homepage.length;

	var ret_texts_bool = [];

	for (var index_musician=0; index_musician < n_musicians; index_musician++)
	{
		var text_homepage = texts_homepage[index_musician];

		var text_edit = texts_edit[index_musician];

		if (text_homepage == text_edit)
		{
			ret_texts_bool[index_musician] = true;
		}
		else
		{
			ret_texts_bool[index_musician] = false;
		}

	} // index_musician

	return ret_texts_bool;

} // flyerMusicianTextsAreEqual

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Check Lineup  ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Display Data Functions  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays homepage (season program XML file) and flyer (edit XML files) data
function displayBandDataHomepageAndEdit()
{
	var homepage_html = getBandDataHomepageHtmlString();

	var edit_html = getBandDataEditHtmlString();

	displayDivDisplayCheckBandData();

	var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

	element_div_display_band_data.innerHTML = homepage_html + edit_html;

} // displayBandDataHomepageAndEdit

// Displays homepage (season program XML file) data
function displayBandDataHomepage()
{
	var homepage_html = getBandDataHomepageHtmlString();

	displayDivDisplayCheckBandData();

	var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

	element_div_display_band_data.innerHTML = homepage_html;

} // displayBandDataHomepage

// Displays flyer (edit XML files) data
function displayBandDataEdit()
{
	var edit_html = getBandDataEditHtmlString();

	displayDivDisplayCheckBandData();

	var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

	element_div_display_band_data.innerHTML = edit_html;

} // displayBandDataEdit

// Returns the band data defined on the homepage, i.e in the season program XML file
function getBandDataHomepageHtmlString()
{
	var ret_html_homepage = '';

	var input_flyer_application_mode = g_flyer_application_mode; 

	g_flyer_application_mode = "AdminXml";

	var band_name_homepage = getBandName(g_current_concert_number);

	var band_text_homepage = getConcertShortText(g_current_concert_number);

	var flyer_label_hompage = getConcertLabelFlyerText(g_current_concert_number);

	var flyer_text_hompage = getConcertFlyerText(g_current_concert_number);

	var b_admin = true;

	var musicians_homepage = getFlyerMusicianNamesArray(b_admin);

	var instruments_homepage = getFlyerMusicianInstrumentsArray(b_admin);

	var texts_homepage = getFlyerMusicianTextsArray(b_admin);

	var title_homepage = 'Homepage (Saisonprogram) Daten';

	ret_html_homepage = getBandDataHtmlString(title_homepage, band_name_homepage, band_text_homepage, musicians_homepage, instruments_homepage, texts_homepage, flyer_label_hompage, flyer_text_hompage);

	g_flyer_application_mode = input_flyer_application_mode;

	return ret_html_homepage;

} // getBandDataHomepageHtmlString

// Returns the band data defined in the flyer, i.e in the flyer edit XML files
function getBandDataEditHtmlString()
{
	var ret_html_edit = '';

	var input_flyer_application_mode = g_flyer_application_mode; 

	g_flyer_application_mode = "EditXml";

	var band_name_edit = getBandName(g_current_concert_number);

	var band_text_edit = getConcertShortText(g_current_concert_number);

	var b_admin = false;

	var musicians_edit = getFlyerMusicianNamesArray(b_admin);

	var instruments_edit = getFlyerMusicianInstrumentsArray(b_admin);

	var texts_edit = getFlyerMusicianTextsArray(b_admin);

	var flyer_label_edit = getConcertLabelFlyerText(g_current_concert_number);

	var flyer_text_edit = getConcertFlyerText(g_current_concert_number);

	var title_edit = 'Edit XML Daten';

	ret_html_edit = getBandDataHtmlString(title_edit, band_name_edit, band_text_edit, musicians_edit, instruments_edit, texts_edit, flyer_label_edit, flyer_text_edit);

	g_flyer_application_mode = input_flyer_application_mode;

	return ret_html_edit;

} // getBandDataEditHtmlString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Display Data Functions  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Data Arrays  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Get the musician name array
function getFlyerMusicianNamesArray(i_b_admin)
{
	var musician_names = [];

	var input_flyer_application_mode = g_flyer_application_mode; 

	if (i_b_admin)
	{
		g_flyer_application_mode = "AdminXml";
	}
	else
	{
		g_flyer_application_mode = "EditXml";
	}

	var n_musicians = getNumberOfMusicians(g_current_concert_number);

	for (var musician_number=1; musician_number <= n_musicians; musician_number++)
	{
		var musician_name = getMusicianName(g_current_concert_number, musician_number);

		musician_names[musician_number - 1] = musician_name;
	}

	g_flyer_application_mode = input_flyer_application_mode;

	return musician_names;

} // getFlyerMusicianNamesArray

// Get the musician instruments array
function getFlyerMusicianInstrumentsArray(i_b_admin)
{
	var musician_instruments = [];

	var input_flyer_application_mode = g_flyer_application_mode; 

	if (i_b_admin)
	{
		g_flyer_application_mode = "AdminXml";
	}
	else
	{
		g_flyer_application_mode = "EditXml";
	}

	var n_musicians = getNumberOfMusicians(g_current_concert_number);

	for (var musician_number=1; musician_number <= n_musicians; musician_number++)
	{
		var musician_instrument = getMusicianInstrument(g_current_concert_number, musician_number);

		musician_instruments[musician_number - 1] = musician_instrument;
	}

	g_flyer_application_mode = input_flyer_application_mode;

	return musician_instruments;

} // getFlyerMusicianInstrumentsArray


// Get the musician texts array
function getFlyerMusicianTextsArray(i_b_admin)
{
	var musician_texts = [];

	var input_flyer_application_mode = g_flyer_application_mode; 

	if (i_b_admin)
	{
		g_flyer_application_mode = "AdminXml";
	}
	else
	{
		g_flyer_application_mode = "EditXml";
	}

	var n_musicians = getNumberOfMusicians(g_current_concert_number);

	for (var musician_number=1; musician_number <= n_musicians; musician_number++)
	{
		var musician_text = getMusicianText(g_current_concert_number, musician_number);

		musician_texts[musician_number - 1] = musician_text;
	}

	g_flyer_application_mode = input_flyer_application_mode;

	return musician_texts;

} // getFlyerMusicianTextsArray

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Data Arrays  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Html Code  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns band data as an HTML string
function getBandDataHtmlString(i_title, i_band_name, i_band_text, i_musicians, i_instruments, i_texts, i_flyer_label, i_flyer_text)
{
	var ret_html_str = '';

	ret_html_str = ret_html_str + getBandDataTitleHtmlString(i_title);

	ret_html_str = ret_html_str + getBandDataTitleHtmlString(i_band_name);

	ret_html_str = ret_html_str + getBandDataBandTextHtmlString(i_band_text);

	ret_html_str = ret_html_str + getBandDataMusicianNamesInstrumentsTextsHtmlString(i_musicians, i_instruments, i_texts);

	ret_html_str = ret_html_str + getFlyerLabelHtmlString(i_flyer_label);

	ret_html_str = ret_html_str + getFlyerTextTextHtmlString(i_flyer_text);

	return ret_html_str;

} // getBandDataHtmlString

// Returns title as an HTML string
function getBandDataTitleHtmlString(i_title)
{
	return '<h2>' + i_title + '</h2>';

} // getBandDataTitleHtmlString

// Returns band name as an HTML string
function getBandDataBandNameHtmlString(i_band_name)
{
	return '<h3>' + i_band_name + '</h3>';

} // getBandDataBandNameHtmlString

// Returns band text as an HTML string
function getBandDataBandTextHtmlString(i_band_text)
{
	return '<p>' + i_band_text + '</p>';

} // getBandDataBandTextHtmlString

// Returns band text as an HTML string
function getBandDataMusicianNamesInstrumentsTextsHtmlString(i_musicians, i_instruments, i_texts)
{
	var ret_musicians_str = '';

	var n_musicians = i_musicians.length;

	for (var index_musician=0; index_musician < n_musicians; index_musician++)
	{
		var musician_name = i_musicians[index_musician];

		var musician_instr = i_instruments[index_musician];

		var musician_text = i_texts[index_musician];

		ret_musicians_str = ret_musicians_str + getBandDataMusicianNameInstrumentHtmlString(musician_name, musician_instr);

		ret_musicians_str = ret_musicians_str + getBandDataMusicianTextHtmlString(musician_text);
	}
	
	return ret_musicians_str;

} // getBandDataMusicianNamesInstrumentsTextsHtmlString

// Returns band name as an HTML string
function getBandDataMusicianNameInstrumentHtmlString(i_musician_name, i_musician_instr)
{
	return '<h4>' + i_musician_name + ' ' + i_musician_instr + '</h4>';

} // getBandDataMusicianNameInstrumentHtmlString

// Returns musician text as an HTML string
function getBandDataMusicianTextHtmlString(i_musician_text)
{
	return '<p>' + i_musician_text + '</p>';

} // getBandDataMusicianTextHtmlString

// Returns flyer label as an HTML string
function getFlyerLabelHtmlString(i_flyer_label)
{
	return '<h3>' + i_flyer_label + '</h3>';

} // getFlyerLabelHtmlString

// Returns flyer text as an HTML string
function getFlyerTextTextHtmlString(i_flyer_text)
{
	return '<p>' + i_flyer_text + '</p>';

} // getFlyerTextTextHtmlString


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Html Code  //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The user clicked the button 'Check band data'
function eventCheckBandData()
{
    checkFlyerBandData();

} // eventCheckBandData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Check Band Data  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set active mode
function setButtonCheckBandData()
{
    var button_check_band_data_html = getButtonCheckBandDataHtml();
	
    var element_div_check_band_data = document.getElementById(g_id_div_check_band_data);	
    if (null == element_div_check_band_data)
    {
        alert("setButtonCheckBandData element_div_check_band_data is null");
        return;
    }
	
    element_div_check_band_data.innerHTML = button_check_band_data_html;	
	
} // setButtonCheckBandData

// Returns the html code for active mode element
function getButtonCheckBandDataHtml()
{	
	var ret_button_check_band_data_html = '';
	
	ret_button_check_band_data_html = ret_button_check_band_data_html + '<p id= "' + g_id_div_check_band_data + '" onclick="eventCheckBandData()"><b>';
	
	ret_button_check_band_data_html = ret_button_check_band_data_html + getCheckBandDataCaption() + '</b>';

    var text_tooltip = getTooltipHtml(g_tooltip_check_band_data, g_id_tooltip_check_band_data);
	
	ret_button_check_band_data_html = ret_button_check_band_data_html + text_tooltip;
	
	ret_button_check_band_data_html = ret_button_check_band_data_html + '</p>';

	return ret_button_check_band_data_html;	
	
} // getButtonCheckBandDataHtml


// Returns the caption for the button
function getCheckBandDataCaption()
{
   return 'Check<br> Band-Daten';

} // getCheckBandDataCaption


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Check Band Data  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide And Display Button  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hides the button (<div>) 'Check band data'
function hideButtonCheckBandData()
{
	var element_id_div_check_band_data = document.getElementById(g_id_div_check_band_data);
	if (null == element_id_div_check_band_data)
	{
		alert("hideCheckBandData Element with id g_id_div_check_band_data is null");
		
		return;
	}
		
	element_id_div_check_band_data.style.display = "none";
	
} // hideButtonCheckBandData

// Displays the button (<div>) 'Check band data'
function displayButtonCheckBandData()
{
	var element_id_div_check_band_data = document.getElementById(g_id_div_check_band_data);
	if (null == element_id_div_check_band_data)
	{
		alert("hideCheckBandData Element with id g_id_div_check_band_data is null");
		
		return;
	}
		
	element_id_div_check_band_data.style.display = "block";
	
} // displayButtonCheckBandData

// Hides the <div> displaying the result of the band data check
function hideDivDisplayCheckBandData()
{
	var element_id_div_display_check_band_data = document.getElementById(g_id_div_display_check_result);
	if (null == element_id_div_display_check_band_data)
	{
		alert("hideDivDisplayCheckBandData Element with id g_id_div_display_check_result is null");
		
		return;
	}
		
	element_id_div_display_check_band_data.style.display = "none";
	
} // hideDivDisplayCheckBandData

// Displays the <div> displaying the result of the band data check
function displayDivDisplayCheckBandData()
{
	var element_id_div_display_check_band_data = document.getElementById(g_id_div_display_check_result);
	if (null == element_id_div_display_check_band_data)
	{
		alert("displayDivDisplayCheckBandData Element with id g_id_div_display_check_result is null");
		
		return;
	}
		
	element_id_div_display_check_band_data.style.display = "block";
	
} // displayDivDisplayCheckBandData


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide And Display Button  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////