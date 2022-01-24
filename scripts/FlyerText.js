// File: FlyerText.js
// Date: 2022-01-25
// Author: Gunnar Lidén

// File content
// =============
// Functions to set texts

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Maximum height of pages 2-4 in millimeter
var g_page_max_height = 150.0;

// Height of bounding box for page two, three and four
// This value shall correspond to the height values for 
// the bounding boxes set in the CSS file 
var g_bounding_box_height = 152.0;

// Maximum height of band name and short text in millimeter
var g_band_name_short_text_max_height = 34.0;

// Tolerance for administrator and tester
var g_band_name_short_text_max_height_tol = 1.0;

// Row height for normal text in millimeter determined by CSS font-size: 3.8mm for Body
var g_row_height_text = 3.8;

// Row height for bold text in millimeter determined by CSS font-size: 4.8mm for e.g. text_header
// bold does not influence the height. It seems difficult to get the font-size set with CSS
var g_row_height_text_header = 3.81;

// From CSS class text_logo padding-top
var g_padding_top_text_logo = 3.0;

// From CSS e.g. class short_text padding-top
var g_padding_top_text = 1.1;

// Number of characters per row determined by font-size: 3.8mm for Body
//var g_number_chars_text_per_row = 46;
var g_number_chars_text_per_row = 52;

// Number of characters per row determined by font-size: 4.8mm
var g_number_chars_header_text_per_row = 33;


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Page Four Free Text Or Musicians Texts ////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Concert flags telling if page four is used for musician texts and not for a free text
var g_page_four_displays_musician_texts = false;

// Sets tha flag g_page_four_displays_musician_texts that tells if page four 
// is used for musician texts
function setFlagPageFourDisplayMusicians()
{
	var number_musicians = getNumberOfMusicians(g_current_concert_number);
	
	if (number_musicians > 5)
	{
		g_page_four_displays_musician_texts = true;
	}
	else
	{
		g_page_four_displays_musician_texts = false;
	}
	
} // setFlagPageFourDisplayMusicians

// Returns true if page four displays musician texts
function pageFourDisplaysMusicians()
{
	return g_page_four_displays_musician_texts;
	
} // pageFourDisplaysMusicians


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Page Four Free Text Or Musicians Texts //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Text Main Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set all texts
// Please note that there is another function that sets images on the pages
// 1. Initialize the tester text area. Call of appendTesterHeaderPositionData
// 2. Append the hardcoded parameters that controls the positioning. Call of appendPositionParameters
// 3. Set page with band text and text for up to three musicians. Call setTextPage2
// 4. Set musician texts. Call of setTextPage3
// 5. Determine if page four shall be used for free text or musician texts
//    Call of pageFourDisplaysMusicians
// 5.a Use page for for the free text
//     Display the page four free text elements. Call of displayPageFourFreeText
//     Hide the page four musician texts elements. Call of hidePageFourMusicianTexts
// 5.b Use page for for the musician texts
//     Display the page four musician texts elements. Call of displayPageFourMusicianTexts
//     Hide the page four free text elements. Call of hidePageFourFreeText
// 5. Set the free text page. Call of setTextPage4
// 6. Set the entrance fees. Call of setTextPage5
// 7. Set the band name. Call of setTextPage6
function setAllTexts()
{
	appendTesterHeaderPositionData();
			
	appendPositionParameters();
	
	setFlagPageFourDisplayMusicians();
			
	var n_set_musicians_page_2 = setTextPage2();
	
	var n_set_musicians_page_3 = setTextPage3(n_set_musicians_page_2);
	
	if (pageFourDisplaysMusicians())
	{
		hidePageFourFreeText();
		
		displayPageFourMusicianTexts();
		
		var n_set_musicians_page_4 = setTextPage4_Musicians(n_set_musicians_page_3);
	
		checkIfAllMusiciansAreSet(n_set_musicians_page_4);
	}
	else
	{
		displayPageFourFreeText();
		
		hidePageFourMusicianTexts();
		
		checkIfAllMusiciansAreSet(n_set_musicians_page_3);
		
		setTextPage4();
	}
	
	setTextPage5();
	
	setTextPage6();
	
} // setAllTexts


// Set and check short text page 2
function setCheckSizeDivShortTextPage2(i_short_text_page_2)
{
    setDivShortTextPage2(i_short_text_page_2);
	
	appendBandNameHeightPageTwo();
	
    appendShortTextHeightPageTwo();	
	
	var height_mm_bandname_short_text_page_2 = getHeightBandNamePageTwo() + getHeightShortTextPageTwo();
	
	var short_text_max_height_user_case = g_band_name_short_text_max_height;
	
	if (g_user_case_str == g_user_case_admin || g_user_case_str == g_user_case_tester || g_user_case_str == g_user_case_printer)
	{
		short_text_max_height_user_case = short_text_max_height_user_case + g_band_name_short_text_max_height_tol;
	}	
	
	if (height_mm_bandname_short_text_page_2 < short_text_max_height_user_case)
	{
		hideTextareaHeightWarning();
		
	    return;
	}
	
	// var max_number = maxNumberRowsBandNameShortText();
	
	var warning_msg = "";

	warning_msg = warning_msg + g_msg_number_rows_bandname_short_text + "\r\n";
	//TODO warning_msg = warning_msg + band_name_short_text_n_rows.toString() + "\r\n";
	// warning_msg = warning_msg + g_msg_number_rows_bandname_short_text_maximum;
	// warning_msg = warning_msg + max_number.toString() + "\r\n";
	// warning_msg = warning_msg + g_msg_size_bandname_short_text_maximum;
	// warning_msg = warning_msg + g_band_name_short_text_max_height.toString() + "\r\n";
	
	if (g_user_case_str == g_user_case_admin || g_user_case_str == g_user_case_tester || g_user_case_str == g_user_case_printer)
	{
		var error_dist = height_mm_bandname_short_text_page_2 - g_band_name_short_text_max_height;
		warning_msg = warning_msg + "(" + 
		error_dist.toString() + " Millimeter)\r\n";
	}
	
	setTextHeightWarning(warning_msg); 	
	
} // setCheckSizeDivShortTextPage2

// Sets the texts on page 2. Returns the number of musicians that have been set
function setTextPage2()
{
    var ret_n_set_musicians = 0;
	
    clearTextsPage2();

	hideMusicianTextDivsPageTwo(); // 2022-01-24

	setDivTextLogoPage2();
	
	setDivBandNamePage2();
	
	// Short text
	var short_text_page_2 = getConcertShortText(g_current_concert_number);
	
	setCheckSizeDivShortTextPage2(short_text_page_2);
	
	if (getRemainingHeightPageTwo() <= 0.0)
	{
		return ret_n_set_musicians;
	}
	
	var number_musicians = getNumberOfMusicians(g_current_concert_number);
	
	// Musician 1
	var musician_name_1_page_2 = getMusicianNameInstrument(g_current_concert_number, 1);
	
	var musician_text_1_page_2 = getMusicianText(g_current_concert_number, 1);

	displayMusicianOneTextDivsPageTwo(); // 2022-01-24
	
	setDivMusicianName1Page2(musician_name_1_page_2);
	
	setDivMusicianText1Page2(musician_text_1_page_2);
	
	var remaining_height_page_2 = getRemainingHeightPageTwo();		
	
	if (getRemainingHeightPageTwo() <= 0.0)
	{
		clearLabelTextMusicianOnePageTwo();
		hideMusicianOneTextDivsPageTwo(); //  2022-01-24
		appendTotalHeightPageTwo();
		return ret_n_set_musicians;
	}
	
	ret_n_set_musicians = ret_n_set_musicians + 1;
	
	if (number_musicians < 2)
	{
		//appendPageHeight(2, height_divs_page_2);
		appendTotalHeightPageTwo();
		return ret_n_set_musicians;
	}
	
	// Musician 2
	var musician_name_2_page_2 = getMusicianNameInstrument(g_current_concert_number, 2);
	
	var musician_text_2_page_2 = getMusicianText(g_current_concert_number, 2);

	displayMusicianTwoTextDivsPageTwo(); // 2022-01-24
	
	setDivMusicianName2Page2(musician_name_2_page_2);
		
	setDivMusicianText2Page2(musician_text_2_page_2);	
	
	if (getRemainingHeightPageTwo() <= 0.0)
	{
		clearLabelTextMusicianTwoPageTwo();
		hideMusicianTwoTextDivsPageTwo(); // 2022-01-24
		appendTotalHeightPageTwo(); 
		return ret_n_set_musicians;
	}
	
	ret_n_set_musicians = ret_n_set_musicians + 1;
	
	if (number_musicians < 3)
	{
		//appendPageHeight(2, height_divs_page_2);
		appendTotalHeightPageTwo();
		return ret_n_set_musicians;
	}	
	
	// Musician 3
	var musician_name_3_page_2 = getMusicianNameInstrument(g_current_concert_number, 3);
	
	var musician_text_3_page_2 = getMusicianText(g_current_concert_number, 3);

	displayMusicianThreeTextDivsPageTwo(); //  2022-01-24
	
	setDivMusicianName3Page2(musician_name_3_page_2);
		
	setDivMusicianText3Page2(musician_text_3_page_2);	
	
	if (getRemainingHeightPageTwo() <= 0.0)
	{
		clearLabelTextMusicianThreePageTwo();
		hideMusicianThreeTextDivsPageTwo(); // 2022-01-24
		appendTotalHeightPageTwo();
		return ret_n_set_musicians;
	}
	
	appendTotalHeightPageTwo();
	
	ret_n_set_musicians = ret_n_set_musicians + 1;	
	
	return ret_n_set_musicians;
	
} // setTextPage2

// Sets the texts on page 3. Returns the number of musicians that have been set
function setTextPage3(i_set_musicians)
{
    var ret_n_set_musicians = i_set_musicians;
	
	var musician_number = i_set_musicians;
	
    clearTextsPage3();

	hideMusicianTextDivsPageThree(); // 2022-01-24
	
	setDivTextLogoPage3();
			
	var number_musicians = getNumberOfMusicians(g_current_concert_number);
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		return ret_n_set_musicians;
	}
	
	musician_number = musician_number + 1;
	
	// Musician 1
	var musician_name_1_page_3 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_1_page_3 = getMusicianText(g_current_concert_number, musician_number);

	displayMusicianOneTextDivsPageThree(); // 2022-01-24
	
	setDivMusicianName1Page3(musician_name_1_page_3);
		
	setDivMusicianText1Page3(musician_text_1_page_3);	
	
	if (getRemainingHeightPageThree() <= 0.0)
	{
		clearLabelTextMusicianOnePageThree();
		hideMusicianOneTextDivsPageThree(); // 2022-01-24
		appendTotalHeightPageThree();
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageThree();
		return ret_n_set_musicians;
	}
	
	musician_number = musician_number + 1;
	
	// Musician 2
	var musician_name_2_page_3 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_2_page_3 = getMusicianText(g_current_concert_number, musician_number);

	displayMusicianTwoTextDivsPageThree(); // 2022-01-24
	
	setDivMusicianName2Page3(musician_name_2_page_3);
		
	setDivMusicianText2Page3(musician_text_2_page_3);	
	
	if (getRemainingHeightPageThree() <= 0.0)
	{
		clearLabelTextMusicianTwoPageThree();
		hideMusicianTwoTextDivsPageThree(); // 2022-01-24
		appendTotalHeightPageThree();
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageThree();
		return ret_n_set_musicians;
	}
	
	musician_number = musician_number + 1;
	
	// Musician 3
	var musician_name_3_page_3 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_3_page_3 = getMusicianText(g_current_concert_number, musician_number);

	displayMusicianThreeTextDivsPageThree(); // 2022-01-24
	
	setDivMusicianName3Page3(musician_name_3_page_3);
		
	setDivMusicianText3Page3(musician_text_3_page_3);	
	
	if (getRemainingHeightPageThree() <= 0.0)
	{
		clearLabelTextMusicianThreePageThree();
		hideMusicianThreeTextDivsPageThree(); // 2022-01-24
		appendTotalHeightPageThree();
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;	
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageThree();
		
		return ret_n_set_musicians;
	}

	musician_number = musician_number + 1;
	
	// Musician 4
	var musician_name_4_page_3 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_4_page_3 = getMusicianText(g_current_concert_number, musician_number);

	displayMusicianFourTextDivsPageThree(); // 2022-01-24
	
	setDivMusicianName4Page3(musician_name_4_page_3);
		
	setDivMusicianText4Page3(musician_text_4_page_3);	
	
	if (getRemainingHeightPageThree() <= 0.0)
	{
        clearLabelTextMusicianFourPageThree();
		hideMusicianFourTextDivsPageThree(); // 2022-01-24
		appendTotalHeightPageThree();
		
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;	
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageThree();
		
		return ret_n_set_musicians;
	}
	
	musician_number = musician_number + 1;
	
	// Musician 5
	var musician_name_5_page_3 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_5_page_3 = getMusicianText(g_current_concert_number, musician_number);

	displayMusicianFiveTextDivsPageThree(); // 2022-01-24
	
	setDivMusicianName5Page3(musician_name_5_page_3);
		
	setDivMusicianText5Page3(musician_text_5_page_3);	
	
	if (getRemainingHeightPageThree() <= 0.0)
	{
		clearLabelTextMusicianFivePageThree();
		hideMusicianFiveTextDivsPageThree(); // 2022-01-24
		appendTotalHeightPageThree();
		
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;	
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageThree();
		
		return ret_n_set_musicians;
	}

	musician_number = musician_number + 1;
	
	// Musician 6
	var musician_name_6_page_3 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_6_page_3 = getMusicianText(g_current_concert_number, musician_number);

	displayMusicianSixTextDivsPageThree(); // 2022-01-24
	
	setDivMusicianName6Page3(musician_name_6_page_3);
		
	setDivMusicianText6Page3(musician_text_6_page_3);	
	
	if (getRemainingHeightPageThree() <= 0.0)
	{
		clearLabelTextMusicianSixPageThree();
		hideMusicianSixTextDivsPageThree(); // 2022-01-24
		appendTotalHeightPageThree();
		return ret_n_set_musicians;
	}
	
	appendTotalHeightPageThree();
	
	ret_n_set_musicians = ret_n_set_musicians + 1;	
		
	
	return ret_n_set_musicians;
	
} // setTextPage3


// Sets the texts on page 4 for musicians. Returns the number of musicians that have been set
function setTextPage4_Musicians(i_set_musicians)
{
    var ret_n_set_musicians = i_set_musicians;
	
	var musician_number = i_set_musicians;
	
    clearTextsPage4Musicians();
	
	setDivTextLogoPage4();
			
	var number_musicians = getNumberOfMusicians(g_current_concert_number);
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		return ret_n_set_musicians;
	}
	
	musician_number = musician_number + 1;
	
	// Musician 1
	var musician_name_1_page_4 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_1_page_4 = getMusicianText(g_current_concert_number, musician_number);
	
	setDivMusicianName1Page4(musician_name_1_page_4);
		
	setDivMusicianText1Page4(musician_text_1_page_4);	
	
	if (getRemainingHeightPageFourMusicians() <= 0.0)
	{
		clearLabelTextMusicianOnePageFour();
		appendTotalHeightPageFourMusicians();
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageFourMusicians();
		return ret_n_set_musicians;
	}
	
	musician_number = musician_number + 1;
	
	// Musician 2
	var musician_name_2_page_4 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_2_page_4 = getMusicianText(g_current_concert_number, musician_number);
	
	setDivMusicianName2Page4(musician_name_2_page_4);
		
	setDivMusicianText2Page4(musician_text_2_page_4);	
	
	if (getRemainingHeightPageFourMusicians() <= 0.0)
	{
		clearLabelTextMusicianTwoPageFour();
		appendTotalHeightPageFourMusicians();
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageFourMusicians();
		return ret_n_set_musicians;
	}
	
	musician_number = musician_number + 1;
	
	// Musician 3
	var musician_name_3_page_4 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_3_page_4 = getMusicianText(g_current_concert_number, musician_number);
	
	setDivMusicianName3Page4(musician_name_3_page_4);
		
	setDivMusicianText3Page4(musician_text_3_page_4);	
	
	if (getRemainingHeightPageFourMusicians() <= 0.0)
	{
		clearLabelTextMusicianThreePageFour();
		appendTotalHeightPageFourMusicians();
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;	
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageFourMusicians();
		
		return ret_n_set_musicians;
	}
	
	musician_number = musician_number + 1;
	
	// Musician 4
	var musician_name_4_page_4 = getMusicianNameInstrument(g_current_concert_number, musician_number);
	
	var musician_text_4_page_4 = getMusicianText(g_current_concert_number, musician_number);
	
	setDivMusicianName4Page4(musician_name_4_page_4);
		
	setDivMusicianText4Page4(musician_text_4_page_4);	
	
	if (getRemainingHeightPageFourMusicians() <= 0.0)
	{
        clearLabelTextMusicianFourPageFour();
		
		appendTotalHeightPageFourMusicians();
		
		return ret_n_set_musicians;
	}
		
	ret_n_set_musicians = ret_n_set_musicians + 1;	
	
	if (number_musicians < ret_n_set_musicians + 1)
	{
		appendTotalHeightPageFourMusicians();
		
		return ret_n_set_musicians;
	}
		
	appendTotalHeightPageFourMusicians();		
	
	return ret_n_set_musicians;
	
} // setTextPage4_Musicians


// Sets the texts on page 4.
function setTextPage4()
{
    clearTextsPage4();
	
	setDivTextLogoPage4();
	
	var height_div_text_logo = getDivTextHeaderHeight();
	
	var free_header = getConcertLabelFlyerText(g_current_concert_number);
	
	setDivFreeHeaderPage4(free_header);
	
	var free_text = getConcertFlyerText(g_current_concert_number);	
	
	setDivFreeTextPage4(free_text);	
	
	if (getRemainingHeightPageFour() <= 0.0)
	{
	    var warning_msg = "";
	
	    warning_msg = warning_msg + g_msg_free_text_exceeded;
	
	    setTextHeightWarning(warning_msg); 
	
	    appendTotalHeightPageFour();
		
		setDivFreeTextPage4("");	
	}
	else
	{
		
		// Hides the warning for band name and short text hideTextareaHeightWarning();
		
		appendTotalHeightPageFour();		
	}
	
} // setTextPage4


// Sets the texts on page 5.
function setTextPage5()
{
    clearTextsPage5();
	
	setDivTextLogoPage5();
	
	setDivEntranceHeaderPage5();
	
	setDivEntranceTextPage5();
	
} // setTextPage5

// Sets the texts on page 6.
function setTextPage6()
{
    clearTextsPage6();
	
	setDivTextLogoPage6();
	
	setDivBandNamePage6();
	
	// setDivMusicianListPage6();
	
} // setTextPage6


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Text Main Functions  ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Text Page 2 Functions  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set text logo page 2
function setDivTextLogoPage2()
{
	var width = 105;
	var height = 10;
	setDivImageTextLogo(g_id_div_a6_page_2_text_logo, width, height);
	
    //var element_div_page_2_text_logo = document.getElementById(g_id_div_a6_page_2_text_logo);	

    //element_div_page_2_text_logo.innerHTML = g_text_logo;	
	
} // setDivTextLogoPage2

// Set band name page 2
function setDivBandNamePage2()
{
	var band_name = getBandName(g_current_concert_number);
	
    var element_div_page_2_band_name = document.getElementById(g_id_div_a6_page_2_band_name);		

    element_div_page_2_band_name.innerHTML = band_name;	
	
} // setDivBandNamePage2

// Set short text page 2
function setDivShortTextPage2(i_short_text)
{
    var element_div_page_2short_text = document.getElementById(g_id_div_a6_page_2_short_text);	

    element_div_page_2short_text.innerHTML = i_short_text;	
	
} // setDivShortTextPage2

// Set musician name 1 page 2
function setDivMusicianName1Page2(i_musician_name)
{
    var element_div_page_2_musician_name_1 = document.getElementById(g_id_div_a6_page_2_musician_name_1);	

    element_div_page_2_musician_name_1.innerHTML = i_musician_name;	
	
} // setDivMusicianName1Page2

// Set musician text 1 page 2
function setDivMusicianText1Page2(i_musician_text)
{
    var element_div_page_2_musician_text_1 = document.getElementById(g_id_div_a6_page_2_musician_text_1);	

    element_div_page_2_musician_text_1.innerHTML = i_musician_text;	
	
} // setDivMusicianText1Page2

// Set musician name 2 page 2
function setDivMusicianName2Page2(i_musician_name)
{
    var element_div_page_2_musician_name_2 = document.getElementById(g_id_div_a6_page_2_musician_name_2);	

    element_div_page_2_musician_name_2.innerHTML = i_musician_name;	
	
} // setDivMusicianName2Page2

// Set musician text 2 page 2
function setDivMusicianText2Page2(i_musician_text)
{
    var element_div_page_2_musician_text_2 = document.getElementById(g_id_div_a6_page_2_musician_text_2);	

    element_div_page_2_musician_text_2.innerHTML = i_musician_text;	
	
} // setDivMusicianText2Page2

// Set musician name 3 page 2
function setDivMusicianName3Page2(i_musician_name)
{
    var element_div_page_2_musician_name_3 = document.getElementById(g_id_div_a6_page_2_musician_name_3);	

    element_div_page_2_musician_name_3.innerHTML = i_musician_name;	
	
} // setDivMusicianName3Page2

// Set musician text 3 page 2
function setDivMusicianText3Page2(i_musician_text)
{
    var element_div_page_2_musician_text_3 = document.getElementById(g_id_div_a6_page_2_musician_text_3);	

    element_div_page_2_musician_text_3.innerHTML = i_musician_text;	
	
} // setDivMusicianText3Page2

// Get musician name and instrument
function getMusicianNameInstrument(i_concert_number, i_musician_number)
{
    var musician_name = getMusicianName(i_concert_number, i_musician_number);
    var musician_instr = getMusicianInstrument(i_concert_number, i_musician_number);
	
	return musician_name + " " + musician_instr;

} // getMusicianNameInstrument

// Clear all texts page 2. Check first that all divs exist
function clearTextsPage2()
{
	var inner_html = "";
	
    var element_div_page_2_text_logo = document.getElementById(g_id_div_a6_page_2_text_logo);	
    if (null == element_div_page_2_text_logo)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_text_logo is null");
        return;
    }
	
    var element_div_page_2_band_name = document.getElementById(g_id_div_a6_page_2_band_name);	
    if (null == element_div_page_2_band_name)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_band_name is null");
        return;
    }
	
    var element_div_page_2_short_text = document.getElementById(g_id_div_a6_page_2_short_text);	
    if (null == element_div_page_2_short_text)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_short_text is null");
        return;
    }		
	
    var element_div_page_2_musician_name_1 = document.getElementById(g_id_div_a6_page_2_musician_name_1);	
    if (null == element_div_page_2_musician_name_1)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_musician_name_1 is null");
        return;
    }
	
    var element_div_page_2_musician_text_1 = document.getElementById(g_id_div_a6_page_2_musician_text_1);	
    if (null == element_div_page_2_musician_text_1)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_musician_text_1 is null");
        return;
    }
	
    var element_div_page_2_musician_name_2 = document.getElementById(g_id_div_a6_page_2_musician_name_2);	
    if (null == element_div_page_2_musician_name_2)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_musician_name_2 is null");
        return;
    }
	
    var element_div_page_2_musician_text_2 = document.getElementById(g_id_div_a6_page_2_musician_text_2);	
    if (null == element_div_page_2_musician_text_2)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_musician_text_2 is null");
        return;
    }
	
    var element_div_page_2_musician_name_3 = document.getElementById(g_id_div_a6_page_2_musician_name_3);	
    if (null == element_div_page_2_musician_name_3)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_musician_name_3 is null");
        return;
    }
	
    var element_div_page_2_musician_text_3 = document.getElementById(g_id_div_a6_page_2_musician_text_3);	
    if (null == element_div_page_2_musician_text_3)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_2_musician_text_3 is null");
        return;
    }	
	
	element_div_page_2_text_logo.innerHTML = inner_html;
    element_div_page_2_band_name.innerHTML = inner_html;
	element_div_page_2_short_text.innerHTML = inner_html;
    element_div_page_2_musician_name_1.innerHTML = inner_html;	
    element_div_page_2_musician_text_1.innerHTML = inner_html;		
    element_div_page_2_musician_name_2.innerHTML = inner_html;	
    element_div_page_2_musician_text_2.innerHTML = inner_html;	
    element_div_page_2_musician_name_3.innerHTML = inner_html;	
    element_div_page_2_musician_text_3.innerHTML = inner_html;	
	
} // clearTextsPage2

// Hide musician text <div> elements on page two
// The function is only executed for case printer. For this case the
// text takes some mor place than for case administrator. 
// This is not a clean solution to the problem that text don't
// fit to a page in print mode ....
function hideMusicianTextDivsPageTwo()
{
	if (g_user_case_str != g_user_case_printer)
	{
		return;
	}

	hideMusicianOneTextDivsPageTwo();

	hideMusicianTwoTextDivsPageTwo();

	hideMusicianThreeTextDivsPageTwo();

} // hideMusicianTextDivsPageTwo


// Hide musician one text <div> elements page two
function hideMusicianOneTextDivsPageTwo()
{
    var element_div_page_2_musician_name_1 = document.getElementById(g_id_div_a6_page_2_musician_name_1);
	
    var element_div_page_2_musician_text_1 = document.getElementById(g_id_div_a6_page_2_musician_text_1);

	element_div_page_2_musician_name_1.style.display = 'none';
    element_div_page_2_musician_text_1.style.display = 'none';

} // hideMusicianOneTextDivsPageTwo

// Hide musician two text <div> elements page two
function hideMusicianTwoTextDivsPageTwo()
{
    var element_div_page_2_musician_name_2 = document.getElementById(g_id_div_a6_page_2_musician_name_2);
	
    var element_div_page_2_musician_text_2 = document.getElementById(g_id_div_a6_page_2_musician_text_2);
	
    element_div_page_2_musician_name_2.style.display = 'none';
    element_div_page_2_musician_text_2.style.display = 'none';

} // hideMusicianTwoTextDivsPageTwo

// Hide musician three text <div> elements page two
function hideMusicianThreeTextDivsPageTwo()
{
	var element_div_page_2_musician_name_3 = document.getElementById(g_id_div_a6_page_2_musician_name_3);
	
    var element_div_page_2_musician_text_3 = document.getElementById(g_id_div_a6_page_2_musician_text_3);

	element_div_page_2_musician_name_3.style.display = 'none';
    element_div_page_2_musician_text_3.style.display = 'none';

} // hideMusicianThreeTextDivsPageTwo

// Display musician one text <div> elements page two
function displayMusicianOneTextDivsPageTwo()
{
    var element_div_page_2_musician_name_1 = document.getElementById(g_id_div_a6_page_2_musician_name_1);
	
    var element_div_page_2_musician_text_1 = document.getElementById(g_id_div_a6_page_2_musician_text_1);

	element_div_page_2_musician_name_1.style.display = 'block';
    element_div_page_2_musician_text_1.style.display = 'block';

} // displayMusicianOneTextDivsPageTwo

// Display musician two text <div> elements page two
function displayMusicianTwoTextDivsPageTwo()
{
    var element_div_page_2_musician_name_2 = document.getElementById(g_id_div_a6_page_2_musician_name_2);
	
    var element_div_page_2_musician_text_2 = document.getElementById(g_id_div_a6_page_2_musician_text_2);
	
    element_div_page_2_musician_name_2.style.display = 'block';
    element_div_page_2_musician_text_2.style.display = 'block';

} // displayMusicianTwoTextDivsPageTwo

// Display musician three text <div> elements page two
function displayMusicianThreeTextDivsPageTwo()
{
	var element_div_page_2_musician_name_3 = document.getElementById(g_id_div_a6_page_2_musician_name_3);
	
    var element_div_page_2_musician_text_3 = document.getElementById(g_id_div_a6_page_2_musician_text_3);

	element_div_page_2_musician_name_3.style.display = 'block';
    element_div_page_2_musician_text_3.style.display = 'block';

} // displayMusicianThreeTextDivsPageTwo


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Text Page 2 Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Text Page 3 Functions  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set text logo page 3
function setDivTextLogoPage3()
{
	var width = 105;
	var height = 10;
	setDivImageTextLogo(g_id_div_a6_page_3_text_logo, width, height);
	
    //var element_div_page_3_text_logo = document.getElementById(g_id_div_a6_page_3_text_logo);	

    //element_div_page_3_text_logo.innerHTML = g_text_logo;	
	
} // setDivTextLogoPage3

// Set musician name 1 page 3
function setDivMusicianName1Page3(i_musician_name)
{
    var element_div_page_3_musician_name_1 = document.getElementById(g_id_div_a6_page_3_musician_name_1);	

    element_div_page_3_musician_name_1.innerHTML = i_musician_name;	
	
} // setDivMusicianName1Page3

// Set musician text 1 page 3
function setDivMusicianText1Page3(i_musician_text)
{
    var element_div_page_3_musician_text_1 = document.getElementById(g_id_div_a6_page_3_musician_text_1);	

    element_div_page_3_musician_text_1.innerHTML = i_musician_text;	
	
} // setDivMusicianText1Page3

// Set musician name 2 page 3
function setDivMusicianName2Page3(i_musician_name)
{
    var element_div_page_3_musician_name_2 = document.getElementById(g_id_div_a6_page_3_musician_name_2);	

    element_div_page_3_musician_name_2.innerHTML = i_musician_name;	
	
} // setDivMusicianName2Page3

// Set musician text 2 page 3
function setDivMusicianText2Page3(i_musician_text)
{
    var element_div_page_3_musician_text_2 = document.getElementById(g_id_div_a6_page_3_musician_text_2);	

    element_div_page_3_musician_text_2.innerHTML = i_musician_text;	
	
} // setDivMusicianText2Page3

// Set musician name 3 page 3
function setDivMusicianName3Page3(i_musician_name)
{
    var element_div_page_3_musician_name_3 = document.getElementById(g_id_div_a6_page_3_musician_name_3);	

    element_div_page_3_musician_name_3.innerHTML = i_musician_name;	
	
} // setDivMusicianName3Page3

// Set musician text 3 page 3
function setDivMusicianText3Page3(i_musician_text)
{
    var element_div_page_3_musician_text_3 = document.getElementById(g_id_div_a6_page_3_musician_text_3);	

    element_div_page_3_musician_text_3.innerHTML = i_musician_text;	
	
} // setDivMusicianText3Page3

// Set musician name 4 page 3
function setDivMusicianName4Page3(i_musician_name)
{
    var element_div_page_3_musician_name_4 = document.getElementById(g_id_div_a6_page_3_musician_name_4);	

    element_div_page_3_musician_name_4.innerHTML = i_musician_name;	
	
} // setDivMusicianName4Page3

// Set musician text 4 page 3
function setDivMusicianText4Page3(i_musician_text)
{
    var element_div_page_3_musician_text_4 = document.getElementById(g_id_div_a6_page_3_musician_text_4);	

    element_div_page_3_musician_text_4.innerHTML = i_musician_text;	
	
} // setDivMusicianText4Page3

// Set musician name 5 page 3
function setDivMusicianName5Page3(i_musician_name)
{
    var element_div_page_3_musician_name_5 = document.getElementById(g_id_div_a6_page_3_musician_name_5);	

    element_div_page_3_musician_name_5.innerHTML = i_musician_name;	
	
} // setDivMusicianName5Page3

// Set musician text 5 page 3
function setDivMusicianText5Page3(i_musician_text)
{
    var element_div_page_3_musician_text_5 = document.getElementById(g_id_div_a6_page_3_musician_text_5);	

    element_div_page_3_musician_text_5.innerHTML = i_musician_text;	
	
} // setDivMusicianText5Page3

// Set musician name 6 page 3
function setDivMusicianName6Page3(i_musician_name)
{
    var element_div_page_3_musician_name_6 = document.getElementById(g_id_div_a6_page_3_musician_name_6);	

    element_div_page_3_musician_name_6.innerHTML = i_musician_name;	
	
} // setDivMusicianName6Page3

// Set musician text 6 page 3
function setDivMusicianText6Page3(i_musician_text)
{
    var element_div_page_3_musician_text_6 = document.getElementById(g_id_div_a6_page_3_musician_text_6);	

    element_div_page_3_musician_text_6.innerHTML = i_musician_text;	
	
} // setDivMusicianText6Page3

// Clear all texts page 3. Check first that all divs exist
function clearTextsPage3()
{
	var inner_html = "";
	
    var element_div_page_3_text_logo = document.getElementById(g_id_div_a6_page_3_text_logo);	
    if (null == element_div_page_3_text_logo)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_text_logo is null");
        return;
    }
	
    var element_div_page_3_musician_name_1 = document.getElementById(g_id_div_a6_page_3_musician_name_1);	
    if (null == element_div_page_3_musician_name_1)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_name_1 is null");
        return;
    }
	
    var element_div_page_3_musician_text_1 = document.getElementById(g_id_div_a6_page_3_musician_text_1);	
    if (null == element_div_page_3_musician_text_1)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_text_1 is null");
        return;
    }
	
    var element_div_page_3_musician_name_2 = document.getElementById(g_id_div_a6_page_3_musician_name_2);	
    if (null == element_div_page_3_musician_name_2)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_name_2 is null");
        return;
    }
	
    var element_div_page_3_musician_text_2 = document.getElementById(g_id_div_a6_page_3_musician_text_2);	
    if (null == element_div_page_3_musician_text_2)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_text_2 is null");
        return;
    }
	
    var element_div_page_3_musician_name_3 = document.getElementById(g_id_div_a6_page_3_musician_name_3);	
    if (null == element_div_page_3_musician_name_3)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_name_3 is null");
        return;
    }
	
    var element_div_page_3_musician_text_3 = document.getElementById(g_id_div_a6_page_3_musician_text_3);	
    if (null == element_div_page_3_musician_text_3)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_text_3 is null");
        return;
    }	
	
	
    var element_div_page_3_musician_name_4 = document.getElementById(g_id_div_a6_page_3_musician_name_4);	
    if (null == element_div_page_3_musician_name_4)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_name_4 is null");
        return;
    }
	
    var element_div_page_3_musician_text_4 = document.getElementById(g_id_div_a6_page_3_musician_text_4);	
    if (null == element_div_page_3_musician_text_4)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_text_4 is null");
        return;
    }		

    var element_div_page_3_musician_name_5 = document.getElementById(g_id_div_a6_page_3_musician_name_5);	
    if (null == element_div_page_3_musician_name_5)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_name_5 is null");
        return;
    }
	
    var element_div_page_3_musician_text_5 = document.getElementById(g_id_div_a6_page_3_musician_text_5);	
    if (null == element_div_page_3_musician_text_5)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_text_5 is null");
        return;
    }	

    var element_div_page_3_musician_name_6 = document.getElementById(g_id_div_a6_page_3_musician_name_6);	
    if (null == element_div_page_3_musician_name_6)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_name_6 is null");
        return;
    }
	
    var element_div_page_3_musician_text_6 = document.getElementById(g_id_div_a6_page_3_musician_text_6);	
    if (null == element_div_page_3_musician_text_6)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_musician_text_6 is null");
        return;
    }	
	
	element_div_page_3_text_logo.innerHTML = inner_html;
    element_div_page_3_musician_name_1.innerHTML = inner_html;	
    element_div_page_3_musician_text_1.innerHTML = inner_html;		
    element_div_page_3_musician_name_2.innerHTML = inner_html;	
    element_div_page_3_musician_text_2.innerHTML = inner_html;	
    element_div_page_3_musician_name_3.innerHTML = inner_html;	
    element_div_page_3_musician_text_3.innerHTML = inner_html;	
    element_div_page_3_musician_name_4.innerHTML = inner_html;	
    element_div_page_3_musician_text_4.innerHTML = inner_html;
    element_div_page_3_musician_name_5.innerHTML = inner_html;	
    element_div_page_3_musician_text_5.innerHTML = inner_html;
    element_div_page_3_musician_name_6.innerHTML = inner_html;	
    element_div_page_3_musician_text_6.innerHTML = inner_html;
	
} // clearTextsPage3

// Hide musician text <div> elements on page three
// The function is only executed for case printer. For this case the
// text takes some mor place than for case administrator. 
// This is not a clean solution to the problem that text don't
// fit to a page in print mode ....
function hideMusicianTextDivsPageThree()
{
	if (g_user_case_str != g_user_case_printer)
	{
		return;
	}

	hideMusicianOneTextDivsPageThree();

	hideMusicianTwoTextDivsPageThree();

	hideMusicianThreeTextDivsPageThree();
	
	hideMusicianFourTextDivsPageThree();
	
	hideMusicianFiveTextDivsPageThree();
	
	hideMusicianSixTextDivsPageThree();

} // hideMusicianTextDivsPageThree

// Hide musician one text <div> elements page three
function hideMusicianOneTextDivsPageThree()
{
    var element_div_page_3_musician_name_1 = document.getElementById(g_id_div_a6_page_3_musician_name_1);
	
    var element_div_page_3_musician_text_1 = document.getElementById(g_id_div_a6_page_3_musician_text_1);

	element_div_page_3_musician_name_1.style.display = 'none';
    element_div_page_3_musician_text_1.style.display = 'none';

} // hideMusicianOneTextDivsPageThree

// Hide musician two text <div> elements page three
function hideMusicianTwoTextDivsPageThree()
{
    var element_div_page_3_musician_name_2 = document.getElementById(g_id_div_a6_page_3_musician_name_2);
	
    var element_div_page_3_musician_text_2 = document.getElementById(g_id_div_a6_page_3_musician_text_2);
	
    element_div_page_3_musician_name_2.style.display = 'none';
    element_div_page_3_musician_text_2.style.display = 'none';

} // hideMusicianTwoTextDivsPageThree

// Hide musician three text <div> elements page three
function hideMusicianThreeTextDivsPageThree()
{
	var element_div_page_3_musician_name_3 = document.getElementById(g_id_div_a6_page_3_musician_name_3);
	
    var element_div_page_3_musician_text_3 = document.getElementById(g_id_div_a6_page_3_musician_text_3);

	element_div_page_3_musician_name_3.style.display = 'none';
    element_div_page_3_musician_text_3.style.display = 'none';

} // hideMusicianThreeTextDivsPageThree

// Hide musician four text <div> elements page three
function hideMusicianFourTextDivsPageThree()
{
    var element_div_page_3_musician_name_4 = document.getElementById(g_id_div_a6_page_3_musician_name_4);
	
    var element_div_page_3_musician_text_4 = document.getElementById(g_id_div_a6_page_3_musician_text_4);

	element_div_page_3_musician_name_4.style.display = 'none';
    element_div_page_3_musician_text_4.style.display = 'none';

} // hideMusicianFourTextDivsPageThree

// Hide musician five text <div> elements page three
function hideMusicianFiveTextDivsPageThree()
{
    var element_div_page_3_musician_name_5 = document.getElementById(g_id_div_a6_page_3_musician_name_5);
	
    var element_div_page_3_musician_text_5 = document.getElementById(g_id_div_a6_page_3_musician_text_5);
	
    element_div_page_3_musician_name_5.style.display = 'none';
    element_div_page_3_musician_text_5.style.display = 'none';

} // hideMusicianFiveTextDivsPageThree

// Hide musician six text <div> elements page three
function hideMusicianSixTextDivsPageThree()
{
	var element_div_page_3_musician_name_6 = document.getElementById(g_id_div_a6_page_3_musician_name_6);
	
    var element_div_page_3_musician_text_6 = document.getElementById(g_id_div_a6_page_3_musician_text_6);

	element_div_page_3_musician_name_6.style.display = 'none';
    element_div_page_3_musician_text_6.style.display = 'none';

} // hideMusicianSixTextDivsPageThree

// Display musician one text <div> elements page three
function displayMusicianOneTextDivsPageThree()
{
    var element_div_page_3_musician_name_1 = document.getElementById(g_id_div_a6_page_3_musician_name_1);
	
    var element_div_page_3_musician_text_1 = document.getElementById(g_id_div_a6_page_3_musician_text_1);

	element_div_page_3_musician_name_1.style.display = 'block';
    element_div_page_3_musician_text_1.style.display = 'block';

} // displayMusicianOneTextDivsPageThree

// Display musician two text <div> elements page three
function displayMusicianTwoTextDivsPageThree()
{
    var element_div_page_3_musician_name_2 = document.getElementById(g_id_div_a6_page_3_musician_name_2);
	
    var element_div_page_3_musician_text_2 = document.getElementById(g_id_div_a6_page_3_musician_text_2);
	
    element_div_page_3_musician_name_2.style.display = 'block';
    element_div_page_3_musician_text_2.style.display = 'block';

} // displayMusicianTwoTextDivsPageThree

// Display musician three text <div> elements page three
function displayMusicianThreeTextDivsPageThree()
{
	var element_div_page_3_musician_name_3 = document.getElementById(g_id_div_a6_page_3_musician_name_3);
	
    var element_div_page_3_musician_text_3 = document.getElementById(g_id_div_a6_page_3_musician_text_3);

	element_div_page_3_musician_name_3.style.display = 'block';
    element_div_page_3_musician_text_3.style.display = 'block';

} // displayMusicianThreeTextDivsPageThree


// Display musician four text <div> elements page three
function displayMusicianFourTextDivsPageThree()
{
    var element_div_page_3_musician_name_4 = document.getElementById(g_id_div_a6_page_3_musician_name_4);
	
    var element_div_page_3_musician_text_4 = document.getElementById(g_id_div_a6_page_3_musician_text_4);

	element_div_page_3_musician_name_4.style.display = 'block';
    element_div_page_3_musician_text_4.style.display = 'block';

} // displayMusicianFourTextDivsPageThree

// Display musician five text <div> elements page three
function displayMusicianFiveTextDivsPageThree()
{
    var element_div_page_3_musician_name_5 = document.getElementById(g_id_div_a6_page_3_musician_name_5);
	
    var element_div_page_3_musician_text_5 = document.getElementById(g_id_div_a6_page_3_musician_text_5);
	
    element_div_page_3_musician_name_5.style.display = 'block';
    element_div_page_3_musician_text_5.style.display = 'block';

} // displayMusicianFiveTextDivsPageThree

// Display musician six text <div> elements page three
function displayMusicianSixTextDivsPageThree()
{
	var element_div_page_3_musician_name_6 = document.getElementById(g_id_div_a6_page_3_musician_name_6);
	
    var element_div_page_3_musician_text_6 = document.getElementById(g_id_div_a6_page_3_musician_text_6);

	element_div_page_3_musician_name_6.style.display = 'block';
    element_div_page_3_musician_text_6.style.display = 'block';

} // displayMusicianSixTextDivsPageThree

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Text Page 3 Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Text Page 4 Functions  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set text logo page 4
function setDivTextLogoPage4()
{
	var width = 103;
	var height = 10;
	setDivImageTextLogo(g_id_div_a6_page_4_text_logo, width, height);
	
    //var element_div_page_4_text_logo = document.getElementById(g_id_div_a6_page_4_text_logo);	

    //element_div_page_4_text_logo.innerHTML = g_text_logo;	
	
} // setDivTextLogoPage4

// Set free text header page 4
function setDivFreeHeaderPage4(i_free_header)
{
    var element_div_page_4_free_header = document.getElementById(g_id_div_a6_page_4_free_header);	

    element_div_page_4_free_header.innerHTML = i_free_header;	
	
} // setDivFreeHeaderPage4


// Set free text page 4
function setDivFreeTextPage4(i_free_text)
{
    var element_div_page_4_free_text = document.getElementById(g_id_div_a6_page_4_free_text);	
	
	var i_free_text_br = rowEndsWindowsToHtml(i_free_text);

    element_div_page_4_free_text.innerHTML = i_free_text_br;	
	
} // setDivFreeTextPage4

// Clear all texts page 4. Check first that all divs exist
function clearTextsPage4()
{
	var inner_html = "";
	
    var element_div_page_4_text_logo = document.getElementById(g_id_div_a6_page_4_text_logo);	
    if (null == element_div_page_4_text_logo)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_3_text_logo is null");
        return;
    }
	
    var element_div_page_4_free_header = document.getElementById(g_id_div_a6_page_4_free_header);	
    if (null == element_div_page_4_free_header)
    {
        alert("clearTextsPage3 div element g_id_div_a6_page_4_free_header is null");
        return;
    }
	
    var element_div_page_4_free_text = document.getElementById(g_id_div_a6_page_4_free_text);	
    if (null == element_div_page_4_free_text)
    {
        alert("clearTextsPage2 div element g_id_div_a6_page_4_free_text is null");
        return;
    }	
	
 	
	element_div_page_4_text_logo.innerHTML = inner_html;
    element_div_page_4_free_header.innerHTML = inner_html;	
    element_div_page_4_free_text.innerHTML = inner_html;		

	
} // clearTextsPage4

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Text Page 4 Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Text Page 4 Functions For Musicians ///////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set musician name 1 page 4
function setDivMusicianName1Page4(i_musician_name)
{
    var element_div_page_4_musician_name_1 = document.getElementById(g_id_div_a6_page_4_musician_name_1);	

    element_div_page_4_musician_name_1.innerHTML = i_musician_name;	
	
} // setDivMusicianName1Page4

// Set musician text 1 page 4
function setDivMusicianText1Page4(i_musician_text)
{
    var element_div_page_4_musician_text_1 = document.getElementById(g_id_div_a6_page_4_musician_text_1);	

    element_div_page_4_musician_text_1.innerHTML = i_musician_text;	
	
} // setDivMusicianText1Page4

// Set musician name 2 page 4
function setDivMusicianName2Page4(i_musician_name)
{
    var element_div_page_4_musician_name_2 = document.getElementById(g_id_div_a6_page_4_musician_name_2);	

    element_div_page_4_musician_name_2.innerHTML = i_musician_name;	
	
} // setDivMusicianName2Page4

// Set musician text 2 page 4
function setDivMusicianText2Page4(i_musician_text)
{
    var element_div_page_4_musician_text_2 = document.getElementById(g_id_div_a6_page_4_musician_text_2);	

    element_div_page_4_musician_text_2.innerHTML = i_musician_text;	
	
} // setDivMusicianText2Page4

// Set musician name 3 page 4
function setDivMusicianName3Page4(i_musician_name)
{
    var element_div_page_4_musician_name_3 = document.getElementById(g_id_div_a6_page_4_musician_name_3);	

    element_div_page_4_musician_name_3.innerHTML = i_musician_name;	
	
} // setDivMusicianName3Page4

// Set musician text 3 page 4
function setDivMusicianText3Page4(i_musician_text)
{
    var element_div_page_4_musician_text_3 = document.getElementById(g_id_div_a6_page_4_musician_text_3);	

    element_div_page_4_musician_text_3.innerHTML = i_musician_text;	
	
} // setDivMusicianText3Page4

// Set musician name 4 page 4
function setDivMusicianName4Page4(i_musician_name)
{
    var element_div_page_4_musician_name_4 = document.getElementById(g_id_div_a6_page_4_musician_name_4);	

    element_div_page_4_musician_name_4.innerHTML = i_musician_name;	
	
} // setDivMusicianName4Page4

// Set musician text 4 page 4
function setDivMusicianText4Page4(i_musician_text)
{
    var element_div_page_4_musician_text_4 = document.getElementById(g_id_div_a6_page_4_musician_text_4);	

    element_div_page_4_musician_text_4.innerHTML = i_musician_text;	
	
} // setDivMusicianText4Page4


// Clear all texts page 4 for musicians. Check first that all divs exist
function clearTextsPage4Musicians()
{
	var inner_html = "";
	
    var element_div_page_4_text_logo = document.getElementById(g_id_div_a6_page_4_text_logo);	
    if (null == element_div_page_4_text_logo)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_text_logo is null");
        return;
    }
	
    var element_div_page_4_musician_name_1 = document.getElementById(g_id_div_a6_page_4_musician_name_1);	
    if (null == element_div_page_4_musician_name_1)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_musician_name_1 is null");
        return;
    }
	
    var element_div_page_4_musician_text_1 = document.getElementById(g_id_div_a6_page_4_musician_text_1);	
    if (null == element_div_page_4_musician_text_1)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_musician_text_1 is null");
        return;
    }
	
    var element_div_page_4_musician_name_2 = document.getElementById(g_id_div_a6_page_4_musician_name_2);	
    if (null == element_div_page_4_musician_name_2)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_musician_name_2 is null");
        return;
    }
	
    var element_div_page_4_musician_text_2 = document.getElementById(g_id_div_a6_page_4_musician_text_2);	
    if (null == element_div_page_4_musician_text_2)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_musician_text_2 is null");
        return;
    }
	
    var element_div_page_4_musician_name_3 = document.getElementById(g_id_div_a6_page_4_musician_name_3);	
    if (null == element_div_page_4_musician_name_3)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_musician_name_3 is null");
        return;
    }
	
    var element_div_page_4_musician_text_3 = document.getElementById(g_id_div_a6_page_4_musician_text_3);	
    if (null == element_div_page_4_musician_text_3)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_musician_text_3 is null");
        return;
    }	
	
    var element_div_page_4_musician_name_4 = document.getElementById(g_id_div_a6_page_4_musician_name_4);	
    if (null == element_div_page_4_musician_name_4)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_musician_name_4 is null");
        return;
    }
	
    var element_div_page_4_musician_text_4 = document.getElementById(g_id_div_a6_page_4_musician_text_4);	
    if (null == element_div_page_4_musician_text_4)
    {
        alert("clearTextsPage4Musicians div element g_id_div_a6_page_4_musician_text_4 is null");
        return;
    }		

	element_div_page_4_text_logo.innerHTML = inner_html;
    element_div_page_4_musician_name_1.innerHTML = inner_html;	
    element_div_page_4_musician_text_1.innerHTML = inner_html;		
    element_div_page_4_musician_name_2.innerHTML = inner_html;	
    element_div_page_4_musician_text_2.innerHTML = inner_html;	
    element_div_page_4_musician_name_3.innerHTML = inner_html;	
    element_div_page_4_musician_text_3.innerHTML = inner_html;	
    element_div_page_4_musician_name_4.innerHTML = inner_html;	
    element_div_page_4_musician_text_4.innerHTML = inner_html;
	
} // clearTextsPage4Musicians

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Text Page 4 Functions For Musicians /////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Text Page 5 Functions  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set text logo page 5
function setDivTextLogoPage5()
{
	var width = 103;
	var height = 10;
	setDivImageTextLogo(g_id_div_a6_page_5_text_logo, width, height);
	
    // var element_div_page_5_text_logo = document.getElementById(g_id_div_a6_page_5_text_logo);
	
    // element_div_page_5_text_logo.innerHTML = g_text_logo;	
	
} // setDivTextLogoPage5

// Set entrance fee header page 5
function setDivEntranceHeaderPage5()
{
    var element_div_page_5_entrance_header = document.getElementById(g_id_div_a6_page_5_entrance_header);	

    element_div_page_5_entrance_header.innerHTML = "Eintritt";	
	
} // setDivEntranceHeaderPage5

// Set entrance fee header page 5
function setDivEntranceTextPage5()
{
    var element_div_page_5_entrance_text = document.getElementById(g_id_div_a6_page_5_entrance_text);	

    element_div_page_5_entrance_text.innerHTML = "Fr. 25.- Erwachsene<br>Fr. 15.- Supporter (Fr. 60.- Saisonbeitrag)<br>Fr. 15.- Studierende (Legi, Ausweis)";	
	
} // setDivEntranceTextPage5


// Clear all texts page 5. Check first that all divs exist
function clearTextsPage5()
{
	var inner_html = "";
	
    var element_div_page_5_text_logo = document.getElementById(g_id_div_a6_page_5_text_logo);	
    if (null == element_div_page_5_text_logo)
    {
        alert("clearTextsPage5 div element g_id_div_a6_page_5_text_logo is null");
        return;
    }
	
    var element_div_page_5_entrance_header = document.getElementById(g_id_div_a6_page_5_entrance_header);	
    if (null == element_div_page_5_entrance_header)
    {
        alert("clearTextsPage5 div element g_id_div_a6_page_5_entrance_header is null");
        return;
    }	
	
    var element_div_page_5_entrance_text = document.getElementById(g_id_div_a6_page_5_entrance_text);	
    if (null == element_div_page_5_entrance_text)
    {
        alert("clearTextsPage5 div element g_id_div_a6_page_5_entrance_text is null");
        return;
    }		

	element_div_page_5_text_logo.innerHTML = inner_html;
    element_div_page_5_entrance_header.innerHTML = inner_html;	
	element_div_page_5_entrance_text.innerHTML = inner_html;	

} // clearTextsPage5

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Text Page 5 Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Text Page 6 Functions  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set text logo page 6
function setDivTextLogoPage6()
{
	var width = 105;
	var height = 10;
	setDivImageTextLogo(g_id_div_a6_page_6_text_logo, width, height);
	
    //var element_div_page_6_text_logo = document.getElementById(g_id_div_a6_page_6_text_logo);	

    //element_div_page_6_text_logo.innerHTML = g_text_logo;	
	
} // setDivTextLogoPage6

// Set band name page 6
function setDivBandNamePage6()
{
    var band_name = getBandName(g_current_concert_number);
	
    var element_div_page_6_band_name = document.getElementById(g_id_div_a6_page_6_band_name);	

    element_div_page_6_band_name.innerHTML = band_name;	
	
} // setDivBandNamePage6

// Set musician musician list page 6
function setDivMusicianListPage6()
{
	var musician_list = "";
	
	var number_musicians = getNumberOfMusicians(g_current_concert_number);
	
	for (index_musician=0; index_musician<number_musicians; index_musician++)
	{
		var musician_name = getMusicianName(g_current_concert_number, index_musician + 1);
		var musician_instr = getMusicianInstrument(g_current_concert_number, index_musician + 1);
		
		musician_list = musician_list + musician_name + " " + musician_instr;
		
		if (index_musician < number_musicians - 1)
		{
			musician_list = musician_list + "<br>";
		}	
	}
	
    var element_div_page_6_musician_list = document.getElementById(g_id_div_a6_page_6_musician_list);	

    element_div_page_6_musician_list.innerHTML = musician_list;	
	
} // setDivMusicianListPage6

// Clear all texts page 6. Check first that all divs exist
function clearTextsPage6()
{
	var inner_html = "";
	
    var element_div_page_6_text_logo = document.getElementById(g_id_div_a6_page_6_text_logo);	
    if (null == element_div_page_6_text_logo)
    {
        alert("clearTextsPage6 div element g_id_div_a6_page_6_text_logo is null");
        return;
    }
	
    var element_div_page_6_band_name = document.getElementById(g_id_div_a6_page_6_band_name);	
    if (null == element_div_page_6_band_name)
    {
        alert("clearTextsPage6 div element g_id_div_a6_page_6_band_name is null");
        return;
    }	
	
    var element_div_page_6_musician_list = document.getElementById(g_id_div_a6_page_6_musician_list);	
    if (null == element_div_page_6_musician_list)
    {
        alert("clearTextsPage6 div element g_id_div_a6_page_6_musician_list is null");
        return;
    }		

	element_div_page_6_text_logo.innerHTML = inner_html;	
	element_div_page_6_band_name.innerHTML = inner_html;
	element_div_page_6_musician_list.innerHTML = inner_html;

} // clearTextsPage6

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Text Page 6 Functions  //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Replaces windows row ends with html row ends
function rowEndsWindowsToHtml(i_string)
{
	// https://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
	
	var ret_string = '';
	
	ret_string = i_string.replace(/(?:\r\n|\r|\n)/g, '<br>');
	
	return ret_string;
	
} // rowEndsWindowsToHtml



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Height Functions  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the height of a header text or text logo. (e.g. div elements g_id_div_a6_page_2_text_logo) 
function getDivTextHeaderHeight()
{
	return g_padding_top_text_logo + g_row_height_text_header;
	
} // getDivTextHeaderHeight

// Returns the height of text. (e.g. div element g_id_div_a6_page_4_free_text) 
// Bold has no influence of the height
function getDivTextHeight(i_text_str)
{
	var n_rows = getNumberRowsText(i_text_str, g_number_chars_text_per_row);
	
	return g_padding_top_text + n_rows*g_row_height_text;
	
} // getDivTextHeight

// Returns the height of text. (e.g. div element g_id_div_a6_page_4_free_text) 
// Bold has no influence of the height
function getDivBandnameTextHeight()
{
	var band_name = getBandName(g_current_concert_number);
	
	var n_rows = getNumberRowsText(band_name, g_number_chars_header_text_per_row);
	
	return g_padding_top_text + n_rows*g_row_height_text_header;
	
} // getDivBandnameTextHeight


// Returns the height of musician text. (e.g. div element g_id_div_a6_page_4_free_text) 
// Bold has no influence of the height
function getDivMusicianTextHeight(i_text_str)
{
	var n_rows = getNumberRowsText(i_text_str, g_number_chars_text_per_row);
	
	return n_rows*g_row_height_text;
	
} // getDivTextHeight

// Get the number of rows for the input text
function getNumberRowsText(i_text_str, i_chars_max_per_row)
{
	var ret_number_rows = 0;
	
	var remaining_string = i_text_str;
	
	var n_char = i_text_str.length;
	
	var n_char_row = 0;
	
	var index_space = -12345;
	
	for (index_char=0; index_char<n_char; index_char++)
	{
		index_space = remaining_string.indexOf(" ");
		
		if (index_space < 0)
		{
			ret_number_rows = ret_number_rows + 1;
			
			break;
		}
		else if (n_char_row + index_space + 1 <= i_chars_max_per_row)
		{
			n_char_row = n_char_row + index_space + 1;
			
			remaining_string = remaining_string.substring(index_space + 1);		
		}
		else
		{
			ret_number_rows = ret_number_rows + 1;
			
			n_char_row = index_space + 1;
			
			remaining_string = remaining_string.substring(index_space + 1);			
		}
		
	} // index_char
	
	return ret_number_rows;
	
} // getNumberRowsText

// Returns the height of the musician list
function getDivMusicianListHeight()
{
	var number_musicians = getNumberOfMusicians(g_current_concert_number);
	
    return g_padding_top_text + number_musicians*g_row_height_text;	
	
} // getDivMusicianListHeight


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Height Functions  ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Check Heights And Warn  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



// Returns the maximum number of rows for band name and short text
function maxNumberRowsBandNameShortText()
{
	 var max_number_float = (g_band_name_short_text_max_height - g_padding_top_text)/g_row_height_text;
	 
	 var ret_max_number = parseInt(max_number_float);
	 
	 return ret_max_number;
	
} // maxNumberRowsBandNameShortText

// Checks if all musician texts have been set
// Warning to the user if not
function checkIfAllMusiciansAreSet(i_n_set_musicians)
{
	var number_musicians = getNumberOfMusicians(g_current_concert_number);
	
	if (i_n_set_musicians == number_musicians)
	{
		return;
	}
	
	var warning_msg = "";
	warning_msg = warning_msg + g_msg_number_musician_rows_exceeded;
	
	for (var musician_number=i_n_set_musicians+1; musician_number<=number_musicians; musician_number++)
	{
		var musician_name = getMusicianName(g_current_concert_number, musician_number);
		
		warning_msg = warning_msg + musician_name + "\r\n";
	}
	
	setTextHeightWarning(warning_msg);
	
} // checkIfAllMusiciansAreSet

/* TODO Remove
// Checks if all musician texts can be set
// Return false and give warning to the user if not
// Temporary solution 
function checkIfAllMusiciansCanBeSet(i_n_set_musicians)
{
	var number_musicians = getNumberOfMusicians(g_current_concert_number);
	
	if (i_n_set_musicians == 6 && i_n_set_musicians <= number_musicians)
	{
		return true;
	}
	
	if (b_message_g_msg_number_musician_rows_exceeded_free_text_displayed)
	{
		return;
	}
	
	var warning_msg = "";
	warning_msg = warning_msg + g_msg_number_musician_rows_exceeded_free_text;
	
	for (var musician_number=i_n_set_musicians+1; musician_number<=number_musicians; musician_number++)
	{
		var musician_name = getMusicianName(g_current_concert_number, musician_number);
		
		warning_msg = warning_msg + musician_name + "\r\n";
	}
	
	setTextHeightWarning(warning_msg);
	
	b_message_g_msg_number_musician_rows_exceeded_free_text_displayed = true;
	
	return false;
	
} // checkIfAllMusiciansAreSet

var b_message_g_msg_number_musician_rows_exceeded_free_text_displayed = false;
*/


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Check Heights And Warn  /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////