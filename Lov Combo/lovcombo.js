Ext.BLANK_IMAGE_URL = '../../ext-3.4.0/resources/images/default/s.gif';

// application entry point
Ext.onReady(function() {
    Ext.QuickTips.init();
	
	// The data store containing the list of states
    var states = new Ext.data.ArrayStore({
        fields: ['name', 'abbreviation'],
        data: [['ALABAMA','AL'],
                ['ALASKA','AK'],
                ['AMERICAN SAMOA','AS'],
            	['ARIZONA','AZ'],
				['CALIFORNIA','CA'],
            	['COLORADO1','CO1'],
				['AMERICAN1 SAMOA','AS1'],
            	['ARIZONA1','AZ1'],
				['CALIFORNIA1','CA1'],
            	['COLORADO','CO'],
				['DELAWARE','DE'],['DISTRICT OF COLUMBIA','DC']
            ]
    });
				
	var lc = new Ext.ux.form.LovCombo({
		 id:'lovcombo'
		,renderTo:document.body
		,hideOnSelect:false
		//,maxHeight:200
		//,resizable : true
		,fieldLabel: 'Choose State',
        //labelAlign: 'top',
        store: states,
        queryMode: 'local',
        //editable: false,
        displayField: 'name',
        valueField: 'abbreviation',
        //renderTo: Ext.getBody(),
        multiSelect: true,
        maxSelections: 3,
        width: 400
		/*,store:new Ext.data.SimpleStore({
			id:0
			,fields:[{name:'id',type:'int'}, 'privGroup']
			,data:[
				 [1, 'Personnel']
				,[11, 'Finance']
				,[2, 'Management']
				,[22, 'Production']
				,[3, 'Users']
			]
		})*/
		,triggerAction:'all'
		//,valueField:'id'
		//,displayField:'privGroup'
		,mode:'local'
	});

	// window with grid
//    var win = new Ext.Window({
//         width:600
//        ,id:'agwin'
//        ,height:400
//        ,layout:'fit'
//        ,border:false
//		,plain:true
//        ,closable:false
//        ,title:Ext.get('page-title').dom.innerHTML
//		,items:{xtype:'examplegrid',id:'actiongrid'}
//    });
//    win.show();
});

// eof

