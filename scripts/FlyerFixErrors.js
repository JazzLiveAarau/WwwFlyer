// File: FlyerFixErrors.js
// Date: 2022-04-07
// Author: Gunnar Lidén

// File content
// =============
// Functions to fix errors 


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The user clicked the button 'Check band data'
function eventCheckFixBandData()
{
    var debug_msg = 'User klicked the Check/Fix band data button';
    console.log(debug_msg);

    var concert_fix_errors = new FlyerConcertFixErrors(g_current_concert_number);

    var html_error_str = concert_fix_errors.getFlyerConcertDataPrinterErrorHtmlString();

    if (html_error_str.length > 0)
    {
		var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

		element_div_display_band_data.innerHTML = html_error_str;

		displayDivDisplayCheckBandData();

        var message_str = 'Konzert-Texte sind nicht gleich auf der Homepage und in dieser Flyer Applikation. Funktionen, die die Fehler korrigieren, sind aber noch nicht implementiert';

        alert(message_str);
    }

} // eventCheckBandData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions  ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class FlyerConcertFixErrors ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class FlyerConcertFixErrors
{
    // Creates the instance (object) of this class
    constructor(i_concert_number)
    {
        // Member variables
        // ================

		// Concert number
		this.m_concert_number = i_concert_number;

        // Object holding comparison data and results for a concert
        this.m_compare = new FlyerConcertComparisonData(i_concert_number);

        // Message for the case that all band data is equal
        this.m_no_comparison_error_msg = 'Alle Konzert-Texte sind gleich auf der Homepage und in dieser Flyer Applikation';

        // Fix all errors (that are possible/reasonable to fix ...)
        this.fixAllComparisonErrors();

    } // constructor

    // Main fix error functions
    // ========================

    // Fix all comparison errors
    // Case no errors: 
    //  Tell the user that there are no errors and return
    // Case errors in Admin and in Edit data:
    //  
    // Case errors in Admin (and no errors in Edit) data:
    //  
    // Case (no errors in Admin) and errors in Edit data:
    //  
    fixAllComparisonErrors()
    {
        var debug_msg = '';

        if (this.m_compare.noComparisonErrors())
        {
            var msg_str = this.getNoComparisonErrorsMsg();

            alert(msg_str);

            debug_msg = 'FlyerConcertFixErrors.fixAllComparisonErrors No errors and no changes have been made';
            console.log(debug_msg);

            return;
        }
        else if (!this.m_compare.noAdminComparisonErrors() && !this.m_compare.noEditComparisonErrors())
        {
            debug_msg = 'FlyerConcertFixErrors.fixAllComparisonErrors Errors in Admin and Edit data';
            console.log(debug_msg);

            this.fixAdminComparisonErrors();

            this.fixEditComparisonErrors();

        }
        else if (!this.m_compare.noAdminComparisonErrors())
        {
            debug_msg = 'FlyerConcertFixErrors.fixAllComparisonErrors Errors only in Admin data';
            console.log(debug_msg);

            this.fixAdminComparisonErrors();
        }
        else if (!this.m_compare.noEditComparisonErrors())
        {
            debug_msg = 'FlyerConcertFixErrors.fixAllComparisonErrors Errors only in Edit data';
            console.log(debug_msg);

            this.fixEditComparisonErrors();
        }
    
    } // fixAllComparisonErrors

    // Fix admin (homepage) text errors
	// These are the texts that are written in Admin and set on the Homepage.
	// Admin exports these texts from the Homepage to the Flyer application.
    fixAdminComparisonErrors()
    {   
        if (!this.m_compare.bandNameNoError())
		{
			this.fixBandNameError();
		}
		if (!this.m_compare.numberMusiciansNoError())
		{
			this.fixNumberMusiciansError();
		}

		if (!this.m_compare.musicianNamesNoError())
		{
			this.fixMusicianNamesError();
		}

		if (!this.m_compare.musicianInstrumentsNoError())
		{
			this.fixMusicianInstrumentsError();
		}
        
    } // fixAdminComparisonErrors

	// Fix edit (flyer) errors
	// These are the texts that are written with the Flyer application 
	// and that are imported by Admin to the Homepage 
	fixEditComparisonErrors()
	{
		if (!this.m_compare.bandTextNoError())
		{
			this.fixBandTextError();
		}

		if (!this.m_compare.labelFreeTextNoError())
		{
			this.fixLabelFreeTextError();
		}

		if (!this.m_compare.freeTextNoError())
		{
			this.fixFreeTextError();
		}

		if (!this.m_compare.musicianTextsNoError())
		{
			this.fixMusicianTextsError();
		}

    } // fixEditComparisonErrors

    // Fix admin (homepage) errors
    // ===========================

    // Fix band name error
    fixBandNameError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixBandNameError' +
                        ' Admin= ' + this.m_compare.m_band_name_homepage + 
                        ' Edit= '  + this.m_compare.m_band_name_edit;
        console.log(debug_msg);

    } // fixBandNameError

    // Fix number of musicians error
    fixNumberMusiciansError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixNumberMusiciansError' +
                        ' Admin= ' + this.m_compare.m_number_musicians_homepage.toString() + 
                        ' Edit= '  + this.m_compare.m_number_musicians_edit.toString();
        console.log(debug_msg);

    } // fixNumberMusiciansError

    // Fix musician names error
    fixMusicianNamesError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixMusicianNamesError';
        console.log(debug_msg);

    } // fixMusicianNamesError

    // Fix musician instruments error
    fixMusicianInstrumentsError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixMusicianInstrumentsError';
        console.log(debug_msg);

    } // fixMusicianInstrumentsError

    // Fix edit (flyer) errors
    // =======================

    // Fix band text error
    fixBandTextError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixBandTextError';
        console.log(debug_msg);

    } // fixBandTextError

    // Fix label free text error
    fixLabelFreeTextError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixLabelFreeTextError';
        console.log(debug_msg);

    } // fixLabelFreeTextError

    // Fix free text error
    fixFreeTextError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixFreeTextError';
        console.log(debug_msg);

    } // fixFreeTextError

    // Fix musician texts error
    fixMusicianTextsError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixMusicianTextsError';
        console.log(debug_msg);

    } // fixMusicianTextsError

    // Returns HTML error string 
    getFlyerConcertDataPrinterErrorHtmlString()
    {
        return this.m_compare.getFlyerConcertDataPrinterErrorHtmlString();
    }

    // Returnd the message that no errors were found
    getNoComparisonErrorsMsg()
    {
        return this.m_no_comparison_error_msg;
        
    } // getNoComparisonErrorsMsg

} // FlyerConcertFixErrors


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class FlyerConcertFixErrors /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Check Fix Band Data Button ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set active mode
function setButtonCheckFixBandData()
{
    var button_check_fix_band_data_html = getButtonCheckFixBandDataHtml();
	
    var element_div_check_fix_band_data = document.getElementById(g_id_div_check_band_data);	
    if (null == element_div_check_fix_band_data)
    {
        alert("setButtonCheckFixBandData element_div_check_fix_band_data is null");
        return;
    }
	
    element_div_check_fix_band_data.innerHTML = button_check_fix_band_data_html;	
	
} // setButtonCheckFixBandData

// Returns the html code for the check/fix button
function getButtonCheckFixBandDataHtml()
{	
	var ret_button_check_fix_band_data_html = '';
	
	ret_button_check_fix_band_data_html = ret_button_check_fix_band_data_html + '<p onclick="eventCheckFixBandData()"><b>';
	
	ret_button_check_fix_band_data_html = ret_button_check_fix_band_data_html + getCheckFixBandDataCaption() + '</b>';

    var text_tooltip = getTooltipHtml(g_tooltip_check_band_data, g_id_tooltip_check_band_data);
	
	ret_button_check_fix_band_data_html = ret_button_check_fix_band_data_html + text_tooltip;
	
	ret_button_check_fix_band_data_html = ret_button_check_fix_band_data_html + '</p>';

    // console.log(ret_button_check_fix_band_data_html);

	return ret_button_check_fix_band_data_html;	
	
} // getButtonCheckFixBandDataHtml


// Returns the Check caption for the button
function getCheckFixBandDataCaption()
{
   return 'Check/Fix<br> Band-Daten';

} // getCheckFixBandDataCaption


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Check Fix Band Data Button //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide And Display Check Fix Button  ////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hides the button (<div>) 'Check/Fix band data'
function hideButtonCheckFixBandData()
{
	var element_id_div_check_band_data = document.getElementById(g_id_div_check_band_data);
	if (null == element_id_div_check_band_data)
	{
		alert("hideButtonCheckFixBandData Element with id g_id_div_check_band_data is null");
		
		return;
	}
		
	element_id_div_check_band_data.style.display = "none";
	
} // hideButtonCheckFixBandData

// Displays the button (<div>) 'Check/Fix band data'
function displayButtonCheckFixBandData()
{
	var element_id_div_check_band_data = document.getElementById(g_id_div_check_band_data);
	if (null == element_id_div_check_band_data)
	{
		alert("displayButtonCheckFixBandData Element with id g_id_div_check_band_data is null");
		
		return;
	}
		
	element_id_div_check_band_data.style.display = "block";
	
} // displayButtonCheckFixBandData

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Hide And Display Check Fix Button  //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


