// File: FlyerFixErrors.js
// Date: 2022-04-15
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
    var debug_msg = 'eventCheckFixBandData: User klicked the Check/Fix band data button';
    console.log(debug_msg);

    exeCheckFixBandData();

} // eventCheckBandData

// Execute check and fix errors
function exeCheckFixBandData()
{
    var debug_msg = 'exeCheckFixBandData';
    console.log(debug_msg);

    var concert_fix_errors = new FlyerConcertFixErrors(g_current_concert_number);

    var html_error_str = concert_fix_errors.getFlyerConcertDataPrinterErrorHtmlString();

    if (html_error_str.length > 0)
    {
		var element_div_display_band_data = document.getElementById(g_id_div_display_check_result);

		element_div_display_band_data.innerHTML = html_error_str;

		displayDivDisplayCheckBandData();

        var message_str = 'Konzert-Texte sind nicht gleich auf der Homepage und in dieser Flyer Applikation. Funktionen, die die Fehler korrigieren, sind aber noch nicht implementiert';

        // alert(message_str);
    }

} // exeCheckFixBandData

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

        // Message for the case that all homepage band data is equal aber nicht alle flyer data
        this.m_no_homepage_error_msg = 'Keine Fehler, die mit Button "Check/Fix" korrigiert werden können. Nur Warnungen, dass Website und Flyer Daten nicht gleich sind.';

        // XML value for not yet set musician text
        this.m_musician_text_not_yet_set_str = 'Musiker/Musikerin Text ...';

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

        if (g_flyer_application_mode != "EditXml")
        {
            alert("fixAllComparisonErrors Save of XML Edit file only allowed in mode EditXml");
            
            return;
        }

        var msg_str = '';

        if (this.m_compare.noComparisonErrors())
        {
            msg_str = this.getNoComparisonErrorsMsg();

            alert(msg_str);

            debug_msg = 'FlyerConcertFixErrors.fixAllComparisonErrors No errors and no changes have been made';
            console.log(debug_msg);

            hideDivDisplayCheckBandData();

            return;
        }
        else if (!this.m_compare.noAdminComparisonErrors() && !this.m_compare.noEditComparisonErrors())
        {
            debug_msg = 'FlyerConcertFixErrors.fixAllComparisonErrors Errors in Admin and Edit data';
            // console.log(debug_msg);

            this.fixAdminComparisonErrors();

            this.fixEditComparisonErrors();

        }
        else if (!this.m_compare.noAdminComparisonErrors())
        {
            debug_msg = 'FlyerConcertFixErrors.fixAllComparisonErrors Errors only in Admin data';
            // console.log(debug_msg);

            this.fixAdminComparisonErrors();
        }
        else if (!this.m_compare.noEditComparisonErrors())
        {
            debug_msg = 'FlyerConcertFixErrors.fixAllComparisonErrors Errors only in Edit data';
            // console.log(debug_msg);

            msg_str = this.getWarningErrorsForWindowsFlyerMsg();

            alert(msg_str);

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
		else if (!this.m_compare.numberMusiciansNoError())
		{
			this.fixNumberMusiciansError();
		}
		else if (!this.m_compare.orderMusiciansNoError())
		{
			this.fixOrderMusiciansError();
		}
		else if (!this.m_compare.musicianNamesNoError())
		{
			this.fixMusicianNamesError();
		}
		else if (!this.m_compare.musicianInstrumentsNoError())
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
		else if (!this.m_compare.labelFreeTextNoError())
		{
			this.fixLabelFreeTextError();
		}
		else if (!this.m_compare.freeTextNoError())
		{
			this.fixFreeTextError();
		}
		else if (!this.m_compare.musicianTextsNoError())
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
        // console.log(debug_msg);

        var prompt_str = 'Bandname Flyer von "' + this.m_compare.m_band_name_edit + 
                        '" zu "' + this.m_compare.m_band_name_homepage + '" ändern?';

        if (confirm(prompt_str))
        {
            setBandName(this.m_compare.concert_number, this.m_compare.m_band_name_homepage);

            saveXmlEditObjectToFile();

            debug_msg = 'FlyerConcertFixErrors.fixBandNameError Band name changed from' +
                        ' ' + this.m_compare.m_band_name_edit + 
                        ' to '  + this.m_compare.m_band_name_homepage;
            console.log(debug_msg);

            setTimeout(exeCheckFixBandData, 2000); 
        }

    } // fixBandNameError

    // Fix number of musicians error
    fixNumberMusiciansError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixNumberMusiciansError' +
                        ' Admin= ' + this.m_compare.m_number_musicians_homepage.toString() + 
                        ' Edit= '  + this.m_compare.m_number_musicians_edit.toString();
        console.log(debug_msg);

        var musician_texts = this.getFlyerMusicianTextArray();

        var prompt_str = 'Anzahl Musiker ändern und Musikerdaten aktualisieren?';

        if (!confirm(prompt_str))
        {
            return;
        }

        var n_homepage = this.m_compare.m_number_musicians_homepage;

        var n_edit =  this.m_compare.m_number_musicians_edit;

        if (n_homepage > n_edit)
        {
            for (var i_append=1; i_append <= n_homepage - n_edit; i_append++)
            {
                appendMusicianNode(this.m_compare.concert_number, "NotYetSetNodeValue", "NotYetSetNodeValue", "NotYetSetNodeValue");
            }
        }
        else
        {
            for (var i_delete=1; i_delete <= n_edit - n_homepage; i_delete++)
            {
                var musician_mumber = 1;

                deleteMusicianNode(this.m_compare.concert_number, musician_mumber);
            }
        }

        this.updateFlyerMusiciansXml(musician_texts);

        saveXmlEditObjectToFile();

        debug_msg = 'FlyerConcertFixErrors.fixNumberMusiciansError Number of flyer musicians changed and musicians data is set';
        console.log(debug_msg);

        setTimeout(exeCheckFixBandData, 2000); 

    } // fixNumberMusiciansError

    // Fix order of musicians error
    fixOrderMusiciansError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixOrderMusiciansError' +
        ' Number musicians= '  + this.m_compare.m_musicians_homepage.length.toString(); 

        var musician_texts = this.getFlyerMusicianTextArray();

        var prompt_str = 'Musiker-Reihenfolge ändern?';

        if (!confirm(prompt_str))
        {
            return;
        }

        this.updateFlyerMusiciansXml(musician_texts);

        saveXmlEditObjectToFile();

        debug_msg = 'FlyerConcertFixErrors.fixOrderMusiciansError Order of musicians changed';
        console.log(debug_msg);

        setTimeout(exeCheckFixBandData, 2000); 

    } // fixOrderMusiciansError

    // Update the musicians data of the flyer XML object
    updateFlyerMusiciansXml(i_musician_texts)
    {
        var n_musicians= this.m_compare.m_musicians_homepage.length;

        for (var index_save=0; index_save < n_musicians; index_save++)
        {
            var save_name = this.m_compare.m_musicians_homepage[index_save];

            var save_instrument =  this.m_compare.m_instruments_homepage[index_save];

            var save_text = i_musician_texts[index_save];

            setMusicianName(this.m_compare.concert_number, index_save + 1, save_name);

            setMusicianInstrument(this.m_compare.concert_number, index_save + 1, save_instrument);

            setMusicianText(this.m_compare.concert_number, index_save + 1, save_text);
        }

    } // updateFlyerMusiciansXml

    // Returns the flyer texts in an array for all (homepage) musician names
    getFlyerMusicianTextArray()
    {
        var ret_musician_texts = [];

        var n_musicians= this.m_compare.m_musicians_homepage.length;

        for (var index_musician=0; index_musician < n_musicians; index_musician++)
        {
            var musician_name = this.m_compare.m_musicians_homepage[index_musician];

            var musician_text = this.getFlyerMusicianText(musician_name);

            ret_musician_texts[index_musician] = musician_text;
        }

        return ret_musician_texts;

    } // getFlyerMusicianTextArray

    // Returns the flyer text for a given (homepage) musician name
    getFlyerMusicianText(i_musician_name)
    {
        var ret_musician_text = '';

        var n_musicians= this.m_compare.m_musicians_edit.length;

        for (var index_musician=0; index_musician < n_musicians; index_musician++)
        {
            var edit_name = this.m_compare.m_musicians_edit[index_musician];

            if (edit_name == i_musician_name)
            {
                ret_musician_text = this.m_compare.m_musician_texts_edit[index_musician];

                break;
            }

        } // index_musician

        if (ret_musician_text.length == 0)
        {
            ret_musician_text = this.m_musician_text_not_yet_set_str;
        }

        return ret_musician_text;

    } // getFlyerMusicianText

    // Fix musician names error
    fixMusicianNamesError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixMusicianNamesError';
        console.log(debug_msg);

		if (!this.m_compare.numberMusiciansNoError())
		{
            debug_msg = 'FlyerConcertFixErrors.fixMusicianNamesError ' + 
            'Number of musicians is not equal. This error must first be fixed';
            console.log(debug_msg);

			return;
		}

        if (!this.m_compare.m_order_musicians_unchanged_bool)
        {
            debug_msg = 'FlyerConcertFixErrors.fixMusicianNamesError ' + 
            'The order of the musicians has changed. This function cannot solve this problem.';
            console.log(debug_msg);

            return;
        }

        var b_at_least_one_changed = false;

		for (var index_name=0; index_name < this.m_compare.m_musicians_bool.length; index_name++)
		{
			if (!this.m_compare.m_musicians_bool[index_name])
			{
                var prompt_str = 'Musikername Flyer von "' + this.m_compare.m_musicians_edit[index_name] + 
                '" zu "' + this.m_compare.m_musicians_homepage[index_name] + '" ändern?';

                if (confirm(prompt_str))
                {
                    setMusicianName(this.m_compare.concert_number, index_name + 1, this.m_compare.m_musicians_homepage[index_name]);

                    debug_msg = 'FlyerConcertFixErrors.fixMusicianNamesError Name ' + this.m_compare.m_musicians_edit[index_name] +
                                ' changed to ' + this.m_compare.m_musicians_homepage[index_name];
                    console.log(debug_msg);

                    b_at_least_one_changed = true;
                }
			}

		} // index_name

        if (b_at_least_one_changed)
        {
            saveXmlEditObjectToFile();

            setTimeout(exeCheckFixBandData, 2000);       
        }

    } // fixMusicianNamesError

    // Fix musician instruments error
    fixMusicianInstrumentsError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixMusicianInstrumentsError';
        // console.log(debug_msg);
		if (!this.m_compare.numberMusiciansNoError())
		{
            debug_msg = 'FlyerConcertFixErrors.fixMusicianInstrumentsError ' + 
            'Number of musicians is not equal. This error must first be fixed';
            console.log(debug_msg);

			return;
		}

        if (!this.m_compare.m_order_musicians_unchanged_bool)
        {
            debug_msg = 'FlyerConcertFixErrors.fixMusicianInstrumentsError ' + 
            'The order of the musicians has changed. This function cannot solve this problem.';
            console.log(debug_msg);

            return;
        }

        var b_at_least_one_changed = false;

		for (var index_instrument=0; index_instrument < this.m_compare.m_instruments_bool.length; index_instrument++)
		{
			if (!this.m_compare.m_instruments_bool[index_instrument])
			{
                var prompt_str = 'Musiker Instrument Flyer von "' + this.m_compare.m_instruments_edit[index_instrument] + 
                '" zu "' + this.m_compare.m_instruments_homepage[index_instrument] + '" ändern?';

                if (confirm(prompt_str))
                {
                    setMusicianInstrument(this.m_compare.concert_number, index_instrument + 1, this.m_compare.m_instruments_homepage[index_instrument]);

                    debug_msg = 'FlyerConcertFixErrors.fixMusicianInstrumentsError Name ' + this.m_compare.m_instruments_edit[index_instrument] +
                                ' changed to ' + this.m_compare.m_instruments_homepage[index_instrument];
                    console.log(debug_msg);

                    b_at_least_one_changed = true;
                }
			}

		} // index_instrument

        if (b_at_least_one_changed)
        {
            saveXmlEditObjectToFile();

            setTimeout(exeCheckFixBandData, 2000);       
        }

    } // fixMusicianInstrumentsError

    // Fix edit (flyer) errors
    // =======================

    // Fix band text error
    fixBandTextError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixBandTextError';
        // console.log(debug_msg);

    } // fixBandTextError

    // Fix label free text error
    fixLabelFreeTextError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixLabelFreeTextError';
        // console.log(debug_msg);

    } // fixLabelFreeTextError

    // Fix free text error
    fixFreeTextError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixFreeTextError';
        // console.log(debug_msg);

    } // fixFreeTextError

    // Fix musician texts error
    fixMusicianTextsError()
    {
        var debug_msg = 'FlyerConcertFixErrors.fixMusicianTextsError';
        // console.log(debug_msg);

    } // fixMusicianTextsError

    // Returns HTML error string 
    getFlyerConcertDataPrinterErrorHtmlString()
    {
        return this.m_compare.getFlyerConcertDataPrinterErrorHtmlString();
    }

    // Returns the message that no errors were found
    getNoComparisonErrorsMsg()
    {
        return this.m_no_comparison_error_msg;
        
    } // getNoComparisonErrorsMsg

    // Returns the message that there only are (normal) differences that will
    // disappear when data is imported by the Windows Flyer application
    getWarningErrorsForWindowsFlyerMsg()
    {
        return this.m_no_homepage_error_msg;
        
    } // getWarningErrorsForWindowsFlyerMsg

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
