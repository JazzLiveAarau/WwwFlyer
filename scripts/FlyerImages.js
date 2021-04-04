// File: FlyerImages.js
// Date: 2021-02-27
// Author: Gunnar Lidén

// File content
// =============
// Functions to set images for QR Codes, flyer image (poster) and sponsor logos image

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Image Main Functions  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set all images
function setAllImages()
{
	setImagePage1();
	
	setImagesPage5();
	
	setImagesPage6();
	
} // setAllImages

// Sets the image (poster) on page 1. 
function setImagePage1()
{
    //QQQ clearImagePage1();
	
	setDivImagePosterPage1(g_current_concert_number);
	
} // setImagePage1

// Sets the QR code images on page 5. 
function setImagesPage5()
{
    clearImagesPage5();
	
    setDivHomepageLabelPage5();
	setDivHomepageQrCodePage5();
	setDivReservationLabelPage5();
	setDivReservationQrCodePage5();
	setDivAppLabelPage5();
	setDivAppQrCodePage5();
	setDivSupporterLabelPage5();
	setDivSupporterQrCodePage5();
	setDivPremisisLabelPage5();
	setDivPremisisQrCodePage5();   
	
} // setImagesPage5

// Sets the QR code images and the logos image on page 6.
function setImagesPage6()
{
    clearImagesPage6();
	
	setQrCodeImageWebsitePage6(g_current_concert_number);
	
	setQrCodeImageSoundPage6(g_current_concert_number);
	
	setWebsiteLabel();
	
	setSoundLabel();
	
	setSponsorsLabel();
	
} // setImagesPage6


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Image Main Functions  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Image Page 1 Functions  ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Set image page 1
function setDivImagePosterPage1(i_concert_number)
{
	var element_div_page_1_image = document.getElementsByTagName("PageOneBox")[0];
	
	image_poster_html = '';
	
	image_poster_html = image_poster_html + '<img class="fill" id= "' + g_id_flyer_image + '" ';
	
	image_poster_html = image_poster_html + ' src="';
	
	image_poster_html = image_poster_html + getPosterImageNamePath(i_concert_number) + '"';
	
	image_poster_html = image_poster_html + ' alt="FlyerBild" style="width:109mm;height:156mm";padding-top: 0mm;">';

    element_div_page_1_image.innerHTML = image_poster_html;	
	
} // setDivImagePosterPage1 

// Returns the name and the relative path to the poster image for a given concert number
function getPosterImageNamePath(i_concert_number)
{
	var ret_image_name_path = '';

	ret_image_name_path = ret_image_name_path + g_dir_admin_xml + '/';
	
	ret_image_name_path = ret_image_name_path + GetSubdirectoryNameCurrentSeason() + '/';	
	
	ret_image_name_path = ret_image_name_path + g_file_name_image_poster_start;
	
	ret_image_name_path = ret_image_name_path + getImageNumberAsString(i_concert_number);
	
	ret_image_name_path = ret_image_name_path + '.jpg';
	
	return ret_image_name_path;
	
} // getPosterImageNamePath

// Returns the image number as string with a preceding '0' for 1-9
function getImageNumberAsString(i_concert_number)
{
	var ret_image_number_str = i_concert_number.toString();
	if (i_concert_number<=9)
	{
		ret_image_number_str = "0" + ret_image_number_str;
	}
	
	return ret_image_number_str;
	
} // getImageNumberAsString


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Image Page 1 Functions  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Image Page 5 Functions  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set homepage label
function setDivHomepageLabelPage5()
{
	var element_div_page_5_cell_1_1 = document.getElementById(g_id_div_qr_code_page_5_cell_1_1);
	
	var homepage_label = '<b>www.jazzliveaarau.ch</b>';
	
	// <div id= "id_div_qr_code_page_5_cell_1_1"><b>www.jazzliveaarau.ch</b></div>
	
	element_div_page_5_cell_1_1.innerHTML = homepage_label;
	
} // setDivHomepageLabelPage5

// Set homepage QR Code
function setDivHomepageQrCodePage5()
{
	var element_div_page_5_cell_1_2 = document.getElementById(g_id_div_qr_code_page_5_cell_1_2);
	
	var homepage_qr = '<img class="fill" src="QrCodes/qr_code_jazz_live_aarau.png" alt="QrCode" style="width:12mm;height:12mm">';
	
	// <img class="fill" src="QrCodes/qr_code_jazz_live_aarau.png" alt="QrCode" style="width:12mm;height:12mm">
	
	element_div_page_5_cell_1_2.innerHTML = homepage_qr;
	
} // setDivHomepageQrCodePage5

// Set reservation label
function setDivReservationLabelPage5()
{
	var element_div_page_5_cell_2_1 = document.getElementById(g_id_div_qr_code_page_5_cell_2_1);
	
	var reservation_label = '<b>Reservationen</b>';
	
	// <div id= "id_div_qr_code_page_5_cell_2_1"><b>Reservationen</b></div>
	
	element_div_page_5_cell_2_1.innerHTML = reservation_label;
	
} // setDivReservationLabelPage5

// Set reservation QR Code
function setDivReservationQrCodePage5()
{
	var element_div_page_5_cell_2_2 = document.getElementById(g_id_div_qr_code_page_5_cell_2_2);
	
	var homepage_qr = '<img class="fill" src="QrCodes/qr_code_reservationen.png" alt="QrCode" style="width:12mm;height:12mm">';
	
	// <img class="fill" src="QrCodes/qr_code_reservationen.png" alt="QrCode" style="width:12mm;height:12mm">
	
	element_div_page_5_cell_2_2.innerHTML = homepage_qr;
	
} // setDivReservationQrCodePage5

// Set app label
function setDivAppLabelPage5()
{
	var element_div_page_5_cell_3_1 = document.getElementById(g_id_div_qr_code_page_5_cell_3_1);
	
	var app_label = '<b>App</b>';
	
	//  <div id= "id_div_qr_code_page_5_cell_3_1"><b>App</b></div>
	
	element_div_page_5_cell_3_1.innerHTML = app_label;
	
} // setDivAppLabelPage5

// Set app QR Code
function setDivAppQrCodePage5()
{
	var element_div_page_5_cell_3_2 = document.getElementById(g_id_div_qr_code_page_5_cell_3_2);
	
	var app_qr = '<img class="fill" src="QrCodes/qr_code_app.png" alt="QrCode" style="width:12mm;height:12mm">';
	
	// <img class="fill" src="QrCodes/qr_code_app.png" alt="QrCode" style="width:12mm;height:12mm">
	
	element_div_page_5_cell_3_2.innerHTML = app_qr;
	
} // setDivAppQrCodePage5

// Set supporter label
function setDivSupporterLabelPage5()
{
	var element_div_page_5_cell_4_1 = document.getElementById(g_id_div_qr_code_page_5_cell_4_1);
	
	var supporter_label = '<b>Supporter</b>';
	
	//  <div id= "id_div_qr_code_page_5_cell_4_1"><b>Supporter</b></div>
	
	element_div_page_5_cell_4_1.innerHTML = supporter_label;
	
} // setDivSupporterLabelPage5

// Set supporter QR Code
function setDivSupporterQrCodePage5()
{
	var element_div_page_5_cell_4_2 = document.getElementById(g_id_div_qr_code_page_5_cell_4_2);
	
	var supporter_qr = '<img class="fill" src="QrCodes/qr_code_supporter.png" alt="QrCode" style="width:12mm;height:12mm">';
	
	// <img class="fill" src="QrCodes/qr_code_supporter.png" alt="QrCode" style="width:12mm;height:12mm">
	
	element_div_page_5_cell_4_2.innerHTML = supporter_qr;
	
} // setDivSupporterQrCodePage5

// Set premises label
function setDivPremisisLabelPage5()
{
	var element_div_page_5_cell_5_1 = document.getElementById(g_id_div_qr_code_page_5_cell_5_1);
	
	var premises_label = '<b>Lokal</b><br> Spaghetti Factory Salmen<br> Metzgergasse 8, 5000 Aarau';
	
	//  <div id= "id_div_qr_code_page_5_cell_5_1"><b>Lokal</b><br> Spaghetti Factory Salmen<br> Metzgergasse 8, 5000 Aarau</div>
	
	element_div_page_5_cell_5_1.innerHTML = premises_label;
	
} // setDivPremisisLabelPage5

// Set supporter QR Code
function setDivPremisisQrCodePage5()
{
	var element_div_page_5_cell_5_2 = document.getElementById(g_id_div_qr_code_page_5_cell_5_2);
	
	var premisis_qr = '<img class="fill" src="QrCodes/qr_code_lokal.png" alt="QrCode" style="width:12mm;height:12mm">';
	
	//<img class="fill" src="QrCodes/qr_code_lokal.png" alt="QrCode" style="width:12mm;height:12mm">
	
	element_div_page_5_cell_5_2.innerHTML = premisis_qr;
	
} // setDivPremisisQrCodePage5

// Clear images page 5. Check first that the divs exists
function clearImagesPage5()
{
	var inner_html = "";
	
    var element_div_page_5_cell_1_1 = document.getElementById(g_id_div_qr_code_page_5_cell_1_1);	
    if (null == element_div_page_5_cell_1_1)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_1_1 is null");
        return;
    }

    var element_div_page_5_cell_1_2 = document.getElementById(g_id_div_qr_code_page_5_cell_1_2);	
    if (null == element_div_page_5_cell_1_2)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_1_2 is null");
        return;
    }

    var element_div_page_5_cell_2_1 = document.getElementById(g_id_div_qr_code_page_5_cell_2_1);	
    if (null == element_div_page_5_cell_2_1)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_2_1 is null");
        return;
    }
	
    var element_div_page_5_cell_2_2 = document.getElementById(g_id_div_qr_code_page_5_cell_2_2);	
    if (null == element_div_page_5_cell_2_2)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_2_2 is null");
        return;
    }

    var element_div_page_5_cell_3_1 = document.getElementById(g_id_div_qr_code_page_5_cell_3_1);	
    if (null == element_div_page_5_cell_3_1)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_3_1 is null");
        return;
    }
	
    var element_div_page_5_cell_3_2 = document.getElementById(g_id_div_qr_code_page_5_cell_3_2);	
    if (null == element_div_page_5_cell_3_2)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_3_2 is null");
        return;
    }

    var element_div_page_5_cell_4_1 = document.getElementById(g_id_div_qr_code_page_5_cell_4_1);	
    if (null == element_div_page_5_cell_4_1)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_4_1 is null");
        return;
    }
	
    var element_div_page_5_cell_4_2 = document.getElementById(g_id_div_qr_code_page_5_cell_4_2);	
    if (null == element_div_page_5_cell_4_2)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_4_2 is null");
        return;
    }

    var element_div_page_5_cell_5_1 = document.getElementById(g_id_div_qr_code_page_5_cell_5_1);	
    if (null == element_div_page_5_cell_5_1)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_5_1 is null");
        return;
    }
	
    var element_div_page_5_cell_5_2 = document.getElementById(g_id_div_qr_code_page_5_cell_5_2);	
    if (null == element_div_page_5_cell_5_2)
    {
        alert("clearImagesPage5 div element g_id_div_qr_code_page_5_cell_5_2 is null");
        return;
    }
	
    element_div_page_5_cell_1_1.innerHTML = inner_html;
    element_div_page_5_cell_1_2.innerHTML = inner_html;
    element_div_page_5_cell_2_1.innerHTML = inner_html;
    element_div_page_5_cell_2_2.innerHTML = inner_html;
    element_div_page_5_cell_3_1.innerHTML = inner_html;
    element_div_page_5_cell_3_2.innerHTML = inner_html;
    element_div_page_5_cell_4_1.innerHTML = inner_html;
    element_div_page_5_cell_4_2.innerHTML = inner_html;
    element_div_page_5_cell_5_1.innerHTML = inner_html;
    element_div_page_5_cell_5_2.innerHTML = inner_html;
	
} // clearImagePage1

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Image Page 5 Functions  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Image Page 6 Functions  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Set QR code image for the band website on page 6
function setQrCodeImageWebsitePage6(i_concert_number)
{
    var element_div_page_6_cell_1_2 = document.getElementById(g_id_div_qr_code_page_6_cell_1_2);	
	
	image_qr_website_html = '';
	
	image_qr_website_html = image_qr_website_html + '<img class="fill" src="';
	
	image_qr_website_html = image_qr_website_html + getQrImageWebsiteNamePath(i_concert_number) + '"';
	
	image_qr_website_html = image_qr_website_html + ' alt="QrCode" style="width:12mm;height:12mm">';
	
	// <img class="fill" src="AdminXml/Saison_2019-2020/QrCode_Band_02_Sound.png" alt="QrCode" style="width:12mm;height:12mm">

    element_div_page_6_cell_1_2.innerHTML = image_qr_website_html;	
	
} // setQrCodeImageWebsitePage6

// Set QR code image for the band website on page 6
function setQrCodeImageSoundPage6(i_concert_number)
{
    var element_div_page_6_cell_2_2 = document.getElementById(g_id_div_qr_code_page_6_cell_2_2);	
	
	image_qr_website_html = '';
	
	image_qr_website_html = image_qr_website_html + '<img class="fill" src="';
	
	image_qr_website_html = image_qr_website_html + getQrImageSoundNamePath(i_concert_number) + '"';
	
	image_qr_website_html = image_qr_website_html + ' alt="QrCode" style="width:12mm;height:12mm">';
	
	// <img class="fill" src="AdminXml/Saison_2019-2020/QrCode_Band_02_Sound.png" alt="QrCode" style="width:12mm;height:12mm">

    element_div_page_6_cell_2_2.innerHTML = image_qr_website_html;	
	
} // setQrCodeImageSoundPage6


// Returns the name and the relative path to the website QR Code image for a given concert number
function getQrImageWebsiteNamePath(i_concert_number)
{
	var ret_image_sound_name_path = '';

	ret_image_sound_name_path = ret_image_sound_name_path + g_dir_admin_xml + '/';
	
	ret_image_sound_name_path = ret_image_sound_name_path + GetSubdirectoryNameCurrentSeason() + '/';	
	
	ret_image_sound_name_path = ret_image_sound_name_path + g_file_name_qr_code_image_start;
	
	ret_image_sound_name_path = ret_image_sound_name_path + getImageNumberAsString(i_concert_number);
	
	ret_image_sound_name_path = ret_image_sound_name_path + g_file_name_qr_code_image_website;
	
	return ret_image_sound_name_path;
	
} // getQrImageWebsiteNamePath

// Returns the name and the relative path to the sound QR Code image for a given concert number
function getQrImageSoundNamePath(i_concert_number)
{
	var ret_image_sound_name_path = '';

	ret_image_sound_name_path = ret_image_sound_name_path + g_dir_admin_xml + '/';
	
	ret_image_sound_name_path = ret_image_sound_name_path + GetSubdirectoryNameCurrentSeason() + '/';	
	
	ret_image_sound_name_path = ret_image_sound_name_path + g_file_name_qr_code_image_start;
	
	ret_image_sound_name_path = ret_image_sound_name_path + getImageNumberAsString(i_concert_number);
	
	ret_image_sound_name_path = ret_image_sound_name_path + g_file_name_qr_code_image_sound;
	
	return ret_image_sound_name_path;
	
} // getQrImageSoundNamePath

// Set label for the website QR Code
function setWebsiteLabel()
{
	var element_div_page_6_cell_1_1 = document.getElementById(g_id_div_qr_code_page_6_cell_1_1);
	
	element_div_page_6_cell_1_1.innerHTML = "<b>Website</b>";
	
} // setWebsiteLabel

// Set label for the sound QR Code
function setSoundLabel()
{
	var element_div_page_6_cell_2_1 = document.getElementById(g_id_div_qr_code_page_6_cell_2_1);
	
	element_div_page_6_cell_2_1.innerHTML = "<b>Sound</b>";
	
} // setSoundLabel

// Set label for the sponsors image
function setSponsorsLabel()
{
	var element_div_page_6_logos_image = document.getElementById(g_id_div_a6_page_6_logos_image);	
	
	element_div_page_6_logos_image.innerHTML = '<br><br>' + 
	         '<img class="contain" src="Logos/Logos.png" alt="Logos" style="width:80mm;height:51mm">';
//2021-02-27 '<img class="fill"    src="Logos/Logos.png" alt="Logos" style="width:80mm;height:51mm">';
	
} // setSponsorsLabel

// Clear images page 6. Check first that the divs exists
function clearImagesPage6()
{
	var inner_html = "";
	
    var element_div_page_6_cell_1_1 = document.getElementById(g_id_div_qr_code_page_6_cell_1_1);	
    if (null == element_div_page_6_cell_1_1)
    {
        alert("clearImagesPage6 div element g_id_div_qr_code_page_6_cell_1_1 is null");
        return;
    }

    var element_div_page_6_cell_1_2 = document.getElementById(g_id_div_qr_code_page_6_cell_1_2);	
    if (null == element_div_page_6_cell_1_2)
    {
        alert("clearImagesPage6 div element g_id_div_qr_code_page_6_cell_1_2 is null");
        return;
    }

    var element_div_page_6_cell_2_1 = document.getElementById(g_id_div_qr_code_page_6_cell_2_1);	
    if (null == element_div_page_6_cell_2_1)
    {
        alert("clearImagesPage6 div element g_id_div_qr_code_page_6_cell_2_1 is null");
        return;
    }
	
    var element_div_page_6_cell_2_2 = document.getElementById(g_id_div_qr_code_page_6_cell_2_2);	
    if (null == element_div_page_6_cell_2_2)
    {
        alert("clearImagesPage6 div element g_id_div_qr_code_page_6_cell_2_2 is null");
        return;
    }
	
    var element_div_page_6_logos_image = document.getElementById(g_id_div_a6_page_6_logos_image);	
    if (null == element_div_page_6_logos_image)
    {
        alert("clearImagesPage6 div element g_id_div_a6_page_6_logos_image is null");
        return;
    }
	
    element_div_page_6_cell_1_1.innerHTML = inner_html;
    element_div_page_6_cell_1_2.innerHTML = inner_html;
    element_div_page_6_cell_2_1.innerHTML = inner_html;
    element_div_page_6_cell_2_2.innerHTML = inner_html;
	element_div_page_6_logos_image.innerHTML = inner_html;

} // clearImagePage6
	
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Image Page 6 Functions  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Image Text Logo  //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set text logo image
function setDivImageTextLogo(i_id_div_text_logo_image, i_width, i_height)
{
    var element_div_text_logo_image = document.getElementById(i_id_div_text_logo_image);	
	if (null == element_div_text_logo_image)
	{
		alert("setDivImageTextLogo Image element null for i_id_div_text_logo_image= " + i_id_div_text_logo_image);
		return;
	}
	
	image_text_logo_html = '';
	
	image_text_logo_html = image_text_logo_html + '<img class="fill" src="';
	
	image_text_logo_html = image_text_logo_html + getTextLogoImageNamePath() + '"';
	
	image_text_logo_html = image_text_logo_html + ' alt="Text Logo" style="width:' + i_width.toString() + 'mm;height:' + i_height.toString() + 'mm";padding-top: 0mm;">';
	
    element_div_text_logo_image.innerHTML = image_text_logo_html;	
	
} // setDivImageTextLogo

// Set black image left or right of text logo (here only the right size
function setDivBlackImageForTextLogo(i_element_black_area, i_width, i_height)
{
	if (null == i_element_black_area)
	{
		alert("setDivBlackImageForTextLogo Image element null");
		return;
	}
	
	image_text_logo_html = '';
	
	image_text_logo_html = image_text_logo_html + '<img class="fill" src="';
	
	image_text_logo_html = image_text_logo_html + getBlackImageNamePath() + '"';
	
	image_text_logo_html = image_text_logo_html + ' alt="Black image for logo" style="width:' + i_width.toString() + 'mm;height:' + i_height.toString() + 'mm";padding-top: 0mm;">';
	
    i_element_black_area.innerHTML = image_text_logo_html;	
	
} // setDivBlackImageForTextLogo

// Returns the name and the relative path to the text logo image
function getTextLogoImageNamePath()
{
	var ret_image_name_path = '';

	ret_image_name_path = ret_image_name_path + g_dir_logos + '/';
	
	ret_image_name_path = ret_image_name_path + g_file_name_text_logo;

	return ret_image_name_path;
	
} // getTextLogoImageNamePath

// Returns the name and the relative path to the black image
function getBlackImageNamePath()
{
	var ret_image_name_path = '';

	ret_image_name_path = ret_image_name_path + g_dir_logos + '/';
	
	ret_image_name_path = ret_image_name_path + g_file_name_black_logo;

	return ret_image_name_path;
	
} // getBlackImageNamePath


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Image Text Logo  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

