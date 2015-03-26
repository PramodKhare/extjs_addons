Ext.create('Ext.data.Store', {
      storeId : 'fieldsStore',
      fields : ['id', 'name'],
      sortOnLoad : true,
      autoDestroy : true,
      data : dummyFieldsJSONData,
      proxy : {
        type : 'memory',
        reader : {
          type : 'json',
          root : 'items'
        }
      },
      sorters : [{
            property : 'id',
            direction : 'ASC'
          }]
    });

Ext.create('Ext.data.Store', {
      storeId : 'queryHistoryStore',
      fields : ['id', 'query', 'results', 'parsedQuery'],
      sortOnLoad : true,
      autoDestroy : true,
      data : dummyQueryHistoryJSONData,
      proxy : {
        type : 'memory',
        reader : {
          type : 'json',
          root : 'items'
        }
      }
    });

Ext.create('Ext.data.Store', {
      storeId : 'statesStore',
      fields : ['abbr', 'name', 'slogan'],
      autoDestroy : true,
      autoLoad : true,
      sortOnLoad : true,
      data : states,
      proxy : {
        type : 'memory',
        reader : {
          type : 'json',
          root : 'items'
        }
      }
    });