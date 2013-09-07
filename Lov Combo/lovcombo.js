Ext.BLANK_IMAGE_URL = '../../ext-3.4.0/resources/images/default/s.gif';

// application entry point
Ext.onReady(function() {
    Ext.QuickTips.init();
	
	// The data store containing the list of states
    var states = new Ext.data.ArrayStore({
        fields: ['name', 'abbreviation'],
        data: [	['ALABAMA','AL'],
                ['MASSACHUSETTS','MA'],
				['MICHIGAN','MI'],
				['NEBRASKA','NE'],
				['NEVADA','NV'],
				['NEW HAMPSHIRE','NH'],
				['NEW JERSEY','NJ'],
				['NEW YORK','NY'],
				['NORTH CAROLINA','NC'], 
				['NORTH DAKOTA','ND']
		]
    });
				
	var lc = new Ext.ux.form.LovCombo({
		 id:'lovcombo'
		,hideOnSelect:false
		,fieldLabel: 'Choose State'
        ,store: states
        ,queryMode: 'local'
        ,displayField: 'name'
        ,valueField: 'abbreviation'
        ,multiSelect: true
        ,maxSelections: 3
        ,width: 400
		,anchor:'90%'
		,triggerAction:'all'
		,mode:'local'
	});
	
	/*
	 *	Here is where we create the Form
	 */
    var gridForm = new Ext.FormPanel({
        id: 'company-form',
        frame: true,
        labelAlign: 'left',
        title: 'List of Values Combo',
        bodyStyle:'padding:5px',
        width: 750,
		renderTo:document.body,
		anchor : '100%',
        items: [lc]
    });
});