/*

------------------------Author: Rudy Thereze ----------------------

*/
/*
 *--------- Requeried --------
 * tipo de documento (combBoxTipoDoc)
 * documento (txtDoc)
 * nombre (txtBoxnombre)
 * apellido (txtBoxApellido)
 * Nacionalidad (comboxNacionalidad)
 * Sexo (radioSexo)
 * Fecha Nacimiento (lnkFechaNac)
 * 
 */


//-------------------Init function frmDatosPersonales-----------------------------------

function initDatosParticipante(){

	
	setearFechaNacActivos();

	//disabledbtnParticipanteData();
	key_data ="frmDatosParticipantes";

}
//-------------- validar formulario ---------------------------

//Set of Bird Date 
function setearFechaNacActivos(){


	//set Months
	frmDatosParticipantes.comboxMes.masterData=[
		["01","Enero"],["02","Febrero"],["03","Marzo"],["04","Abril"],
		["05","Mayo"],["06","Junio"],["07","Julio"],["08","Agosto"],
		["09","Septiembre"],["10","Octubre"],["11","Noviembre"],["12","Diciembre"]
	];
	
	
	//set days
	var dataDays = []
	
	for(var i=1;i<32;i++){
		
		if(i<10){
			kony.table.insert(dataDays, ["0"+i, "0"+i]);
		}else{
			kony.table.insert(dataDays, [i, i]);
		}
	}
	
	frmDatosParticipantes.comboxDia.masterData = dataDays;
	
	//set Years
	var dataYears = [];
	ObtenerFechasCAF();
	
	

}
function TipoDocumento(){
	if(frmDatosParticipantes.combBoxTipoDoc.selectedKey=="ciVen" || frmDatosParticipantes.combBoxTipoDoc.selectedKey=="ciEx"){
	
		frmDatosParticipantes.txtDoc.maxTextLength=10;
		frmDatosParticipantes.txtDoc.textInputMode="TEXTBOX_INPUT_MODE_NUMERIC";
	
	}else{
		frmDatosParticipantes.txtDoc.maxTextLength=20;
		frmDatosParticipantes.txtDoc.textInputMode="TEXTBOX_INPUT_MODE_ANY";
	}
	
}

//-------------------- Validate Form ------------------
function validFormDatosParticipante(){

	var all_Right=true;
	var personal=true;
	var general = true;
	var club=true;
	var nombre = frmDatosParticipantes.txtBoxnombre.text;
	var doc = frmDatosParticipantes.txtDoc.text;
	var apellido = frmDatosParticipantes.txtBoxApellido.text;
	var diaRU=parseInt(frmDatosParticipantes.comboxDia.selectedKey);
	var mesRU=parseInt(frmDatosParticipantes.comboxMes.selectedKey);
	var anoRU=parseInt(frmDatosParticipantes.comboxAnio.selectedKey);

	//alert(fechaNac.formattedDate +" *** "+ fechaNac.dateComponents +" *** "+ fechaNac.placeholder)
	
	var lettNumExp = /^[0-9a-zA-Z]+$/;
	defaultFieldsDatosParticipantes();

	//alert(falg1)
	//----------------------------------- Valid fields ------------------------------------
	
	//---------------------------- Valid type Doc ------------------------
	//Validacion para borrar Jean Sosa
	if(frmDatosParticipantes.combBoxTipoDoc.selectedKey == globalDefaultList){
		//error
		all_Right =false;
		personal = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.combBoxTipoDoc.skin = "sknComboAlert";
		frmDatosParticipantes.combBoxTipoDoc.focusSkin = "sknComboAlert";
		frmDatosParticipantes.lblValidTipoDoc.text=kony.i18n.getLocalizedString("ValidacionListas");
		frmDatosParticipantes.lblValidTipoDoc.isVisible = true;
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		//abrirdatosPersonales();
		return false;
	}else{
		
		frmDatosParticipantes.combBoxTipoDoc.skin = "skncmboxForms";
		frmDatosParticipantes.combBoxTipoDoc.focusSkin = "skncomboxFocusForms";
		frmDatosParticipantes.lblValidTipoDoc.isVisible = false;
		all_Right= true;
		personal = true;
	}

	//--------------------------Valid Doc ------------------------------------------
	
	if(frmDatosParticipantes.combBoxTipoDoc.selectedKey=="P"  ){ 
		//Valid Passport
		
		if( doc == null || doc == "" || doc==" "){
			
			all_Right= false;
			personal = false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.txtDoc.skin=sknAlert;
			frmDatosParticipantes.lblValidDoc.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidDoc.isVisible = true;
			MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		
		}else
		if( !(lettNumExp.test(doc)) || doc.length>20) {
			all_Right= false;
			personal = false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.txtDoc.skin=sknAlert;
			frmDatosParticipantes.lblValidDoc.text=kony.i18n.getLocalizedString("ValidacionCampos");
			frmDatosParticipantes.lblValidDoc.isVisible = true;
			//MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		}else{
			frmDatosParticipantes.lblValidDoc.isVisible = false;
			frmDatosParticipantes.txtDoc.skin=sknTxtGrayForms;	
			all_Right= true;	
			personal = true;
		}
	}else { 
		//Valid Document (ciVen and ciEx)

		if( doc == null || doc == "" || doc==" "){
		
		all_Right= false;
			personal = false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.txtDoc.skin=sknAlert;
			frmDatosParticipantes.lblValidDoc.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidDoc.isVisible = true;
			MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;	
		}else
		 if(!(/^[0-9]+$/.test(doc)) || doc.length>10 || doc.length<6) {
		 	
			all_Right= false;
			personal = false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.txtDoc.skin=sknAlert;
			frmDatosParticipantes.lblValidDoc.text=kony.i18n.getLocalizedString("ValidacionCampos");
			frmDatosParticipantes.lblValidDoc.isVisible = true;
			MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		}else{
			
			frmDatosParticipantes.lblValidDoc.isVisible = false;
			frmDatosParticipantes.txtDoc.skin=sknTxtGrayForms;
			all_Right= true;
			personal = true;		
		}
	}
	
	//----------------------Valid Name---------------------------
	
	/*if(nombre==null || nombre=="" || nombre== " "){
	    all_Right= false;
	    personal = false;
	    limpiarCamposDP();
	    window.scrollTo(0,0);
		frmDatosParticipantes.txtBoxnombre.skin=sknAlert;
		frmDatosParticipantes.lblValidNombre.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
		frmDatosParticipantes.lblValidNombre.isVisible = true;
		//abrirdatosPersonales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	
	}else*/
	if( !ValidString(nombre,50) && nombre) {		
		all_Right= false;
		personal = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.txtBoxnombre.skin=sknAlert;
		frmDatosParticipantes.lblValidNombre.text=kony.i18n.getLocalizedString("ValidacionCampos");
		frmDatosParticipantes.lblValidNombre.isVisible = true;
		//abrirdatosPersonales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	}else{
		frmDatosParticipantes.lblValidNombre.isVisible = false;
		frmDatosParticipantes.txtBoxnombre.skin=sknTxtGrayForms;
		all_Right= true;
		personal = true;	
	}
	
	
	//---------------------Valid LastName-------------------------

	
	/*if(apellido=="" || apellido==" " || apellido==null){
		all_Right= false;
		personal = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.txtBoxApellido.skin=sknAlert;
		frmDatosParticipantes.lblValidApellido.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
		frmDatosParticipantes.lblValidApellido.isVisible = true;
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		//abrirdatosPersonales();
		return false;
	
	}else	*/
	if( !ValidString(apellido,50) && apellido) {	
		all_Right= false;
		personal = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.txtBoxApellido.skin=sknAlert;
		frmDatosParticipantes.lblValidApellido.text=kony.i18n.getLocalizedString("ValidacionCampos");
		frmDatosParticipantes.lblValidApellido.isVisible = true;
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		//abrirdatosPersonales();
		return false;
	}else{
		frmDatosParticipantes.lblValidApellido.isVisible = false;
		frmDatosParticipantes.txtBoxApellido.skin=sknTxtGrayForms;
		all_Right= true;
		personal = true;		
	}
	
	
	//----------------------Valid Sex---------------------------------------------------------------------------------------
	/*if(frmDatosParticipantes.imgRadioSexoMOff.isVisible == true && frmDatosParticipantes.imgRadioSexoFOff.isVisible == true){
		
		
		all_Right = false;
		personal = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.lblValidSexo.text=kony.i18n.getLocalizedString("ValidacionListas");
		frmDatosParticipantes.lblValidSexo.isVisible = true;
		//abrirdatosPersonales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	}else*/if(!(frmDatosParticipantes.imgRadioSexoMOff.isVisible == true && frmDatosParticipantes.imgRadioSexoFOff.isVisible == true)){
		frmDatosParticipantes.lblValidSexo.isVisible = false;
		all_Right= true;
		personal = true;
	}
	
	//-------------------Requeried Nationality------------------------------------
	/*if(frmDatosParticipantes.comboxNacionalidad.selectedKey == globalDefaultList){
		//error
		all_Right = false;
		personal = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.comboxNacionalidad.skin = "sknComboAlert";
		frmDatosParticipantes.comboxNacionalidad.focusSkin = "sknComboAlert";
		frmDatosParticipantes.lblValidNacionalidad.text=kony.i18n.getLocalizedString("ValidacionListas");
		frmDatosParticipantes.lblValidNacionalidad.isVisible = true;
		//abrirdatosPersonales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	}if(!(frmDatosParticipantes.comboxNacionalidad.selectedKey == globalDefaultList) || (frmDatosParticipantes.comboxNacionalidad.selectedKey == globalDefaultList)){
		
		frmDatosParticipantes.comboxNacionalidad.skin = "skncmboxForms";
		frmDatosParticipantes.comboxNacionalidad.focusSkin = "skncomboxFocusForms";
		frmDatosParticipantes.lblValidNacionalidad.isVisible = false;
		all_Right= true;
		personal = true;
	}*/
	
	
	
	//----------------------Requeried type blood--------------------------------
	/*if(frmDatosParticipantes.comBoxGrupoSang.selectedKey == globalDefaultList){
		
		all_Right = false;
		personal = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.comBoxGrupoSang.skin = "sknComboAlert";
		frmDatosParticipantes.comBoxGrupoSang.focusSkin = "sknComboAlert";
		frmDatosParticipantes.lblValidGrupoSangre.text=kony.i18n.getLocalizedString("ValidacionListas");
		frmDatosParticipantes.lblValidGrupoSangre.isVisible = true;
		//abrirdatosPersonales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	}else{
		
		frmDatosParticipantes.comBoxGrupoSang.skin = "skncmboxForms";
		frmDatosParticipantes.comBoxGrupoSang.focusSkin = "skncomboxFocusForms";
		frmDatosParticipantes.lblValidGrupoSangre.isVisible = false;
		all_Right= true;
		personal = true;
	}*/
	
	//--------------------Valida Fecha-----------------------------
	if(globalFechamenor==1){
		all_Right = false;
		personal = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.comboxAnio.skin = "sknComboAlert";
		frmDatosParticipantes.comboxMes.skin = "sknComboAlert";
		frmDatosParticipantes.comboxDia.skin = "sknComboAlert";
		//abrirdatosPersonales();
		frmDatosParticipantes.lblValidFecha.text=kony.i18n.getLocalizedString("msjErrorFechaMenor");
		frmDatosParticipantes.lblValidFecha.isVisible = true;
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	}else{
		frmDatosParticipantes.comboxAnio.skin = "skncmboxForms";
		frmDatosParticipantes.comboxMes.skin = "skncmboxForms";
		frmDatosParticipantes.comboxDia.skin = "skncmboxForms";
		frmDatosParticipantes.lblValidFecha.isVisible = false;
		all_Right= true;	
	
	}
	//---------------------Valid Size --------------------------------
	/*if(frmDatosParticipantes.comBoxTalla.selectedKey == globalDefaultList){
		all_Right = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.comBoxTalla.skin = "sknComboAlert";
		frmDatosParticipantes.comBoxTalla.focusSkin = "sknComboAlert";
		frmDatosParticipantes.lblValidTalla.text=kony.i18n.getLocalizedString("ValidacionListas");
		frmDatosParticipantes.lblValidTalla.isVisible = true;
		//abrirdatosPersonales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	}else{
		frmDatosParticipantes.lblValidTalla.isVisible = false;
		frmDatosParticipantes.comBoxTalla.skin = "skncmboxForms";
		frmDatosParticipantes.comBoxTalla.focusSkin = "skncomboxFocusForms";
		all_Right= true;
	}*/
	//---------------------Valid Burn Date ---------------------------
	if(frmDatosParticipantes.txtBoxCategoria == "" || frmDatosParticipantes.txtBoxCategoria == " " || frmDatosParticipantes.txtBoxCategoria == null){
		all_Right = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.lblValidFecha.isVisible = true;
		//abrirdatosPersonales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
		
	}else{
		frmDatosParticipantes.lblValidFecha.isVisible = false;
		all_Right= true;
	}
	
	
	if(all_Right==true){
		//GuardarDatosParticipanteser();
		//alert("Cambios Guardados")
		//frmDatosGrupo.show();
		limpiarCamposDP();
		//frmDatosParticipantes.labelOpcion.text="datos contacto";
		ValidarFormGeneral();
		
	
	}else{
	
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "")
	
	}

	
}

function ValidarFormGeneral(){

	var movilCP = parseInt(frmDatosParticipantes.cmboxMovil.selectedKey);
	var movilP = frmDatosParticipantes.tbxPaisMovil.text;
	var movilPD = frmDatosParticipantes.tbxPtresMovil.text;
	var movilUD = frmDatosParticipantes.tbxUMovil.text;
	var tlfCP = parseInt(frmDatosParticipantes.cmboxTelefono.selectedKey);
	var tlfP = frmDatosParticipantes.tbxPaisTelefono.text;
	var tlfPD = frmDatosParticipantes.tbxPtresTelefono.text;
	var tlfUD = frmDatosParticipantes.tbxUTelefono.text;
	var nombreEmer = frmDatosParticipantes.txtNombreEmer.text;
	var numeroEmerCP = parseInt(frmDatosParticipantes.cmboxNEmergencia.selectedKey);
	var numeroEmerP = frmDatosParticipantes.tbxPEmergencia.text;
	var numeroEmerDP = frmDatosParticipantes.tbxPDEmergencia.text;
	var numeroEmerUD = frmDatosParticipantes.tbxUDEmergencia.text;
	var correo = frmDatosParticipantes.tbxCorreo.text;
	
		//------------------------Valid tlf--------------------------------
	
	/*if(tlfCP=="-1"){
			 all_Right= false;
			 limpiarCamposDP();
			 frmDatosParticipantes.cmboxTelefono.skin="sknComboAlert";
			 frmDatosParticipantes.lblValidTlf.text=kony.i18n.getLocalizedString("ValidacionListas");
			 frmDatosParticipantes.lblValidTlf.isVisible = true;
			 //abrirdatosGenerales();
			 window.scrollTo(0,0);
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;	
		}else if(tlfCP!="-1"){
			frmDatosParticipantes.lblValidTlf.isVisible = false;
			frmDatosParticipantes.cmboxTelefono.skin="skncmboxForms";
			all_Right= true;
		}
		
		/*if(tlfP==" " || tlfP=="" || tlfP==null){
			all_Right= false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.tbxPaisTelefono.skin=sknAlert;
			frmDatosParticipantes.lblValidTlf.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidTlf.isVisible = true;
			//abrirdatosGenerales();
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		}elseif(tlfP){
			frmDatosParticipantes.lblValidTlf.isVisible = false;
			frmDatosParticipantes.tbxPaisTelefono.skin=sknTxtGrayForms;
			all_Right= true;
		}
		
		/*if(tlfPD==" " || tlfPD==""|| tlfPD== null){
			all_Right= false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.tbxPtresTelefono.skin=sknAlert;
			frmDatosParticipantes.lblValidTlf.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidTlf.isVisible = true;
			//abrirdatosGenerales();
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		}elseif(tlfPD){
			frmDatosParticipantes.lblValidTlf.isVisible = false;
			frmDatosParticipantes.tbxPtresTelefono.skin=sknTxtGrayForms;
			all_Right= true;
			
		}		
		/*if(tlfUD==" "|| tlfUD=="" || tlfUD== null){
			all_Right= false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.tbxUTelefono.skin=sknAlert;
		    frmDatosParticipantes.lblValidTlf.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidTlf.isVisible = true;
			//abrirdatosGenerales();
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
	
		}elseif(tlfUD){
			frmDatosParticipantes.lblValidTlf.isVisible = false;
		    frmDatosParticipantes.tbxUTelefono.skin=sknTxtGrayForms;
			all_Right= true;				
		}			
			*/
			
	
			
	//----------------------Valid movil--------------------------------
		/*if(movilCP=="-1"){
			 all_Right= false;
			 limpiarCamposDP();
			 frmDatosParticipantes.cmboxMovil.skin="sknComboAlert";
			 frmDatosParticipantes.lblValidMovil.text=kony.i18n.getLocalizedString("ValidacionListas");
			 frmDatosParticipantes.lblValidMovil.isVisible = true;
			 //abrirdatosGenerales();
			 window.scrollTo(0,0);
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;	
		}else if(movilCP!="-1"){
			frmDatosParticipantes.lblValidMovil.isVisible = false;
			frmDatosParticipantes.cmboxMovil.skin="skncmboxForms";
			all_Right= true;
		}
		if(movilP==null || movilP=="" || movilP==" "){
			all_Right= false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.tbxPaisMovil.skin=sknAlert;
			frmDatosParticipantes.lblValidMovil.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidMovil.isVisible = true;
			//abrirdatosGenerales();
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		
		}elseif(movilP){
			frmDatosParticipantes.lblValidMovil.isVisible = false;
			frmDatosParticipantes.tbxPaisMovil.skin="sknTxtGrayForms";
			all_Right= true;
		}
		
		if(movilPD==" " || movilPD==""|| movilPD==null){
			all_Right= false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.tbxPtresMovil.skin=sknAlert;
			frmDatosParticipantes.lblValidMovil.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidMovil.isVisible = true;
			//abrirdatosGenerales();
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		}else{
			frmDatosParticipantes.lblValidMovil.isVisible = false;
			frmDatosParticipantes.tbxPtresMovil.skin=sknTxtGrayForms;
			all_Right= true;
		
		}		
		if(movilUD==" " || movilUD=="" || movilUD==null){
			all_Right= false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.tbxUMovil.skin=sknAlert;
			frmDatosParticipantes.lblValidMovil.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidMovil.isVisible = true;
			//abrirdatosGenerales();
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;			
		}else{
			frmDatosParticipantes.lblValidMovil.isVisible = false;
			frmDatosParticipantes.tbxUMovil.skin=sknTxtGrayForms;
			all_Right= true;			
		}*/
			
	//------------------------Requeried residence---------------------------
	/*if(frmDatosParticipantes.comboxResidencia.selectedKey == globalDefaultList){
		
	/*	all_Right = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.comboxResidencia.skin = "sknComboAlert";
		frmDatosParticipantes.comboxResidencia.focusSkin = "sknComboAlert";
		frmDatosParticipantes.lblValidResidencia.text=kony.i18n.getLocalizedString("ValidacionListas");		
		frmDatosParticipantes.lblValidResidencia.isVisible = true;
		//abrirdatosGenerales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	}else*/ if(!(frmDatosParticipantes.comboxResidencia.selectedKey == globalDefaultList)){

	if(globalPaisVenezuela == frmDatosParticipantes.comboxResidencia.selectedKey){
		frmDatosParticipantes.comboxResidencia.skin = "skncmboxForms";
		frmDatosParticipantes.comboxResidencia.focusSkin = "skncomboxFocusForms";
		frmDatosParticipantes.lblValidResidencia.isVisible = false;
	//----------------------------Requeried State----------------------------
	if(frmDatosParticipantes.comboxEstadoRegion.selectedKey == globalDefaultList){
		
		/*all_Right = false;
		limpiarCamposDP();
		window.scrollTo(0,0);
		frmDatosParticipantes.comboxEstadoRegion.skin = "sknComboAlert";
		frmDatosParticipantes.comboxEstadoRegion.focusSkin = "sknComboAlert";
		frmDatosParticipantes.lblValidEstado.text=kony.i18n.getLocalizedString("ValidacionListas");
		frmDatosParticipantes.lblValidEstado.isVisible = true;
		//abrirdatosGenerales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;*/
		
	}else{
		
		frmDatosParticipantes.comboxEstadoRegion.skin = "skncmboxForms";
		frmDatosParticipantes.comboxEstadoRegion.focusSkin = "skncomboxFocusForms";
		frmDatosParticipantes.lblValidEstado.isVisible = false;
		all_Right= true;
	
	}
	/*
	//-------------------------Requeried City------------------------------------
	if(frmDatosParticipantes.comboxCuidad.selectedKey == globalDefaultList){
		
		all_Right = false;
		frmDatosParticipantes.comboxCuidad.skin = "sknComboAlert";
		frmDatosParticipantes.comboxCuidad.focusSkin = "sknComboAlert";
		frmDatosParticipantes.lblValidCiudad.text=kony.i18n.getLocalizedString("ValidacionListas");
		frmDatosParticipantes.lblValidCiudad.isVisible = true;
		abrirdatosGenerales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		return false;
	}else{
		
		frmDatosParticipantes.comboxCuidad.skin = "skncmboxForms";
		frmDatosParticipantes.comboxCuidad.focusSkin = "skncomboxFocusForms";
		frmDatosParticipantes.lblValidCiudad.isVisible = false;
		all_Right= true;
	}

			//-------------------------Requeried Mun------------------------------------
			if(frmDatosParticipantes.comboxMunicipio.selectedKey == globalDefaultList){
				
				all_Right = false;
				limpiarCamposDP();
				frmDatosParticipantes.comboxMunicipio.skin = "sknComboAlert";
				frmDatosParticipantes.comboxMunicipio.focusSkin = "sknComboAlert";
				frmDatosParticipantes.lblValidMun.text=kony.i18n.getLocalizedString("ValidacionListas");
				frmDatosParticipantes.lblValidMun.isVisible = true;
				abrirdatosGenerales();
				MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
				return false;
			}else{
				
				frmDatosParticipantes.comboxMunicipio.skin = "skncmboxForms";
				frmDatosParticipantes.comboxMunicipio.focusSkin = "skncomboxFocusForms";
				frmDatosParticipantes.lblValidMun.isVisible = false;
				all_Right= true;
			}*/
	
	}else{
		frmDatosParticipantes.comboxResidencia.skin = "skncmboxForms";
		frmDatosParticipantes.comboxResidencia.focusSkin = "skncomboxFocusForms";
		frmDatosParticipantes.lblValidResidencia.isVisible = false;
		all_Right= true;
	}

	}
	
		//-------------------------Requeried City------------------------------------
		
		/*if(frmDatosParticipantes.comboxCuidad.text == "" || frmDatosParticipantes.comboxCuidad.text== " " || frmDatosParticipantes.comboxCuidad.text==null){
		
			all_Right = false;
			limpiarCamposDP();
			window.scrollTo(0,0);
			frmDatosParticipantes.comboxCuidad.skin = "sknComboAlert";
			frmDatosParticipantes.comboxCuidad.focusSkin = "sknComboAlert";
			frmDatosParticipantes.lblValidCiudad.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidCiudad.isVisible = true;
			//abrirdatosGenerales();
			MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		}else{
			
			frmDatosParticipantes.comboxCuidad.skin = "skncmboxForms";
			frmDatosParticipantes.comboxCuidad.focusSkin = "skncomboxFocusForms";
			frmDatosParticipantes.lblValidCiudad.isVisible = false;
			all_Right= true;
		}*/
	//------------------------Valid Emergency Name-------------------------------------------------------------
	/*if(nombreEmer == null || nombreEmer == "" || nombreEmer == " "){
		all_Right= false;
		limpiarCamposDP();
		frmDatosParticipantes.txtNombreEmer.skin=sknAlert;
		frmDatosParticipantes.lblValidNombreEmer.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
		frmDatosParticipantes.lblValidNombreEmer.isVisible = true;
		//abrirdatosGenerales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		//alert(all_Right);
		return false;
	}
	else*/
	if((!ValidString(nombreEmer,80) || nombreEmer.length>=50) && nombreEmer) {
		all_Right= false;
		limpiarCamposDP();
		frmDatosParticipantes.txtNombreEmer.skin=sknAlert;
		frmDatosParticipantes.lblValidNombreEmer.text=kony.i18n.getLocalizedString("ValidacionCampos");
		frmDatosParticipantes.lblValidNombreEmer.isVisible = true;
		//abrirdatosGenerales();
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
		//alert(all_Right);
		return false;
	}else{
		frmDatosParticipantes.lblValidNombreEmer.isVisible = false;
		frmDatosParticipantes.txtNombreEmer.skin=sknTxtGrayForms;
		all_Right= true;
		//alert(all_Right);	
	}
	
	
	//------------------Valid numEmer-----------------------------
	
	//----------------------Valid movil--------------------------------

	/*if(numeroEmerCP=="-1"){
		/  all_Right= false;
			 limpiarCamposDP();
			 frmDatosParticipantes.cmboxNEmergencia.skin="sknComboAlert";
			 frmDatosParticipantes.lblValidNumEmer.text=kony.i18n.getLocalizedString("ValidacionListas");
			 frmDatosParticipantes.lblValidNumEmer.isVisible = true;
			// abrirdatosGenerales();
			 MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;	
		}elseif(numeroEmerCP!="-1"){
			
			frmDatosParticipantes.lblValidNumEmer.isVisible = false;
			frmDatosParticipantes.cmboxNEmergencia.skin="skncmboxForms";
			all_Right= true;
		}
				
		if(numeroEmerP=="" || numeroEmerP== " " || numeroEmerP==null){
		    all_Right= false;
		    limpiarCamposDP();
			frmDatosParticipantes.tbxPEmergencia.skin=sknAlert;
			frmDatosParticipantes.lblValidNumEmer.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidNumEmer.isVisible = true;
			//abrirdatosGenerales();
		 	MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
           		
		}else{
		
			all_Right= true;
			frmDatosParticipantes.tbxPEmergencia.skin=sknTxtGrayForms;
			frmDatosParticipantes.lblValidNumEmer.isVisible = false;
		
		}			
		
		if(numeroEmerDP=="" || numeroEmerDP==" "|| numeroEmerDP==null){
			all_Right= false;
			limpiarCamposDP();
			frmDatosParticipantes.tbxPDEmergencia.skin=sknAlert;
			frmDatosParticipantes.lblValidNumEmer.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidNumEmer.isVisible = true;
			//abrirdatosGenerales();
			MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
					
		}else{
			frmDatosParticipantes.lblValidNumEmer.isVisible = false;
			frmDatosParticipantes.tbxPDEmergencia.skin=sknTxtGrayForms;
			all_Right= true;
		
		}
		
		if(numeroEmerUD=="" || numeroEmerUD==" "|| numeroEmerUD==null){
			all_Right= false;
			limpiarCamposDP();
			frmDatosParticipantes.tbxUDEmergencia.skin=sknAlert;
			frmDatosParticipantes.lblValidNumEmer.text=kony.i18n.getLocalizedString("ValidacionCampoVacio");
			frmDatosParticipantes.lblValidNumEmer.isVisible = true;
			//abrirdatosGenerales();
			MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
									
		}else{
			frmDatosParticipantes.lblValidNumEmer.isVisible = false;
			frmDatosParticipantes.tbxUDEmergencia.skin=sknTxtGrayForms;
		    all_Right= true;
		}*/			
		
	//-------------------Valid mail----------------------------------
/*	if(!ValidMail(correo)) {
		all_Right=false;
		frmDatosParticipantes.tbxCorreo.skin=sknAlert;
		frmDatosParticipantes.lblValidCorreo.isVisible = true;
	}else{
		frmDatosParticipantes.tbxCorreo.skin=sknTxtGrayForms;
		frmDatosParticipantes.lblValidCorreo.isVisible = false;
		all_Right = true;
	}*/
	if(all_Right==true){
		//GuardarDatosParticipanteser();
		frmDatosParticipantes.labelOpcion.text="c";
		ValidarFormClub()
		limpiarCamposDP();
		//alert("Cambios Guardados")
		//frmDatosGrupo.show();
	
	}else{
	
		MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
	
	}
		
}

function ValidarFormClub(){
	
	//-------------------Valid mail----------------------------------
	if(frmDatosParticipantes.tbxCorreo.text=="" || frmDatosParticipantes.tbxCorreo.text==" "|| frmDatosParticipantes.tbxCorreo.text==null) {
		frmDatosParticipantes.tbxCorreo.skin=sknTxtGrayForms;
		frmDatosParticipantes.lblValidCorreo.isVisible = false;
		all_Right = true;
		//labelPopPupInvisibleDP();
		
		
	}else{
		var correo=frmDatosParticipantes.tbxCorreo.text;
		if(kony.string.isValidEmail(correo)){
			frmDatosParticipantes.tbxCorreo.skin=sknTxtGrayForms;
			frmDatosParticipantes.lblValidCorreo.isVisible = false;
			all_Right = true;	
			//labelPopPupInvisibleDP();
		}else{
			limpiarCamposDP();
			frmDatosParticipantes.tbxCorreo.skin=sknAlert;
			frmDatosParticipantes.lblValidCorreo.text=kony.i18n.getLocalizedString("msjFormatoCorreo");
			frmDatosParticipantes.lblValidCorreo.isVisible = true;
			alertPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "", "ok");
			all_Right = false;
			return false;
		}
		
	}
	
	
	
	
	
	
	
	if(all_Right==true){
		
		GuardarDatosParticipanteser();
				
 		//alert("Cambios Guardados")
		//frmDatosGrupo.show();
	
	}else{
	
		alertPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "", "ok")
	
	}
	

}



//-------------------------------- Function Valid Number with min and max ------
function ValidNumber(num,tamMin,tamMax){

	//var valid=false;
	var numExp= /^[0-9\+-]+$/
	if( num == null || num == "" || !numExp.test(num) || num.length<tamMin || num.length>tamMax){
		return false;
	}else{
		return true;
	}
	

} 

//-------------------------------- Function Valid String with max Length ------
function ValidString(str,maxL){


	var letterExpresion=/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
	
	if( str == null || str == "" || !letterExpresion.test(str) || str.length>maxL) {
		return false;
	}else{
		return true;		
	}
	
}

//-------------------------------- Function Valid String with max Length and skip empty field ------
/*function ValidString2(str,maxL){


	var letterExpresion=/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
	
	
	
	if(!letterExpresion.test(str) || str.length>maxL) {
		return false;
	}else{
		return true;		
	}
	
}*/


//-------------------------------- Function Valid String with max Length ------
function ValidMail(mail){
	
	var mailExpresion= /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	
	if(!mailExpresion.test(mail) || mail.length>80) {
		return false;
	}else{
		return true;	
	}

}

//-------------------------------- funcion para cambiar imagen de radioButton------------

function accionImagenRadioSexoM(){
	if(frmDatosParticipantes.ImgMasculinoOff.isVisible==true){
		frmDatosParticipantes.ImgMasculinoOff.isVisible=false;
		frmDatosParticipantes.ImgMasculinoOn.isVisible=true;
		frmDatosParticipantes.imgRadioOff.isVisible=true;
		frmDatosParticipantes.imgRadioOn.isVisible=false;
	}else{
		frmDatosParticipantes.ImgMasculinoOff.isVisible=true;
		frmDatosParticipantes.ImgMasculinoOn.isVisible=false;
		frmDatosParticipantes.imgRadioOff.isVisible=true;
		frmDatosParticipantes.imgRadioOn.isVisible=false;
	}
}

function accionImagenRadioSexoF(){
	if(frmDatosParticipantes.imgRadioOff.isVisible==true){
		frmDatosParticipantes.ImgMasculinoOff.isVisible=true;
		frmDatosParticipantes.ImgMasculinoOn.isVisible=false;
		frmDatosParticipantes.imgRadioOff.isVisible=false;
		frmDatosParticipantes.imgRadioOn.isVisible=true;
	}else{
		frmDatosParticipantes.ImgMasculinoOff.isVisible=true;
		frmDatosParticipantes.ImgMasculinoOn.isVisible=false;
		frmDatosParticipantes.imgRadioOff.isVisible=false;
		frmDatosParticipantes.imgRadioOn.isVisible=true;
	}
}

////////////////////////////////////////////////////////////////

function obtenerCodigoTelefonoxPaisesSer(){

	var inputparams = {
        serviceID: "ws_obtener_paises_activos",
        prm_idioma: getLanguage()
    };
    invokeServiceAsync(inputparams, obtenerCodigoTelefonoxPaisesSercallback);

}

function obtenerCodigoTelefonoxPaisesSercallback(status, resulttable) {
    //alert("Obtener Modalidad callback");
	//alert(resulttable)
	showLoading()
	var ResultsDetails = getAsyncCallResponse(status, resulttable);
	showLoading()
	if((status == 400)){
		closeLoading()
		//alert(JSON.stringify(ResultsDetails))
		globalPaisesT=ResultsDetails.lista;
		
		if(isNilOrEmptyTable(ResultsDetails)){
			
			globalPaisesTData=msjNodisponible;
				
			frmDatosParticipantes.cmboxTelefono.masterData=globalPaisesTData;
			frmDatosParticipantes.cmboxMovil.masterData=globalPaisesTData;

		}else{
			globalPaisesT=ResultsDetails.lista;
			
			
			 if(globalPaisesT!=undefined){
				var tampaisesT = globalPaisesT.length;
				
				//alert("Tallas "+Tallas[0].talCodigo);
				for(var i=0;i<tampaisesT;i++){
					var codigo = 0;
					var descripcion = "";
					
					codigo = globalPaisesT[i]["codtelefono"];
					descripcion = globalPaisesT[i]["descripcion"];
					//alert("Tallas i "+ i + " " +codigo);
					 kony.table.insert(globalPaisesTData, 
						 [codigo,descripcion]);
				}
				frmDatosParticipantes.cmboxTelefono.masterData=globalPaisesTData;
			    frmDatosParticipantes.cmboxMovil.masterData=globalPaisesTData;
				frmDatosParticipantes.cmboxNEmergencia.masterData=globalPaisesTData;	
								
			}
			
			
		}
	}
}

//Function Allocation of state
function SelectState(){

	//Pais obtiene un arreglo con codigo y nombre

	var Pais = "";
	var PaisCod = ""; 
	//var codPais = "";
	
	if(key_data=="frmDatosParticipantes"){
		
		Pais = frmDatosParticipantes.comboxResidencia.selectedKeyValue[1];
		PaisCod = frmDatosParticipantes.comboxResidencia.selectedKey;
	
	}
	
	if(isNilOrEmptyTable(PaisCod)){
		
		if(key_data=="frmDatosParticipantes"){
			frmDatosParticipantes.comboxResidencia.masterData=masterData=msjNodisponible;		
		}
			
	}else{
		ObtenerEstadoxPaisser(PaisCod);
	}

}


function SelectMun(){

	var Ciudad = ""; 
	
	if(key_data=="frmDatosParticipantes"){
		Ciudad = frmDatosParticipantes.comboxEstadoRegion.selectedKey;		
	}

	
	if(isNilOrEmptyTable(Ciudad)){
		
		if(key_data=="frmDatosParticipantes"){
			frmDatosParticipantes.comboxEstadoRegion.masterData=masterData=msjNodisponible;		
		}
		
			
	}else{
		ObtenerMunicipioXCiudadser(Ciudad);
	}
}

//Function Allocation of state
function SelectStateClick(){

	frmDatosParticipantes.comboxEstadoRegion.selectedKey = "0";
	//frmDatosParticipantes.comboxCuidad.selectedKey = "0";
	frmDatosParticipantes.comboxMunicipio.selectedKey = "0";

	//Pais obtiene un arreglo con codigo y nombre

	var Pais = "";
	var PaisCod = ""; 
	//var codPais = "";
	
	if(key_data=="frmDatosParticipantes"){
		//codPais = frmDatosParticipantes.comboxResidencia.selectedKey;
		Pais = frmDatosParticipantes.comboxResidencia.selectedKeyValue[1];
		PaisCod = frmDatosParticipantes.comboxResidencia.selectedKey;
		//alert(PaisCod+"Clave "+Pais[0]+" "+Pais[1]);

		if(PaisCod==globalPaisVenezuela){
			//setValueUrbMun(PaisCod);
			frmDatosParticipantes.comboxEstadoRegion.isVisible=true;
			frmDatosParticipantes.lblEstado.isVisible=true;
			frmDatosParticipantes.lblCiudad.isVisible=true;
			frmDatosParticipantes.lblMunicipio.isVisible=true;
			frmDatosParticipantes.comboxCuidad.isVisible=true;
			frmDatosParticipantes.hboxEstado.isVisible=true;
			frmDatosParticipantes.comboxMunicipio.isVisible=true;
			frmDatosParticipantes.lblEspacioEmer.isVisible=false;
			
		}else{
			frmDatosParticipantes.comboxEstadoRegion.isVisible=false;
	
			frmDatosParticipantes.lblEstado.isVisible=false;
			frmDatosParticipantes.lblCiudad.isVisible=true;
			frmDatosParticipantes.lblMunicipio.isVisible=false;
			frmDatosParticipantes.hboxEstado.isVisible=false;
			frmDatosParticipantes.comboxCuidad.isVisible=true;
			frmDatosParticipantes.comboxMunicipio.isVisible=false;
			frmDatosParticipantes.lblEspacioEmer.isVisible=true;
		
		}
				
	}
	
	if(isNilOrEmptyTable(PaisCod)){
		
		if(key_data=="frmDatosParticipantes"){
			frmDatosParticipantes.comboxResidencia.masterData=masterData=msjNodisponible;		
		}

			
	}else{
		ObtenerEstadoxPaisOnClickser(PaisCod);
		
	}

}

//---------------------- ObtenerCodigoOtroClub --------------------------
function ObtenerCodigoOtroClub(){

	//alert("Obtener CodigoMasculino servicio");
	
	var inputparams = { 
		serviceID : "ws_obtener_club_otro"
	};
	invokeServiceAsync(inputparams, ObtenerCodigoOtroClubsercallback);

}

function ObtenerCodigoOtroClubsercallback(status,resulttable){

	//alert("Obtener CodigoMasculino callback");
	//alert(resulttable)
	showLoading()
	var ResultsDetails = getAsyncCallResponse(status, resulttable);
	showLoading()
	if((status == 400)){
		closeLoading()
		
		if(ResultsDetails!=undefined){
		
			if(ResultsDetails.codError == '0'){
				globalOtroClub=ResultsDetails.codigo;
				
			}
		}
								
	}	
}
//-----------------------------End ObtenerCodigoOtroClub--------------------------------


//Function allocation of Municipio
function SelectMunClick(){
	frmDatosParticipantes.comboxMunicipio.selectedKey = "0";
	var Ciudad = null; 
	
	if(key_data=="frmDatosParticipantes"){
		Ciudad = frmDatosParticipantes.comboxEstadoRegion.selectedKey;		
	}
	
	if(isNilOrEmptyTable(Ciudad)){
		
		if(key_data=="frmDatosParticipantes"){
			frmDatosParticipantes.comboxEstadoRegion.masterData=masterData=msjNodisponible;		
		}
		
	}else{
		ObtenerMunicipioXCiudadOnClickser(Ciudad);
	}
}

//-----------------Function other Group--------------------

function otherGroup(){
	//EnableBtnParticipanteData();
	//alert(globalOtroClub);
	var selected=frmDatosParticipantes.comBoxClub.selectedKey;
	if(selected == globalOtroClub){
	
		frmDatosParticipantes.txtBoxNombreClub.isVisible=true;
		frmDatosParticipantes.lblNombreGrupo.isVisible = true;
		//frmDatosParticipantes.tbxCorreo.text = "";
		frmDatosParticipantes.tbxCorreo.skin = "sknTxtGray";
		frmDatosParticipantes.tbxCorreo.hoverSkin = "sknTxtGrayFocusForms";
		frmDatosParticipantes.lblEspacioNombreClub.isVisible = false;
	
	}else{
		
		frmDatosParticipantes.txtBoxNombreClub.isVisible=false;
		frmDatosParticipantes.lblNombreGrupo.isVisible = false;
		frmDatosParticipantes.tbxCorreo.skin = "sknTxtGrayDisabled";
		frmDatosParticipantes.tbxCorreo.hoverSkin = "sknTxtGrayDisabled";
		frmDatosParticipantes.lblEspacioNombreClub.isVisible = true;
		//asignarCorreoDatosP();
	}

}

function defaultFieldsDatosParticipantes(){

	
	//TipoDocumento
	frmDatosParticipantes.combBoxTipoDoc.skin = "skncmboxForms";
	frmDatosParticipantes.combBoxTipoDoc.focusSkin = "skncomboxFocusForms";
	frmDatosParticipantes.lblValidTipoDoc.isVisible=false;
	
	//Doc
	frmDatosParticipantes.txtDoc.skin="sknTxtGrayForms";
	frmDatosParticipantes.lblValidDoc.isVisible=false;
	
	//name
	frmDatosParticipantes.txtBoxnombre.skin="sknTxtGrayForms";
	frmDatosParticipantes.lblValidNombre.isVisible=false;	

	//last name
	frmDatosParticipantes.txtBoxApellido.skin="sknTxtGrayForms"
	frmDatosParticipantes.lblValidApellido.isVisible=false;		
	
	
	//nationality
	frmDatosParticipantes.comboxNacionalidad.skin = "skncmboxForms";
	frmDatosParticipantes.comboxNacionalidad.focusSkin = "skncomboxFocusForms";
	frmDatosParticipantes.lblValidNacionalidad.isVisible=false;
	
	//type blood
	frmDatosParticipantes.comBoxGrupoSang.skin = "skncmboxForms";
	frmDatosParticipantes.comBoxGrupoSang.focusSkin = "skncomboxFocusForms";
	frmDatosParticipantes.lblValidGrupoSangre.isVisible = false;
	
	//Burn Date
	frmDatosParticipantes.lblValidFecha.isVisible = false;
	
	//tlf
	frmDatosParticipantes.lblValidTlf.isVisible = false;
	frmDatosParticipantes.cmboxTelefono.skin="skncmboxForms";
	frmDatosParticipantes.tbxPaisTelefono.skin="sknTxtGrayForms";
	frmDatosParticipantes.tbxPtresTelefono.skin="sknTxtGrayForms";
	frmDatosParticipantes.tbxUTelefono.skin="sknTxtGrayForms";
		
	
	//Movil
	frmDatosParticipantes.lblValidMovil.isVisible = false;
	frmDatosParticipantes.cmboxMovil.skin="skncmboxForms";
	frmDatosParticipantes.tbxPaisMovil.skin="sknTxtGrayForms";
	frmDatosParticipantes.tbxPtresMovil.skin="sknTxtGrayForms";
	frmDatosParticipantes.tbxUMovil.skin="sknTxtGrayForms";	
	
	//Residence
	frmDatosParticipantes.comboxResidencia.skin = "skncmboxForms";
	frmDatosParticipantes.comboxResidencia.focusSkin = "skncomboxFocusForms";
	frmDatosParticipantes.lblValidResidencia.isVisible = false;
	
	//State
	frmDatosParticipantes.comboxEstadoRegion.skin = "skncmboxForms";
	frmDatosParticipantes.comboxEstadoRegion.focusSkin = "skncomboxFocusForms";
	frmDatosParticipantes.lblValidEstado.isVisible = false;
	
	//City
	frmDatosParticipantes.comboxCuidad.skin = "sknTxtGrayForms";
	//frmDatosParticipantes.comboxCuidad.focusSkin = "skncomboxFocusForms";
	frmDatosParticipantes.lblValidCiudad.isVisible = false;

	//Mun
	frmDatosParticipantes.comboxMunicipio.skin = "skncmboxForms";
	frmDatosParticipantes.comboxMunicipio.focusSkin = "skncomboxFocusForms";
	frmDatosParticipantes.lblValidMun.isVisible = false;


	//Emergency name
	frmDatosParticipantes.lblValidNombreEmer.isVisible = false;
	frmDatosParticipantes.txtNombreEmer.skin="sknTxtGrayForms";	

	//Emergency Number
	frmDatosParticipantes.lblValidNumEmer.isVisible = false;
	frmDatosParticipantes.cmboxNEmergencia.skin="skncmboxForms";
	frmDatosParticipantes.tbxPEmergencia.skin="sknTxtGrayForms";
	frmDatosParticipantes.tbxPDEmergencia.skin="sknTxtGrayForms";
	frmDatosParticipantes.tbxUDEmergencia.skin="sknTxtGrayForms";
	
	//Mail
	frmDatosParticipantes.tbxCorreo.skin="sknTxtGrayForms";
	frmDatosParticipantes.lblValidCorreo.isVisible = false;
	
	
}


function mesDatosCarrera(){
	var mesT=parseInt(frmDatosParticipantes.comboxMes.selectedKey);
	var anoT=parseInt(frmDatosParticipantes.comboxAnio.selectedKey);
	var diasf=kony.os.daysInFebruary(anoT);
	if(mesT==4 || mesT==6 || mesT==9 || mesT==11){
		
		var diaT=parseInt(frmDatosParticipantes.comboxDia.selectedKey);
		if(diaT>30){
			frmDatosParticipantes.comboxDia.selectedKey="01";
			frmDatosParticipantes.comboxDia.skin = "sknComboAlert";
			frmDatosParticipantes.lblValidFecha.text=kony.i18n.getLocalizedString("msjMesdeTreinta");
			frmDatosParticipantes.lblValidFecha.isVisible = true;
		}
	}else
	if(mesT==1 || mesT==3 || mesT==5 || mesT==7 || mesT==8 || mesT==10 || mesT==12){
		
		var diaT=parseInt(frmDatosParticipantes.comboxDia.selectedKey);
		if(diaT>31){
			frmDatosParticipantes.comboxDia.selectedKey="01";
			frmDatosParticipantes.comboxDia.skin = "sknComboAlert";
			frmDatosParticipantes.lblValidFecha.text=kony.i18n.getLocalizedString("msjMesdeTreintaUno");
			frmDatosParticipantes.lblValidFecha.isVisible = true;
		}
	}else
	if(mesT==2){
		var diaT=parseInt(frmDatosParticipantes.comboxDia.selectedKey);
		if(diasf==28 && diaT>28){
			frmDatosParticipantes.comboxDia.selectedKey="01";
			frmDatosParticipantes.comboxDia.skin = "sknComboAlert";
			frmDatosParticipantes.lblValidFecha.text=kony.i18n.getLocalizedString("msjMesdeVocho");
			frmDatosParticipantes.lblValidFecha.isVisible = true;
		}else
		if(diasf==29 && diaT>29){
			frmDatosParticipantes.comboxDia.selectedKey="01";
			frmDatosParticipantes.comboxDia.skin = "sknComboAlert";
			frmDatosParticipantes.lblValidFecha.text=kony.i18n.getLocalizedString("msjMesdeVnueve");
			frmDatosParticipantes.lblValidFecha.isVisible = true;
		}
	}
}

function abrirdatosPersonales(){
			
		frmDatosParticipantes.hboDataEmergencia.setVisibility(false);
		frmDatosParticipantes.hboxDataGeneral.setVisibility(false);
		frmDatosParticipantes.hboxDatosPersonales.setVisibility(true);
		frmDatosParticipantes.btnScrollClub.skin="btnScrollFalse";
		frmDatosParticipantes.btnScrollClub.focusSkin="btnScrolltrue";
		frmDatosParticipantes.btnScrolldatoscontacto.skin="btnScrollFalse";
		frmDatosParticipantes.btnScrolldatoscontacto.focusSkin="btnScrolltrue";
		frmDatosParticipantes.btnScrollDatosP.skin="btnScrolltrue"
		frmDatosParticipantes.btnScrollDatosP.focusSkin="btnScrollFalse";
			

}

function abrirdatosGenerales(){

		
		frmDatosParticipantes.hboDataEmergencia.setVisibility(false);
		frmDatosParticipantes.hboxDataGeneral.setVisibility(true);
		frmDatosParticipantes.hboxDatosPersonales.setVisibility(false);
		frmDatosParticipantes.hboxGuardar.isVisible=false;
		frmDatosParticipantes.hboxDatosGenerales.isVisible=true;
		frmDatosParticipantes.hboxBtn.isVisible=false;
		frmDatosParticipantes.btnScrollClub.skin="btnScrollFalse";
		frmDatosParticipantes.btnScrollClub.focusSkin="btnScrolltrue";
		frmDatosParticipantes.btnScrolldatoscontacto.skin="btnScrolltrue";
		frmDatosParticipantes.btnScrolldatoscontacto.focusSkin="btnScrollFalse";
		frmDatosParticipantes.btnScrollDatosP.skin="btnScrollFalse"
		frmDatosParticipantes.btnScrollDatosP.focusSkin="btnScrolltrue";


}

function abrirdatosclub(){

		frmDatosParticipantes.hboDataEmergencia.setVisibility(true);
		frmDatosParticipantes.hboxDataGeneral.setVisibility(false);
		frmDatosParticipantes.hboxDatosPersonales.setVisibility(false);
		frmDatosParticipantes.hboxBtn.isVisible=false;
		frmDatosParticipantes.hboxGuardar.isVisible=true;
		frmDatosParticipantes.hboxDatosGenerales.isVisible=false;
		frmDatosParticipantes.btnScrollClub.skin="btnScrolltrue";
		frmDatosParticipantes.btnScrollClub.focusSkin="btnScrollFalse";
		frmDatosParticipantes.btnScrolldatoscontacto.skin="btnScrollFalse";
		frmDatosParticipantes.btnScrolldatoscontacto.focusSkin="btnScrolltrue";
		frmDatosParticipantes.btnScrollDatosP.skin="btnScrollFalse"
		frmDatosParticipantes.btnScrollDatosP.focusSkin="btnScrolltrue";

}

function disabledbtnParticipanteData(){

	//disabled btn Regresar 
	frmDatosParticipantes.btnRegresar.skin="btnBlan";
	//frmDatosParticipantes.btnRegresar.setEnabled(false);

	//disabled btn Siguiente
	frmDatosParticipantes.btnSiguiente.skin="btnBlan";
	//frmDatosParticipantes.btnSiguiente.setEnabled(false);

}

//-------------- when sex change --------------
function SexChange(sexo){

	//radio_sexo_off.png  radio_sexo_on.png
	//alert(sexo + "  "+frmDatosParticipantes.imgRadioSexoM.src );
	if(sexo == "M" && frmDatosParticipantes.imgRadioSexoMOff.isVisible == true){
		//alert("flagSexoM")
		frmDatosParticipantes.imgRadioSexoMOff.isVisible = false;
		frmDatosParticipantes.imgRadioSexoMOn.isVisible = true;
		
		frmDatosParticipantes.imgRadioSexoFOff.isVisible = true;
		frmDatosParticipantes.imgRadioSexoFOn.isVisible = false;
		frmDatosParticipantes.lblValidSexo.isVisible=false;	
		
	}else{
		if(sexo == "M" && frmDatosParticipantes.imgRadioSexoMOn.isVisible == true){
		//alert("flagSexoM")
		
		frmDatosParticipantes.imgRadioSexoMOff.isVisible = false;
		frmDatosParticipantes.imgRadioSexoMOn.isVisible = true;
		
		frmDatosParticipantes.imgRadioSexoFOff.isVisible = true;
		frmDatosParticipantes.imgRadioSexoFOn.isVisible = false;
		frmDatosParticipantes.lblValidSexo.isVisible=false;
		}
	}
	
	
	if(sexo == "F" && frmDatosParticipantes.imgRadioSexoFOff.isVisible == true){
		//alert("flagSexoM")
		frmDatosParticipantes.imgRadioSexoFOff.isVisible = false;
		frmDatosParticipantes.imgRadioSexoFOn.isVisible = true;
		
		frmDatosParticipantes.imgRadioSexoMOff.isVisible = true;
		frmDatosParticipantes.imgRadioSexoMOn.isVisible = false;
		frmDatosParticipantes.lblValidSexo.isVisible=false;
		
	}else{
		if(sexo == "F" && frmDatosParticipantes.imgRadioSexoFOn.isVisible == true){
		//alert("flagSexoM")
		
		frmDatosParticipantes.imgRadioSexoFOff.isVisible = false;
		frmDatosParticipantes.imgRadioSexoFOn.isVisible = true;
		
		frmDatosParticipantes.imgRadioSexoMOff.isVisible = true;
		frmDatosParticipantes.imgRadioSexoMOn.isVisible = false;
		frmDatosParticipantes.lblValidSexo.isVisible=false;
		}
	}
	
	

}

var globalCorreo="";
var globalCedula="";
//---------------------- GuardarDatosParticipante--------------------------
function GuardarDatosParticipanteser(){
	if(frmDatosParticipantes.tbxCorreo.text=="" || frmDatosParticipantes.tbxCorreo.text==" "|| frmDatosParticipantes.tbxCorreo.text==null) {
		frmDatosParticipantes.tbxCorreo.skin=sknTxtGrayForms;
		frmDatosParticipantes.lblValidCorreo.isVisible = false;
		
		
	}else{
		var correo=frmDatosParticipantes.tbxCorreo.text;
		globalCorreo=frmDatosParticipantes.tbxCorreo.text;
		if(kony.string.isValidEmail(correo)){
			frmDatosParticipantes.tbxCorreo.skin=sknTxtGrayForms;
			frmDatosParticipantes.lblValidCorreo.isVisible = false;
		}else{
			limpiarCamposDP();
			frmDatosParticipantes.tbxCorreo.skin=sknAlert;
			frmDatosParticipantes.lblValidCorreo.text=kony.i18n.getLocalizedString("msjFormatoCorreo");
			frmDatosParticipantes.lblValidCorreo.isVisible = true;
			MensaPopUp(kony.i18n.getLocalizedString("msjValidarCamposInvalidos"),"destroyPopupAlerta", "ok", "");
			return false;
		}
		
	}
	var sex = "";
	if(frmDatosParticipantes.imgRadioSexoMOn.isVisible == true){
		sex = globalCodigoMasculino;
	}else{
		sex = globalCodigoFemenino;
	}
	
	for(var i = 0;i<globalCatActivasData.length;i++){

		if(globalCatActivasData[i][1] == frmDatosParticipantes.txtBoxCategoria.text){
			//alert(categoria+" , "+globalCatActivasData[i][1])
			globalCategoriaActiva = globalCatActivasData[i][0];
		}
	}
	
	var nombreClubOtro = "";
	if(frmDatosParticipantes.comBoxClub.selectedKey == globalOtroClub){
		nombreClubOtro = frmDatosParticipantes.txtBoxNombreClub.text;
	}else{
		nombreClubOtro = "";	
	}	
	
	//var fecha = frmDatosParticipantes.calendario.dateComponents;
	var fecha = frmDatosParticipantes.comboxAnio.selectedKey+"-"+frmDatosParticipantes.comboxMes.selectedKey+"-"+frmDatosParticipantes.comboxDia.selectedKey;
	

	
	globalIdentificacion = 	frmDatosParticipantes.txtDoc.text;
	//alert(globalCategoriaActiva+" , "+frmDatosParticipantes.comBoxTalla.selectedKey+" , "+globalInscripcion)
	var numTelefono=frmDatosParticipantes.cmboxTelefono.selectedKey+"-"+frmDatosParticipantes.tbxPaisTelefono.text+"-"+frmDatosParticipantes.tbxPtresTelefono.text+"-"+frmDatosParticipantes.tbxUTelefono.text;
	var numMovil=frmDatosParticipantes.cmboxMovil.selectedKey+"-"+frmDatosParticipantes.tbxPaisMovil.text+"-"+frmDatosParticipantes.tbxPtresMovil.text+"-"+frmDatosParticipantes.tbxUMovil.text;
	var numEmergencia=frmDatosParticipantes.cmboxNEmergencia.selectedKey+"-"+frmDatosParticipantes.tbxPEmergencia.text+"-"+frmDatosParticipantes.tbxPDEmergencia.text+"-"+frmDatosParticipantes.tbxUDEmergencia.text;	
	var PCod = frmDatosParticipantes.comboxResidencia.selectedKey;
	var Pestado="";
	var Pciudad="";
	var Pmunicipio="";
	var Psector="";
	var nuevo =0;
		if(PCod==globalPaisVenezuela){
			Pestado=frmDatosParticipantes.comboxEstadoRegion.selectedKey;
			
			Pmunicipio=frmDatosParticipantes.comboxMunicipio.selectedKey;
			Psector=0;
			
		}else{
		
			Pestado=0;
			//Pciudad=0;
			Pmunicipio=0;
			Psector=0;
		
		
		}
		Pciudad=frmDatosParticipantes.comboxCuidad.text;
		if(globalCategoriaActiva==0){
			var CategoriaActiva=" ";
		}
		if(frmDatosParticipantes.comBoxTalla.selectedKey=="select"){
			var talla=" ";
		}else{
			var talla=frmDatosParticipantes.comBoxTalla.selectedKey;
		}
/*<<<<<<< .mine
		
=======*/
		globalCedula =frmDatosParticipantes.txtDoc.text;
/*>>>>>>> .r1103*/
		var inputparams = { 
				serviceID : "ws_guardar_datos_participante_admin",
				prm_codigo: globalUsuarioCod,
				prm_tipodoc: frmDatosParticipantes.combBoxTipoDoc.selectedKey,
				prm_identificacion: frmDatosParticipantes.txtDoc.text,
				prm_nombre: frmDatosParticipantes.txtBoxnombre.text,
				prm_apellido: frmDatosParticipantes.txtBoxApellido.text,
				prm_nacionalidad: frmDatosParticipantes.comboxNacionalidad.selectedKey,
				prm_sexo: sex,
				prm_fecha: fecha,
				prm_tiposangre: frmDatosParticipantes.comBoxGrupoSang.selectedKey,
				prm_telefono: numTelefono,
				prm_movil: numMovil,
				prm_pais: frmDatosParticipantes.comboxResidencia.selectedKey,
				prm_estado: Pestado,
				prm_ciudad: Pciudad,
				prm_municipio: Pmunicipio,
				prm_sector:Psector,
				prm_nombreemer: frmDatosParticipantes.txtNombreEmer.text,
				prm_telemer: numEmergencia,
				prm_club: frmDatosParticipantes.comBoxClub.selectedKey,
				prm_nomOtroClub: nombreClubOtro,
				prm_correoOtroClub: frmDatosParticipantes.tbxCorreo.text,
				prm_nuevo:nuevo,
				prm_categoria :globalCategoriaActiva,
				prm_talla: talla,
				prm_inscripcion: globalInscripcion,
				prm_usuario:globalUsuarioCodigo
				} ;
			invokeServiceAsync(inputparams, GuardarDatosParticipantesercallback);
		
	/*alert(globalUsuarioCod+" "+
			frmDatosParticipantes.combBoxTipoDoc.selectedKey+" "+
			frmDatosParticipantes.txtDoc.text+" "+
			frmDatosParticipantes.txtBoxnombre.text+" "+
			frmDatosParticipantes.txtBoxApellido.text+" "+
			frmDatosParticipantes.comboxNacionalidad.selectedKey+" "+
			sex+" "+
			fecha+" "+
			frmDatosParticipantes.comBoxGrupoSang.selectedKey+" pais: "+
	
			frmDatosParticipantes.comboxResidencia.selectedKey+" estado: "+
			frmDatosParticipantes.comboxEstadoRegion.selectedKey+" "+
			frmDatosParticipantes.comboxCuidad.selectedKey+" municipio: "+
			frmDatosParticipantes.comboxMunicipio.selectedKey+" "+
			//frmDatosParticipantes.comboxUrbanizacion.selectedKey+" "+
			frmDatosParticipantes.txtNombreEmer.text+" "+
			frmDatosParticipantes.comBoxClub.selectedKey+" "+
			nombreClubOtro+" "+
			frmDatosParticipantes.tbxCorreo.text
			//globalNuevoRegistro
			);*/
	

}


function GuardarDatosParticipantesercallback(status,resulttable){

	//alert("Obtener UrbanizacionSector callback");
	//alert(resulttable)
	showLoading()
	var ResultsDetails = getAsyncCallResponse(status, resulttable);
	showLoading()
	if((status == 400)){
		closeLoading()
		//alert(JSON.stringify(ResultsDetails));
		//globalDatosParticipanteData=ResultsDetails.respuesta;
		//alert(JSON.stringify(globalDatosParticipanteData));	
		if(isNilOrEmptyTable(ResultsDetails)){
			
			globalDatosParticipanteData = msjNodisponible;
		}else{
			//Allocation from Sizes
			globalmsjRegistroI = ResultsDetails.mensajei;
			globalmsjRegistroE = ResultsDetails.mensajee;
			globalmsjRegistroP = ResultsDetails.mensajep;
			var msj = currentMsjRegister();
			
			globalDatosParticipanteData=ResultsDetails;
			//alert(JSON.stringify(globalDatosCarrera));	
			
			if(globalDatosParticipanteData!=undefined){
				if(ResultsDetails.codError == 0){
					globalPantalla = "P";
					//frmDatosCarrera.show();
					//frmDatosParticipantes.destroy();
					if(globalCorreo!=""){
						var inputparams = { 
						serviceID : "ws_obtener_formato_correo_editardatos",
						prm_usuario: globalCedula,
						prm_correo:globalCorreo
						
					} ;
					invokeServiceAsync(inputparams, ObtenerComprobanteCorreoEditar);
					}
					
					
					
					
								
				}else{
					MensaPopUp(msj, "destroyPopupAlerta", kony.i18n.getLocalizedString("btnAceptar"), "");
				}
			}
			
		}
	}
}

function ObtenerComprobanteCorreoEditar(status,resulttable){
	
	
	
	if((status == 400)){
		var ResultsDetails = getAsyncCallResponse(status, resulttable);
	
		if(isNilOrEmptyTable(ResultsDetails)){
			
			globalComprobanteInscr=msjNodisponible;
		}else{
			//Allocation from Sizes
		
			globalComprobanteInscr=ResultsDetails.formato;
			EnviarCorreosAutomaticosEditar("Datos de participaci\u00f3n actualizados – Marat\u00f3n CAF Caracas 2016",globalComprobanteInscr)
			
				
		}
	}
}
function EnviarCorreosAutomaticosEditar(asunto,correo){
	AlertPopUp.destroy();
	//alert(asunto+" , "+correo);
	//correo = correo.replace("desktopweb/images/logo_maraton.jpg", "https://photos.google.com/photo/AF1QipMiAkkylVC6V1ua5eaWY3jjCpV2As4hGpuGh_SE");
	//alert(correo);


	var correoBase64 = kony.convertToBase64(correo);
	//alert(correoBase64);	
	
	//var texto = "<html><head><title>C&oacute;digo de Comprobaci&oacute;n</title></head><body ><div class= 'container-gen' style='height: 50%; width: 65%; border-style: solid; border-width: 1px; border-color: #efefef; background-color: #efefef; '><div class='imgCAF' style='margin: 1% 1% 1% 1%; background-image: url('https://lh3.googleusercontent.com/juiskjAPzQghq7NUDGlDe56tz17C8uX1vsZds_qI_g=w232-h66-no'); background-repeat: no-repeat;' ><p style='    height: 20%;'></p></div></br><p class='titleDesc'> Nombre: #nombre</p><p>Tu c&oacute;digo de validaci&oacute;n es:</p><h1 class='codVal'>#CodigoValidacion</h1><p>Copia y pega el c&oacute;digo en el formulario de registro de usuario para verificar tu correo.</p>Para mayor informaci&oacute;n escribenos a <a href='#'>infomaraton@caf.com</a></div></body></html>";
	var inputparams = {
		serviceID : "SendEmailBase64Admin",
		to: "rthereze.sybven@gmail.com",
		subject: asunto,
		email_text: correoBase64,
		isHtml: "si"
		};
	invokeServiceAsync(inputparams, EnviarCorreosAutomaticoEditarssercallback);

}

function EnviarCorreosAutomaticoEditarssercallback(status, resulttable){
	if((status == 400)){
		var ResultsDetails = getAsyncCallResponse(status, resulttable);
		kony.print(JSON.stringify(ResultsDetails));
		if(ResultsDetails.opstatus == "0"){
		
			MensaPopUp("Datos guardados","irListadoParticipantesAct", "ok", "");
		}
		//kony.print("Flag2");
	}	

}
function irListadoParticipantesAct(){
	frmParticipantesAct.show();
	frmDatosParticipantes.destroy();	
}
function limpiarCamposDP(){

	frmDatosParticipantes.cmboxMovil.skin=skncmboxForms;
	frmDatosParticipantes.cmboxNEmergencia.skin=skncmboxForms;
	frmDatosParticipantes.cmboxTelefono.skin.skin=skncmboxForms;
	frmDatosParticipantes.combBoxTipoDoc.skin.skin=skncmboxForms;
	frmDatosParticipantes.comboxAnio.skin=skncmboxForms;
	frmDatosParticipantes.comBoxClub.skin=skncmboxForms;
	frmDatosParticipantes.comboxCuidad.skin=sknTxtGrayForms;
	frmDatosParticipantes.comboxDia.skin=skncmboxForms;
	frmDatosParticipantes.comboxEstadoRegion.skin=skncmboxForms;
	frmDatosParticipantes.comBoxGrupoSang.skin=skncmboxForms;
	frmDatosParticipantes.comboxMes.skin=skncmboxForms;
	frmDatosParticipantes.comboxMunicipio.skin=skncmboxForms;
	frmDatosParticipantes.comboxNacionalidad.skin=skncmboxForms;
	frmDatosParticipantes.comboxResidencia.skin=skncmboxForms;
	frmDatosParticipantes.comBoxTalla.skin=skncmboxForms;
	frmDatosParticipantes.tbxCorreo.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxPaisMovil.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxPaisTelefono.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxPDEmergencia.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxPEmergencia.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxPtresMovil.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxPtresTelefono.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxUDEmergencia.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxUMovil.skin=sknTxtGrayForms;
	frmDatosParticipantes.tbxUTelefono.skin=sknTxtGrayForms;
	frmDatosParticipantes.txtBoxApellido.skin=sknTxtGrayForms;
	frmDatosParticipantes.txtBoxCategoria.skin=sknTxtGrayForms;
	frmDatosParticipantes.txtBoxnombre.skin=sknTxtGrayForms;
	frmDatosParticipantes.txtBoxNombreClub.skin=sknTxtGrayForms;
	frmDatosParticipantes.txtDoc.skin=sknTxtGrayForms;
	frmDatosParticipantes.txtNombreEmer.skin=sknTxtGrayForms;
	

}

function bloquearCampos(){
	var datos=frmParticipantesAct.segMiembrosAct.selectedItems[0];
	var estatusInsc=datos.statusInscripcion;
	
	if(estatusInsc=="S"){
		frmDatosParticipantes.cmboxMovil.setEnabled(true);
		frmDatosParticipantes.cmboxNEmergencia.setEnabled(true);
		frmDatosParticipantes.cmboxTelefono.setEnabled(true);
		frmDatosParticipantes.combBoxTipoDoc.setEnabled(true);
		frmDatosParticipantes.comboxAnio.setEnabled(true);
		frmDatosParticipantes.comBoxClub.setEnabled(true);
		frmDatosParticipantes.comboxCuidad.setEnabled(true);
		frmDatosParticipantes.comboxDia.setEnabled(true);
		frmDatosParticipantes.comboxEstadoRegion.setEnabled(true);
		frmDatosParticipantes.comBoxGrupoSang.setEnabled(true);
		frmDatosParticipantes.comboxMes.setEnabled(true);
		frmDatosParticipantes.comboxMunicipio.setEnabled(true);
		frmDatosParticipantes.comboxNacionalidad.setEnabled(true);
		frmDatosParticipantes.comboxResidencia.setEnabled(true);
		frmDatosParticipantes.comBoxTalla.setEnabled(true);
		frmDatosParticipantes.tbxCorreo.setEnabled(true);
		frmDatosParticipantes.tbxPaisMovil.setEnabled(true);
		frmDatosParticipantes.tbxPaisTelefono.setEnabled(true);
		frmDatosParticipantes.tbxPDEmergencia.setEnabled(true);
		frmDatosParticipantes.tbxPEmergencia.setEnabled(true);
		frmDatosParticipantes.tbxPtresMovil.setEnabled(true);
		frmDatosParticipantes.tbxPtresTelefono.setEnabled(true);
		frmDatosParticipantes.tbxUDEmergencia.setEnabled(true);
		frmDatosParticipantes.tbxUMovil.setEnabled(true);
		frmDatosParticipantes.tbxUTelefono.setEnabled(true);
		frmDatosParticipantes.txtBoxApellido.setEnabled(true);
		frmDatosParticipantes.txtBoxCategoria.setEnabled(true);
		frmDatosParticipantes.txtBoxnombre.setEnabled(true);
		frmDatosParticipantes.txtBoxNombreClub.setEnabled(true);
		frmDatosParticipantes.txtDoc.setEnabled(true);
		frmDatosParticipantes.txtNombreEmer.setEnabled(true);
		frmDatosParticipantes.vboxSexF.setEnabled(true);
		frmDatosParticipantes.vboxSexM.setEnabled(true);
		frmDatosParticipantes.BtnGuardar.isVisible=true;
		frmDatosParticipantes.BtnGuardar.setEnabled(true);
		
	}else{
		frmDatosParticipantes.cmboxMovil.setEnabled(false);
		frmDatosParticipantes.cmboxNEmergencia.setEnabled(false);
		frmDatosParticipantes.cmboxTelefono.setEnabled(false);
		frmDatosParticipantes.combBoxTipoDoc.setEnabled(false);
		frmDatosParticipantes.comboxAnio.setEnabled(false);
		frmDatosParticipantes.comBoxClub.setEnabled(false);
		frmDatosParticipantes.comboxCuidad.setEnabled(false);
		frmDatosParticipantes.comboxDia.setEnabled(false);
		frmDatosParticipantes.comboxEstadoRegion.setEnabled(false);
		frmDatosParticipantes.comBoxGrupoSang.setEnabled(false);
		frmDatosParticipantes.comboxMes.setEnabled(false);
		frmDatosParticipantes.comboxMunicipio.setEnabled(false);
		frmDatosParticipantes.comboxNacionalidad.setEnabled(false);
		frmDatosParticipantes.comboxResidencia.setEnabled(false);
		frmDatosParticipantes.comBoxTalla.setEnabled(false);
		frmDatosParticipantes.tbxCorreo.setEnabled(false);
		frmDatosParticipantes.tbxPaisMovil.setEnabled(false);
		frmDatosParticipantes.tbxPaisTelefono.setEnabled(false);
		frmDatosParticipantes.tbxPDEmergencia.setEnabled(false);
		frmDatosParticipantes.tbxPEmergencia.setEnabled(false);
		frmDatosParticipantes.tbxPtresMovil.setEnabled(false);
		frmDatosParticipantes.tbxPtresTelefono.setEnabled(false);
		frmDatosParticipantes.tbxUDEmergencia.setEnabled(false);
		frmDatosParticipantes.tbxUMovil.setEnabled(false);
		frmDatosParticipantes.tbxUTelefono.setEnabled(false);
		frmDatosParticipantes.txtBoxApellido.setEnabled(false);
		frmDatosParticipantes.txtBoxCategoria.setEnabled(false);
		frmDatosParticipantes.txtBoxnombre.setEnabled(false);
		frmDatosParticipantes.txtBoxNombreClub.setEnabled(false);
		frmDatosParticipantes.txtDoc.setEnabled(false);
		frmDatosParticipantes.txtNombreEmer.setEnabled(false);
		frmDatosParticipantes.BtnGuardar.isVisible=false;
		frmDatosParticipantes.BtnGuardar.setEnabled(false);
		frmDatosParticipantes.vboxSexF.setEnabled(false);
		frmDatosParticipantes.vboxSexM.setEnabled(false);
		
	}
}

function validarCampoCedulaDatosParticipantes(input){

if(frmDatosParticipantes.combBoxTipoDoc.selectedKey=="V" ||frmDatosParticipantes.combBoxTipoDoc.selectedKey=="E"){

 var tam =input.length;

 
  if (tam == 1){
   if((!kony.string.isNumeric(input) && input != "+") || input == ".")
    return "";
  } else if (tam > 1){
   var input_subs = input.substring(1, tam);
   var last = input.substring(tam-1, tam);
   if (!kony.string.isNumeric(input_subs) || last == ".")
    return input.substring(0, tam-1);
  }

 return input;
 
}else

if(frmDatosParticipantes.combBoxTipoDoc.selectedKey=="P"){
 
 var tam = input.length;

 
  if (tam == 1){
   if((!kony.string.isNumeric(input) && !kony.string.isAsciiAlpha(input) &&input != "+") || input == ".")
    return "";
  } else if (tam > 1){
   var input_subs = input.substring(1, tam);
   kony.print("INPUT SUBS: "+input_subs);
   var last = input.substring(tam-1, tam);
   if (!kony.string.isAsciiAlphaNumeric(input_subs) || last == ".")
    return input.substring(0, tam-1);
  }
  
  return input;
  
 }


}
//Fin de la funcion validar